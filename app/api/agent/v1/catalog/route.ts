/**
 * Free, unauthenticated catalog for agent callers.
 *
 * Deliberately NOT metered: the catalog is how an agent decides whether to spend,
 * and a consulting site's lead path should never be behind a paywall. The metered
 * thing here is the work product (/scope), not the pitch.
 */
import { NextResponse } from 'next/server';
import { OFFERS } from '@/lib/offers';
import { TEMPLATES } from '@/lib/templates';

export const runtime = 'nodejs';

// Domain is still undecided for this site, so links are built from env rather than
// hard-coded — an agent-facing URL that 404s is worse than a relative path.
function baseUrl(): string {
  return process.env.AGENT_API_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || '';
}

export function GET() {
  return NextResponse.json({
    engagements: OFFERS.map((o) => ({
      id: o.id,
      name: o.name,
      priceLabel: o.priceLabel,
      priceNum: o.priceNum,
      priceMin: o.priceMin,
      recurring: o.recurring,
      duration: o.duration,
      group: o.group,
      summary: o.short,
      includes: o.whatYouGet,
      notForThis: o.notForThis ?? [],
      bookUrl: `${baseUrl()}${o.bookHref}`,
    })),
    templates: TEMPLATES.map((t) => ({
      id: t.id,
      name: t.name,
      trade: t.trade,
      priceLabel: t.priceLabel,
      priceNum: t.priceNum,
      setupDays: t.setupDays,
      summary: t.short,
      who: t.who,
      buyUrl: t.stripeUrl ?? null,
    })),
  });
}
