"use client";
import { useState } from "react";
import { OFFERS } from "@/lib/offers";
import { SITE } from "@/lib/site";

// Posts to /api/contact. If no email provider is configured there, the API answers with
// `fallback: "mailto"` and the form opens the visitor’s mail app with everything filled in.
// UTM parameters are captured on first visit and sent along, so Jason knows where a lead came from.

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"];

function readUtm(): Record<string, string> {
  try {
    const stored = localStorage.getItem("utm");
    const q = new URLSearchParams(window.location.search);
    const fresh: Record<string, string> = {};
    UTM_KEYS.forEach((k) => { const v = q.get(k); if (v) fresh[k] = v; });
    if (Object.keys(fresh).length) { localStorage.setItem("utm", JSON.stringify(fresh)); return fresh; }
    return stored ? JSON.parse(stored) : {};
  } catch { return {}; }
}

export function ContactForm({ initialPackage = "" }: { initialPackage?: string }) {
  const [pkg, setPkg] = useState(initialPackage);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [utm] = useState<Record<string, string>>(() => (typeof window === "undefined" ? {} : readUtm()));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if ((fd.get("company_site") as string)?.length) return; // honeypot
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      business: String(fd.get("business") || ""),
      pkg: String(fd.get("pkg") || ""),
      message: String(fd.get("message") || ""),
      utm,
      page: typeof window !== "undefined" ? window.location.href : "",
    };
    setState("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) { setState("sent"); form.reset(); return; }
      if (data.fallback === "mailto") {
        const body = `Name: ${payload.name}\nEmail: ${payload.email}\nBusiness: ${payload.business}\nPackage: ${payload.pkg}\n\n${payload.message}\n\nFrom: ${payload.page}\n${Object.entries(utm).map(([k, v]) => `${k}=${v}`).join(" ")}`;
        window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Project: ${payload.pkg || "not sure yet"} — ${payload.name}`)}&body=${encodeURIComponent(body)}`;
        setState("sent");
        return;
      }
      setState("error");
    } catch { setState("error"); }
  }

  if (state === "sent") {
    return (
      <div className="card" role="status">
        <p className="kicker" style={{ marginBottom: 8 }}>Got it</p>
        <p style={{ margin: 0 }}>I read every one of these myself and reply within one business day, usually with two or three times for a 20-minute call.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card" style={{ display: "grid", gap: 16 }}>
      <div className="grid-2">
        <div><label className="label" htmlFor="name">Your name</label><input className="input" id="name" name="name" required autoComplete="name" /></div>
        <div><label className="label" htmlFor="email">Email</label><input className="input" id="email" name="email" type="email" required autoComplete="email" /></div>
      </div>
      <div className="grid-2">
        <div><label className="label" htmlFor="business">Business or idea</label><input className="input" id="business" name="business" placeholder="e.g. HVAC company, 6 trucks" /></div>
        <div>
          <label className="label" htmlFor="pkg">What are you after?</label>
          <select className="input" id="pkg" name="pkg" value={pkg} onChange={(e) => setPkg(e.target.value)}>
            <option value="">Not sure yet</option>
            {OFFERS.map((o) => <option key={o.id} value={o.id}>{o.name} · {o.priceLabel}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="label" htmlFor="message">What does it need to do?</label>
        <textarea className="input" id="message" name="message" rows={5} required placeholder="One paragraph is plenty. What’s the job, who uses it, what’s slow or broken today?" />
      </div>
      <input type="text" name="company_site" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: -9999 }} aria-hidden="true" />
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <button className="btn btn-primary btn-lg" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send it"}
        </button>
        <span className="mono" style={{ fontSize: 11, color: "var(--text-mid)" }}>or email {SITE.email}</span>
      </div>
      {state === "error" && <p role="alert" style={{ margin: 0, color: "var(--accent)" }}>That didn’t send. Email me directly at {SITE.email}.</p>}
    </form>
  );
}
