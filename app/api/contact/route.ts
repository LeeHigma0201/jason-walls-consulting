// Contact form handler. Sends with Resend when RESEND_API_KEY is set (free tier, no card);
// otherwise tells the browser to fall back to a prefilled mailto so no lead is lost.
// No PII is logged beyond what the visitor typed; nothing is stored server-side.

import { SITE } from "@/lib/site";

export const runtime = "nodejs";

type Payload = { name?: string; email?: string; business?: string; pkg?: string; message?: string; utm?: Record<string, string>; page?: string };

const clean = (s: unknown, max = 2000) => String(s ?? "").replace(/[\r\n]+/g, "\n").slice(0, max).trim();

export async function POST(req: Request) {
  let body: Payload;
  try { body = (await req.json()) as Payload; } catch { return Response.json({ error: "bad json" }, { status: 400 }); }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message, 4000);
  if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ error: "name, email and message are required" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? SITE.email;
  const from = process.env.CONTACT_FROM ?? "Jason Walls site <onboarding@resend.dev>";
  if (!apiKey) return Response.json({ ok: false, fallback: "mailto" }, { status: 503 });

  const utm = Object.entries(body.utm ?? {}).map(([k, v]) => `${clean(k, 40)}=${clean(v, 200)}`).join("  ");
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Business: ${clean(body.business, 200)}`,
    `Package: ${clean(body.pkg, 60) || "not sure yet"}`,
    "",
    message,
    "",
    `Page: ${clean(body.page, 500)}`,
    utm ? `UTM: ${utm}` : "",
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, reply_to: email, subject: `Project: ${clean(body.pkg, 60) || "not sure yet"} — ${name}`, text }),
  });
  if (!res.ok) {
    console.error("[/api/contact] provider error", res.status);
    return Response.json({ ok: false, fallback: "mailto" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
