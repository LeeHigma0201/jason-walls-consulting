import Link from "next/link";
import Image from "next/image";
import { A, SCREENS, SIZE, STORE } from "@/lib/assets";
import { OFFERS, PRICING_STATUS } from "@/lib/offers";
import { SITE } from "@/lib/site";

// Direction B — "Scoreboard". Research: DESIGN-RESEARCH.md §4.
const BOARD = [
  { name: "ChargeRight", what: "Web app that sells an NEC load-calc report, plus iOS 4.0.1. Takes payments.", href: STORE.chargerightWeb, state: "live", dot: "" },
  { name: "BendRight", what: "Conduit-bending calculator, iOS 1.1, $6.99. ARKit measure in the latest build.", href: STORE.bendright, state: "live", dot: "" },
  { name: "ZombieWells", what: "Public-interest map of abandoned Permian wells, built with a Texas attorney.", href: STORE.zombiewells, state: "live", dot: "" },
  { name: "Evolve KY talk deck", what: "A conference talk as a site. Built the week before the talk.", href: "https://evolve-deck.vercel.app", state: "live", dot: "" },
  { name: "InspectRight", what: "Panel-photo analysis for home inspectors. Working, not launched.", href: "/work#inspectright", state: "web beta", dot: "beta" },
  { name: "BidRight", what: "Plan intelligence for electrical estimators. Prototype.", href: "/work#bidright", state: "prototype", dot: "proto" },
];

export default function DirectionB() {
  return (
    <div className="dir-b">
      {/* INTRO: name, real photo, one sentence */}
      <section className="section" style={{ paddingTop: 40, paddingBottom: 32 }}>
        <div className="wrap" style={{ display: "grid", gap: 20, maxWidth: 760 }}>
          <div className="sr" style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Image src={A.hardhat} alt="Jason Walls in a sticker-covered hard hat" width={72} height={72} style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", objectPosition: "50% 30%" }} />
            <div>
              <p className="kicker" style={{ marginBottom: 4 }}>Jason Walls · electrician · Louisville, KY</p>
              <p className="mono" style={{ margin: 0, fontSize: 12, color: "var(--text-mid)" }}>IBEW Local 369 · two apps on the App Store</p>
            </div>
          </div>
          <h1 className="display h1 sr" style={{ margin: 0, ["--d" as string]: "60ms" }}>I’m an electrician. <em>I build software that ships.</em></h1>
          <p className="lede sr" style={{ margin: 0, ["--d" as string]: "120ms" }}>
            There is no team behind this page except the crew of AI agents I run from my phone, and an independent checker that keeps them honest. Here is everything I’ve shipped, what it costs to hire me, and how the work goes.
          </p>
        </div>
      </section>

      {/* SCOREBOARD: honest about stage (Marc Lou pattern, without the revenue) */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ display: "grid", gap: 16, maxWidth: 760 }}>
          <p className="kicker sr">The scoreboard</p>
          <ul className="board">
            {BOARD.map((b, i) => (
              <li key={b.name} className="sr" style={{ ["--d" as string]: `${i * 50}ms` }}>
                <span className={`dot ${b.dot}`} aria-hidden="true" />
                <div><a href={b.href} rel="noopener">{b.name}</a><small>{b.what}</small></div>
                <span className="state">{b.state}</span>
              </li>
            ))}
          </ul>
          <p className="mono sr" style={{ margin: 0, fontSize: 12, color: "var(--text-mid)" }}>Green is live and installable today. Blue is working but not launched. Hollow is a prototype. No usage numbers here until I can source them.</p>
        </div>
      </section>

      {/* SCREENS: swipe strip of real App Store screens */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ display: "grid", gap: 14 }}>
          <p className="kicker sr">Straight from the App Store listings</p>
          <div className="strip">
            {SCREENS.map((s) => (
              <div className="phone" key={s.src}><Image src={s.src} alt={s.alt} width={SIZE.screen.w} height={SIZE.screen.h} sizes="240px" /></div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE TABLE: plain (UX Continuum pattern) */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ display: "grid", gap: 16, maxWidth: 760 }}>
          <p className="kicker sr">What I charge</p>
          <h2 className="display h2 sr" style={{ margin: 0 }}>Fixed prices. <em>Scoped in writing first.</em></h2>
          {PRICING_STATUS === "proposed" && <p className="proposed sr" style={{ margin: 0 }}>proposed · awaiting approval</p>}
          <table className="price-table sr">
            <thead><tr><th>Job</th><th>Time</th><th>Price</th></tr></thead>
            <tbody>
              {OFFERS.map((o) => (
                <tr key={o.id}>
                  <td><Link href={o.bookHref} style={{ textDecoration: "none", fontWeight: 600 }}>{o.name}</Link><small>{o.short}</small></td>
                  <td style={{ color: "var(--text-mid)", fontSize: 14, whiteSpace: "nowrap" }}>{o.duration.split(" · ")[0]}</td>
                  <td>{o.priceLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="sr" style={{ margin: 0, color: "var(--text-mid)", fontSize: 15 }}>Half to start, half at launch. I will also tell you when not to build. <Link href="/services">What’s included and what isn’t →</Link></p>
        </div>
      </section>

      {/* HOW I WORK: first person prose */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap prose" style={{ display: "grid", gap: 16, maxWidth: 760 }}>
          <p className="kicker sr">How the work goes</p>
          <p className="display h3 sr" style={{ margin: 0 }}>
            We talk for twenty minutes. I write a brief that says what we build, what we don’t, and what you provide, with one price on it. Half up front. Then agents build in parallel while I’m on a job site and I check in from my phone between pulls. An independent checker that never sees the builder’s reasoning signs off before you do. Every Friday you get a preview link. At launch it all goes on your accounts, and you own the code, the domain and the data. Thirty days of fixes are included.
          </p>
          <p className="sr" style={{ margin: 0, color: "var(--text-mid)" }}>
            That is how ChargeRight and BendRight got built, and it’s why a one-person shop can quote weeks instead of quarters.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ display: "grid", gap: 14, maxWidth: 760 }}>
          <h2 className="display h2 sr" style={{ margin: 0 }}>Send me the job.</h2>
          <p className="lede sr" style={{ margin: 0 }}>One paragraph is enough. I’ll reply with questions or a price.</p>
          <div className="sr" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href={`mailto:${SITE.email}`} className="btn btn-primary btn-lg">{SITE.email}</a>
            <Link href="/contact" className="btn btn-ghost btn-lg">Book a 20-minute call</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
