/**
 * Metered scoping brief.
 *
 * The per-interaction product for a consulting site is not the lead form — it is
 * the thing Jason would otherwise spend a call producing: a written scope that
 * names the tier, the budget fit, what is explicitly out of scope, and which
 * off-the-shelf template beats a custom build. Charged at $2 a call so an agent
 * can buy it on its user's behalf; the booking link it returns is free.
 *
 * Matching is deterministic (no model call) so the same inputs always price the
 * same way, and so the brief can never invent an engagement that isn't sold.
 */
import { NextRequest, NextResponse } from 'next/server';
import { OFFERS, PAYMENT_TERMS, PRICING_STATUS } from '@/lib/offers';
import { TEMPLATES } from '@/lib/templates';
import { authorize, commit, meterHeaders } from '@/lib/agent-meter';

export const runtime = 'nodejs';

const PRICE_CENTS = 200;
const TOOL = 'scope_brief';

function baseUrl(): string {
  return process.env.AGENT_API_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || '';
}

/** Cheapest tier whose entry price the stated budget actually covers. */
function tierForBudget(budgetUsd: number, ongoing: boolean) {
  const pool = OFFERS.filter((o) => (ongoing ? o.group === 'ongoing' : o.group === 'one-time'));
  const affordable = pool.filter((o) => (o.priceNum ?? o.priceMin ?? Infinity) <= budgetUsd);
  if (!affordable.length) return null;
  return affordable.reduce((best, o) =>
    (o.priceNum ?? o.priceMin ?? 0) > (best.priceNum ?? best.priceMin ?? 0) ? o : best
  );
}

const TRADE_HINTS: Record<string, string[]> = {
  fiber: ['fiber', 'splice', 'otdr', 'osp'],
  data: ['cabling', 'low voltage', 'low-voltage', 'cat6', 'structured', 'closeout', 'cut sheet'],
  security: ['camera', 'cctv', 'ip camera', 'access control', 'security'],
  electrical: ['electrical', 'panel', 'nec', 'conduit', 'gear', 'service'],
  project: ['foreman', 'project management', 'submittal', 'rfi', 'schedule', 'punch'],
};

function tradeFor(text: string): string | null {
  const t = text.toLowerCase();
  for (const [trade, words] of Object.entries(TRADE_HINTS)) {
    if (words.some((w) => t.includes(w))) return trade;
  }
  return null;
}

export async function POST(req: NextRequest) {
  const auth = authorize(req.headers.get('authorization'), PRICE_CENTS);
  if (!auth.ok) {
    return NextResponse.json(
      { error: auth.error, priceCents: PRICE_CENTS, balanceCents: auth.balanceCents },
      { status: auth.status }
    );
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const goal = String(body.goal ?? '').trim();
  if (!goal) {
    return NextResponse.json(
      { error: 'goal is required: describe the work in a sentence or two' },
      { status: 400 }
    );
  }

  const budgetUsd = Number(body.budgetUsd ?? 0);
  const ongoing = body.ongoing === true;
  const company = String(body.company ?? '').trim() || null;

  const billed = commit(auth.key, TOOL, PRICE_CENTS);
  const tier = tierForBudget(budgetUsd, ongoing);
  const trade = tradeFor(goal);
  const templateMatches = TEMPLATES.filter((t) => (trade ? t.trade === trade : false)).slice(0, 3);
  const cheapestTemplate = templateMatches.length
    ? templateMatches.reduce((a, b) => (a.priceNum <= b.priceNum ? a : b))
    : null;

  const brief = {
    goal,
    company,
    budgetUsd: budgetUsd || null,
    tradeDetected: trade,
    recommendation: tier
      ? {
          engagementId: tier.id,
          name: tier.name,
          priceLabel: tier.priceLabel,
          duration: tier.duration,
          includes: tier.whatYouGet,
          outOfScope: tier.notForThis ?? [],
          youProvide: tier.youProvide,
          terms: PAYMENT_TERMS,
          pricingStatus: PRICING_STATUS,
          bookUrl: `${baseUrl()}${tier.bookHref}`,
        }
      : null,
    // Named explicitly rather than left implicit: the honest answer to a small budget
    // is a template purchase or a strategy hour, not a custom build quote.
    budgetVerdict: tier
      ? `A $${budgetUsd.toLocaleString('en-US')} budget covers ${tier.name} (${tier.priceLabel}).`
      : budgetUsd > 0
        ? `A $${budgetUsd.toLocaleString('en-US')} budget is under the entry price of every ${ongoing ? 'ongoing' : 'one-time'} engagement. Start with a template or a Strategy Hour.`
        : 'No budget stated, so no engagement is recommended — book a discovery call and scope first.',
    templateAlternative: cheapestTemplate
      ? {
          id: cheapestTemplate.id,
          name: cheapestTemplate.name,
          priceLabel: cheapestTemplate.priceLabel,
          setupDays: cheapestTemplate.setupDays,
          why: `Off-the-shelf ${cheapestTemplate.tradeLabel} workflow — ships in ${cheapestTemplate.setupDays} instead of a custom build.`,
          buyUrl: cheapestTemplate.stripeUrl ?? null,
        }
      : null,
    otherTemplates: templateMatches.map((t) => ({ id: t.id, name: t.name, priceLabel: t.priceLabel })),
    nextStep: `${baseUrl()}/book`,
  };

  return NextResponse.json(
    { brief, meter: { callId: billed.entry.id, priceCents: PRICE_CENTS, balanceCents: billed.balanceCents } },
    { headers: meterHeaders(billed) }
  );
}
