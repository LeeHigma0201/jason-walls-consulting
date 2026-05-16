// /book — the booking page every CTA on the site points at.
// Tier-aware: reads ?tier= and shows what the visitor is booking (from lib/offers).
// Scheduler-ready: set NEXT_PUBLIC_BOOKING_URL (Calendly / Cal.com / Google
// Calendar appointment-schedule embed URL) and the live calendar renders here.
// Until that env var is set, a real pre-filled email booking path is shown —
// never a dead end.

import type { Metadata } from "next";
import Link from "next/link";
import { OFFERS } from "@/lib/offers";
import { TEMPLATES } from "@/lib/templates";
import { MissionFooter } from "@/components/MissionFooter";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Book a call with Jason Walls — Master Electrician and software builder. Fixed-fee sites, iOS apps, and AI tools.",
  alternates: { canonical: "/book" },
};

const CONTACT_EMAIL = "hi@jasonwalls.work";

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string; template?: string }>;
}) {
  const { tier, template } = await searchParams;
  const offer = tier ? OFFERS.find((o) => o.id === tier) : undefined;
  const tmpl = template
    ? TEMPLATES.find((t) => t.slug === template)
    : undefined;

  type Summary = {
    name: string;
    priceLabel: string;
    duration: string;
    short: string;
    whatYouGet: string[];
    needsScoping: boolean;
    kind: "service" | "template";
  };

  const summary: Summary | undefined = offer
    ? {
        name: offer.name,
        priceLabel: offer.priceLabel,
        duration: offer.duration,
        short: offer.short,
        whatYouGet: offer.whatYouGet,
        needsScoping: !!offer.priceMin,
        kind: "service",
      }
    : tmpl
      ? {
          name: tmpl.name,
          priceLabel: tmpl.priceLabel,
          duration: tmpl.setupDays,
          short: tmpl.short,
          whatYouGet: tmpl.whatYouGet,
          needsScoping: false,
          kind: "template",
        }
      : undefined;

  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

  const subject = summary
    ? `${summary.kind === "template" ? "Setup request" : "Booking request"} — ${summary.name} (${summary.priceLabel})`
    : "Booking request — intro call";
  const mailBody = [
    "Hi Jason,",
    "",
    summary
      ? summary.kind === "template"
        ? `I'd like to buy the ${summary.name} template (${summary.priceLabel}) and get it set up.`
        : `I'd like to book the ${summary.name} (${summary.priceLabel}).`
      : "I'd like to book an intro call.",
    "",
    "Here's what I'm working on:",
    "",
    "",
    "A few times that work for me:",
    "",
    "",
  ].join("\n");
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(mailBody)}`;

  return (
    <div data-theme="home">
      <nav className="bk-nav">
        <div className="bk-nav-inner">
          <Link href="/" className="bk-mark">
            <span className="bk-mark-name">Jason Walls</span>
            <span className="bk-mark-sub">
              Master Electrician · builds with Claude
            </span>
          </Link>
          <Link href="/" className="bk-back">
            ← Back to site
          </Link>
        </div>
      </nav>

      <main className="bk-main">
        <p className="bk-kicker">— Book a call</p>
        <h1 className="bk-h1">
          {summary ? (
            summary.kind === "template" ? (
              <>
                Set up the <em>{summary.name}</em>.
              </>
            ) : (
              <>
                Book the <em>{summary.name}</em>.
              </>
            )
          ) : (
            <>
              Let&apos;s <em>book a call</em>.
            </>
          )}
        </h1>
        <p className="bk-lede">
          {summary
            ? summary.short
            : "Tell me what you're working on. We'll find the fastest honest path to the thing you need built — fixed-fee, the way an electrician charges."}
        </p>

        <div className={"bk-grid" + (summary ? "" : " bk-grid--single")}>
          {summary && (
            <aside className="bk-summary">
              <p className="bk-summary-kicker">
                {summary.kind === "template" ? "You're buying" : "You're booking"}
              </p>
              <h2 className="bk-summary-name">{summary.name}</h2>
              <div className="bk-summary-price">{summary.priceLabel}</div>
              <div className="bk-summary-duration">{summary.duration}</div>
              <ul className="bk-summary-list">
                {summary.whatYouGet.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              {summary.needsScoping ? (
                <p className="bk-summary-note">
                  Upper-tier work is scoped on the call first — you get a fixed
                  quote before anything starts.
                </p>
              ) : summary.kind === "template" ? (
                <p className="bk-summary-note">
                  Email me to confirm and I&apos;ll send a Stripe payment link
                  back. Setup starts as soon as payment clears.
                </p>
              ) : null}
            </aside>
          )}

          <section className="bk-panel">
            {bookingUrl ? (
              <>
                <p className="bk-panel-kicker">Pick a time</p>
                <div className="bk-embed">
                  <iframe
                    src={bookingUrl}
                    title="Schedule a call with Jason Walls"
                    loading="lazy"
                  />
                </div>
                <p className="bk-alt">
                  Prefer email? <a href={mailto}>Send me a note instead</a> — I&apos;ll
                  get a time back to you the same day.
                </p>
              </>
            ) : (
              <>
                <p className="bk-panel-kicker">Grab a time with me</p>
                <h2 className="bk-panel-h">
                  One email. I&apos;ll send a calendar invite back.
                </h2>
                <p className="bk-panel-body">
                  Send a quick note about what you&apos;re working on and a couple of
                  times that suit you. I&apos;ll get a calendar invite back to you the
                  same day — usually within a few hours.
                </p>
                <a href={mailto} className="bk-cta">
                  {summary?.kind === "template"
                    ? `Email me to buy — ${summary.name}`
                    : summary
                      ? `Email me to book — ${summary.name}`
                      : "Email me to book"}
                </a>
                <p className="bk-alt">
                  Or reach me directly at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </p>
              </>
            )}
          </section>
        </div>
      </main>

      <MissionFooter activeId="home" />

      <style>{`
        [data-theme="home"] .bk-nav { border-bottom: 1px solid var(--rule); }
        [data-theme="home"] .bk-nav-inner { max-width: 1100px; margin: 0 auto; padding: 18px 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
        [data-theme="home"] .bk-mark { display: flex; flex-direction: column; line-height: 1; text-decoration: none; color: inherit; gap: 4px; }
        [data-theme="home"] .bk-mark-name { font-family: var(--font-fraunces), serif; font-weight: 600; font-size: 18px; letter-spacing: -0.01em; color: var(--text); }
        [data-theme="home"] .bk-mark-sub { font-family: var(--font-jbm), monospace; font-size: 10px; letter-spacing: 0.18em; color: var(--text-faint); text-transform: uppercase; }
        [data-theme="home"] .bk-back { font-family: var(--font-plex), sans-serif; font-size: 13px; font-weight: 500; color: var(--text-mid); text-decoration: none; transition: color 0.2s; white-space: nowrap; }
        [data-theme="home"] .bk-back:hover { color: var(--clay); }
        @media (max-width: 600px) { [data-theme="home"] .bk-mark-sub { display: none; } }

        [data-theme="home"] .bk-main { max-width: 1000px; margin: 0 auto; padding: 72px 32px 32px; }
        [data-theme="home"] .bk-kicker { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.22em; color: var(--clay); text-transform: uppercase; margin: 0 0 18px; }
        [data-theme="home"] .bk-h1 { font-family: var(--font-fraunces), serif; font-weight: 300; font-size: clamp(36px, 5.5vw, 60px); line-height: 1.04; letter-spacing: -0.03em; color: var(--text); margin: 0 0 20px; font-variation-settings: "SOFT" 30; }
        [data-theme="home"] .bk-h1 em { font-style: italic; font-weight: 600; color: var(--clay); }
        [data-theme="home"] .bk-lede { font-family: var(--font-plex), sans-serif; font-size: 18px; line-height: 1.55; color: var(--text-mid); max-width: 620px; margin: 0 0 48px; }

        [data-theme="home"] .bk-grid { display: grid; grid-template-columns: 1fr; gap: 24px; align-items: start; }
        @media (min-width: 880px) { [data-theme="home"] .bk-grid { grid-template-columns: 340px 1fr; gap: 32px; } }
        [data-theme="home"] .bk-grid--single { grid-template-columns: 1fr; max-width: 640px; }

        [data-theme="home"] .bk-summary { background: var(--surface-2); border: 1px solid var(--rule); border-radius: 14px; padding: 28px 26px; }
        [data-theme="home"] .bk-summary-kicker { font-family: var(--font-jbm), monospace; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-faint); margin: 0 0 10px; }
        [data-theme="home"] .bk-summary-name { font-family: var(--font-fraunces), serif; font-weight: 600; font-size: 24px; letter-spacing: -0.01em; color: var(--text); margin: 0 0 14px; }
        [data-theme="home"] .bk-summary-price { font-family: var(--font-fraunces), serif; font-weight: 300; font-size: 32px; letter-spacing: -0.025em; color: var(--text); line-height: 1; }
        [data-theme="home"] .bk-summary-duration { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.06em; color: var(--text-mid); margin: 8px 0 20px; }
        [data-theme="home"] .bk-summary-list { list-style: none; margin: 0; padding: 18px 0 0; border-top: 1px solid var(--rule); }
        [data-theme="home"] .bk-summary-list li { font-family: var(--font-plex), sans-serif; font-size: 13px; line-height: 1.5; color: var(--text); padding: 6px 0 6px 20px; position: relative; }
        [data-theme="home"] .bk-summary-list li::before { content: "→"; color: var(--clay); position: absolute; left: 0; top: 6px; font-family: var(--font-jbm), monospace; font-weight: 700; }
        [data-theme="home"] .bk-summary-note { font-family: var(--font-plex), sans-serif; font-size: 12px; line-height: 1.5; color: var(--text-mid); margin: 18px 0 0; padding-top: 16px; border-top: 1px solid var(--rule); }

        [data-theme="home"] .bk-panel { background: var(--surface); border: 1px solid var(--rule); border-radius: 14px; padding: 32px 30px; box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset, 0 12px 32px -12px rgba(26,22,18,0.08); }
        [data-theme="home"] .bk-panel-kicker { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--clay); margin: 0 0 14px; }
        [data-theme="home"] .bk-panel-h { font-family: var(--font-fraunces), serif; font-weight: 600; font-size: 24px; line-height: 1.2; letter-spacing: -0.012em; color: var(--text); margin: 0 0 14px; }
        [data-theme="home"] .bk-panel-body { font-family: var(--font-plex), sans-serif; font-size: 15px; line-height: 1.6; color: var(--text-mid); margin: 0 0 26px; }
        [data-theme="home"] .bk-cta { display: inline-block; padding: 15px 28px; background: var(--clay); color: var(--bg); text-decoration: none; border-radius: 999px; font-family: var(--font-plex), sans-serif; font-weight: 600; font-size: 15px; transition: background 0.2s, transform 0.2s; }
        [data-theme="home"] .bk-cta:hover { background: var(--clay-deep); transform: translateY(-1px); }
        [data-theme="home"] .bk-alt { font-family: var(--font-plex), sans-serif; font-size: 13px; line-height: 1.55; color: var(--text-mid); margin: 22px 0 0; }
        [data-theme="home"] .bk-alt a { color: var(--clay-deep); text-decoration: none; border-bottom: 1px solid var(--rule); }
        [data-theme="home"] .bk-alt a:hover { border-color: var(--clay); }

        [data-theme="home"] .bk-embed { border: 1px solid var(--rule); border-radius: 12px; overflow: hidden; background: var(--surface-2); }
        [data-theme="home"] .bk-embed iframe { display: block; width: 100%; height: 700px; border: 0; }
      `}</style>
    </div>
  );
}
