// Single source of truth for the offer tiers.
// Reorganized 2026-05-10: 4 one-time tiers + 2 ongoing tiers.
// "Starts at" language on upper tiers — site does the asking, not Jason.
// All upper-tier engagements include a discovery call: scope first, quote after.

export type OfferTier = {
  id: string;
  name: string;
  priceLabel: string;
  priceNum?: number;
  priceMin?: number;
  recurring?: "month";
  duration: string;
  short: string;
  whatYouGet: string[];
  bookHref: string;
  featured?: boolean;
  group: "one-time" | "ongoing";
  // Risk reversal shown under every tier. Defaults applied below.
  guarantee?: string;
  // Honest scope limits. 2-3 lines per tier. Mirror of templates' notForThis.
  notForThis?: string[];
};

const DEFAULT_GUARANTEE =
  "Not happy in the first 30 days? Full refund. You keep what's shipped.";

export const OFFERS: OfferTier[] = [
  {
    id: "strategy-hour",
    name: "Strategy Hour",
    priceLabel: "$300",
    priceNum: 300,
    duration: "1 call · 60 min",
    short: "Cheaper than one billable electrician hour. Walk away with a workflow you can actually run.",
    whatYouGet: [
      "One sharp call, no fluff",
      "A specific workflow tailored to your actual work",
      "30 days of email follow-up if you get stuck",
    ],
    bookHref: "/book?tier=strategy-hour",
    group: "one-time",
  },
  {
    id: "workflow-week",
    name: "Workflow in a Week",
    priceLabel: "$2,500",
    priceNum: 2500,
    duration: "1 week · fixed",
    short: "One Claude skill, agent, or automation that solves a repeated task. Documented, deployed, yours to keep.",
    whatYouGet: [
      "A single AI workflow built for your real job",
      "Deployed where you work (Slack, browser, phone, CLI)",
      "Walk-through video + plain-English docs",
    ],
    bookHref: "/book?tier=workflow-week",
    group: "one-time",
  },
  {
    id: "custom-build",
    name: "Custom Build",
    priceLabel: "starts at $5,000",
    priceMin: 5000,
    duration: "2–3 weeks · scoped first",
    short: "A real thing — a website, an iOS app, an AI tool, a custom dashboard. Scoped on a discovery call, then fixed-fee.",
    whatYouGet: [
      "Production sites, payments wired, live · Native iOS build, App Store ready · AI that reads the spec the way you would",
      "Full handoff: code, docs, walk-through video",
      "30 days of bug-fix support after delivery",
    ],
    bookHref: "/book?tier=custom-build",
    featured: true,
    group: "one-time",
  },
  {
    id: "full-mvp",
    name: "Idea → Live MVP",
    priceLabel: "starts at $15,000",
    priceMin: 15000,
    duration: "14 days · scoped first",
    short: "Working product live on Day 15. Same craft that built ChargeRight to 680K+ views. Domain, hosting, payments — the whole thing.",
    whatYouGet: [
      "Full mini-MVP shipped, deployed, payment-ready",
      "Domain + hosting + Stripe wired end-to-end",
      "Plain-English handoff so you can keep going on your own",
    ],
    bookHref: "/book?tier=full-mvp",
    group: "one-time",
  },
  {
    id: "tool-tune-up",
    name: "Tool + Tune-up",
    priceLabel: "$299 / mo",
    priceNum: 299,
    recurring: "month",
    duration: "monthly · cancel anytime",
    short: "Keep a tool I built for you alive and improving. Hosting, monitoring, and one hour of my time every month.",
    whatYouGet: [
      "Hosting + uptime monitoring on anything I built for you",
      "1 hour of my time per month for tweaks, fixes, additions",
      "First crack at new Claude features as they ship",
    ],
    bookHref: "/book?tier=tool-tune-up",
    group: "ongoing",
  },
  {
    id: "embedded",
    name: "Embedded Builder",
    priceLabel: "$4,000 / mo",
    priceNum: 4000,
    recurring: "month",
    duration: "monthly · 90-day minimum",
    short: "Ongoing access. I ship 1–2 things a month for you. The way a tradesperson keeps a job — being available when needed.",
    whatYouGet: [
      "1–2 builds shipped per month, scoped together",
      "Slack or phone access for fast calls",
      "First priority on new ideas + Claude features",
    ],
    bookHref: "/book?tier=embedded",
    group: "ongoing",
  },
];

// Apply the default guarantee anywhere it isn't already set.
for (const o of OFFERS) {
  if (o.guarantee === undefined) o.guarantee = DEFAULT_GUARANTEE;
}

export const ONE_TIME_OFFERS = OFFERS.filter((o) => o.group === "one-time");
export const ONGOING_OFFERS = OFFERS.filter((o) => o.group === "ongoing");

export const formatPrice = (n: number) => "$" + n.toLocaleString("en-US");
