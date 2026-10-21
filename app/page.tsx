import Link from "next/link";
import Image from "next/image";
import { CrewPanel } from "@/components/CrewPanel";
import { WorkCard } from "@/components/WorkCard";
import { PackageCard } from "@/components/PackageCard";
import { FEATURED_WORK } from "@/lib/work";
import { ONE_TIME_OFFERS } from "@/lib/offers";
import { PROOF } from "@/lib/site";
import { FAQ } from "@/lib/faq";

const STEPS = [
  ["Call", "20 minutes, free. You talk, I ask what the job actually needs."],
  ["Brief", "A written scope: what we build, what we don’t, what you provide."],
  ["Quote", "A fixed price. 50% to start."],
  ["Build", "A preview link, updated every week. You watch it come together."],
  ["Launch", "On your accounts. You own the code, the domain, the data."],
  ["Care", "30 days of fixes included. A care plan if you want it watched."],
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap" style={{ display: "grid", gap: 40, alignItems: "center", gridTemplateColumns: "1fr" }}>
          <div className="hero-copy" style={{ display: "grid", gap: 22 }}>
            <p className="kicker sr">Electrician · IBEW Local 369 · Louisville, KY</p>
            <h1 className="display h1 sr" style={{ margin: 0, ["--d" as string]: "60ms" }}>
              Software built by an electrician <em>who ships.</em>
            </h1>
            <p className="lede sr" style={{ margin: 0, maxWidth: "46ch", ["--d" as string]: "120ms" }}>
              Websites, iOS apps, internal tools and AI workflows for trades, local businesses and founders. Fixed price. A preview link every week. Weeks, not quarters.
            </p>
            <div className="sr" style={{ display: "flex", gap: 12, flexWrap: "wrap", ["--d" as string]: "180ms" }}>
              <Link href="/contact" className="btn btn-primary btn-lg">Book a 20-minute call</Link>
              <Link href="/work" className="btn btn-ghost btn-lg">See the work</Link>
            </div>
            <p className="mono sr" style={{ margin: 0, fontSize: 12, color: "var(--text-mid)", ["--d" as string]: "240ms" }}>
              Two apps on the App Store. One product taking payments. No agency, no handoffs.
            </p>
          </div>
          <div className="sr" style={{ ["--d" as string]: "200ms" }}>
            <CrewPanel />
          </div>
        </div>
        <style>{`@media (min-width: 900px) { .wrap:has(.hero-copy) { grid-template-columns: 1.15fr 1fr !important; gap: 56px !important; } }`}</style>
      </section>

      {/* PROOF STRIP */}
      <section aria-label="Proof" style={{ borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", background: "var(--bg-2)" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 20, padding: "28px 16px" }}>
          {PROOF.map((p, i) => (
            <div key={p.label} className="sr" style={{ ["--d" as string]: `${i * 60}ms` }} title={p.src}>
              <div className="stat">{p.n}</div>
              <div className="kicker" style={{ marginTop: 6 }}>{p.label}</div>
            </div>
          ))}
          <div className="sr" style={{ display: "flex", alignItems: "center", gap: 12, ["--d" as string]: "300ms" }}>
            <Image src="/apps/chargeright.jpg" alt="ChargeRight app icon" width={44} height={44} style={{ borderRadius: 10, width: 44, height: 44 }} />
            <Image src="/apps/bendright.jpg" alt="BendRight app icon" width={44} height={44} style={{ borderRadius: 10, width: 44, height: 44 }} />
            <a href="https://apps.apple.com/us/developer/jason-lloyd-walls/id1855640312" rel="noopener" aria-label="Jason Walls on the App Store">
              <Image src="/apps/app-store-badge.svg" alt="Download on the App Store" width={120} height={40} style={{ width: 120, height: 40 }} />
            </a>
          </div>
        </div>
      </section>

      {/* WHO */}
      <section className="section">
        <div className="wrap" style={{ display: "grid", gap: 28 }}>
          <p className="kicker sr">Who this is for</p>
          <div className="grid-3">
            {[
              ["Trades and home service", "Electrical, HVAC, plumbing, solar, inspection. A site that books work, a tool that replaces the spreadsheet, AI that does the paperwork at night."],
              ["Local businesses", "You were quoted agency money for a small job. I quote the job."],
              ["Founders with one idea", "A working product in weeks, on your own accounts, with the code in your hands."],
            ].map(([h, b], i) => (
              <div key={h} className="card sr" style={{ ["--d" as string]: `${i * 80}ms` }}>
                <h2 className="display h3" style={{ margin: "0 0 10px" }}>{h}</h2>
                <p style={{ margin: 0, color: "var(--text-mid)", fontSize: 15 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ display: "grid", gap: 28 }}>
          <div className="sr" style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 16, flexWrap: "wrap" }}>
            <div>
              <p className="kicker" style={{ marginBottom: 10 }}>Shipped, not pitched</p>
              <h2 className="display h2" style={{ margin: 0 }}>Real products, <em>honest about stage.</em></h2>
            </div>
            <Link href="/work" className="nav-link" style={{ fontSize: 12 }}>All work →</Link>
          </div>
          <div className="grid-3">
            {FEATURED_WORK.map((w, i) => <WorkCard key={w.slug} w={w} delay={i * 90} />)}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="section" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
        <div className="wrap" style={{ display: "grid", gap: 28 }}>
          <div className="sr">
            <p className="kicker" style={{ marginBottom: 10 }}>Services and pricing</p>
            <h2 className="display h2" style={{ margin: 0 }}>Four packages. <em>Fixed price.</em> Scoped first.</h2>
          </div>
          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", paddingTop: 12 }}>
            {ONE_TIME_OFFERS.map((o, i) => <PackageCard key={o.id} o={o} compact delay={i * 80} />)}
          </div>
          <p className="sr" style={{ margin: 0, color: "var(--text-mid)", fontSize: 15 }}>
            Plus a <Link href="/services#care">Care Plan</Link> at $400 a month and an <Link href="/services#day">extra day</Link> when you need one. <Link href="/services">Full details →</Link>
          </p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="wrap" style={{ display: "grid", gap: 28 }}>
          <div className="sr">
            <p className="kicker" style={{ marginBottom: 10 }}>How it goes</p>
            <h2 className="display h2" style={{ margin: 0 }}>Call → brief → quote → build → launch → care.</h2>
          </div>
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))" }}>
            {STEPS.map(([h, b], i) => (
              <li key={h} className="card sr" style={{ ["--d" as string]: `${i * 70}ms`, padding: 20 }}>
                <span className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>0{i + 1}</span>
                <h3 className="display h3" style={{ margin: "6px 0 8px", fontSize: 22 }}>{h}</h3>
                <p style={{ margin: 0, color: "var(--text-mid)", fontSize: 14 }}>{b}</p>
              </li>
            ))}
          </ol>
          <Link href="/process" className="nav-link sr" style={{ fontSize: 12, justifySelf: "start" }}>How one person builds this fast →</Link>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="card sr" style={{ display: "grid", gap: 18, maxWidth: 860 }}>
            <p className="kicker">About</p>
            <p className="display h3" style={{ margin: 0 }}>
              I’m an electrician. I spent twelve years pulling wire, and I still carry a card. When AI made it possible for one person to build real software, I built the tool I wished existed on the job, then two more. Now I build them for people like the ones I work with.
            </p>
            <Link href="/about" className="nav-link" style={{ fontSize: 12, justifySelf: "start" }}>More about Jason →</Link>
          </div>
        </div>
      </section>

      {/* FAQ TEASER */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ display: "grid", gap: 20, maxWidth: 860 }}>
          <p className="kicker sr">Questions people ask first</p>
          {FAQ.slice(0, 3).map((f) => (
            <details className="faq sr" key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
          <Link href="/faq" className="nav-link sr" style={{ fontSize: 12, justifySelf: "start" }}>All questions →</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="card card-featured sr" style={{ display: "grid", gap: 16, textAlign: "center", padding: "48px 24px" }}>
            <h2 className="display h2" style={{ margin: 0 }}>Tell me the job. <em>I’ll tell you the price.</em></h2>
            <p className="lede" style={{ margin: "0 auto", maxWidth: "44ch" }}>A 20-minute call, then a written brief with a fixed quote. No pressure, no retainer talk.</p>
            <div><Link href="/contact" className="btn btn-primary btn-lg">Book a call</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
