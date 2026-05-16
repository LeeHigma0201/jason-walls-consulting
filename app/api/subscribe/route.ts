// POST /api/subscribe — lead magnet signup.
// Scaffolded for ConvertKit (swap providers as needed). If the env vars are
// unset, the route soft-fails: logs the email server-side and returns 200 so
// the form still completes and the visitor lands on /thanks. Nothing breaks
// until Jason wires the provider.
//
// TODO(jason): set in .env.local
//   CONVERTKIT_API_KEY=...
//   CONVERTKIT_FORM_ID=...
// then redeploy.

export const runtime = "nodejs";

type Body = { email?: string };

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || email.length < 5 || !email.includes("@")) {
    return Response.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;

  if (!apiKey || !formId) {
    console.warn(
      "[/api/subscribe] CONVERTKIT_API_KEY or CONVERTKIT_FORM_ID not set — email logged only:",
      email,
    );
    return Response.json({ ok: true, provider: "none" });
  }

  try {
    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: apiKey, email }),
      },
    );
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[/api/subscribe] ConvertKit error:", res.status, text);
      return Response.json(
        { error: "Couldn't subscribe right now. Try again in a minute." },
        { status: 502 },
      );
    }
    return Response.json({ ok: true, provider: "convertkit" });
  } catch (err) {
    console.error("[/api/subscribe] fetch failed:", err);
    return Response.json(
      { error: "Couldn't reach the email service." },
      { status: 502 },
    );
  }
}
