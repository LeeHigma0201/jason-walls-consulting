"use client";

// HOMEPAGE — premium editorial.
// Pivot 2026-05-10: Broader ICP (trades + SMB + dealer groups + founders)
// and full-breadth offer (Sites / iOS / AI / Agent infrastructure).
// 6 tiers split: 4 one-time + 2 ongoing.
// "Starts at" language on upper tiers — site does the asking, not Jason.
// Apple typographic discipline + Claude warm clay + RightSuite professional bones.
// See DESIGN.md.

import { useEffect, useState } from "react";
import Link from "next/link";
import { ONE_TIME_OFFERS, ONGOING_OFFERS } from "@/lib/offers";
import { MissionFooter } from "@/components/MissionFooter";
import { LeadMagnetSignup } from "@/components/LeadMagnetSignup";

const BUILDS = [
  {
    num: "01",
    icon: "globe",
    title: "Websites",
    body: "Production site, payments wired, live. The kind of site you'd hire an agency for at 4× the price.",
    examples: "Examples: ChargeRight · evchargeright.com · Lennox Fields · lennoxfields.com",
  },
  {
    num: "02",
    icon: "phone",
    title: "iOS apps",
    body: "Native iOS build, App Store ready. Same codebase as the website, your customers get a real app on the truck or in the pocket.",
    examples: "Examples: ChargeRight iOS · InspectRight · BendRight",
  },
  {
    num: "03",
    icon: "spark",
    title: "AI tools",
    body: "AI that reads the spec the way you would. Handles a repeated task. Answers your team, drafts your replies. Grounded on your real material.",
    examples: "Examples: dealer-desk · gmail-scanner · jason-voice · 50+ shipped",
  },
  {
    num: "04",
    icon: "network",
    title: "Agent infrastructure",
    body: "Multiple AI tools wired together — they read your docs, talk to each other, get the back-office work done. The crew that doesn't sleep.",
    examples: "Example: Cortex — a 233-node knowledge graph running my whole business",
  },
];

const PAINS = [
  { num: "01", t: "Your team asks you the same question three times a week." },
  { num: "02", t: "Customer texts and emails pile up between jobs. Half answered late, half never." },
  { num: "03", t: "Your docs, prints, manuals, training videos are scattered across systems — when anyone needs them, you're the lookup." },
  { num: "04", t: "Competitors with worse trade knowledge are faster because their tools are better, not because they work harder." },
  { num: "05", t: "Agencies quoted you $25,000 and a six-week timeline for what should take two weeks." },
];

