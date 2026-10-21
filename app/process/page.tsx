import type { Metadata } from "next";
import Link from "next/link";
import { CrewPanel } from "@/components/CrewPanel";
import { JsonLd, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Process",
  description: "Discovery call, scoped brief, fixed quote, build with weekly previews, launch on your accounts, care. And how one electrician ships at team speed with Claude Code and parallel agents.",
  alternates: { canonical: "/process" },
};

const STEPS = [
  { n: "01", h: "Discovery call", t: "20 minutes, free", b: "You describe the job in your words. I ask what it needs to do, who uses it, and what's slow or broken today. If a package isn't the right fit, I say so on the call." },
  { n: "02", h: "Scoped brief", t: "within 2 business days", b: "A one-page written brief: what gets built, what doesn't, what you provide, the timeline and the price. You read it, mark it up, and we settle it." },
  { n: "03", h: "Fixed quote", t: "50% to start", b: "The quote is the price. If scope changes later you get a written change order first. Third-party costs go on your own accounts." },
  { n: "04", h: "Build, with a preview every week", t: "1 to 4 weeks by package", b: "You get a link that updates every week, on your phone. Nothing is a surprise at the end because you saw it on day five." },
  { n: "05", h: "Launch on your accounts", t: "you own everything", b: "Hosting, domain, payments, app store: all in your name. You get the repo, handover docs and a recorded walkthrough." },
  { n: "06", h: "Care", t: "30 days included", b: "Fixes for 30 days after launch. Then a Care Plan if you want it watched and improved, or book a day when you need one." },
];

const HOW = [
  { h: "Plan, then build", b: "Anything bigger than a bug fix gets a written spec and a plan before code. The brief you approve is the same document the agents build from." },
  { h: "Parallel agents, one builder", b: "Each piece of the job runs in its own Claude Code session: the booking form, the checkout, the vision step. About 40 sessions and 250 agent runs a week, started and steered from my phone." },
  { h: "An independent verifier", b: "A separate agent that never sees the builder's reasoning checks the work against the brief. The builder can't grade its own homework." },
  { h: "Invariants and claims checks", b: "Tests on the money and data paths. A claims linter that blocks invented prices, numbers and code citations before anything is shown to you." },
  { h: "Preview deploys", b: "Every branch gets its own preview URL. You see the real thing on your phone, not a mockup." },
  { h: "Review before launch", b: "A fresh-context code review on anything that touches money, auth, data or webhooks. Findings get fixed or get a test." },
];

export default function ProcessPage() {
  return (
    <>
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "Process", path: "/process" }])} />
      <section className="section" style={{ paddingBottom: 32 }}>
        <div className="wrap" style={{ display: "grid", gap: 16, maxWidth: 860 }}>
          <p className="kicker sr">Process</p>
          <h1 className="display h1 sr" style={{ margin: 0, fontSize: "clamp(36px, 6vw, 64px)", ["--d" as string]: "60ms" }}>
            Six steps. <em>No surprises.</em>
          </h1>
          <p className="lede sr" style={{ margin: 0, ["--d" as string]: "120ms" }}>
            The same way a good electrician runs a job: walk it, write it up, price it, do the work where you can see it, hand over clean.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 16 }}>
        <div className="wrap" style={{ display: "grid", gap: 14 }}>
          {STEPS.map((s, i) => (
            <div key={s.n} className="card sr" style={{ ["--d" as string]: `${i * 60}ms`, display: "grid", gap: 8, gridTemplateColumns: "56px 1fr", alignItems: "start" }}>
              <span className="display" style={{ fontSize: 28, color: "var(--accent)" }}>{s.n}</span>
              <div>
                <div style={{ display: "flex", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
                  <h2 className="display h3" style={{ margin: 0 }}>{s.h}</h2>
                  <span className="kicker">{s.t}</span>
                </div>
                <p style={{ margin: "8px 0 0", color: "var(--text-mid)", fontSize: 15, maxWidth: "70ch" }}>{s.b}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
        <div className="wrap" style={{ display: "grid", gap: 32 }}>
          <div className="grid-2" style={{ alignItems: "center" }}>
            <div className="sr" style={{ display: "grid", gap: 14 }}>
              <p className="kicker">How one person builds this fast</p>
              <h2 className="display h2" style={{ margin: 0 }}>A crew of agents, <em>one electrician steering.</em></h2>
              <p style={{ margin: 0, color: "var(--text-mid)" }}>
                I build with Claude Code. Each part of a job runs as its own session, an independent agent verifies the work, and I watch and steer it all from my phone between calls. ChargeRight, BendRight and ZombieWells were built this way, and so is this site.
              </p>
            </div>
            <div className="sr" style={{ ["--d" as string]: "120ms" }}><CrewPanel /></div>
          </div>
          <div className="grid-3">
            {HOW.map((h, i) => (
              <div key={h.h} className="card sr" style={{ ["--d" as string]: `${i * 60}ms` }}>
                <h3 className="display h3" style={{ margin: "0 0 8px", fontSize: 22 }}>{h.h}</h3>
                <p style={{ margin: 0, color: "var(--text-mid)", fontSize: 15 }}>{h.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="card card-featured sr" style={{ textAlign: "center", display: "grid", gap: 14, padding: "40px 24px" }}>
            <h2 className="display h2" style={{ margin: 0 }}>Step one is a 20-minute call.</h2>
            <div><Link href="/contact" className="btn btn-primary btn-lg">Book it</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
