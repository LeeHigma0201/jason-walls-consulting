import Link from "next/link";
import { circuitOf, type OfferTier } from "@/lib/offers";
import { payLink } from "@/lib/payments";
import { Price } from "@/components/ui/Price";
import { Fold } from "@/components/ui/Fold";

// One package. compact (Home, previews): name, price with marker, timeline, short line, best for, and
// "See this package" to /services#id. Full (/services): same plus three Fold blocks (closed on phone,
// open at 820+), "Ask about this one" to bookHref, and a Stripe pay button when lib/payments has a link for it. The featured package (MVP) gets the accent ring and
// the pill. Ids (#launch-site, #care, ...) are on the full card only.
export function PackageCard({ o, compact = false, delay = 0 }: { o: OfferTier; compact?: boolean; delay?: number }) {
  const label = compact ? "See this package" : "Ask about this one";
  const pay = compact ? null : payLink(o);
  return (
    <article id={compact ? undefined : o.id} className={`card pkg sr ${o.featured ? "card-featured" : ""}`} style={{ ["--d" as string]: `${delay}ms` }}>
      {o.featured && <span className="pill pill-accent">Where I’d start with one idea</span>}
      <div className="pkg-head">
        <div>
          <p className="kicker" style={{ margin: "0 0 8px" }}>{o.duration}</p>
          <h3 className="display h3" style={{ margin: 0 }}>{o.name}</h3>
        </div>
        <span className="pkg-ckt" aria-hidden="true">
          <span className="mono">CKT {circuitOf(o.id)}</span>
          <span className="brk"><span className="brk-handle" /></span>
        </span>
      </div>
      <Price o={o} />
      <p className="pkg-short">{o.short}</p>
      <div>
        <p className="kicker" style={{ margin: "0 0 4px" }}>Best for</p>
        <p className="pkg-meta">{o.bestFor}</p>
      </div>
      {!compact && (
        <div>
          <Fold summary="You get" label={o.name}><ul className="check-list">{o.whatYouGet.map((w) => <li key={w}>{w}</li>)}</ul></Fold>
          <Fold summary="You provide" label={o.name}><ul className="check-list">{o.youProvide.map((w) => <li key={w}>{w}</li>)}</ul></Fold>
          <Fold summary="Not included" label={o.name}><ul className="check-list x-list">{o.notForThis.map((w) => <li key={w}>{w}</li>)}</ul></Fold>
        </div>
      )}
      <div style={{ marginTop: "auto", paddingTop: 4, display: "grid", gap: 8 }}>
        <Link href={compact ? `/services#${o.id}` : o.bookHref} className={`btn ${o.featured ? "btn-primary" : "btn-ghost"}`} style={{ width: "100%" }} aria-label={`${label}: ${o.name}`}>
          {label}
        </Link>
        {pay && (
          <a href={pay.href} className="btn btn-ghost" style={{ width: "100%" }} rel="noopener" aria-label={`${pay.label}: ${o.name}, opens Stripe checkout`}>
            {pay.label}
          </a>
        )}
      </div>
    </article>
  );
}
