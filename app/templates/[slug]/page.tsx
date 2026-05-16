// /templates/[slug] — individual template detail page.
// Server component, statically generated per template. JSON-LD Product schema
// for AEO. Routes the CTA to /book?template=slug so the booking page picks up
// the template summary automatically.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TEMPLATES } from "@/lib/templates";
import { MissionFooter } from "@/components/MissionFooter";
import {
  JsonLd,
  breadcrumbSchema,
  productSchema,
  SITE,
} from "@/lib/schema";

export async function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

function DemoEmbed({ src }: { src?: string }) {
  if (!src) return null;
  return (
    <div className="d-demo">
      <iframe src={src} loading="lazy" allow="fullscreen" title="Template demo" />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = TEMPLATES.find((x) => x.slug === slug);
  if (!t) return { title: "Template not found" };
  return {
    title: `${t.name} · ${t.tradeLabel} · ${t.priceLabel}`,
    description: t.short,
    openGraph: {
      title: `${t.name} · ${t.priceLabel}`,
      description: t.short,
    },
    alternates: { canonical: `/templates/${t.slug}` },
  };
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = TEMPLATES.find((x) => x.slug === slug);
  if (!t) notFound();

  return (
    <div data-theme="home">
      <JsonLd
        data={[
          productSchema({
            name: t.name,
            description: t.short,
            priceNum: t.priceNum,
            url: SITE.url + `/templates/${t.slug}`,
            category: t.tradeLabel,
          }),
          breadcrumbSchema([
            { name: "Home", url: SITE.url },
            { name: "Templates", url: SITE.url + "/templates" },
            { name: t.name, url: SITE.url + `/templates/${t.slug}` },
          ]),
        ]}
      />

      <nav className="d-nav">
        <div className="d-nav-inner">
          <Link href="/" className="d-mark">
            <span className="d-mark-name">Jason Walls</span>
            <span className="d-mark-sub">
              Master Electrician · builds with Claude
            </span>
          </Link>
          <Link href="/templates" className="d-back">
            ← All templates
          </Link>
        </div>
      </nav>

      <main className="d-main">
        <p className="d-trade">{t.tradeLabel}</p>
        <h1 className="d-h1">{t.name}</h1>
        <p className="d-short">{t.short}</p>

        <div className="d-summary">
          <div className="d-summary-item">
            <span className="d-summary-label">Price</span>
            <span className="d-summary-val d-summary-val--price">
              {t.priceLabel}
            </span>
          </div>
          <div className="d-summary-item">
            <span className="d-summary-label">Setup</span>
            <span className="d-summary-val">{t.setupDays}</span>
          </div>
          <div className="d-summary-item">
            <span className="d-summary-label">Trade</span>
            <span className="d-summary-val">{t.tradeLabel}</span>
          </div>
          <Link
            href={t.stripeUrl ?? `/book?template=${t.slug}`}
            className="d-cta"
          >
            Set me up — {t.priceLabel}
          </Link>
        </div>
        <p className="d-summary-alt">
          Not sure yet?{" "}
          <Link href="/book?tier=strategy-hour">
            Book a $300 Strategy Hour first
          </Link>
          .
        </p>

        <DemoEmbed src={t.demoUrl} />

        <section className="d-section">
          <p className="d-section-kicker">— Who this is for</p>
          <p className="d-section-body">{t.who}</p>
        </section>

        <section className="d-section d-problem">
          <p className="d-section-kicker">— The problem</p>
          <p className="d-section-quote">{t.problem}</p>
        </section>

        <section className="d-section">
          <p className="d-section-kicker">— What you get on setup day</p>
          <ul className="d-list">
            {t.whatYouGet.map((line, i) => (
              <li key={i} className="d-list-item">
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section className="d-section">
          <p className="d-section-kicker">— How it runs after setup</p>
          <ol className="d-steps">
            {t.workflow.map((line, i) => (
              <li key={i} className="d-step">
                <span className="d-step-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="d-step-body">{line}</span>
              </li>
            ))}
          </ol>
        </section>

        {t.samplePrompts && t.samplePrompts.length > 0 && (
          <section className="d-section">
            <p className="d-section-kicker">— Sample questions you can ask</p>
            <p className="d-section-body" style={{ marginBottom: 22, color: "var(--text-mid)", fontSize: 15 }}>
              The notebook answers things like this, with the source page cited every time:
            </p>
            <ul className="d-prompts">
              {t.samplePrompts.map((p, i) => (
                <li key={i} className="d-prompt">"{p}"</li>
              ))}
            </ul>
          </section>
        )}

        {t.notForThis && t.notForThis.length > 0 && (
          <section className="d-section">
            <p className="d-section-kicker">— Not built for this</p>
            <p className="d-section-body" style={{ marginBottom: 18, color: "var(--text-mid)", fontSize: 15 }}>
              Honest scope. If you need any of these, it&apos;s a different conversation:
            </p>
            <ul className="d-notfor">
              {t.notForThis.map((line, i) => (
                <li key={i} className="d-notfor-item">{line}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="d-section">
          <p className="d-section-kicker">— Subscriptions you keep</p>
          <p className="d-sub-intro">
            You pay these vendors direct. I don't mark them up, I don't host
            your data behind a wall. Your account, your seat.
          </p>
          <div className="d-sub-grid">
            {t.subscriptions.map((s, i) => (
              <article key={i} className="d-sub">
                <h4 className="d-sub-name">{s.name}</h4>
                <p className="d-sub-cost">{s.cost}</p>
                <p className="d-sub-why">{s.why}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="d-proof">
          <p className="d-proof-q">{t.voiceProof}</p>
          <p className="d-proof-sig">— Jason · IBEW Local 369</p>
        </section>

        <section className="d-final">
          <h2 className="d-final-h">
            Ready when you are.
          </h2>
          <p className="d-final-body">
            Click below and we'll get on a quick setup call to wire this into
            your shop. Two to four business days from there to live.
          </p>
          <Link
            href={t.stripeUrl ?? `/book?template=${t.slug}`}
            className="d-cta d-cta--big"
          >
            Set me up — {t.priceLabel}
          </Link>
          <p className="d-final-alt">
            Not sure if this is the right fit? <Link href="/book?tier=strategy-hour">Book a $300 Strategy Hour</Link> first.
          </p>
        </section>
      </main>

      <MissionFooter activeId="templates" />

      <style>{`
        [data-theme="home"] .d-nav { border-bottom: 1px solid var(--rule); }
        [data-theme="home"] .d-nav-inner { max-width: 1100px; margin: 0 auto; padding: 18px 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
        [data-theme="home"] .d-mark { display: flex; flex-direction: column; line-height: 1; text-decoration: none; color: inherit; gap: 4px; }
        [data-theme="home"] .d-mark-name { font-family: var(--font-fraunces), serif; font-weight: 600; font-size: 18px; letter-spacing: -0.01em; color: var(--text); }
        [data-theme="home"] .d-mark-sub { font-family: var(--font-jbm), monospace; font-size: 10px; letter-spacing: 0.18em; color: var(--text-faint); text-transform: uppercase; }
        [data-theme="home"] .d-back { font-family: var(--font-plex), sans-serif; font-size: 13px; font-weight: 500; color: var(--text-mid); text-decoration: none; transition: color 0.2s; white-space: nowrap; }
        [data-theme="home"] .d-back:hover { color: var(--clay); }
        @media (max-width: 600px) { [data-theme="home"] .d-mark-sub { display: none; } }

        [data-theme="home"] .d-main { max-width: 880px; margin: 0 auto; padding: 72px 32px 48px; }
        [data-theme="home"] .d-trade { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.22em; color: var(--clay); text-transform: uppercase; margin: 0 0 18px; }
        [data-theme="home"] .d-h1 { font-family: var(--font-fraunces), serif; font-weight: 300; font-size: clamp(40px, 6vw, 72px); line-height: 1.02; letter-spacing: -0.03em; color: var(--text); margin: 0 0 22px; font-variation-settings: "SOFT" 30; }
        [data-theme="home"] .d-short { font-family: var(--font-plex), sans-serif; font-size: 19px; line-height: 1.55; color: var(--text-mid); margin: 0 0 40px; max-width: 680px; }

        [data-theme="home"] .d-summary { display: grid; grid-template-columns: 1fr; gap: 16px; padding: 28px 28px; background: var(--surface); border: 1px solid var(--rule); border-radius: 14px; margin-bottom: 14px; box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset, 0 12px 32px -12px rgba(26,22,18,0.08); }
        [data-theme="home"] .d-summary-alt { font-family: var(--font-plex), sans-serif; font-size: 14px; color: var(--text-mid); text-align: center; margin: 0 0 56px; }
        [data-theme="home"] .d-summary-alt a { color: var(--clay-deep); text-decoration: none; border-bottom: 1px solid var(--rule); padding-bottom: 1px; }
        [data-theme="home"] .d-summary-alt a:hover { border-color: var(--clay); }
        [data-theme="home"] .d-demo { margin: 0 0 56px; border: 1px solid var(--rule); border-radius: 14px; overflow: hidden; background: var(--surface-2); aspect-ratio: 16/9; }
        [data-theme="home"] .d-demo iframe { display: block; width: 100%; height: 100%; border: 0; }
        @media (min-width: 760px) { [data-theme="home"] .d-summary { grid-template-columns: repeat(3, 1fr) auto; align-items: center; gap: 24px; } }
        [data-theme="home"] .d-summary-item { display: flex; flex-direction: column; gap: 4px; }
        [data-theme="home"] .d-summary-label { font-family: var(--font-jbm), monospace; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-faint); }
        [data-theme="home"] .d-summary-val { font-family: var(--font-plex), sans-serif; font-size: 14px; color: var(--text); font-weight: 500; }
        [data-theme="home"] .d-summary-val--price { font-family: var(--font-fraunces), serif; font-weight: 300; font-size: 28px; letter-spacing: -0.025em; line-height: 1; }
        [data-theme="home"] .d-cta { display: inline-block; padding: 14px 26px; background: var(--clay); color: var(--bg); text-decoration: none; border-radius: 999px; font-family: var(--font-plex), sans-serif; font-weight: 600; font-size: 14px; text-align: center; transition: background 0.2s, transform 0.2s; white-space: nowrap; }
        [data-theme="home"] .d-cta:hover { background: var(--clay-deep); transform: translateY(-1px); }
        [data-theme="home"] .d-cta--big { padding: 18px 36px; font-size: 16px; }

        [data-theme="home"] .d-section { margin-bottom: 56px; }
        [data-theme="home"] .d-section-kicker { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.22em; color: var(--clay); text-transform: uppercase; margin: 0 0 18px; }
        [data-theme="home"] .d-section-body { font-family: var(--font-plex), sans-serif; font-size: 17px; line-height: 1.6; color: var(--text); margin: 0; }
        [data-theme="home"] .d-section-quote { font-family: var(--font-fraunces), serif; font-weight: 400; font-style: italic; font-size: clamp(20px, 2.4vw, 26px); line-height: 1.45; color: var(--text); margin: 0; padding-left: 22px; border-left: 3px solid var(--clay); }

        [data-theme="home"] .d-list { list-style: none; margin: 0; padding: 0; }
        [data-theme="home"] .d-list-item { font-family: var(--font-plex), sans-serif; font-size: 16px; line-height: 1.6; color: var(--text); padding: 12px 0 12px 28px; position: relative; border-bottom: 1px dashed var(--rule); }
        [data-theme="home"] .d-list-item:last-child { border-bottom: none; }
        [data-theme="home"] .d-list-item::before { content: "→"; color: var(--clay); position: absolute; left: 0; top: 12px; font-family: var(--font-jbm), monospace; font-weight: 700; }

        [data-theme="home"] .d-prompts { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr; gap: 10px; }
        [data-theme="home"] .d-prompt { font-family: var(--font-fraunces), serif; font-style: italic; font-size: 16px; line-height: 1.5; color: var(--text); padding: 14px 18px; background: var(--surface-2); border-left: 3px solid var(--clay); border-radius: 0 8px 8px 0; }
        [data-theme="home"] .d-notfor { list-style: none; margin: 0; padding: 0; }
        [data-theme="home"] .d-notfor-item { font-family: var(--font-plex), sans-serif; font-size: 15px; line-height: 1.6; color: var(--text-mid); padding: 10px 0 10px 28px; position: relative; border-bottom: 1px dashed var(--rule); }
        [data-theme="home"] .d-notfor-item:last-child { border-bottom: none; }
        [data-theme="home"] .d-notfor-item::before { content: "×"; color: var(--text-faint); position: absolute; left: 6px; top: 8px; font-family: var(--font-jbm), monospace; font-weight: 700; font-size: 18px; }
        [data-theme="home"] .d-steps { list-style: none; margin: 0; padding: 0; counter-reset: step; }
        [data-theme="home"] .d-step { display: grid; grid-template-columns: 52px 1fr; gap: 18px; padding: 18px 0; border-bottom: 1px solid var(--rule-soft); align-items: baseline; }
        [data-theme="home"] .d-step:last-child { border-bottom: none; }
        [data-theme="home"] .d-step-num { font-family: var(--font-jbm), monospace; font-size: 11px; letter-spacing: 0.22em; color: var(--clay); padding-top: 4px; }
        [data-theme="home"] .d-step-body { font-family: var(--font-plex), sans-serif; font-size: 16px; line-height: 1.55; color: var(--text); }

        [data-theme="home"] .d-sub-intro { font-family: var(--font-plex), sans-serif; font-size: 15px; line-height: 1.55; color: var(--text-mid); margin: 0 0 24px; max-width: 680px; }
        [data-theme="home"] .d-sub-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        @media (min-width: 720px) { [data-theme="home"] .d-sub-grid { grid-template-columns: 1fr 1fr; } }
        [data-theme="home"] .d-sub { background: var(--surface-2); border: 1px solid var(--rule); border-radius: 12px; padding: 22px; }
        [data-theme="home"] .d-sub-name { font-family: var(--font-fraunces), serif; font-weight: 600; font-size: 17px; letter-spacing: -0.01em; color: var(--text); margin: 0 0 6px; }
        [data-theme="home"] .d-sub-cost { font-family: var(--font-jbm), monospace; font-size: 12px; letter-spacing: 0.06em; color: var(--clay-deep); margin: 0 0 10px; }
        [data-theme="home"] .d-sub-why { font-family: var(--font-plex), sans-serif; font-size: 13px; line-height: 1.55; color: var(--text-mid); margin: 0; }

        [data-theme="home"] .d-proof { max-width: 680px; margin: 64px auto; padding: 36px 32px; text-align: center; background: var(--clay-dim); border-radius: 14px; }
        [data-theme="home"] .d-proof-q { font-family: var(--font-fraunces), serif; font-weight: 400; font-style: italic; font-size: clamp(20px, 2.4vw, 26px); line-height: 1.5; color: var(--text); margin: 0 0 18px; }
        [data-theme="home"] .d-proof-sig { font-family: var(--font-jbm), monospace; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--text-mid); margin: 0; }

        [data-theme="home"] .d-final { text-align: center; padding: 56px 32px 32px; border-top: 1px solid var(--rule); margin-top: 32px; }
        [data-theme="home"] .d-final-h { font-family: var(--font-fraunces), serif; font-weight: 300; font-size: clamp(28px, 4vw, 44px); line-height: 1.1; letter-spacing: -0.025em; color: var(--text); margin: 0 0 16px; font-variation-settings: "SOFT" 30; }
        [data-theme="home"] .d-final-body { font-family: var(--font-plex), sans-serif; font-size: 16px; line-height: 1.6; color: var(--text-mid); max-width: 580px; margin: 0 auto 28px; }
        [data-theme="home"] .d-final-alt { font-family: var(--font-plex), sans-serif; font-size: 14px; color: var(--text-mid); margin: 22px 0 0; }
        [data-theme="home"] .d-final-alt a { color: var(--clay-deep); text-decoration: none; border-bottom: 1px solid var(--rule); }
        [data-theme="home"] .d-final-alt a:hover { border-color: var(--clay); }
      `}</style>
    </div>
  );
}
