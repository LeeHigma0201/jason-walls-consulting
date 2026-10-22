// Contact form handler. Sends through Gmail SMTP when GMAIL_USER and GMAIL_APP_PASSWORD are set
// (a Google app password on the existing account, no new service), else through Resend when
// RESEND_API_KEY is set; otherwise tells the browser to fall back to a prefilled mailto so no lead
// is lost. No PII is logged beyond what the visitor typed; nothing is stored server-side.

import nodemailer from "nodemailer";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

type Payload = { name?: string; email?: string; pkg?: string; message?: string; utm?: Record<string, string>; page?: string };
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

export async function POST(req: Request) {
  let body: Payload;
  try { body = (await req.json()) as Payload; } catch { return Response.json({ error: "bad json" }, { status: 400 }); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return Response.json({ error: "bad json" }, { status: 400 });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message, 4000);
  if (!name || !email || !message || !/^[^@\s,;<>"]+@[^@\s,;<>"]+\.[^@\s,;<>"]+$/.test(email)) {
    return Response.json({ error: "name, email and message are required" }, { status: 400 });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || gmailUser || SITE.email;
  const transport = gmailUser && gmailPass ? "gmail" : resendKey ? "resend" : null;
  if (!transport || !to) return Response.json({ ok: false, fallback: "mailto" }, { status: 503 });

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