const PROOF = [
  {
    name: "ChargeRight",
    sub: "EV charger panel-load assessment · live in production",
    body: "680,000+ views. Paying customers. NEC 220.82 load calculator running for homeowners and electricians. Next.js + Stripe + iOS via Capacitor. Built solo, day-job intact.",
    href: "https://evchargeright.com",
  },
  {
    name: "Lennox Fields",
    sub: "Licensed therapy practice site · live in production",
    body: "Built for my wife's LPCA therapy practice. Booking, intake, SEO-tuned. Different audience, same craft.",
    href: "https://lennoxfields.com",
  },
  {
    name: "ZombieWells",
    sub: "Public-interest tool · 45-minute build",
    body: "Exposes abandoned, contaminated oil wells in Texas. Partnership with attorney Sarah Stogner. From idea to deployed in under an hour.",
    href: null,
  },
  {
    name: "Cortex",
    sub: "Custom knowledge graph · 233 nodes · 1,496 edges",
    body: "The brain layer behind everything I ship. A private MCP server that runs my whole one-person operation — and shows what's possible for yours.",
    href: null,
  },
  {
    name: "IBEW Local 369",
    sub: "Master Electrician · license on file",
    body: "NEC, panel calculations, EV charging infrastructure. 20 years pulling wire. Licensed, not bluffed. Still on the books.",
    href: null,
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div data-theme="home">
      <nav className={"nav " + (scrolled ? "nav--solid" : "")}>
        <div className="nav-inner">
          <Link href="/" className="mark">
            <span className="mark-name">Jason Walls</span>
            <span className="mark-sub">Master Electrician · builds with Claude</span>
          </Link>
          <div className="nav-right">
            <a href="#what-i-build" className="nav-link">What I build</a>
            <Link href="/templates" className="nav-link">Templates</Link>
            <a href="#receipts" className="nav-link">Receipts</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <Link href="/book?tier=strategy-hour" className="nav-cta">Book a call</Link>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className={"hero " + (revealed ? "in" : "")}>
          <p className="kicker reveal" style={{ "--d": "0ms" } as React.CSSProperties}>
            <span className="kicker-dot" /> Master Electrician · software builder · IBEW Local 369
          </p>
          <h1 className="display reveal" style={{ "--d": "60ms" } as React.CSSProperties}>
            <span className="d-line">Sites. iOS apps.</span>
            <span className="d-line">AI tools. Built by</span>
            <span className="d-line"><em>a working</em> electrician.</span>
          </h1>
          <p className="lede reveal" style={{ "--d": "180ms" } as React.CSSProperties}>
            Sites, iOS apps, and AI tools for electricians, low-voltage crews,
            and fiber shops running 1–10 trucks. Fixed fee. You own the code.
            Shipped, not promised.
          </p>
          <div className="cta-row reveal" style={{ "--d": "260ms" } as React.CSSProperties}>
            <Link href="/book?tier=strategy-hour" className="cta">
              Book a Strategy Hour <span className="cta-meta">$300 · 1 call</span>
            </Link>
            <a href="#what-i-build" className="cta-secondary">
              See what I build →
            </a>
          </div>

          <div className="trust-bar reveal" style={{ "--d": "340ms" } as React.CSSProperties} aria-label="Credentials and press">
            <span className="trust-item">IBEW Local 369</span>
            <span className="trust-item">Anthropic case study</span>
            <span className="trust-item">The Sunday Times</span>
            <span className="trust-item">Mark Cuban repost</span>
            <span className="trust-item">ChargeRight · 680K+ views</span>
          </div>
        </section>

        {/* PRESS — pulled above the fold from /trades. Cuban quote is verbatim;
            other entries use dated outreach framing (not "published case study") to
            stay honest. Dates sourced from origin-story memory. */}
        <section className="section press-section" id="press">
          <div className="section-head">
            <p className="section-kicker">— Press</p>
            <h2 className="display-2">
              The work made <em>some noise.</em>
            </h2>
          </div>
          <div className="press-grid">
            <article className="press-card press-card--feature">
              <div className="press-date">2026 · 03 · 11</div>
              <p className="press-body">
                Mark Cuban reposts ChargeRight:{" "}
                <em>
                  "I honestly don't care how it works. I'm just glad you
                  started a business doing it."
                </em>
              </p>
              <p className="press-tag">— Mark Cuban</p>
            </article>
            <article className="press-card">
              <div className="press-date">2026 · 03 · 12</div>
              <p className="press-body">
                Danny Fortson reaches out from <em>The Sunday Times</em>{" "}
                (London) for an interview on building software with Claude
                while still on the trade.
              </p>
              <p className="press-tag">— The Sunday Times</p>
            </article>
            <article className="press-card">
              <div className="press-date">2026 · 03 · 17</div>
              <p className="press-body">
                Anthropic reaches out — case study on a Master Electrician
                shipping production software with Claude.
              </p>
              <p className="press-tag">— Anthropic</p>
            </article>
          </div>
        </section>

        {/* LEAD MAGNET — inline signup. Soft conversion path for visitors not
            ready to book a $300 call. */}
        <section className="section lead-magnet-section" id="lead-magnet">
          <LeadMagnetSignup />
        </section>

        {/* HOW I WORK — panel demo moved here from hero. It's a "how" proof, not a closer. */}
        <section className="section how-section" id="how-i-work">
          <div className="section-head">
            <p className="section-kicker">— How I work</p>
            <h2 className="display-2">
              Grounded on <em>your real material.</em>
            </h2>
            <p className="section-sub">
              Every tool reads your prints, your spec book, your job folder. Not generic
              answers. Source-cited, page-numbered, the way you'd answer if you had the time.
            </p>
          </div>
          <div className="hero-vis reveal in" aria-hidden="true">
            <div className="vis-frame">
              <div className="vis-grid">
                <div className="vis-pane vis-print">
                  <div className="vis-hd">
                    <span className="vis-label">PRINT · 200A · 24-CIRCUIT</span>
                    <span className="vis-meta">scope · panel-load NEC 220.82</span>
                  </div>
                  <div className="panel-grid">
                    {Array.from({ length: 24 }).map((_, i) => {
                      const live = [3, 7, 11, 14, 19, 22].includes(i);
                      return (
                        <div key={i} className={"panel-cell" + (live ? " live" : "")}>
                          <span className="panel-num">{i + 1}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="vis-foot-meta">
                    <span>main: 200A</span>
                    <span>load: 156A · 78%</span>
                    <span>busbar: 408.36(B)</span>
                  </div>
                </div>

                <div className="vis-pane vis-chat">
                  <div className="vis-hd">
                    <span className="vis-label">YOUR TEAM · 9:14 AM</span>
                  </div>
                  <div className="msg msg-q">
                    Why is breaker 14 on a tandem?
                  </div>
                  <div className="vis-hd vis-hd-ai">
                    <span className="vis-label clay">YOUR AI · grounded on the print above</span>
                  </div>
                  <div className="msg msg-a">
                    The original load calc came in at 78% of busbar capacity.
                    NEC 408.36(B) allows tandem breakers when the panel
                    isn't rated for split-bus. See your spec sheet, page 4 —
                    breaker 14 is on a CTL position because the panel schedule
                    has it grouped with the dishwasher circuit.
                  </div>
                  <div className="msg-meta">
                    Source: <span className="src-tag">your-print.pdf · page 4</span>
                  </div>
                </div>
              </div>

              <div className="vis-foot">
                <span className="dot-live" />
                One example. I also ship sites, iOS apps, and the agent
                infrastructure underneath. <em>All grounded on your real material.</em>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT I BUILD — 4 capability buckets */}
        <section className="section builds-section" id="what-i-build">
          <div className="section-head">
            <p className="section-kicker">— What I build</p>
            <h2 className="display-2">
              Shipped,<br /><em>not pitched.</em>
            </h2>
            <p className="section-sub">
              Four categories. Pick one to start. Cross over later — most clients do.
            </p>
          </div>
          <div className="build-grid">
            {BUILDS.map((b) => (
              <article key={b.num} className="build">
                <div className="build-head">
                  <span className="build-num">{b.num}</span>
                  <BuildIcon name={b.icon} />
                </div>
                <h3 className="build-title">{b.title}</h3>
                <p className="build-body">{b.body}</p>
                <p className="build-examples">{b.examples}</p>
              </article>
            ))}
          </div>
        </section>

        {/* PAIN */}
        <section className="section pain-section">
          <div className="section-head">
            <p className="section-kicker">— Why hire me</p>
            <h2 className="display-2">
              Your day is bleeding<br /><em>where it shouldn't.</em>
            </h2>
          </div>
          <ul className="pain-list">
            {PAINS.map((p) => (
              <li key={p.num} className="pain-row">
                <span className="pain-num">{p.num}</span>
                <span className="pain-text">{p.t}</span>
              </li>
            ))}
          </ul>
          <p className="pain-close">
            Whichever one is bleeding you most — <em>that's the one I'll build for first.</em>
          </p>
        </section>

        {/* PRICING — one-time tier */}
        <section className="section pricing-section" id="pricing">
          <div className="section-head">
            <p className="section-kicker">— Electrician's pricing · one-time builds</p>
            <h2 className="display-2">
              Pay for the build,<br /><em>not the build time.</em>
            </h2>
            <p className="section-sub">
              Fixed scope, fixed price, fixed delivery date. Upper tiers start with a discovery call —
              we scope together, then I quote.
            </p>
            <p className="capacity-line">
              Currently booking <strong>TODO(jason)</strong>. I take 4 builds a month.
            </p>
          </div>
          <div className="tier-grid">
            {ONE_TIME_OFFERS.map((o, i) => (
              <div key={o.id} className={"tier" + (o.featured ? " tier--featured" : "")}>
                {o.featured && <div className="tier-flag">Most picked</div>}
                <div className="tier-num">0{i + 1}</div>
                <div className="tier-name">{o.name}</div>
                <div className="tier-price-row">
                  <span className="tier-price">{o.priceLabel}</span>
                </div>
                <div className="tier-duration">{o.duration}</div>
                <ul className="tier-list">
                  {o.whatYouGet.map((line, j) => (<li key={j}>{line}</li>))}
                </ul>
                {o.notForThis && o.notForThis.length > 0 && (
                  <ul className="tier-notfor">
                    {o.notForThis.map((line, k) => (
                      <li key={k}>{line}</li>
                    ))}
                  </ul>
                )}
                {o.guarantee && (
                  <p className="tier-guarantee">{o.guarantee}</p>
                )}
                <Link href={o.bookHref} className="tier-cta">
                  {o.featured ? "Scope it out →" : o.id === "strategy-hour" ? "Book the call →" : o.id === "full-mvp" ? "Scope the MVP →" : "Get started →"}
                </Link>
              </div>
            ))}
          </div>

          {/* ONGOING — smaller callout, 2 cards */}
          <div className="ongoing-block">
            <p className="section-kicker ongoing-kicker">— Or work with me ongoing</p>
            <h3 className="ongoing-h">
              <em>Subscription-style.</em> Same craft, recurring.
            </h3>
            <div className="ongoing-grid">
              {ONGOING_OFFERS.map((o) => (
                <div key={o.id} className="ongoing-tier">
                  <div className="ongoing-name">{o.name}</div>
                  <div className="ongoing-price-row">
                    <span className="ongoing-price">{o.priceLabel}</span>
                    <span className="ongoing-duration">{o.duration}</span>
                  </div>
                  <p className="ongoing-short">{o.short}</p>
                  <ul className="ongoing-list">
                    {o.whatYouGet.map((line, j) => (<li key={j}>{line}</li>))}
                  </ul>
                  {o.notForThis && o.notForThis.length > 0 && (
                    <ul className="tier-notfor tier-notfor--ongoing">
                      {o.notForThis.map((line, k) => (
                        <li key={k}>{line}</li>
                      ))}
                    </ul>
                  )}
                  {o.guarantee && (
                    <p className="tier-guarantee tier-guarantee--ongoing">{o.guarantee}</p>
                  )}
                  <Link href={o.bookHref} className="ongoing-cta">
                    Start the month →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROOF — full receipts */}
        <section className="section proof-section" id="receipts">
          <div className="section-head">
            <p className="section-kicker">— Receipts</p>
            <h2 className="display-2">
              Shipped.<br /><em>Not promised.</em>
            </h2>
            <p className="section-sub">
              Five live receipts. Plus 50+ Claude tools, four apps wired for iOS, and zero lines of code I wrote myself.
            </p>
          </div>
          <div className="proof-list">
            {PROOF.map((p) => (
              <article key={p.name} className="proof-row">
                <div className="proof-meta">
                  <h3 className="proof-name">{p.name}</h3>
                  <p className="proof-sub">{p.sub}</p>
                </div>
                <div className="proof-body">
                  <p>{p.body}</p>
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noopener" className="proof-link">
                      {p.href.replace("https://", "")} ↗
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* MISSION */}
        <section className="section mission-section">
          <div className="mission-inner">
            <p className="mission-quote">
              <span className="mission-dropcap">I</span>
              learned my trade by getting yelled at on a job site. I learned
              to ship software the same way — different kind of job site. AI
              handed me the keys to expertise I couldn't afford my whole
              career. I'm <em>paying that forward</em> to the people who
              build things with their hands and run small operations the
              big software companies overlook.
            </p>
            <p className="mission-sig">— One trade, one shop, one operator at a time</p>
            <Link href="/book?tier=strategy-hour" className="cta cta-clay">
              Book a Strategy Hour <span className="cta-meta">$300</span>
            </Link>
          </div>
        </section>
      </main>

      <MissionFooter activeId="home" />

      <style jsx>{`
        /* ===== NAV ===== */
        .nav { position: sticky; top: 0; z-index: 50; transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s; }
        .nav--solid { background: rgba(248, 244, 237, 0.85); backdrop-filter: saturate(180%) blur(20px); -webkit-backdrop-filter: saturate(180%) blur(20px); border-bottom: 1px solid var(--rule); }
        .nav-inner { max-width: 1280px; margin: 0 auto; padding: 18px 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
        .mark { display: flex; flex-direction: column; line-height: 1; text-decoration: none; color: inherit; gap: 4px; }
        .mark-name { font-family: var(--font-fraunces), serif; font-weight: 600; font-size: 18px; letter-spacing: -0.01em; color: var(--text); }
        .mark-sub { font-family: var(--font-jbm), monospace; font-size: 10px; letter-spacing: 0.18em; color: var(--text-faint); text-transform: uppercase; }
        .nav-right { display: flex; align-items: center; gap: 28px; }
        .nav-link { font-family: var(--font-plex), sans-serif; font-size: 13px; font-weight: 500; color: var(--text-mid); text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: var(--text); }
        .nav-cta { font-family: var(--font-plex), sans-serif; font-size: 13px; font-weight: 600; padding: 9px 18px; background: var(--text); color: var(--bg); border-radius: 999px; text-decoration: none; transition: background 0.2s, transform 0.2s; }
        .nav-cta:hover { background: var(--clay); transform: translateY(-1px); }
        @media (max-width: 760px) {
          .nav-right { gap: 12px; }
          .nav-link { display: none; }
          .mark-sub { display: none; }
        }

        /* ===== REVEAL ===== */
        .reveal { opacity: 0; transform: translateY(14px); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); transition-delay: var(--d, 0ms); }
        .hero.in .reveal { opacity: 1; transform: translateY(0); }

        /* ===== HERO ===== */
        .hero { max-width: 1100px; margin: 0 auto; padding: 80px 32px 72px; text-align: center; }
        .kicker { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.22em; color: var(--clay); text-transform: uppercase; margin: 0 0 36px; display: inline-flex; align-items: center; gap: 10px; }
        .kicker-dot { width: 6px; height: 6px; border-radius: 999px; background: var(--clay); display: inline-block; }
        .display { font-family: var(--font-fraunces), serif; font-weight: 300; font-size: clamp(44px, 7vw, 92px); line-height: 0.98; letter-spacing: -0.032em; color: var(--text); margin: 0 auto 36px; max-width: 14ch; font-variation-settings: "SOFT" 30; }
        .d-line { display: block; }
        .display em { font-family: var(--font-fraunces), serif; font-style: italic; font-weight: 600; color: var(--clay); }
        .lede { font-family: var(--font-plex), sans-serif; font-weight: 400; font-size: 19px; line-height: 1.55; color: var(--text-mid); max-width: 660px; margin: 0 auto 40px; }
        .lede .num { font-family: var(--font-jbm), monospace; font-weight: 600; color: var(--text); }
        .cta-row { display: flex; justify-content: center; align-items: center; gap: 28px; flex-wrap: wrap; margin-bottom: 44px; }
        /* ===== TRUST BAR ===== */
        .trust-bar { display: flex; justify-content: center; align-items: center; gap: 0; flex-wrap: wrap; max-width: 920px; margin: 0 auto; padding: 20px 24px; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.14em; color: var(--text-mid); text-transform: uppercase; }
        .trust-item { display: inline-block; padding: 4px 16px; white-space: nowrap; }
        .trust-item:not(:last-child) { border-right: 1px solid var(--rule); }
        @media (max-width: 760px) {
          .trust-bar { font-size: 10px; padding: 14px 12px; gap: 4px 0; }
          .trust-item { padding: 4px 10px; }
          .trust-item:not(:last-child) { border-right: none; }
        }
        /* ===== HOW SECTION ===== */
        .how-section .hero-vis { max-width: 1100px; margin: 0 auto; }

        /* ===== PRESS SECTION ===== */
        .press-grid { display: grid; grid-template-columns: 1fr; gap: 16px; max-width: 1100px; margin: 0 auto; }
        @media (min-width: 880px) { .press-grid { grid-template-columns: 1.4fr 1fr 1fr; gap: 18px; } }
        .press-card { background: var(--surface); border: 1px solid var(--rule); border-radius: 14px; padding: 28px 26px; display: flex; flex-direction: column; box-shadow: 0 1px 0 rgba(255, 255, 255, 0.6) inset, 0 8px 24px -10px rgba(26, 22, 18, 0.06); }
        .press-card--feature { border-color: var(--clay); background: linear-gradient(180deg, var(--clay-dim) 0%, var(--surface) 65%); }
        .press-date { font-family: var(--font-jbm), monospace; font-size: 10px; letter-spacing: 0.22em; color: var(--text-mid); text-transform: uppercase; margin-bottom: 14px; }
        .press-body { font-family: var(--font-fraunces), serif; font-weight: 400; font-size: clamp(17px, 1.9vw, 21px); line-height: 1.5; color: var(--text); margin: 0 0 14px; flex: 1; }
        .press-card--feature .press-body { font-size: clamp(19px, 2.1vw, 24px); }
        .press-body em { font-style: italic; color: var(--text); font-weight: 500; }
        .press-card--feature .press-body em { color: var(--clay-deep); font-weight: 600; }
        .press-tag { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.16em; color: var(--text-mid); text-transform: uppercase; margin: 0; padding-top: 14px; border-top: 1px solid var(--rule-soft); }
        .cta { display: inline-flex; align-items: baseline; gap: 12px; padding: 16px 28px; background: var(--text); color: var(--bg); text-decoration: none; border-radius: 999px; font-family: var(--font-plex), sans-serif; font-weight: 600; font-size: 15px; transition: background 0.2s, transform 0.2s; }
        .cta:hover { background: var(--clay); transform: translateY(-1px); }
        .cta-meta { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.06em; opacity: 0.7; font-weight: 400; }
        .cta-secondary { font-family: var(--font-plex), sans-serif; font-weight: 500; font-size: 14px; color: var(--text); text-decoration: none; padding-bottom: 2px; border-bottom: 1px solid currentColor; transition: color 0.2s; }
        .cta-secondary:hover { color: var(--clay); }
        .cta-clay { background: var(--clay); }
        .cta-clay:hover { background: var(--clay-deep); }

        /* ===== HERO VISUAL ===== */
        .hero-vis { max-width: 1100px; margin: 0 auto; }
        .vis-frame { background: var(--surface); border: 1px solid var(--rule); border-radius: 18px; box-shadow: 0 1px 0 rgba(255, 255, 255, 0.6) inset, 0 30px 80px -20px rgba(26, 22, 18, 0.18), 0 8px 24px -8px rgba(26, 22, 18, 0.08); overflow: hidden; }
        .vis-grid { display: grid; grid-template-columns: 1fr; }
        @media (min-width: 820px) { .vis-grid { grid-template-columns: 1fr 1.15fr; } }
        .vis-pane { padding: 32px 28px; }
        .vis-print { background: var(--surface-2); border-bottom: 1px solid var(--rule); }
        @media (min-width: 820px) { .vis-print { border-bottom: none; border-right: 1px solid var(--rule); } }
        .vis-hd { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px dashed var(--rule); }
        .vis-hd-ai { margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--rule); border-bottom: none; padding-bottom: 0; }
        .vis-label { font-family: var(--font-jbm), monospace; font-size: 10px; letter-spacing: 0.18em; color: var(--text-mid); text-transform: uppercase; }
        .vis-label.clay { color: var(--clay); }
        .vis-meta { font-family: var(--font-jbm), monospace; font-size: 9px; letter-spacing: 0.14em; color: var(--text-faint); text-transform: uppercase; }
        .panel-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; margin-bottom: 18px; }
        .panel-cell { aspect-ratio: 0.85; background: var(--surface); border: 1px solid var(--rule); display: flex; align-items: center; justify-content: center; position: relative; transition: all 0.3s; }
        .panel-cell.live { background: var(--clay-dim); border-color: var(--clay); box-shadow: 0 0 0 1px var(--clay-dim); }
        .panel-cell.live::after { content: ""; position: absolute; top: 4px; right: 4px; width: 4px; height: 4px; border-radius: 999px; background: var(--clay); }
        .panel-num { font-family: var(--font-jbm), monospace; font-size: 9px; color: var(--text-mid); }
        .panel-cell.live .panel-num { color: var(--clay-deep); font-weight: 700; }
        .vis-foot-meta { display: flex; gap: 18px; flex-wrap: wrap; padding-top: 12px; border-top: 1px dashed var(--rule); font-family: var(--font-jbm), monospace; font-size: 10px; letter-spacing: 0.1em; color: var(--text-mid); }
        .msg { font-family: var(--font-plex), sans-serif; font-size: 14px; line-height: 1.55; padding: 12px 14px; border-radius: 14px; margin-bottom: 6px; max-width: 95%; }
        .msg-q { background: var(--surface-2); color: var(--text); border-bottom-left-radius: 4px; }
        .msg-a { background: var(--clay-dim); color: var(--text); border-left: 2px solid var(--clay); border-bottom-left-radius: 4px; }
        .msg-meta { font-family: var(--font-jbm), monospace; font-size: 10px; color: var(--text-faint); margin-top: 8px; letter-spacing: 0.06em; }
        .src-tag { color: var(--clay-deep); }
        .vis-foot { padding: 14px 28px; background: var(--surface-2); border-top: 1px solid var(--rule); font-family: var(--font-plex), sans-serif; font-size: 13px; color: var(--text-mid); text-align: center; display: flex; justify-content: center; align-items: center; gap: 10px; flex-wrap: wrap; line-height: 1.5; }
        .vis-foot em { font-style: italic; color: var(--clay-deep); font-weight: 500; }
        .dot-live { width: 6px; height: 6px; border-radius: 999px; background: var(--teal); display: inline-block; box-shadow: 0 0 8px var(--teal); animation: pulse 2.4s infinite; }

        /* ===== SECTIONS ===== */
        .section { max-width: 1100px; margin: 0 auto; padding: 96px 32px; }
        .section-head { max-width: 760px; margin: 0 auto 56px; text-align: center; }
        .section-kicker { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.22em; color: var(--clay); text-transform: uppercase; margin: 0 0 18px; }
        .display-2 { font-family: var(--font-fraunces), serif; font-weight: 300; font-size: clamp(36px, 5.5vw, 68px); line-height: 1.0; letter-spacing: -0.025em; color: var(--text); margin: 0; font-variation-settings: "SOFT" 30; }
        .display-2 em { font-style: italic; font-weight: 600; color: var(--clay); }
        .section-sub { font-family: var(--font-plex), sans-serif; font-size: 17px; line-height: 1.55; color: var(--text-mid); margin: 22px auto 0; max-width: 580px; }

        /* ===== BUILDS — 4 capability buckets ===== */
        .build-grid { display: grid; grid-template-columns: 1fr; gap: 18px; max-width: 1100px; margin: 0 auto; }
        @media (min-width: 760px) { .build-grid { grid-template-columns: 1fr 1fr; gap: 24px; } }
        .build { background: var(--surface); border: 1px solid var(--rule); border-radius: 14px; padding: 36px 32px; box-shadow: 0 1px 0 rgba(255, 255, 255, 0.6) inset, 0 12px 32px -12px rgba(26, 22, 18, 0.08); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s; display: flex; flex-direction: column; }
        .build:hover { transform: translateY(-3px); box-shadow: 0 1px 0 rgba(255, 255, 255, 0.6) inset, 0 24px 48px -12px rgba(26, 22, 18, 0.14); }
        .build-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
        .build-num { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.22em; color: var(--clay); }
        .build-title { font-family: var(--font-fraunces), serif; font-weight: 600; font-size: 26px; line-height: 1.18; letter-spacing: -0.012em; color: var(--text); margin: 0 0 14px; }
        .build-body { font-family: var(--font-plex), sans-serif; font-size: 15px; line-height: 1.6; color: var(--text-mid); margin: 0 0 18px; flex: 1; }
        .build-examples { font-family: var(--font-jbm), monospace; font-size: 11px; color: var(--text-faint); line-height: 1.55; padding-top: 14px; border-top: 1px solid var(--rule-soft); margin: 0; letter-spacing: 0.02em; }

        /* ===== PAIN ===== */
        .pain-list { list-style: none; margin: 0 0 40px; padding: 0; max-width: 760px; margin-left: auto; margin-right: auto; }
        .pain-row { display: grid; grid-template-columns: 60px 1fr; gap: 28px; padding: 26px 0; border-bottom: 1px solid var(--rule); align-items: baseline; }
        .pain-row:first-child { border-top: 1px solid var(--rule); }
        .pain-num { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.2em; color: var(--clay); padding-top: 4px; }
        .pain-text { font-family: var(--font-fraunces), serif; font-weight: 400; font-size: clamp(19px, 2.2vw, 24px); line-height: 1.4; color: var(--text); }
        .pain-close { font-family: var(--font-fraunces), serif; font-style: italic; font-weight: 400; font-size: clamp(20px, 2.4vw, 28px); line-height: 1.4; color: var(--text); text-align: center; max-width: 760px; margin: 48px auto 0; }
        .pain-close em { color: var(--clay); }

        /* ===== PRICING — one-time ===== */
        .tier-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 80px; }
        @media (min-width: 760px) { .tier-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1080px) { .tier-grid { grid-template-columns: 1fr 1fr 1fr 1fr; gap: 14px; } }
        .tier { position: relative; background: var(--surface); border: 1px solid var(--rule); border-radius: 14px; padding: 32px 24px 28px; display: flex; flex-direction: column; box-shadow: 0 1px 0 rgba(255, 255, 255, 0.6) inset, 0 8px 24px -8px rgba(26, 22, 18, 0.05); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s, border-color 0.2s; }
        .tier:hover { transform: translateY(-3px); border-color: var(--clay); }
        .tier--featured { border-color: var(--clay); transform: scale(1.03); box-shadow: 0 0 0 1px var(--clay-dim), 0 24px 48px -12px rgba(204, 120, 92, 0.18); }
        .tier--featured:hover { transform: scale(1.03) translateY(-3px); }
        .tier-flag { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: var(--clay); color: var(--surface); font-family: var(--font-jbm), monospace; font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; padding: 5px 12px; border-radius: 999px; white-space: nowrap; }
        .tier-num { font-family: var(--font-jbm), monospace; font-size: 10px; letter-spacing: 0.22em; color: var(--text-faint); margin-bottom: 14px; }
        .tier-name { font-family: var(--font-fraunces), serif; font-weight: 600; font-size: 22px; line-height: 1.18; letter-spacing: -0.01em; color: var(--text); margin: 0 0 18px; }
        .tier-price-row { display: flex; align-items: baseline; gap: 10px; margin-bottom: 4px; min-height: 50px; }
        .tier-price { font-family: var(--font-fraunces), serif; font-weight: 300; font-size: clamp(28px, 3vw, 38px); letter-spacing: -0.025em; line-height: 1.1; color: var(--text); }
        .tier-duration { font-family: var(--font-jbm), monospace; font-size: 11px; color: var(--text-mid); letter-spacing: 0.06em; margin-bottom: 22px; }
        .tier-list { list-style: none; margin: 0 0 22px; padding: 0; flex: 1; }
        .tier-list li { font-family: var(--font-plex), sans-serif; font-size: 13px; line-height: 1.5; color: var(--text); padding: 6px 0 6px 22px; position: relative; }
        .tier-list li::before { content: "→"; color: var(--clay); position: absolute; left: 0; top: 6px; font-family: var(--font-jbm), monospace; font-weight: 700; }
        .tier-cta { display: block; text-align: center; padding: 11px; font-family: var(--font-plex), sans-serif; font-weight: 600; font-size: 13px; color: var(--text); border: 1px solid var(--text); border-radius: 999px; text-decoration: none; transition: all 0.2s; }
        .tier-cta:hover { background: var(--text); color: var(--bg); }
        .tier--featured .tier-cta { background: var(--clay); color: var(--surface); border-color: var(--clay); }
        .tier--featured .tier-cta:hover { background: var(--clay-deep); border-color: var(--clay-deep); }
        .tier-guarantee { font-family: var(--font-plex), sans-serif; font-size: 11px; line-height: 1.5; color: var(--text-mid); margin: 0 0 16px; padding: 8px 10px; background: var(--surface-2); border-radius: 6px; border-left: 2px solid var(--clay); }
        .tier-guarantee--ongoing { margin: 4px 0 18px; }
        .tier-notfor { list-style: none; margin: 0 0 12px; padding: 14px 0 0; border-top: 1px dashed var(--rule); }
        .tier-notfor li { font-family: var(--font-plex), sans-serif; font-size: 12px; line-height: 1.5; color: var(--text-mid); padding: 4px 0 4px 16px; position: relative; }
        .tier-notfor li::before { content: "×"; color: var(--text-faint); position: absolute; left: 2px; top: 2px; font-family: var(--font-jbm), monospace; font-weight: 700; font-size: 14px; line-height: 1; }
        .tier-notfor--ongoing { margin-top: 4px; }

        /* ===== CAPACITY LINE ===== */
        .capacity-line { font-family: var(--font-jbm), monospace; font-size: 12px; letter-spacing: 0.08em; color: var(--text-mid); margin: 18px auto 0; max-width: 580px; text-transform: uppercase; }
        .capacity-line strong { color: var(--clay-deep); font-weight: 700; letter-spacing: 0.04em; }

        /* ===== ONGOING — subscription / retainer ===== */
        .ongoing-block { max-width: 980px; margin: 24px auto 0; padding: 48px 0 0; border-top: 1px solid var(--rule); }
        .ongoing-kicker { text-align: center; margin: 0 0 12px; }
        .ongoing-h { font-family: var(--font-fraunces), serif; font-weight: 300; font-size: clamp(24px, 3vw, 36px); line-height: 1.15; letter-spacing: -0.02em; color: var(--text); margin: 0 auto 40px; text-align: center; }
        .ongoing-h em { font-style: italic; font-weight: 600; color: var(--clay); }
        .ongoing-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 760px) { .ongoing-grid { grid-template-columns: 1fr 1fr; } }
        .ongoing-tier { background: var(--surface-2); border: 1px solid var(--rule); border-radius: 14px; padding: 28px; display: flex; flex-direction: column; }
        .ongoing-name { font-family: var(--font-fraunces), serif; font-weight: 600; font-size: 22px; letter-spacing: -0.01em; color: var(--text); margin: 0 0 14px; }
        .ongoing-price-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; }
        .ongoing-price { font-family: var(--font-fraunces), serif; font-weight: 300; font-size: 34px; letter-spacing: -0.025em; line-height: 1; color: var(--text); }
        .ongoing-duration { font-family: var(--font-jbm), monospace; font-size: 11px; color: var(--text-mid); letter-spacing: 0.06em; }
        .ongoing-short { font-family: var(--font-plex), sans-serif; font-size: 14px; line-height: 1.55; color: var(--text-mid); margin: 0 0 18px; }
        .ongoing-list { list-style: none; margin: 0 0 22px; padding: 0; flex: 1; }
        .ongoing-list li { font-family: var(--font-plex), sans-serif; font-size: 13px; line-height: 1.5; color: var(--text); padding: 4px 0 4px 18px; position: relative; }
        .ongoing-list li::before { content: "·"; color: var(--clay); position: absolute; left: 4px; top: 0; font-weight: 700; font-size: 18px; }
        .ongoing-cta { display: inline-flex; align-self: flex-start; padding: 9px 18px; font-family: var(--font-plex), sans-serif; font-weight: 600; font-size: 13px; color: var(--text); border: 1px solid var(--text); border-radius: 999px; text-decoration: none; transition: all 0.2s; }
        .ongoing-cta:hover { background: var(--clay); border-color: var(--clay); color: var(--surface); }

        /* ===== PROOF ===== */
        .proof-list { display: flex; flex-direction: column; }
        .proof-row { display: grid; grid-template-columns: 1fr; gap: 12px; padding: 36px 0; border-bottom: 1px solid var(--rule); align-items: baseline; }
        .proof-row:first-child { border-top: 1px solid var(--rule); }
        @media (min-width: 820px) { .proof-row { grid-template-columns: 320px 1fr; gap: 56px; } }
        .proof-name { font-family: var(--font-fraunces), serif; font-weight: 600; font-size: 28px; line-height: 1.1; letter-spacing: -0.012em; color: var(--text); margin: 0 0 6px; }
        .proof-sub { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.16em; color: var(--text-mid); text-transform: uppercase; margin: 0; }
        .proof-body p { font-family: var(--font-plex), sans-serif; font-size: 16px; line-height: 1.6; color: var(--text); margin: 0 0 14px; }
        .proof-link { font-family: var(--font-jbm), monospace; font-size: 12px; color: var(--clay-deep); text-decoration: none; letter-spacing: 0.04em; border-bottom: 1px dotted var(--clay-deep); padding-bottom: 1px; }
        .proof-link:hover { color: var(--clay); }

        /* ===== MISSION ===== */
        .mission-section { padding-bottom: 64px; }
        .mission-inner { max-width: 760px; margin: 0 auto; text-align: center; padding: 56px 0; }
        .mission-quote { font-family: var(--font-fraunces), serif; font-weight: 400; font-size: clamp(22px, 2.6vw, 32px); line-height: 1.4; color: var(--text); margin: 0 0 36px; text-align: left; }
        .mission-dropcap { font-family: var(--font-fraunces), serif; font-weight: 700; font-style: italic; font-size: 5em; line-height: 0.85; float: left; margin: 0.05em 0.12em -0.04em 0; color: var(--clay); }
        .mission-quote em { font-style: italic; color: var(--clay); font-weight: 600; }
        .mission-sig { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.22em; color: var(--text-mid); text-transform: uppercase; margin: 0 0 36px; }

        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
}

function BuildIcon({ name }: { name: string }) {
  const sx = { width: 22, height: 22, color: "var(--clay)" };
  if (name === "globe") {
    return (
      <svg style={sx} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </svg>
    );
  }
  if (name === "phone") {
    return (
      <svg style={sx} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="6" y="2" width="12" height="20" rx="3" />
        <line x1="11" y1="18.5" x2="13" y2="18.5" />
      </svg>
    );
  }
  if (name === "spark") {
    return (
      <svg style={sx} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M5 19l4-4M15 9l4-4" />
      </svg>
    );
  }
  if (name === "network") {
    return (
      <svg style={sx} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="5" r="2" />
        <circle cx="5" cy="19" r="2" />
        <circle cx="19" cy="19" r="2" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 7v3M11 13l-5 4M13 13l5 4" />
      </svg>
    );
  }
  return null;
}
