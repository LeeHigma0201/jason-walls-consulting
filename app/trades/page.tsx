// THE RECEIPTS — /trades · editorial / utilitarian
// For SMB owners, trades, anyone priced out of agencies. The tradesperson's invoice,
// beautifully typeset. Mission gate: passes — receipts are the universal honest doc.

import type { Metadata } from "next";
import Link from "next/link";
import { MissionFooter } from "@/components/MissionFooter";
import {
  JsonLd,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  SITE,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "The Receipts · for trades & small business",
  description:
    "An IBEW Master Electrician building AI tools for small business. Fixed-fee, fast turnaround. Pay for the build, not the build time.",
  openGraph: {
    title: "The Receipts · for trades & small business",
    description:
      "Pay for the build, not the build time. Fixed-fee AI builds for the rest of us.",
  },
  alternates: { canonical: "/trades" },
};

const FAQS = [
  {
    q: "Why fixed-fee instead of hourly?",
    a: "You don't pay your electrician by the minute. The value is the speed, not the time. If something that takes an agency four weeks takes me four days, that mastery is what you're paying for — same way a master tradesperson gets paid for what they know.",
  },
  {
    q: "Can a small business afford this?",
    a: "The Strategy Hour is $300 — about one billable electrician hour. Most clients start there to test the waters. Workflow in a Week is $1,500. The full Custom AI Tool tier is $5,000, where most agencies quote $25,000+ for the same scope.",
  },
  {
    q: "What's actually delivered?",
    a: "Working software, not slides. Every fixed-fee tier ships you code, docs, and a walk-through video so you can keep going on your own. No retainer, no recurring fees, no agency lock-in.",
  },
  {
    q: "Are you a real electrician?",
    a: "IBEW Local 369 Master Electrician. Still working the trade. ChargeRight (680K+ views) is the AI side project that grew up. AI didn't replace the wire-pulling — it added a second tool belt.",
  },
];

