// Hero visual: what a build week looks like from Jason's phone. Rows are illustrative of the real
// process (claims, plan, build, verify, preview); numbers in the footer are sourced (lib/site PROOF).

const ROWS: { who: string; what: string; state: "run" | "done" | "wait"; w: string }[] = [
  { who: "plan", what: "scoped brief → fixed quote", state: "done", w: "100%" },
  { who: "build-1", what: "booking form + email handoff", state: "run", w: "72%" },
  { who: "build-2", what: "Stripe checkout, webhook dedupe", state: "run", w: "58%" },
  { who: "vision", what: "panel photo → breaker read", state: "run", w: "41%" },
  { who: "verify", what: "independent check of build-1", state: "run", w: "33%" },
  { who: "lint", what: "claims check: 0 banned phrases", state: "done", w: "100%" },
  { who: "preview", what: "weekly link to client", state: "wait", w: "0%" },
];

export function CrewPanel() {
  return (
    <div className="crew" aria-label="A build week: parallel agent sessions with an independent verifier">
      <div className="crew-head">
        <span className="mono" style={{ fontSize: 11, color: "var(--text-mid)" }}>build week · from the phone</span>
        <span className="pill pill-live">7 sessions</span>
      </div>
      <div className="crew-body">
        {ROWS.map((r, i) => (
          <div className="crew-row" key={r.who} style={{ ["--d" as string]: `${120 + i * 110}ms` }}>
            <span className={`crew-dot ${r.state}`} />
            <span><strong>{r.who}</strong> · {r.what}</span>
            <span className="crew-bar"><i style={{ ["--w" as string]: r.w }} /></span>
          </div>
        ))}
      </div>
      <div className="crew-foot">
        <span>about 40 sessions / week</span>
        <span>about 250 agent runs / week</span>
        <span>1 electrician</span>
      </div>
    </div>
  );
}
