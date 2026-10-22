// Hero visual for /v/a only: what a build week looks like from Jason's phone. The rows describe the
// process (plan, build, verify, preview) and carry no counts or progress figures, because none are sourced.

const ROWS: { who: string; what: string; state: "run" | "done" | "wait" }[] = [
  { who: "plan", what: "scoped brief and a fixed quote", state: "done" },
  { who: "build", what: "booking form and email handoff", state: "run" },
  { who: "build", what: "Stripe checkout with webhook dedupe", state: "run" },
  { who: "vision", what: "panel photo to breaker read", state: "run" },
  { who: "verify", what: "independent check of the build", state: "run" },
  { who: "claims", what: "every claim checked against the facts sheet", state: "done" },
  { who: "preview", what: "weekly link to the client", state: "wait" },
];

export function CrewPanel() {
  return (
    <div className="crew" aria-label="A build week: parallel agent sessions with an independent verifier">
      <div className="crew-head">
        <span className="mono" style={{ fontSize: 12, color: "var(--text-mid)" }}>build week, from the phone</span>
      </div>
      <div className="crew-body">
        {ROWS.map((r, i) => (
          <div className="crew-row" key={`${r.who}-${i}`} style={{ ["--d" as string]: `${120 + i * 110}ms`, gridTemplateColumns: "18px 1fr" }}>
            <span className={`crew-dot ${r.state}`} />
            <span><strong>{r.who}</strong> · {r.what}</span>
          </div>
        ))}
      </div>
      <div className="crew-foot">
        <span>one electrician steering</span>
      </div>
    </div>
  );
}
