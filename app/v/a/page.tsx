import Link from "next/link";
import Image from "next/image";
import { A, SCREENS, SIZE, STORE } from "@/lib/assets";
import { ONE_TIME_OFFERS, PRICING_STATUS } from "@/lib/offers";
import { CrewPanel } from "@/components/CrewPanel";
import { PackageCard } from "@/components/PackageCard";
import { FAQ } from "@/lib/faq";

// Direction A — "Panel room". Research: DESIGN-RESEARCH.md §4.
export default function DirectionA() {
  return (
    <div className="dir-a">
      {/* HERO: real photo, result-first headline, price in the hero */}
      <section className="hero-photo" aria-label="Intro">
        <Image src={A.electrician} alt="Jason Walls in a switchgear room, hard hat and safety glasses, holding a lockout tag" fill priority sizes="100vw" />
        <div className="shade" />
        <div className="wrap" style={{ display: "grid", gap: 18 }}>
          <p className="kicker sr" style={{ color: "var(--text)" }}>Electrician · IBEW Local 369 · Louisville, KY</p>
          <h1 className="display h1 sr" style={{ margin: 0, maxWidth: "12ch", ["--d" as string]: "60ms" }}>
            Two apps on the App Store. <em>Built by an electrician.</em>
          </h1>
          <p className="lede sr" style={{ margin: 0, maxWidth: "40ch", color: "var(--text)", fontWeight: 400, ["--d" as string]: "120ms" }}>
            Websites, iOS apps and AI paperwork tools for trades and small businesses. Fixed price from $3,500. A preview every Friday. You own all of it.
          </p>
          <div className="sr" style={{ display: "flex", gap: 10, flexWrap: "wrap", ["--d" as string]: "180ms" }}>
            <a href="#prices" className="btn btn-primary btn-lg">See prices</a>
            <a href="#apps" className="btn btn-ghost btn-lg" style={{ background: "rgba(16,32,61,0.5)" }}>See the apps</a>
          </div>
        </div>
      </section>

      {/* APPS: real screens, store badges */}
      <section id="apps" className="section" style={{ paddingTop: 40 }}>
        <div className="wrap" style={{ display: "grid", gap: 28, alignItems: "center" }}>
          <div style={{ display: "grid", gap: 14 }}>
            <p className="kicker sr">Shipped, not pitched</p>
            <h2 className="display h2 sr" style={{ margin: 0, ["--d" as string]: "60ms" }}>Install them. <em>Today.</em></h2>
            <p className="sr" style={{ margin: 0, color: "var(--text-mid)", maxWidth: "48ch", ["--d" as string]: "120ms" }}>
              ChargeRight tells a homeowner whether the panel can take an EV charger, with an NEC Article 220 load calculation behind it, and sells the report. BendRight is the conduit-bending calculator I wanted on the job. Both live on the App Store under my name.
            </p>
            <div className="badge-row sr" style={{ ["--d" as string]: "180ms" }}>
              <a href={STORE.chargeright} rel="noopener" aria-label="ChargeRight on the App Store"><Image className="icon" src={A.crIcon} alt="" width={40} height={40} /></a>
              <a href={STORE.bendright} rel="noopener" aria-label="BendRight on the App Store"><Image className="icon" src={A.brIcon} alt="" width={40} height={40} /></a>
              <a href="https://apps.apple.com/us/developer/jason-lloyd-walls/id1855640312" rel="noopener"><Image src="/apps/app-store-badge.svg" alt="Download on the App Store" width={120} height={40} style={{ width: 120, height: 40 }} /></a>
              <a href={STORE.chargerightWeb} className="nav-link" style={{ fontSize: 12 }}>evchargeright.com →</a>
            </div>
          </div>
          <div className="phones sr" style={{ ["--d" as string]: "160ms" }}>
            {SCREENS.slice(0, 2).map((s) => (
              <div className="phone" key={s.src}><Image src={s.src} alt={s.alt} width={SIZE.screen.w} height={SIZE.screen.h} sizes="(max-width: 720px) 45vw, 260px" /></div>
            ))}
          </div>
        </div>
        <style>{`@media (min-width: 900px) { #apps .wrap { grid-template-columns: 1.1fr 1fr; gap: 64px; } }`}</style>
      </section>

      {/* PRICES on the page (Hook / Raft pattern) */}
      <section id="prices" className="section" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
        <div className="wrap" style={{ display: "grid", gap: 24 }}>
          <div className="sr">
            <p className="kicker" style={{ marginBottom: 10 }}>Prices, on the page</p>
            <h2 className="display h2" style={{ margin: 0 }}>Four jobs. <em>Fixed price.</em> Scoped in writing first.</h2>
            {PRICING_STATUS === "proposed" && <p className="proposed" style={{ marginTop: 10 }}>proposed · awaiting approval</p>}
          </div>
          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", paddingTop: 12 }}>
            {ONE_TIME_OFFERS.map((o, i) => <PackageCard key={o.id} o={o} compact delay={i * 80} />)}
          </div>
          <p className="sr" style={{ margin: 0, color: "var(--text-mid)", fontSize: 15 }}>
            Half to start, half at launch. A Care Plan at $400 a month keeps it alive after. <Link href="/services">Everything that is and isn’t included →</Link>
          </p>
        </div>
      </section>

      {/* HOW IT'S BUILT: the thing nobody else can claim */}
      <section className="section">
        <div className="wrap" style={{ display: "grid", gap: 28, alignItems: "center" }}>
          <div style={{ display: "grid", gap: 14 }}>
            <p className="kicker sr">How one person ships at team speed</p>
            <h2 className="display h2 sr" style={{ margin: 0, ["--d" as string]: "60ms" }}>A crew of AI agents. <em>I run it from my phone.</em></h2>
            <p className="sr" style={{ margin: 0, color: "var(--text-mid)", maxWidth: "50ch", ["--d" as string]: "120ms" }}>
              Monday you get a written brief. Agents build in parallel while I’m on a job site, and an independent checker that never sees the builder’s reasoning signs off before you do. Friday you get a preview link. A claims linter stops the copy from inventing a price or a code citation. That’s the whole method, and it’s how both apps got shipped.
            </p>
            <ul className="check-list sr" style={{ ["--d" as string]: "180ms" }}>
              <li>Brief in writing before any money moves</li>
              <li>Preview link updated every Friday</li>
              <li>Launch on your accounts; you own code, domain and data</li>
              <li>30 days of fixes after launch</li>
            </ul>
          </div>
          <div className="sr" style={{ ["--d" as string]: "160ms" }}><CrewPanel /></div>
        </div>
        <style>{`@media (min-width: 900px) { .dir-a .section:nth-of-type(4) .wrap { grid-template-columns: 1fr 1fr; gap: 64px; } }`}</style>
      </section>

      {/* FAQ + CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ display: "grid", gap: 20, maxWidth: 860 }}>
          <p className="kicker sr">Questions people ask first</p>
          {FAQ.slice(0, 3).map((f) => (
            <details className="faq sr" key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="card card-featured sr" style={{ display: "grid", gap: 16, textAlign: "center", padding: "48px 24px" }}>
            <h2 className="display h2" style={{ margin: 0 }}>Tell me the job. <em>I’ll tell you the price.</em></h2>
            <p className="lede" style={{ margin: "0 auto", maxWidth: "44ch" }}>A 20-minute call, then a written brief with a fixed quote.</p>
            <div><Link href="/contact" className="btn btn-primary btn-lg">Book a call</Link></div>
          </div>
        </div>
      </section>
    </div>
  );
}
