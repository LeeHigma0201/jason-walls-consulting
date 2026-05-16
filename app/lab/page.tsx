"use client";

// THE LAB — canonical / · industrial / utilitarian
// Industrial / utilitarian aesthetic. Mono headlines. Status bar live.
// 3D-perspective demo panel. On-page pricing tiers. Mission gate: passes —
// $300 entry tier (≈ one billable electrician hour) widens access.

import { useEffect, useState } from "react";
import Link from "next/link";
import { ONE_TIME_OFFERS } from "@/lib/offers";
import { MissionFooter } from "@/components/MissionFooter";

const TAGLINES = [
  "I'm a working IBEW Master Electrician using Claude as a second tool belt.",
  "I build things in days that would take an agency a month — and I charge for the build, not the build time.",
  "ChargeRight: 680K views, paying users, shipped in 97 days. Same hands. Now yours.",
];

export default function LabHome() {
  const [tagline, setTagline] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTagline(TAGLINES[0]);
      return;
    }
    let cancelled = false;
    let li = 0;
    let ci = 0;
    const tick = () => {
      if (cancelled || li >= TAGLINES.length) return;
      ci++;
      setTagline(TAGLINES[li].slice(0, ci));
      if (ci >= TAGLINES[li].length) {
        ci = 0;
        li++;
        if (li < TAGLINES.length) setTimeout(tick, 1400);
      } else {
        setTimeout(tick, 22 + Math.random() * 30);
      }
    };
    setTimeout(tick, 600);
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div data-theme="lab" style={{ position: "relative", zIndex: 1 }}>
      <main style={{ position: "relative", zIndex: 1 }}>
        {/* STATUS BAR */}
        <div className="status-bar">
          <span><span className="dot" /><span className="accent">on the wire</span></span>
          <span>availability: <span className="accent">2 slots open</span></span>
          <span>response time: <span className="accent">&lt; 4 hrs</span></span>
          <span>last shipped: <span className="accent">2026-05-08</span></span>
        </div>

        {/* HERO */}
        <section className="hero">
          <div>
            <p className="kicker">// jason walls · ibew local 369 · ai builder</p>
            <h1 className="h-title">
              Watch me<br />build. <b>Pay by<br />the job.</b>
            </h1>
            <p className="h-tagline" aria-live="polite">{tagline || " "}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href="/book">
                Book a Strategy Hour <span className="arr">→</span>
              </Link>
              <a className="btn btn-ghost" href="#offers">
                See the work <span className="arr">→</span>
              </a>
            </div>
          </div>

          <div className="demo" aria-hidden="true">
            <div className="demo-bar">
              <span className="td r" /><span className="td y" /><span className="td g" />
              <span className="file">~/jason-walls-consulting · live</span>
            </div>
            <div className="demo-body">
              <div><span className="gut">01</span><span className="com">// 4 weeks of work, in 4 days. ← real client.</span></div>
              <div><span className="gut">02</span><span className="kw">async function</span> <span className="str">build</span>(brief) {"{"}</div>
              <div><span className="gut">03</span>&nbsp;&nbsp;<span className="kw">const</span> spec = <span className="kw">await</span> Claude.spec(brief)</div>
              <div><span className="gut">04</span>&nbsp;&nbsp;<span className="kw">const</span> code = <span className="kw">await</span> Claude.write(spec)</div>
              <div><span className="gut">05</span>&nbsp;&nbsp;<span className="kw">const</span> live = <span className="kw">await</span> deploy(code)</div>
              <div><span className="gut">06</span>&nbsp;&nbsp;<span className="kw">return</span> live <span className="com">// usually friday</span></div>
              <div><span className="gut">07</span>{"}"}</div>
              <div className="out">→ shipped · 47 min · client paid $5,000 (fixed) · time saved: ~3 weeks</div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="pricing" id="offers">
          <p className="kicker">// offers · electrician's pricing</p>
          <h2 className="p-title">
            You don't pay your electrician by the minute.{" "}
            <b>Don't pay your AI builder that way either.</b>
          </h2>
          <p className="p-sub">Fixed scope, fixed price, fixed delivery date. The hours are mine. The receipt is yours.</p>

          <div className="tier-grid">
            {ONE_TIME_OFFERS.map((o, i) => (
              <div key={o.id} className={"tier" + (o.featured ? " featured" : "")}>
                <div className="badge">
                  {o.featured ? "★ tier 0" + (i + 1) + " · most picked" : "tier 0" + (i + 1)}
                </div>
                <div className="tier-name">{o.name}</div>
                <div className="tier-price">{o.priceLabel}</div>
                <div className="tier-duration">{o.duration}</div>
                <ul>
                  {o.whatYouGet.map((line, j) => (
                    <li key={j}>{line}</li>
                  ))}
                </ul>
                <Link className="book" href={o.bookHref}>
                  {o.featured ? "Book the build" : o.id === "strategy-hour" ? "Book now" : "Get started"}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <MissionFooter activeId="lab" />

      <style jsx>{`
        .status-bar {
          display: flex; gap: 20px; padding: 14px 32px;
          border-bottom: 1px solid var(--rule);
          font-family: var(--font-jbm), monospace;
          font-size: 11px; color: var(--text-mid); flex-wrap: wrap; align-items: center;
        }
        .dot {
          display: inline-block; width: 6px; height: 6px; border-radius: 50%;
          background: var(--signal); margin-right: 8px; vertical-align: middle;
          box-shadow: 0 0 8px var(--signal); animation: pulse 2s infinite;
        }
        .accent { color: var(--text); }

        .hero {
          padding: 80px 32px; max-width: 1280px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center;
        }
        @media (min-width: 980px) { .hero { grid-template-columns: 1fr 1fr; gap: 80px; } }

        .kicker { font-family: var(--font-jbm), monospace; font-size: 11px; color: var(--signal); margin-bottom: 28px; letter-spacing: 0.16em; }
        .h-title { font-family: var(--font-jbm), monospace; font-weight: 200; font-size: clamp(36px, 4.5vw, 60px); letter-spacing: -0.02em; line-height: 1.05; color: var(--text); margin-bottom: 28px; }
        .h-title b { font-weight: 700; color: var(--signal); }
        .h-tagline { font-family: var(--font-plex), sans-serif; font-weight: 300; font-size: 19px; line-height: 1.5; color: var(--text-mid); max-width: 480px; min-height: 60px; margin-bottom: 36px; }
        .h-tagline::after { content: "▍"; color: var(--signal); animation: blink 0.8s steps(1) infinite; margin-left: 2px; }

        .cta-row { display: flex; gap: 14px; flex-wrap: wrap; }
        .btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 22px; font-family: var(--font-jbm), monospace;
          font-size: 13px; font-weight: 500; text-decoration: none;
          transition: all 0.2s; cursor: pointer; border: 1px solid transparent;
        }
        .btn-primary { background: var(--signal); color: var(--bg); }
        .btn-primary:hover { background: #4dffa0; }
        .btn-ghost { background: transparent; color: var(--text); border-color: var(--rule); }
        .btn-ghost:hover { border-color: var(--signal); color: var(--signal); }
        .arr { transition: transform 0.2s; }
        .btn:hover .arr { transform: translateX(4px); }

        .demo {
          background: var(--surface); border: 1px solid var(--rule);
          border-radius: 8px; overflow: hidden;
          box-shadow: 0 24px 48px rgba(0,0,0,0.5);
          transform: perspective(1200px) rotateY(-3deg) rotateX(2deg);
        }
        .demo-bar { display: flex; align-items: center; gap: 8px; padding: 12px 16px; border-bottom: 1px solid var(--rule); background: var(--surface-2); }
        .td { width: 11px; height: 11px; border-radius: 50%; }
        .td.r { background: #ff5f56; }
        .td.y { background: var(--amber); }
        .td.g { background: var(--signal); }
        .file { margin-left: 12px; font-family: var(--font-jbm), monospace; font-size: 11px; color: var(--text-mid); }
        .demo-body { padding: 28px 24px; font-family: var(--font-jbm), monospace; font-size: 13px; line-height: 1.7; color: var(--text); }
        .demo-body .gut { color: var(--text-mid); margin-right: 16px; user-select: none; }
        .demo-body .kw { color: var(--amber); }
        .demo-body .str { color: var(--signal); }
        .demo-body .com { color: var(--text-mid); }
        .demo-body .out { color: var(--signal); padding: 6px 0 6px 12px; border-left: 2px solid var(--signal); margin-top: 16px; }

        .pricing { padding: 96px 32px; max-width: 1280px; margin: 0 auto; }
        .p-title { font-family: var(--font-jbm), monospace; font-weight: 200; font-size: clamp(28px, 3.5vw, 44px); letter-spacing: -0.02em; line-height: 1.1; max-width: 720px; margin-top: 16px; margin-bottom: 14px; color: var(--text); }
        .p-title b { font-weight: 700; }
        .p-sub { font-family: var(--font-plex), sans-serif; font-size: 17px; color: var(--text-mid); max-width: 640px; margin-bottom: 56px; }

        .tier-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 760px) { .tier-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1080px) { .tier-grid { grid-template-columns: 1fr 1fr 1fr 1fr; } }

        .tier { background: var(--surface); border: 1px solid var(--rule); padding: 28px; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; }
        .tier:hover { transform: translateY(-4px); border-color: var(--signal); }
        .tier.featured { border-color: var(--signal); box-shadow: 0 0 0 1px var(--signal-dim), 0 12px 32px rgba(57,255,106,0.06); transform: scale(1.02); }
        .tier.featured:hover { transform: scale(1.02) translateY(-4px); }
        .badge { font-family: var(--font-jbm), monospace; font-size: 9px; text-transform: uppercase; letter-spacing: 0.22em; color: var(--signal); margin-bottom: 16px; }
        .tier-name { font-family: var(--font-jbm), monospace; font-weight: 700; font-size: 18px; color: var(--text); margin-bottom: 8px; line-height: 1.2; }
        .tier-price { font-family: var(--font-jbm), monospace; font-weight: 200; font-size: 36px; color: var(--text); margin-bottom: 4px; letter-spacing: -0.02em; }
        .tier-duration { font-family: var(--font-jbm), monospace; font-size: 11px; color: var(--text-mid); margin-bottom: 24px; letter-spacing: 0.06em; }
        .tier ul { list-style: none; margin: 0 0 24px; padding: 0; flex: 1; }
        .tier li { font-family: var(--font-plex), sans-serif; font-size: 13px; color: var(--text); padding: 6px 0 6px 22px; position: relative; line-height: 1.45; }
        .tier li::before { content: "✓"; color: var(--signal); position: absolute; left: 0; top: 6px; font-family: var(--font-jbm), monospace; }
        .book { display: block; text-align: center; padding: 12px; font-family: var(--font-jbm), monospace; font-size: 12px; color: var(--text); border: 1px solid var(--rule); text-decoration: none; transition: all 0.2s; }
        .book:hover { border-color: var(--signal); color: var(--signal); }
        .tier.featured .book { background: var(--signal); color: var(--bg); border-color: var(--signal); }
      `}</style>
    </div>
  );
}
