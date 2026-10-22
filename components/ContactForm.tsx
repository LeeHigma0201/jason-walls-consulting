"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { OFFERS } from "@/lib/offers";
import { Price } from "@/components/ui/Price";
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

const noopSubscribe = () => () => {};

export function ContactForm({ initialPackage = "" }: { initialPackage?: string }) {
  const [pkg, setPkg] = useState(OFFERS.some((o) => o.id === initialPackage) ? initialPackage : "");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");
  const [utm] = useState<Record<string, string>>(() => (typeof window === "undefined" ? {} : readUtm()));

  const sentRef = useRef<HTMLHeadingElement>(null);

  // Until React has hydrated, the submit button is disabled so an early tap cannot fall back to a native submit.
  const ready = useSyncExternalStore(noopSubscribe, () => true, () => false);

  // After a real send the form is replaced by a shorter card: bring it into view and move focus there.
  useEffect(() => {
    if (state !== "sent") return;
    sentRef.current?.scrollIntoView({ block: "start" });
    sentRef.current?.focus();
  }, [state]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if ((fd.get("hp_note") as string)?.length) { setState("sent"); return; } // honeypot: a bot or an autofill gets the normal card, no API call
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
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
      if (data.fallback === "mailto" && SITE.email) {
        const body = `Name: ${payload.name}\nEmail: ${payload.email}\nPackage: ${payload.pkg}\n\n${payload.message}\n\nFrom: ${payload.page}\n${Object.entries(utm).map(([k, v]) => `${k}=${v}`).join(" ")}`;
        window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Project: ${payload.pkg || "not sure yet"} from ${payload.name}`)}&body=${encodeURIComponent(body)}`;
        setState("mailto");
        return;
      }
      setState("error");
    } catch { setState("error"); }
  }

  if (state === "sent") {
    return (
      <div className="card" role="status" style={{ scrollMarginTop: 96 }}>
        <p className="kicker" style={{ margin: "0 0 8px" }}>Got it</p>
        <h2 ref={sentRef} tabIndex={-1} className="display h3" style={{ margin: "0 0 12px", outline: "none" }}>Here is what happens now.</h2>
        <ol style={{ margin: 0, paddingLeft: 24, listStyle: "decimal", display: "block" }}>
          <li style={{ marginBottom: 8 }}>I read your message myself and write back with a few times for a 20-minute call.</li>
          <li style={{ marginBottom: 8 }}>After the call I send a written scope with a fixed price.</li>
          <li>Nothing starts until you agree to it.</li>
        </ol>
      </div>
    );
  }

  const chosen = OFFERS.find((o) => o.id === pkg);

  return (
    <form method="post" onSubmit={onSubmit} className="card" style={{ display: "grid", gap: 16 }}>
      <div className="grid-2">
        <div><label className="label" htmlFor="name">Your name</label><input className="input" id="name" name="name" required autoComplete="name" /></div>
        <div><label className="label" htmlFor="email">Email</label><input className="input" id="email" name="email" type="email" required autoComplete="email" /></div>
      </div>
      <div>
        <label className="label" htmlFor="pkg">Closest package</label>
        <select className="input" id="pkg" name="pkg" value={pkg} onChange={(e) => setPkg(e.target.value)}>
          <option value="">Not sure yet</option>
          {OFFERS.filter((o) => o.id !== "day" || initialPackage === "day").map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
        </select>
        <div aria-live="polite" style={{ marginTop: 8 }}>{chosen ? <Price o={chosen} /> : null}</div>
      </div>
      <div>
        <label className="label" htmlFor="message" style={{ fontFamily: "var(--font-plex), system-ui, sans-serif", fontSize: 17, lineHeight: 1.4, letterSpacing: 0, textTransform: "none", color: "var(--text)", marginBottom: 8 }}>What is the one thing you would pay never to do by hand again?</label>
        <textarea className="input" id="message" name="message" rows={4} required />
      </div>
      <input type="text" name="hp_note" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: -9999 }} aria-hidden="true" />
      <div className="actions">
        <button className="btn btn-primary btn-lg" type="submit" disabled={!ready || state === "sending"} aria-describedby="form-status">
          {state === "sending" ? "Sending…" : "Send it"}
        </button>
      </div>
      <div id="form-status" role="status" aria-live="polite">
        {state === "mailto" && <p style={{ margin: 0 }}>Your mail app should have opened with your message in it. If it did not, write to {SITE.email} and tell me what you wrote here.</p>}
        {state === "error" && (
          <p style={{ margin: 0, color: "var(--accent-text)" }}>
            That didn’t send. {SITE.email ? `Email me directly at ${SITE.email}.` : <>Message me on <a className="text-link" href={SITE.x} rel="noopener">X</a> and I will reply from there.</>}
          </p>
        )}
      </div>
    </form>
  );
}
