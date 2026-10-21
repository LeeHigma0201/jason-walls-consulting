import Link from "next/link";
import type { OfferTier } from "@/lib/offers";
import { PRICING_STATUS } from "@/lib/offers";

export function PackageCard({ o, compact = false, delay = 0 }: { o: OfferTier; compact?: boolean; delay?: number }) {
  return (
    <article id={o.id} className={`card card-hover sr ${o.featured ? "card-featured" : ""}`} style={{ ["--d" as string]: `${delay}ms`, display: "flex", flexDirection: "column", gap: 14 }}>
      {o.featured && <span className="pill pill-accent" style={{ position: "absolute", top: -12, left: 24 }}>Most asked for</span>}
      <div>
        <p className="kicker" style={{ marginBottom: 8 }}>{o.duration}</p>
        <h3 className="display h3" style={{ margin: 0 }}>{o.name}</h3>
      </div>
      <p className="display" style={{ margin: 0, fontSize: 36, lineHeight: 1 }}>
        {o.priceLabel}
        {PRICING_STATUS === "proposed" && <span className="proposed" style={{ display: "block", marginTop: 6 }}>proposed · awaiting approval</span>}
      </p>
      <p style={{ margin: 0, color: "var(--text-mid)", fontSize: 15 }}>{o.short}</p>
      {!compact && (
        <>
          <p className="kicker" style={{ marginTop: 6 }}>Best for</p>
          <p style={{ margin: 0, fontSize: 15 }}>{o.bestFor}</p>
          <p className="kicker" style={{ marginTop: 6 }}>Included</p>
          <ul className="check-list">{o.whatYouGet.map((w) => <li key={w}>{w}</li>)}</ul>
          <p className="kicker" style={{ marginTop: 6 }}>You provide</p>
          <ul className="check-list x-list">{o.youProvide.map((w) => <li key={w}>{w}</li>)}</ul>
          <p className="kicker" style={{ marginTop: 6 }}>Not included</p>
          <ul className="check-list x-list">{o.notForThis.map((w) => <li key={w}>{w}</li>)}</ul>
        </>
      )}
      <div style={{ marginTop: "auto", paddingTop: 8 }}>
        <Link href={o.bookHref} className={`btn ${o.featured ? "btn-primary" : "btn-ghost"}`} style={{ width: "100%" }}>
          {o.group === "ongoing" ? "Ask about it" : "Scope it on a call"}
        </Link>
      </div>
    </article>
  );
}
