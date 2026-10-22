/**
 * Free, unauthenticated catalog for agent callers.
 *
 * Deliberately NOT metered: the catalog is how an agent decides whether to spend,
 * and a consulting site's lead path should never be behind a paywall. The metered
 * thing here is the work product (/scope), not the pitch.
 *
 * Only the six engagements from lib/offers.ts are listed, with their pricing status.
 * The trade templates in lib/templates.ts are not listed until each one has an
 * evidence line in PORTFOLIO-EVIDENCE.md and an approved price.
 */
import { NextResponse } from 'next/server';
import { OFFERS, PRICING_STATUS, PROPOSED_NOTE } from '@/lib/offers';
import { SITE } from '@/lib/site';

export const runtime = 'nodejs';

function baseUrl(): string {
  return process.env.AGENT_API_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || SITE.url;
}

export function GET() {
  const proposed = PRICING_STATUS !== 'approved';
  return NextResponse.json({
    pricingStatus: PRICING_STATUS,
    note: proposed ? `Every price is ${PROPOSED_NOTE}; nothing sells at a proposed price.` : undefined,
    engagements: OFFERS.map((o) => ({
      id: o.id,
      name: o.name,
      priceLabel: o.priceLabel,
      priceNum: o.priceNum,
      priceMin: o.priceMin,
      proposed,
      recurring: o.recurring,
      duration: o.duration,
      group: o.group,
      summary: o.short,
      includes: o.whatYouGet,
      notForThis: o.notForThis ?? [],
      bookUrl: `${baseUrl()}${o.bookHref}`,
    })),
  });
}
