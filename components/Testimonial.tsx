// Testimonial card. Reusable across homepage and /templates.
// Brief rule: do not fabricate names, quotes, photos, or metrics. Real
// clients only. Placeholders on homepage + /templates are JSX-commented
// until Jason has at least 3 real customer testimonials in hand.

import Image from "next/image";

export type TestimonialProps = {
  quote: string;
  name: string;
  title: string;
  company: string;
  trade: string;
  metric: string;
  photo?: string;
};

export function Testimonial({
  quote,
  name,
  title,
  company,
  trade,
  metric,
  photo,
}: TestimonialProps) {
  return (
    <article className="testimonial">
      <p className="testimonial-quote">&ldquo;{quote}&rdquo;</p>

      <div className="testimonial-meta">
        {photo ? (
          <Image
            src={photo}
            alt={name}
            width={48}
            height={48}
            className="testimonial-photo"
          />
        ) : (
          <span className="testimonial-photo-fallback" aria-hidden="true">
            {name?.[0] ?? ""}
          </span>
        )}
        <div className="testimonial-byline">
          <p className="testimonial-name">{name}</p>
          <p className="testimonial-title">
            {title} · {company}
          </p>
        </div>
      </div>

      <div className="testimonial-stamps">
        <span className="testimonial-trade">{trade}</span>
        <span className="testimonial-metric">{metric}</span>
      </div>

      <style>{`
        .testimonial { background: var(--surface); border: 1px solid var(--rule); border-radius: 14px; padding: 28px 26px; display: flex; flex-direction: column; gap: 20px; box-shadow: 0 1px 0 rgba(255, 255, 255, 0.6) inset, 0 8px 24px -10px rgba(26, 22, 18, 0.06); }
        .testimonial-quote { font-family: var(--font-fraunces), serif; font-weight: 400; font-style: italic; font-size: clamp(17px, 1.9vw, 21px); line-height: 1.5; color: var(--text); margin: 0; flex: 1; }
        .testimonial-meta { display: flex; gap: 14px; align-items: center; padding-top: 14px; border-top: 1px solid var(--rule-soft); }
        .testimonial-photo { width: 48px; height: 48px; border-radius: 999px; object-fit: cover; flex-shrink: 0; }
        .testimonial-photo-fallback { width: 48px; height: 48px; border-radius: 999px; background: var(--clay-dim); color: var(--clay-deep); display: inline-flex; align-items: center; justify-content: center; font-family: var(--font-fraunces), serif; font-weight: 600; font-size: 18px; flex-shrink: 0; }
        .testimonial-byline { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .testimonial-name { font-family: var(--font-plex), sans-serif; font-weight: 600; font-size: 14px; color: var(--text); margin: 0; }
        .testimonial-title { font-family: var(--font-plex), sans-serif; font-size: 12px; color: var(--text-mid); margin: 0; }
        .testimonial-stamps { display: flex; gap: 8px; flex-wrap: wrap; }
        .testimonial-trade, .testimonial-metric { font-family: var(--font-jbm), monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; }
        .testimonial-trade { background: var(--surface-2); color: var(--text-mid); }
        .testimonial-metric { background: var(--clay-dim); color: var(--clay-deep); font-weight: 600; }
      `}</style>
    </article>
  );
}
