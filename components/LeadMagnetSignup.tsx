"use client";

// Lead-magnet email capture. Posts to /api/subscribe; on success redirects to
// /thanks. If the provider env vars are unset, the API soft-fails (logs only)
// and the visitor still lands on /thanks — no broken UX while Jason wires
// the provider.

import { useState } from "react";

export function LeadMagnetSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setErrorMsg(data.error ?? "Something went wrong. Try again.");
        setState("error");
        return;
      }
      window.location.href = "/thanks";
    } catch {
      setErrorMsg("Couldn't reach the server. Try again in a minute.");
      setState("error");
    }
  }

  return (
    <div className="lead-magnet">
      <p className="lm-kicker">— Free PDF</p>
      <h2 className="lm-h">
        Five AI workflows every low-voltage shop{" "}
        <em>should be running.</em>
      </h2>
      <p className="lm-body">
        The same five I use on my own jobs. Plain English, no AI hype. Drop
        your email — I'll send it Friday.
      </p>
      <form className="lm-form" onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="you@yourshop.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state === "loading"}
          className="lm-input"
          aria-label="Your email"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="lm-submit"
        >
          {state === "loading" ? "Sending..." : "Send the PDF →"}
        </button>
      </form>
      {state === "error" && <p className="lm-error">{errorMsg}</p>}
      <p className="lm-fine">
        One email. No newsletter spam, no list rental.
      </p>
      <style>{`
        .lead-magnet { max-width: 720px; margin: 0 auto; padding: 36px 32px; background: var(--surface); border: 1px solid var(--rule); border-radius: 14px; box-shadow: 0 1px 0 rgba(255, 255, 255, 0.6) inset, 0 12px 32px -12px rgba(26, 22, 18, 0.08); }
        .lm-kicker { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.22em; color: var(--clay); text-transform: uppercase; margin: 0 0 14px; }
        .lm-h { font-family: var(--font-fraunces), serif; font-weight: 600; font-size: clamp(22px, 2.6vw, 28px); line-height: 1.25; letter-spacing: -0.01em; color: var(--text); margin: 0 0 14px; }
        .lm-h em { font-style: italic; color: var(--clay); }
        .lm-body { font-family: var(--font-plex), sans-serif; font-size: 15px; line-height: 1.6; color: var(--text-mid); margin: 0 0 22px; }
        .lm-form { display: flex; gap: 10px; flex-wrap: wrap; }
        .lm-input { flex: 1; min-width: 240px; padding: 14px 18px; font-family: var(--font-plex), sans-serif; font-size: 15px; color: var(--text); background: var(--bg); border: 1px solid var(--rule); border-radius: 999px; outline: none; transition: border-color 0.18s; }
        .lm-input:focus { border-color: var(--clay); }
        .lm-input:disabled { opacity: 0.6; }
        .lm-submit { padding: 14px 24px; font-family: var(--font-plex), sans-serif; font-weight: 600; font-size: 14px; color: var(--bg); background: var(--clay); border: none; border-radius: 999px; cursor: pointer; transition: background 0.18s, transform 0.18s; white-space: nowrap; }
        .lm-submit:hover:not(:disabled) { background: var(--clay-deep); transform: translateY(-1px); }
        .lm-submit:disabled { opacity: 0.6; cursor: wait; }
        .lm-error { font-family: var(--font-plex), sans-serif; font-size: 13px; color: #b8332c; margin: 14px 0 0; }
        .lm-fine { font-family: var(--font-plex), sans-serif; font-size: 12px; color: var(--text-faint); margin: 16px 0 0; }
      `}</style>
    </div>
  );
}
