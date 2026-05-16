// /templates — the prebuilt shop.
// Catalog of productized solutions (vs custom builds on /). One-time setup fee,
// customer keeps their own NotebookLM / Claude / Sheets subscriptions.
// Mission gate: ✓ widens access · ✓ peer voice. See lib/templates.ts.

import type { Metadata } from "next";
import Link from "next/link";
import { TEMPLATES, TEMPLATE_TRADES } from "@/lib/templates";
import { MissionFooter } from "@/components/MissionFooter";
import { Catalog } from "./Catalog";
import {
  JsonLd,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  productSchema,
  SITE,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Prebuilt solutions · for trades",
  description:
    "Productized AI workflows for the trades. Data cut sheets. Fiber splice maps. Motor wiring walk-throughs. Trade bid checks. One-time setup fee, you keep your own subscriptions.",
  openGraph: {
    title: "Prebuilt solutions · for trades",
    description:
      "Productized AI workflows for the trades. Pay once, take delivery. Your stack, your seat.",
  },
  alternates: { canonical: "/templates" },
};

const HOW_IT_WORKS = [
  {
    num: "01",
    t: "Pick a template",
    body: "Each one is a real workflow I've run on the job, productized so a small shop can own it without hiring a builder.",
  },
  {
    num: "02",
    t: "Pay the setup fee",
    body: "Fixed price. Same as ordering a tool off the shelf — you pay once, you take delivery.",
  },
  {
    num: "03",
    t: "I set it up in your workflow",
    body: "Two to four business days. We wire it into your Google account, your prints, your spec book. You own the keys.",
  },
  {
    num: "04",
    t: "You keep the subscriptions",
    body: "NotebookLM, Claude — you pay those direct. I don't mark up vendors. Your stack, your seat.",
  },
];

const FAQS = [
  {
    q: "What if my job doesn't fit the template exactly?",
    a: "Templates are starting points, not handcuffs. Setup includes tuning to your trade's specifics — your tube colors, your spec book, your gotchas. If you need something fully bespoke, that's a Custom Build (see pricing on the home page).",
  },
  {
    q: "Why do I have to keep paying NotebookLM or Claude?",
    a: "Because that's where the AI actually runs. I don't host your data behind a wall and rent it back. You pay Google or Anthropic direct, you own your notebook, you own your account. If I'm not in the picture anymore, your tools still run.",
  },
  {
    q: "Can I get a refund?",
    a: "Before setup starts: yes, full refund. After setup starts: you keep the deliverables and any further work is pro-rated. The point is you see value before anything locks in.",
  },
  {
    q: "Do you offer ongoing support after setup?",
    a: "Yes — the Tool + Tune-up tier ($299/mo on the home page) covers monitoring and one hour of tweaks every month on anything I built for you. Or pay per ask, no retainer required.",
  },
  {
    q: "Why so much cheaper than a custom build?",
    a: "Because I already built it. The hard work — figuring out the prompts, the templates, the data shape — is done. You're paying for setup in your environment plus tuning, not for me to invent something from scratch.",
  },
];

