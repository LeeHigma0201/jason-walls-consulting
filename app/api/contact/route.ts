// Contact form handler. Sends through Gmail SMTP when GMAIL_USER and GMAIL_APP_PASSWORD are set
// (a Google app password on the existing account, no new service), else through Resend when
// RESEND_API_KEY is set; otherwise tells the browser to fall back to a prefilled mailto so no lead
// is lost. Refusals log a status and a reason only; nothing the visitor typed is logged or stored.

import nodemailer from "nodemailer";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

type Payload = { name?: string; email?: string; pkg?: string; message?: string; utm?: Record<string, string>; page?: string; hp_note?: string };
type Mail = { to: string; replyTo: string; subject: string; text: string };

const clean = (s: unknown, max = 2000) => String(s ?? "").replace(/[\r\n]+/g, "\n").slice(0, max).trim();

async function sendGmail(user: string, pass: string, m: Mail) {
  const transport = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } });
  await transport.sendMail({ from: `Jason Walls site <${user}>`, to: m.to, replyTo: m.replyTo, subject: m.subject, text: m.text });
}

async function sendResend(apiKey: string, m: Mail) {
  const from = process.env.CONTACT_FROM ?? "Jason Walls site <onboarding@resend.dev>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: m.to, reply_to: m.replyTo, subject: m.subject, text: m.text }),
  });
  if (!res.ok) throw new Error(`resend ${res.status}`);
}

// Best-effort per-IP limit. The map lives in one server instance, so this slows a naive script
// rather than guaranteeing anything; the type, size and honeypot checks below carry the rest.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_BODY_BYTES = 20_000;
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.size > 5000) hits.clear();
  // Refused calls are not counted, so a blocked visitor's window drains while they wait.
  if (recent.length >= MAX_PER_WINDOW) { hits.set(ip, recent); return true; }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

// Every refusal is one log line with the status and the reason, never the visitor's text.
function refuse(status: number, reason: string, extra: Record<string, unknown> = {}) {
  console.warn("[/api/contact]", status, reason);
  return Response.json({ ok: false, error: reason, ...extra }, { status });
}

export async function POST(req: Request) {
  if (!(req.headers.get("content-type") ?? "").toLowerCase().includes("application/json")) return refuse(415, "json only");
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return refuse(413, "too large");
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return refuse(429, "too many requests");
  let body: Payload;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_BYTES) return refuse(413, "too large");
    body = JSON.parse(text) as Payload;
  } catch { return refuse(400, "bad json"); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return refuse(400, "bad json");
  if (clean(body.hp_note, 10)) return Response.json({ ok: true }); // honeypot filled: a bot gets the normal answer and no mail is sent

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message, 4000);
  if (!name || !email || !message || !/^[^@\s,;<>"]+@[^@\s,;<>"]+\.[^@\s,;<>"]+$/.test(email)) {
    return refuse(400, "name, email and message are required");
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || gmailUser || SITE.email;
  const transport = gmailUser && gmailPass ? "gmail" : resendKey ? "resend" : null;
  if (!transport || !to) return refuse(503, "no mail transport configured", { fallback: "mailto" });

  const pkg = clean(body.pkg, 60) || "not sure yet";
  const utm = Object.entries(body.utm ?? {}).map(([k, v]) => `${clean(k, 40)}=${clean(v, 200)}`).join("  ");
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Package: ${pkg}`,
    "",
    message,
    "",
    `Page: ${clean(body.page, 500)}`,
    utm ? `UTM: ${utm}` : "",
  ].join("\n");
  const mail: Mail = { to, replyTo: email, subject: `Project: ${pkg} — ${name}`, text };

  try {
    if (transport === "gmail") await sendGmail(gmailUser!, gmailPass!, mail);
    else await sendResend(resendKey!, mail);
  } catch (err) {
    console.error("[/api/contact] provider error", transport, err instanceof Error ? err.message : err);
    return Response.json({ ok: false, fallback: "mailto" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