export default function TradesPage() {
  return (
    <div data-theme="trades">
      <JsonLd
        data={[
          articleSchema({
            headline: "The Receipts — Fixed-fee AI builds for trades & small business",
            description: metadata.description as string,
            url: SITE.url + "/trades",
            datePublished: "2026-05-09",
            dateModified: "2026-05-09",
          }),
          breadcrumbSchema([
            { name: "Home", url: SITE.url },
            { name: "Trades", url: SITE.url + "/trades" },
          ]),
          faqSchema(FAQS),
        ]}
      />
      <div className="top">
        <span>j. walls · ibew local 369 · master electrician</span>
        <Link href="/" className="back">← all doors</Link>
      </div>
      <main className="wrap">
        <p className="lede">— v1 · the receipts</p>
        <div className="invoice-grid">
          <div>
            <h1 className="h1">
              Pay for the <em>build</em>,<br />not the build time.
            </h1>
            <p className="sub">
              I'm a working IBEW Master Electrician using Claude as a second tool belt.
              You don't pay your electrician by the minute. Don't pay your AI builder
              that way either.
            </p>
            <div className="cta-row">
              <Link className="stamp" href="/book?tier=strategy-hour">
                Book a Strategy Hour · $300
              </Link>
              <a className="stamp alt" href="#work">See the receipts ↓</a>
            </div>
          </div>

          <aside className="receipt" aria-label="Itemized receipt of work">
            <div className="receipt-head">
              <div className="from">
                <b>Jason Walls</b>Master Electrician<br />+ AI Builder
              </div>
              <div className="num">
                Invoice<b>JW-2026-001</b>97 days · Dec 14 → Mar 22
              </div>
            </div>
            <Line item="ChargeRight · launched & live" sub="evchargeright.com — paying customers" qty="680,000+" />
            <Line item="Days from idea to paying users" sub="working a day job through all of it" qty="97" />
            <Line item="ZombieWells · public-interest tool" sub="built start to deployed" qty="45 min" />
            <Line item="Lines of code I wrote myself" sub="I described it. Claude built it." qty="0" />
            <Line item="Press, on the record" sub="Anthropic case study · Sunday Times · Cuban repost" qty="3" />
            <Line item="Hourly rates billed for the above" sub="fixed-fee builds, not by the clock" qty="$0" />
            <div className="total">
              <div className="label">Status</div>
              <div className="amt">Receipts → real</div>
            </div>
            <span className="stamp-mark">paid in full · verified</span>
          </aside>
        </div>

        <section className="proof" id="work">
          <p className="proof-h">work orders · last 90 days</p>
          <div className="work-grid">
            <Work date="2026 · 03 · 22" body={<>"CarFax for EVs" — <em>ChargeRight</em> reaches 680K views, paying customers, panel-load NEC calculator running in production.</>} took="→ shipped solo, day-job intact" />
            <Work date="2026 · 03 · 20" body={<><em>ZombieWells</em> built in 45 minutes — a public-interest tool exposing abandoned, contaminated oil wells in Texas.</>} took="→ partner: attorney Sarah Stogner" />
            <Work date="2026 · 03 · 11" body={<>Mark Cuban reposts ChargeRight: <em>"I'm just glad you started a business doing it."</em></>} took="→ inbound exploded the same day" />
          </div>
        </section>

        <section className="faq">
          <p className="proof-h">questions, asked & answered</p>
          {FAQS.map((f, i) => (
            <details key={i}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>
      </main>
      <MissionFooter activeId="trades" />

      <style>{`
        [data-theme="trades"] {
          font-family: var(--font-fraunces), serif;
          font-weight: 300;
          font-size: 18px;
          line-height: 1.55;
        }
        [data-theme="trades"] .top { padding: 28px 40px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--rule); font-family: var(--font-jbm), monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: var(--text-mid); }
        [data-theme="trades"] .top .back { color: var(--text); text-decoration: none; border-bottom: 1px solid var(--text); padding-bottom: 1px; }
        [data-theme="trades"] .wrap { max-width: 1180px; margin: 0 auto; padding: 96px 40px 64px; }
        [data-theme="trades"] .lede { font-family: var(--font-jbm), monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.22em; color: var(--text-mid); margin-bottom: 32px; }
        [data-theme="trades"] .invoice-grid { display: grid; grid-template-columns: 1fr; gap: 64px; align-items: start; }
        @media (min-width: 980px) { [data-theme="trades"] .invoice-grid { grid-template-columns: 1.2fr 1fr; gap: 96px; } }
        [data-theme="trades"] .h1 { font-family: var(--font-fraunces), serif; font-weight: 300; font-size: clamp(36px, 5.5vw, 68px); line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 32px; }
        [data-theme="trades"] .h1 em { font-style: italic; font-weight: 700; }
        [data-theme="trades"] .sub { font-family: var(--font-fraunces), serif; font-size: 20px; line-height: 1.55; color: var(--text-mid); max-width: 540px; margin-bottom: 48px; }
        [data-theme="trades"] .cta-row { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }
        [data-theme="trades"] .stamp { display: inline-block; font-family: var(--font-jbm), monospace; font-weight: 700; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; padding: 14px 22px; background: var(--text); color: var(--bg); border: 1px solid var(--text); cursor: pointer; transition: all 0.2s; text-decoration: none; }
        [data-theme="trades"] .stamp:hover { background: var(--stamp); color: var(--text); border-color: var(--stamp); }
        [data-theme="trades"] .stamp.alt { background: transparent; color: var(--text); }
        [data-theme="trades"] .receipt { background: var(--surface); border: 1px solid var(--rule); padding: 36px 40px; box-shadow: 0 1px 0 rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.04); }
        [data-theme="trades"] .receipt-head { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 24px; margin-bottom: 24px; border-bottom: 1px solid var(--rule); }
        [data-theme="trades"] .receipt-head .from { font-family: var(--font-jbm), monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: var(--text-mid); line-height: 1.7; }
        [data-theme="trades"] .receipt-head .from b { display: block; color: var(--text); font-weight: 700; font-size: 14px; letter-spacing: 0.06em; margin-bottom: 4px; }
        [data-theme="trades"] .receipt-head .num { font-family: var(--font-jbm), monospace; font-size: 11px; text-align: right; color: var(--text-mid); line-height: 1.7; text-transform: uppercase; letter-spacing: 0.14em; }
        [data-theme="trades"] .receipt-head .num b { display: block; color: var(--text); font-weight: 700; font-size: 14px; }
        [data-theme="trades"] .line { display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: baseline; padding: 14px 0; border-bottom: 1px dotted var(--rule); }
        [data-theme="trades"] .line .item { font-family: var(--font-fraunces), serif; font-weight: 400; font-size: 17px; }
        [data-theme="trades"] .line .item small { display: block; font-family: var(--font-jbm), monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--text-mid); margin-top: 4px; }
        [data-theme="trades"] .line .qty { font-family: var(--font-jbm), monospace; font-size: 24px; font-weight: 700; color: var(--text); animation: countUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) backwards; }
        [data-theme="trades"] .receipt .line:nth-child(2) .qty { animation-delay: 0.1s; }
        [data-theme="trades"] .receipt .line:nth-child(3) .qty { animation-delay: 0.2s; }
        [data-theme="trades"] .receipt .line:nth-child(4) .qty { animation-delay: 0.3s; }
        [data-theme="trades"] .receipt .line:nth-child(5) .qty { animation-delay: 0.4s; }
        [data-theme="trades"] .receipt .line:nth-child(6) .qty { animation-delay: 0.5s; }
        [data-theme="trades"] .total { display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: center; padding-top: 20px; margin-top: 8px; border-top: 1.5px solid var(--text); }
        [data-theme="trades"] .total .label { font-family: var(--font-jbm), monospace; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; }
        [data-theme="trades"] .total .amt { font-family: var(--font-jbm), monospace; font-weight: 700; font-size: 22px; }
        [data-theme="trades"] .stamp-mark { display: inline-block; margin-top: 24px; padding: 10px 16px; font-family: var(--font-jbm), monospace; font-weight: 700; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; background: var(--stamp-dim); color: var(--stamp); border: 1.5px solid var(--stamp); transform: rotate(-2deg); }
        [data-theme="trades"] .proof { margin-top: 128px; }
        [data-theme="trades"] .proof-h { font-family: var(--font-jbm), monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.22em; color: var(--text-mid); margin-bottom: 32px; }
        [data-theme="trades"] .work-grid { display: grid; grid-template-columns: 1fr; gap: 1px; background: var(--rule); border: 1px solid var(--rule); }
        @media (min-width: 800px) { [data-theme="trades"] .work-grid { grid-template-columns: 1fr 1fr 1fr; } }
        [data-theme="trades"] .work { background: var(--surface); padding: 32px; }
        [data-theme="trades"] .work .when { font-family: var(--font-jbm), monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--text-mid); margin-bottom: 18px; }
        [data-theme="trades"] .work .what { font-family: var(--font-fraunces), serif; font-weight: 400; font-size: 22px; line-height: 1.25; margin-bottom: 12px; }
        [data-theme="trades"] .work .what em { font-style: italic; font-weight: 700; }
        [data-theme="trades"] .work .took { font-family: var(--font-jbm), monospace; font-size: 12px; color: var(--stamp); margin-top: 16px; }
        [data-theme="trades"] .faq { margin-top: 96px; max-width: 760px; }
        [data-theme="trades"] .faq details { border-top: 1px solid var(--rule); padding: 20px 0; }
        [data-theme="trades"] .faq details:last-of-type { border-bottom: 1px solid var(--rule); }
        [data-theme="trades"] .faq summary { font-family: var(--font-fraunces), serif; font-weight: 700; font-size: 19px; cursor: pointer; list-style: none; color: var(--text); }
        [data-theme="trades"] .faq summary::after { content: " +"; color: var(--stamp); }
        [data-theme="trades"] .faq details[open] summary::after { content: " −"; }
        [data-theme="trades"] .faq p { margin-top: 12px; color: var(--text-mid); font-family: var(--font-fraunces), serif; font-size: 17px; line-height: 1.6; }
      `}</style>
    </div>
  );
}

function Line({ item, sub, qty }: { item: string; sub: string; qty: string }) {
  return (
    <div className="line">
      <div className="item">{item}<small>{sub}</small></div>
      <div className="qty">{qty}</div>
    </div>
  );
}

function Work({ date, body, took }: { date: string; body: React.ReactNode; took: string }) {
  return (
    <div className="work">
      <div className="when">{date}</div>
      <div className="what">{body}</div>
      <div className="took">{took}</div>
    </div>
  );
}