export default function TemplatesPage() {
  return (
    <div data-theme="home">
      <JsonLd
        data={[
          articleSchema({
            headline: "Prebuilt solutions for trades — productized AI workflows",
            description: metadata.description as string,
            url: SITE.url + "/templates",
            datePublished: "2026-05-14",
            dateModified: "2026-05-14",
          }),
          breadcrumbSchema([
            { name: "Home", url: SITE.url },
            { name: "Templates", url: SITE.url + "/templates" },
          ]),
          faqSchema(FAQS),
          ...TEMPLATES.map((t) =>
            productSchema({
              name: t.name,
              description: t.short,
              priceNum: t.priceNum,
              url: SITE.url + "/templates/" + t.slug,
              category: t.tradeLabel,
            }),
          ),
        ]}
      />

      <nav className="t-nav">
        <div className="t-nav-inner">
          <Link href="/" className="t-mark">
            <span className="t-mark-name">Jason Walls</span>
            <span className="t-mark-sub">
              Master Electrician · builds with Claude
            </span>
          </Link>
          <div className="t-nav-right">
            <Link href="/#what-i-build" className="t-nav-link">
              Custom work
            </Link>
            <Link href="/templates" className="t-nav-link t-nav-link--active">
              Templates
            </Link>
            <Link href="/book?tier=strategy-hour" className="t-nav-cta">
              Book a call
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="t-hero">
          <p className="t-kicker">
            <span className="t-kicker-dot" /> Prebuilt · for tradespeople ·
            shipped, not promised
          </p>
          <h1 className="t-display">
            Pay once. <em>Take delivery.</em>
          </h1>
          <p className="t-lede">
            Productized AI workflows I've already built — for data, fiber,
            electrical, and the sales people who answer for them. Drop your
            prints in, get the spreadsheets, splice maps, and walk-throughs
            you wish the vendor had handed you. Fixed setup fee. You keep your
            own NotebookLM and Claude accounts.
          </p>
          <div className="t-cta-row">
            <a href="#catalog" className="t-cta">
              See the catalog ↓
            </a>
            <Link href="/#pricing" className="t-cta-secondary">
              Need something custom? →
            </Link>
          </div>
        </section>

        <section className="t-section t-how" id="how">
          <div className="t-section-head">
            <p className="t-section-kicker">— How it works</p>
            <h2 className="t-display-2">
              Off the shelf,<br />
              <em>onto the truck.</em>
            </h2>
          </div>
          <div className="t-how-grid">
            {HOW_IT_WORKS.map((h) => (
              <article key={h.num} className="t-how-card">
                <span className="t-how-num">{h.num}</span>
                <h3 className="t-how-t">{h.t}</h3>
                <p className="t-how-body">{h.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="t-section t-catalog" id="catalog">
          <div className="t-section-head">
            <p className="t-section-kicker">— The shop</p>
            <h2 className="t-display-2">
              Real tools,<br />
              <em>for real work.</em>
            </h2>
            <p className="t-section-sub">
              Grouped by trade. Pick the one closest to what's bleeding you
              most — that's the one I'll set up first.
            </p>
          </div>

          <Catalog templates={TEMPLATES} trades={TEMPLATE_TRADES} />
        </section>

        <section className="t-section t-faq" id="faq">
          <div className="t-section-head">
            <p className="t-section-kicker">— Asked & answered</p>
            <h2 className="t-display-2">
              The honest <em>questions.</em>
            </h2>
          </div>
          <div className="t-faq-list">
            {FAQS.map((f, i) => (
              <details key={i} className="t-faq-item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="t-section t-close">
          <div className="t-close-inner">
            <p className="t-close-q">
              <em>Don't see it?</em> If there's a workflow your trade keeps
              losing time on, tell me — odds are I've seen the same one. The
              Strategy Hour is the cheapest way to find out whether a template
              already exists or one needs to be built.
            </p>
            <Link
              href="/book?tier=strategy-hour"
              className="t-cta t-cta-clay"
            >
              Book a Strategy Hour <span className="t-cta-meta">$300</span>
            </Link>
          </div>
        </section>
      </main>

      <MissionFooter activeId="templates" />

      <style>{`
        [data-theme="home"] .t-nav { position: sticky; top: 0; z-index: 50; background: rgba(248, 244, 237, 0.85); backdrop-filter: saturate(180%) blur(20px); -webkit-backdrop-filter: saturate(180%) blur(20px); border-bottom: 1px solid var(--rule); }
        [data-theme="home"] .t-nav-inner { max-width: 1280px; margin: 0 auto; padding: 18px 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
        [data-theme="home"] .t-mark { display: flex; flex-direction: column; line-height: 1; text-decoration: none; color: inherit; gap: 4px; }
        [data-theme="home"] .t-mark-name { font-family: var(--font-fraunces), serif; font-weight: 600; font-size: 18px; letter-spacing: -0.01em; color: var(--text); }
        [data-theme="home"] .t-mark-sub { font-family: var(--font-jbm), monospace; font-size: 10px; letter-spacing: 0.18em; color: var(--text-faint); text-transform: uppercase; }
        [data-theme="home"] .t-nav-right { display: flex; align-items: center; gap: 28px; }
        [data-theme="home"] .t-nav-link { font-family: var(--font-plex), sans-serif; font-size: 13px; font-weight: 500; color: var(--text-mid); text-decoration: none; transition: color 0.2s; }
        [data-theme="home"] .t-nav-link:hover { color: var(--text); }
        [data-theme="home"] .t-nav-link--active { color: var(--clay); }
        [data-theme="home"] .t-nav-cta { font-family: var(--font-plex), sans-serif; font-size: 13px; font-weight: 600; padding: 9px 18px; background: var(--text); color: var(--bg); border-radius: 999px; text-decoration: none; transition: background 0.2s, transform 0.2s; }
        [data-theme="home"] .t-nav-cta:hover { background: var(--clay); transform: translateY(-1px); }
        @media (max-width: 760px) {
          [data-theme="home"] .t-nav-right { gap: 14px; }
          [data-theme="home"] .t-mark-sub { display: none; }
        }

        [data-theme="home"] .t-hero { max-width: 1000px; margin: 0 auto; padding: 96px 32px 56px; text-align: center; }
        [data-theme="home"] .t-kicker { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.22em; color: var(--clay); text-transform: uppercase; margin: 0 0 28px; display: inline-flex; align-items: center; gap: 10px; }
        [data-theme="home"] .t-kicker-dot { width: 6px; height: 6px; border-radius: 999px; background: var(--clay); display: inline-block; }
        [data-theme="home"] .t-display { font-family: var(--font-fraunces), serif; font-weight: 300; font-size: clamp(44px, 6.5vw, 84px); line-height: 1.02; letter-spacing: -0.032em; color: var(--text); margin: 0 auto 32px; max-width: 14ch; font-variation-settings: "SOFT" 30; }
        [data-theme="home"] .t-display em { font-style: italic; font-weight: 600; color: var(--clay); }
        [data-theme="home"] .t-lede { font-family: var(--font-plex), sans-serif; font-size: 18px; line-height: 1.6; color: var(--text-mid); max-width: 680px; margin: 0 auto 36px; }
        [data-theme="home"] .t-cta-row { display: flex; justify-content: center; align-items: center; gap: 24px; flex-wrap: wrap; }
        [data-theme="home"] .t-cta { display: inline-flex; align-items: baseline; gap: 12px; padding: 15px 26px; background: var(--text); color: var(--bg); text-decoration: none; border-radius: 999px; font-family: var(--font-plex), sans-serif; font-weight: 600; font-size: 14px; transition: background 0.2s, transform 0.2s; }
        [data-theme="home"] .t-cta:hover { background: var(--clay); transform: translateY(-1px); }
        [data-theme="home"] .t-cta-meta { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.06em; opacity: 0.7; font-weight: 400; }
        [data-theme="home"] .t-cta-secondary { font-family: var(--font-plex), sans-serif; font-weight: 500; font-size: 14px; color: var(--text); text-decoration: none; padding-bottom: 2px; border-bottom: 1px solid currentColor; transition: color 0.2s; }
        [data-theme="home"] .t-cta-secondary:hover { color: var(--clay); }
        [data-theme="home"] .t-cta-clay { background: var(--clay); }
        [data-theme="home"] .t-cta-clay:hover { background: var(--clay-deep); }

        [data-theme="home"] .t-section { max-width: 1100px; margin: 0 auto; padding: 96px 32px; }
        [data-theme="home"] .t-section-head { max-width: 760px; margin: 0 auto 56px; text-align: center; }
        [data-theme="home"] .t-section-kicker { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.22em; color: var(--clay); text-transform: uppercase; margin: 0 0 18px; }
        [data-theme="home"] .t-display-2 { font-family: var(--font-fraunces), serif; font-weight: 300; font-size: clamp(34px, 5vw, 60px); line-height: 1.02; letter-spacing: -0.025em; color: var(--text); margin: 0; font-variation-settings: "SOFT" 30; }
        [data-theme="home"] .t-display-2 em { font-style: italic; font-weight: 600; color: var(--clay); }
        [data-theme="home"] .t-section-sub { font-family: var(--font-plex), sans-serif; font-size: 17px; line-height: 1.55; color: var(--text-mid); margin: 22px auto 0; max-width: 580px; }

        [data-theme="home"] .t-how-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 760px) { [data-theme="home"] .t-how-grid { grid-template-columns: 1fr 1fr; gap: 22px; } }
        @media (min-width: 1080px) { [data-theme="home"] .t-how-grid { grid-template-columns: repeat(4, 1fr); gap: 14px; } }
        [data-theme="home"] .t-how-card { background: var(--surface); border: 1px solid var(--rule); border-radius: 14px; padding: 28px 24px; box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset, 0 8px 24px -10px rgba(26,22,18,0.06); }
        [data-theme="home"] .t-how-num { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.22em; color: var(--clay); display: block; margin-bottom: 14px; }
        [data-theme="home"] .t-how-t { font-family: var(--font-fraunces), serif; font-weight: 600; font-size: 19px; line-height: 1.2; letter-spacing: -0.01em; color: var(--text); margin: 0 0 12px; }
        [data-theme="home"] .t-how-body { font-family: var(--font-plex), sans-serif; font-size: 14px; line-height: 1.6; color: var(--text-mid); margin: 0; }

        [data-theme="home"] .t-trade-group { margin-bottom: 64px; }
        [data-theme="home"] .t-trade-group:last-child { margin-bottom: 0; }
        [data-theme="home"] .t-trade-h { margin: 0 0 22px; padding: 0 0 14px; border-bottom: 1px solid var(--rule); }
        [data-theme="home"] .t-trade-tag { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.2em; color: var(--text-mid); text-transform: uppercase; }
        [data-theme="home"] .t-card-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 720px) { [data-theme="home"] .t-card-grid { grid-template-columns: 1fr 1fr; } }
        [data-theme="home"] .t-card { position: relative; background: var(--surface); border: 1px solid var(--rule); border-radius: 14px; padding: 26px 24px 22px; display: flex; flex-direction: column; text-decoration: none; color: inherit; box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset, 0 8px 24px -10px rgba(26,22,18,0.05); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s, border-color 0.2s; }
        [data-theme="home"] .t-card:hover { transform: translateY(-3px); border-color: var(--clay); box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset, 0 24px 48px -12px rgba(26,22,18,0.12); }
        [data-theme="home"] .t-card--featured { border-color: var(--clay); }
        [data-theme="home"] .t-card-flag { position: absolute; top: -10px; left: 22px; background: var(--clay); color: var(--surface); font-family: var(--font-jbm), monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; padding: 5px 10px; border-radius: 999px; }
        [data-theme="home"] .t-card-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-bottom: 14px; }
        [data-theme="home"] .t-card-trade { font-family: var(--font-jbm), monospace; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-faint); }
        [data-theme="home"] .t-card-price { font-family: var(--font-fraunces), serif; font-weight: 300; font-size: 26px; line-height: 1; color: var(--text); letter-spacing: -0.02em; }
        [data-theme="home"] .t-card-name { font-family: var(--font-fraunces), serif; font-weight: 600; font-size: 22px; line-height: 1.2; letter-spacing: -0.012em; color: var(--text); margin: 0 0 12px; }
        [data-theme="home"] .t-card-short { font-family: var(--font-plex), sans-serif; font-size: 14px; line-height: 1.55; color: var(--text-mid); margin: 0 0 18px; flex: 1; }
        [data-theme="home"] .t-card-foot { display: flex; justify-content: space-between; align-items: baseline; padding-top: 14px; border-top: 1px solid var(--rule-soft); }
        [data-theme="home"] .t-card-setup { font-family: var(--font-jbm), monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-faint); }
        [data-theme="home"] .t-card-arrow { font-family: var(--font-plex), sans-serif; font-size: 12px; font-weight: 600; color: var(--clay-deep); }

        /* ===== FILTER TABS ===== */
        [data-theme="home"] .t-filter-tabs { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; max-width: 980px; margin: 0 auto 48px; padding: 0 4px; }
        [data-theme="home"] .t-filter-tab { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-mid); background: transparent; border: 1px solid var(--rule); border-radius: 999px; padding: 9px 16px; cursor: pointer; transition: all 0.18s; }
        [data-theme="home"] .t-filter-tab:hover { color: var(--text); border-color: var(--text-mid); }
        [data-theme="home"] .t-filter-tab--active { background: var(--text); color: var(--bg); border-color: var(--text); }
        [data-theme="home"] .t-filter-tab--active:hover { color: var(--bg); border-color: var(--text); }

        /* ===== ROI SLOT ===== */
        [data-theme="home"] .t-card-roi { font-family: var(--font-plex), sans-serif; font-size: 12px; line-height: 1.5; color: var(--text-mid); margin: 0 0 16px; padding: 8px 12px; background: var(--surface-2); border-radius: 6px; border-left: 2px solid var(--clay); }
        [data-theme="home"] .t-card-roi span { color: var(--text); font-weight: 600; }
        [data-theme="home"] .t-card-roi--todo { color: var(--text-faint); font-style: italic; }
        [data-theme="home"] .t-card-roi--todo span { color: var(--text-faint); font-weight: 400; font-family: var(--font-jbm), monospace; font-size: 11px; }

        [data-theme="home"] .t-faq-list { max-width: 760px; margin: 0 auto; }
        [data-theme="home"] .t-faq-item { border-top: 1px solid var(--rule); padding: 22px 0; }
        [data-theme="home"] .t-faq-item:last-of-type { border-bottom: 1px solid var(--rule); }
        [data-theme="home"] .t-faq-item summary { font-family: var(--font-fraunces), serif; font-weight: 600; font-size: 19px; line-height: 1.35; cursor: pointer; list-style: none; color: var(--text); }
        [data-theme="home"] .t-faq-item summary::after { content: " +"; color: var(--clay); }
        [data-theme="home"] .t-faq-item[open] summary::after { content: " −"; }
        [data-theme="home"] .t-faq-item p { font-family: var(--font-plex), sans-serif; font-size: 15px; line-height: 1.6; color: var(--text-mid); margin: 12px 0 0; }

        [data-theme="home"] .t-close { max-width: 880px; margin: 0 auto; padding: 64px 32px 96px; text-align: center; }
        [data-theme="home"] .t-close-inner { background: var(--surface); border: 1px solid var(--rule); border-radius: 14px; padding: 48px 36px; box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset, 0 12px 32px -12px rgba(26,22,18,0.08); }
        [data-theme="home"] .t-close-q { font-family: var(--font-fraunces), serif; font-weight: 400; font-size: clamp(20px, 2.4vw, 26px); line-height: 1.45; color: var(--text); margin: 0 0 28px; }
        [data-theme="home"] .t-close-q em { font-style: italic; color: var(--clay); font-weight: 600; }
      `}</style>
    </div>
  );
}
