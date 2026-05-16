"use client";

// THE WORKSHOP — /story · editorial / magazine
// Sunday Times feature about a working-class hero. For press, journalists,
// peer-curious founders. Mission gate: passes — editorial honesty, peer voice.

import { useEffect, useRef } from "react";
import Link from "next/link";
import { MissionFooter } from "@/components/MissionFooter";

export default function StoryPage() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      if (window.scrollY > 80) heroRef.current.classList.add("scrolled");
      else heroRef.current.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div data-theme="story">
      <div className="masthead">
        <span>The Workshop · vol.001</span>
        <span className="title">A working portrait</span>
        <Link href="/" className="back">← all doors</Link>
      </div>

      <section className="hero-section">
        <div className="hero-card" ref={heroRef}>
          <div className="hero-grid">
            <div>
              <p className="kicker">a feature</p>
              <p className="lede">
                Jason Walls had spent twenty years pulling wire when AI handed him a{" "}
                <em>second tool belt.</em> Ninety-seven days later, his side project had
                Mark Cuban's attention, a piece in the Sunday Times, and 680,000 views.
              </p>
              <div className="meta-row">
                <a className="read-cta" href="#piece">Read the full piece</a>
                <Link className="alt-cta" href="/book">Book the builder</Link>
              </div>
            </div>
            <div className="pull">
              "I honestly don't care how it works. I'm just glad you started a business
              doing it."
              <cite>— Mark Cuban, replying on X · Mar 11 2026</cite>
            </div>
          </div>
        </div>
      </section>

      <section className="timeline" id="piece">
        <p className="tl-h">Chapter one · The arc</p>
        <h2 className="tl-title">
          From <em>"put some respect on my name"</em> to Anthropic's case study, Cuban's
          reply, and Shark Tank — in ninety-seven days.
        </h2>
        <div className="tl-list">
          <Row date="2025 · 12 · 14" tag="day one">First test email to himself: <em>"hello this is jason walls with EV charge Right put some respect on my name."</em></Row>
          <Row date="2025 · 12 · 31" tag="customer one">First paying customer hits a bug. He refunds her, then spends six emails personally walking her through the NEC 220.82 calc. <em>This is who he is.</em></Row>
          <Row date="2026 · 03 · 11" tag="cuban">Mark Cuban reposts the tweet. The cc goes to Mindy Zemrak at Shark Tank.</Row>
          <Row date="2026 · 03 · 12" tag="press">Danny Fortson at the <em>Sunday Times</em> of London asks for a meeting.</Row>
          <Row date="2026 · 03 · 17" tag="three at once">Anthropic reaches out. Shark Tank casting responds. Same day.</Row>
          <Row date="2026 · 03 · 20" tag="45 min build"><em>ZombieWells</em> built in forty-five minutes — a public-interest tool exposing abandoned, contaminated oil wells in Texas.</Row>
          <Row date="2026 · 03 · 22" tag="today">680,000+ views on ChargeRight. Paying customers. Day job: still electrician.</Row>
        </div>
      </section>

      <section className="end">
        <p className="quote">
          "AI handed me the keys to expertise I was priced out of my whole career. The
          least I can do is pay it forward — to the people who couldn't afford it either."
        </p>
        <cite>— from the Mission · CLAUDE.md · May 9 2026</cite>
      </section>

      <MissionFooter activeId="story" />

      <style jsx>{`
        :global([data-theme="story"]) { font-family: var(--font-plex), sans-serif; font-weight: 400; font-size: 17px; line-height: 1.6; }
        .masthead { padding: 32px 48px; border-bottom: 1px solid var(--rule); display: flex; justify-content: space-between; align-items: center; font-family: var(--font-plex), sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.22em; color: var(--text-mid); }
        .masthead .back { color: var(--text); text-decoration: none; border-bottom: 1px solid currentColor; padding-bottom: 1px; }
        .masthead .title { font-family: var(--font-newsreader), serif; font-weight: 800; font-style: italic; font-size: 18px; letter-spacing: -0.01em; text-transform: none; color: var(--text); }
        .hero-section { position: relative; padding: 80px 0 96px; overflow: hidden; }
        .hero-card { max-width: 1240px; margin: 0 auto; background: #1c1a18; color: var(--bg); border-radius: 24px; padding: 96px 64px; transition: max-width 0.6s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.6s cubic-bezier(0.4, 0, 0.2, 1), padding 0.6s ease; position: relative; overflow: hidden; }
        .hero-card.scrolled { max-width: 100%; border-radius: 0; }
        .hero-card::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 80% 20%, rgba(168,92,42,0.18) 0, transparent 60%); pointer-events: none; }
        .hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center; }
        @media (min-width: 900px) { .hero-grid { grid-template-columns: 1.3fr 1fr; gap: 64px; } }
        .kicker { font-family: var(--font-plex), sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.28em; color: var(--copper); font-weight: 600; margin-bottom: 32px; }
        .kicker::before { content: "★ "; }
        .lede { font-family: var(--font-newsreader), serif; font-weight: 300; font-size: clamp(28px, 4vw, 44px); line-height: 1.18; letter-spacing: -0.015em; color: var(--bg); }
        .lede::first-letter { font-family: var(--font-newsreader), serif; font-weight: 800; font-style: italic; font-size: 5.6em; float: left; line-height: 0.85; margin: 0.04em 0.08em -0.04em 0; color: var(--copper); }
        .lede em { font-style: italic; color: var(--copper); }
        .pull { background: #2a2521; padding: 32px 32px 32px 36px; border-left: 3px solid var(--copper); font-family: var(--font-newsreader), serif; font-style: italic; font-weight: 400; font-size: 22px; line-height: 1.4; color: var(--bg); }
        .pull cite { display: block; margin-top: 16px; font-style: normal; font-family: var(--font-plex), sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.22em; color: rgba(255,255,255,0.6); font-weight: 600; }
        .meta-row { display: flex; gap: 28px; margin-top: 48px; flex-wrap: wrap; align-items: center; }
        .meta-row a { font-family: var(--font-plex), sans-serif; font-size: 13px; font-weight: 600; padding: 14px 22px; text-decoration: none; transition: background 0.2s; }
        .read-cta { background: var(--copper); color: var(--bg); }
        .read-cta:hover { background: #c97137; }
        .alt-cta { color: var(--bg); border-bottom: 1px solid var(--bg); padding-bottom: 4px !important; padding-left: 0 !important; padding-right: 0 !important; opacity: 0.85; }
        .timeline { max-width: 1100px; margin: 96px auto; padding: 0 48px; }
        .tl-h { font-family: var(--font-plex), sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.28em; color: var(--text-mid); font-weight: 600; margin-bottom: 16px; }
        .tl-title { font-family: var(--font-newsreader), serif; font-weight: 300; font-size: clamp(32px, 4vw, 56px); letter-spacing: -0.02em; line-height: 1.05; margin-bottom: 56px; max-width: 760px; color: var(--text); }
        .tl-title em { font-style: italic; font-weight: 800; color: var(--copper); }
        .tl-list { display: grid; grid-template-columns: 1fr; gap: 0; border-top: 1px solid var(--rule); }
        .end { padding: 80px 48px; max-width: 760px; margin: 0 auto; text-align: center; }
        .end .quote { font-family: var(--font-newsreader), serif; font-style: italic; font-weight: 300; font-size: clamp(24px, 3vw, 36px); line-height: 1.35; color: var(--text); margin-bottom: 28px; }
        .end cite { font-family: var(--font-plex), sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.28em; color: var(--copper); font-weight: 600; font-style: normal; }
      `}</style>
    </div>
  );
}

function Row({ date, tag, children }: { date: string; tag: string; children: React.ReactNode }) {
  return (
    <div className="tl-row">
      <div className="tl-date">{date}</div>
      <div className="tl-event">{children}</div>
      <div className="tl-tag">{tag}</div>
      <style jsx>{`
        .tl-row { display: grid; grid-template-columns: 140px 1fr 90px; align-items: baseline; padding: 28px 0; border-bottom: 1px solid var(--rule); transition: background 0.3s; }
        .tl-row:hover { background: rgba(168,92,42,0.03); }
        .tl-date { font-family: var(--font-plex), sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; color: var(--text-mid); font-weight: 600; }
        .tl-event { font-family: var(--font-newsreader), serif; font-weight: 400; font-size: 19px; line-height: 1.4; color: var(--text); padding-right: 24px; }
        .tl-event :global(em) { font-style: italic; }
        .tl-tag { font-family: var(--font-plex), sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: var(--copper); text-align: right; font-weight: 600; }
        @media (max-width: 700px) { .tl-row { grid-template-columns: 1fr; gap: 8px; } .tl-tag { text-align: left; } }
      `}</style>
    </div>
  );
}
