// Stripe Payment Links, one per package that can start without a scope call. Each comes from the
// environment (NEXT_PUBLIC_STRIPE_LINK_<PACKAGE>) once scripts/stripe-setup.mjs has created it;
// an empty value means no pay button. MVP and iOS jobs are scoped first and quoted in writing, so
// they never get a link. Amounts shown on the buttons derive from lib/offers.ts, never typed here.
import { OFFERS, type OfferTier } from "@/lib/offers";

const LINKS: Record<string, string | undefined> = {
  "launch-site": process.env.NEXT_PUBLIC_STRIPE_LINK_LAUNCH_SITE,
  "business-on-claude": process.env.NEXT_PUBLIC_STRIPE_LINK_BUSINESS_ON_CLAUDE,
  care: process.env.NEXT_PUBLIC_STRIPE_LINK_CARE,
  day: process.env.NEXT_PUBLIC_STRIPE_LINK_DAY,
};

const usd = (n: number) => "$" + n.toLocaleString("en-US");

export function payLink(o: OfferTier): { href: string; label: string } | null {
  const href = LINKS[o.id];
  if (!href) return null;
  if (o.recurring === "month") return { href, label: o.priceNum ? `Subscribe · ${usd(o.priceNum)} a month` : "Subscribe" };
  if (o.recurring === "day") return { href, label: o.priceNum ? `Book a day · ${usd(o.priceNum)}` : "Book a day" };
  // Fixed-price packages take 50% to start (PAYMENT_TERMS); the balance is invoiced at launch.
  return { href, label: o.priceNum ? `Pay ${usd(o.priceNum / 2)} to start` : "Pay the deposit to start" };
}

export const HAS_PAY_LINKS = OFFERS.some((o) => payLink(o) !== null);
