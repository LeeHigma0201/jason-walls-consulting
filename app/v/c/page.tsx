import Link from "next/link";
import Image from "next/image";
import { A, SIZE, STORE } from "@/lib/assets";
import { ONE_TIME_OFFERS, PRICING_STATUS } from "@/lib/offers";
import { PackageCard } from "@/components/PackageCard";
import { FAQ } from "@/lib/faq";

// Direction C — "Product first". Research: DESIGN-RESEARCH.md §4.
const STAGE = [A.cr01, A.br01, A.cr02];
const INTENTS = [
  { href: "#trade", h: "I run a trade or service business", s: "A site that books work, or a tool that replaces the spreadsheet." },
  { href: "#paper", h: "I do the paperwork at night", s: "Quotes, invoices, summaries and replies, done by AI you control." },
  { href: "#idea", h: "I have an idea for an app", s: "A working product in weeks, on your own accounts." },
];
const WEEKS = [
  ["Day 0", "Call and brief", "Twenty minutes. Then a written scope with one price on it. Half to start."],
  ["Week 1", "Preview one", "The skeleton works end to end. You click through it on your phone."],
  ["Week 2", "Preview two", "Real data, payments if you sell, the AI feature if it earns its place."],
  ["Week 3", "Launch", "On your accounts. You own the code, the domain and the data. Thirty days of fixes."],
];

export default function DirectionC() {
  const byId = (id: string) => ONE_TIME_OFFERS.find((o) => o.id === id)!;
  return (
    <div className="dir-c">
      {/* HERO: product in a phone, cycling real screens */}
      <section className="section" style={{ paddingTop: 40, paddingBottom: 32, overflow: "hidden" }}>
        <div className="wrap hero-c" style={{ display: "grid", gap: 36, alignItems: "center" }}>
          <div style={{ display: "grid", gap: 18 }}>
            <p className="kicker sr">Electrician · IBEW Local 369 · two apps on the App Store</p>
            <h1 className="display h1 sr" style={{ margin: 0, ["--d" as string]: "60ms" }}>Software built by an electrician <em>who ships.</em></h1>
            <p className="lede sr" style={{ margin: 0, maxWidth: "44ch", ["--d" as string]: "120ms" }}>
              The phone on the right is running my apps, not a mockup. Fixed price, a preview every Friday, and you own everything at launch.
            </p>
            <div className="intent sr" style={{ ["--d" as string]: "180ms" }}>
              {INTENTS.map((i) => (
                <a key={i.href} href={i.href}><span><strong>{i.h}</strong><small>{i.s}</small></span><span className="go" aria-hidden="true">→</span></a>
              ))}
            </div>
          </div>
          <div className="sr" style={{ ["--d" as string]: "140ms" }}>
            <div className="phone-stage" aria-label="Live screens from ChargeRight and BendRight on the App Store">
              {STAGE.map((src, i) => (
                <Image key={src} src={src} alt={i === 1 ? "BendRight offset bend screen" : "ChargeRight panel check screen"} width={SIZE.screen.w} height={SIZE.screen.h} sizes="300px" priority={i === 0} style={{ ["--d" as string]: `${i * 4}s` }} />
              ))}
            </div>
            <div className="badge-row" style={{ justifyContent: "center", marginTop: 18 }}>
              <a href={STORE.chargeright} rel="noopener" aria-label="ChargeRight on the App Store"><Image className="icon" src={A.crIcon} alt="" width={40} height={40} /></a>
              <a href={STORE.bendright} rel="noopener" aria-label="BendRight on the App Store"><Image className="icon" src={A.brIcon} alt="" width={40} height={40} /></a>
              <a href="https://apps.apple.com/us/developer/jason-lloyd-walls/id1855640312" rel="noopener"><Image src="/apps/app-store-badge.svg" alt="Download on the App Store" width={120} height={40} style={{ width: 120, height: 40 }} /></a>
            </div>
          </div>
        </div>
        <style>{`@media (min-width: 900px) { .hero-c { grid-template-columns: 1.2fr 1fr; gap: 64px; } }`}</style>
      </section>

      {/* THREE PATHS, each with its recommended package */}
      {[
        { id: "trade", kicker: "For a trade or service business", h: "A site that books work, or the tool that replaces the spreadsheet.", offers: ["launch-site", "mvp"] },
        { id: "paper", kicker: "For the owner doing paperwork at night", h: "Quotes, invoices and replies, done by AI you control.", offers: ["business-on-claude"] },
        { id: "idea", kicker: "For a founder with one idea", h: "A working product in weeks, on your own accounts.", offers: ["mvp", "ios-app"] },
      ].map((p, n) => (
        <section id={p.id} key={p.id} className="section" style={{ background: n % 2 ? "transparent" : "var(--bg-2)", borderTop: "1px solid var(--rule)" }}>
          <div className="wrap" style={{ display: "grid", gap: 22 }}>
            <div className="sr">
              <p className="kicker" style={{ marginBottom: 10 }}>{p.kicker}</p>
              <h2 className="display h2" style={{ margin: 0, maxWidth: "22ch" }}>{p.h}</h2>
              {PRICING_STATUS === "proposed" && <p className="proposed" style={{ marginTop: 10 }}>proposed · awaiting approval</p>}
            </div>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", paddingTop: 12, maxWidth: p.offers.length === 1 ? 480 : undefined }}>
              {p.offers.map((id, i) => <PackageCard key={id} o={byId(id)} compact delay={i * 80} />)}
            </div>
          </div>
        </section>
      ))}

      {/* TIMELINE (Raft pattern) */}
      <section className="section" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap" style={{ display: "grid", gap: 28, alignItems: "start" }}>
          <div style={{ display: "grid", gap: 12 }}>
            <p className="kicker sr">What the three weeks look like</p>
            <h2 className="display h2 sr" style={{ margin: 0 }}>You see it every Friday. <em>Nothing goes dark.</em></h2>
            <p className="sr" style={{ margin: 0, color: "var(--text-mid)", maxWidth: "48ch" }}>
              Agents build in parallel while I’m on a job site. An independent checker that never sees the builder’s reasoning signs off before you do. A claims linter stops the copy from inventing a price or a code citation.
            </p>
          </div>
          <ol className="timeline sr" style={{ ["--d" as string]: "120ms" }}>
            {WEEKS.map(([wk, h, b]) => (
              <li key={wk}><span className="wk">{wk}</span><strong>{h}</strong><p>{b}</p></li>
            ))}
          </ol>
        </div>
        <style>{`@media (min-width: 900px) { .dir-c .timeline { max-width: 520px; } .dir-c .section:nth-of-type(5) .wrap { grid-template-columns: 1fr 1fr; gap: 64px; } }`}</style>
      </section>

      {/* FAQ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ display: "grid", gap: 20, maxWidth: 860 }}>
          <p className="kicker sr">Questions people ask first</p>
          {FAQ.slice(0, 3).map((f) => (
            <details className="faq sr" key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
          <Link href="/faq" className="nav-link sr" style={{ fontSize: 12, justifySelf: "start" }}>All questions →</Link>
        </div>
      </section>

      {/* STICKY BAR (mobile) */}
      <div className="cta-bar">
        <span className="mono">Fixed price · from $3,500</span>
        <Link href="/contact" className="btn btn-primary" style={{ minHeight: 44, padding: "10px 18px" }}>Book a call</Link>
      </div>
    </div>
  );
}
