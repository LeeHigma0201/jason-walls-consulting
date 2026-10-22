import { PRICING_STATUS, PROPOSED_NOTE, type OfferTier } from "@/lib/offers";

// Every figure from lib/offers.ts renders through here, so the "proposed · awaiting approval" marker
// can never be left off. Never type a dollar figure in JSX. Store prices ($6.99, free) are live facts
// and do not use this. Server component. The {" "} text nodes are invisible in the flex/block layout but
// keep textContent readable for crawlers and screen readers ("from $12,000 / mo proposed · awaiting approval").
export function Price({ o, size = "md" }: { o: OfferTier; size?: "md" | "lg" }) {
  // "from $12,000", "$3,500", "$400 / mo", "$1,200 / day": split so the figure is large and the rest small.
  const m = /^(from\s+)?(\$[\d,]+(?:\.\d+)?)(.*)$/i.exec(o.priceLabel.trim());
  const pre = m?.[1]?.trim();
  const fig = m ? m[2] : o.priceLabel;
  const post = m?.[3]?.trim();
  return (
    <span className={`price${size === "lg" ? " price-lg" : ""}`}>
      <span className="price-line">
        {pre && <span className="price-aff">{pre}</span>}
        {pre && " "}
        <span className="price-fig">{fig}</span>
        {post && " "}
        {post && <span className="price-aff">{post}</span>}
      </span>
      {" "}
      {PRICING_STATUS === "proposed" && <span className="proposed">{PROPOSED_NOTE}</span>}
    </span>
  );
}
