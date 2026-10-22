// Single source of truth for packages and prices. See OFFER.md for the research.
// PRICING_STATUS is "proposed" until Jason approves the numbers; the site shows a marker while so.

export const PRICING_STATUS: "proposed" | "approved" = "proposed";

// The marker text shown with every price. Same wording in strings that contain a price: "(" + PROPOSED_NOTE + ")".
export const PROPOSED_NOTE = "proposed · awaiting approval";

export type OfferTier = {
  id: string;
  name: string;
  priceLabel: string;
  priceNum?: number; // fixed price
  priceMin?: number; // "from" price
  recurring?: "month" | "day";
  duration: string;
  short: string;
  bestFor: string;
  whatYouGet: string[];
  youProvide: string[];
  notForThis: string[];
  featured?: boolean;
  group: "one-time" | "ongoing";
  bookHref: string;
};

export const OFFERS: OfferTier[] = [
  {
    id: "launch-site",
    name: "Launch Site",
    priceLabel: "$3,500",
    priceNum: 3500,
    duration: "1 week · fixed price",
    short: "A site that books work. Up to five pages, live in a week, on your own domain. One fixed price, no monthly plan.",
    bestFor: "A trade or local business whose site doesn't bring in calls.",
    whatYouGet: [
      "Up to 5 pages: home, services, about, contact or booking, one more",
      "Copy drafted from a 30-minute interview with you",
      "Mobile-first design; a booking or quote form that emails you",
      "Schema and Google Business basics so search and AI answers find you",
      "Analytics, fast hosting, your domain connected",
      "One round of revisions and a recorded walkthrough",
    ],
    youProvide: ["Logo and 10+ real photos", "Services and prices", "Domain login", "One call"],
    notForThis: [
      "Logo or brand design, photography, paid ads",
      "Online store catalogs or customer accounts (that's the MVP package)",
    ],
    group: "one-time",
    bookHref: "/contact?package=launch-site",
  },
  {
    id: "business-on-claude",
    name: "Your Business on Claude",
    priceLabel: "$4,500",
    priceNum: 4500,
    duration: "2 weeks · fixed price",
    short: "One to three AI workflows that do the paperwork, installed where your crew already works.",
    bestFor: "A small business whose owner does quotes, summaries and replies at night.",
    whatYouGet: [
      "Half-day session to map the paperwork that eats your evenings",
      "1 to 3 workflows built and installed: estimates from site notes, invoices chased, a photo of a timesheet into a spreadsheet, job summaries, replies in your voice",
      "A guardrail check on every workflow for invented prices and code citations",
      "Plain-English docs and two training sessions for the team",
      "30 days of fixes",
    ],
    youProvide: ["10+ examples of the real paperwork", "Access to the tools you use", "A Claude plan in the business's name (set up together)"],
    notForThis: [
      "Custom software with a database (MVP package)",
      "Ongoing monitoring (Care Plan)",
    ],
    group: "one-time",
    bookHref: "/contact?package=business-on-claude",
  },
  {
    id: "mvp",
    name: "MVP Web App or Internal Tool",
    priceLabel: "from $12,000",
    priceMin: 12000,
    duration: "3 weeks · scoped first",
    short: "Accounts, data, payments, one AI feature if it earns its place. Live on your accounts in three weeks.",
    bestFor: "A founder with one idea, or an owner replacing the spreadsheet that runs the company.",
    whatYouGet: [
      "Written scope and a fixed quote before any money moves",
      "Login, database, admin view, Stripe payments if you sell",
      "One AI feature where it pays: vision, extraction, an assistant",
      "Your calendar or the tools you already pay for, connected",
      "Works on a phone in the truck, not just at a desk",
      "Tests on the money and data paths",
      "A preview link updated every week",
      "Launch on your own accounts; you own code, domain and data",
      "Handover docs, recorded walkthrough, 30 days of fixes",
    ],
    youProvide: ["A decision maker available weekly", "Example data", "Accounts in your name; third-party fees are yours"],
    notForThis: ["Native mobile (iOS package)", "Ongoing feature work (Care Plan or day rate)", "Marketing"],
    featured: true,
    group: "one-time",
    bookHref: "/contact?package=mvp",
  },
  {
    id: "ios-app",
    name: "iOS App to the App Store",
    priceLabel: "from $10,000",
    priceMin: 10000,
    duration: "4 weeks · scoped first",
    short: "From idea to App Store submission. Purchases, privacy page, screenshots and the filing handled.",
    bestFor: "A product your customers will reach for on a job site or in a driveway.",
    whatYouGet: [
      "Capacitor (web + iOS from one codebase) or native SwiftUI, chosen on the call",
      "In-app purchases through StoreKit if you sell",
      "Privacy page and policy; App Store listing and screenshots",
      "Weekly TestFlight builds; submission handled through approval",
      "30 days of fixes after approval",
    ],
    youProvide: ["An Apple Developer account in your name ($99/yr to Apple)", "App name and icon direction", "A tester with an iPhone"],
    notForThis: ["Android (quoted separately)", "A large backend (MVP package)", "Ongoing releases (Care Plan)"],
    group: "one-time",
    bookHref: "/contact?package=ios-app",
  },
  {
    id: "care",
    name: "Care Plan",
    priceLabel: "$400 / mo",
    priceNum: 400,
    recurring: "month",
    duration: "monthly · cancel anytime",
    short: "Anything I built for you, kept alive and improving.",
    bestFor: "Clients who want it watched and nudged forward without a project.",
    whatYouGet: [
      "Hosting and uptime watch",
      "Dependency and security updates",
      "Up to 3 hours of changes a month",
      "A one-page monthly report",
      "Reply within one business day",
    ],
    youProvide: ["A short list of what you'd like changed each month"],
    notForThis: ["Hours don't roll over", "New products (a package instead)"],
    group: "ongoing",
    bookHref: "/contact?package=care",
  },
  {
    id: "day",
    name: "Extra Day",
    priceLabel: "$1,200 / day",
    priceNum: 1200,
    recurring: "day",
    duration: "booked a week ahead",
    short: "A full day on one scoped list. Clients and former clients only.",
    bestFor: "Changes outside a package or plan.",
    whatYouGet: ["One written list, worked top to bottom", "A note at the end of the day on what shipped"],
    youProvide: ["The list, a week ahead"],
    notForThis: ["Open-ended retainers", "First-time work (start with a package)"],
    group: "ongoing",
    bookHref: "/contact?package=day",
  },
];

// Panel circuit for each package, in OFFERS order on the odd (left) side: launch-site 1, business-on-claude 3, ...
export const circuitOf = (id: string) => OFFERS.findIndex((o) => o.id === id) * 2 + 1;

export const ONE_TIME_OFFERS = OFFERS.filter((o) => o.group === "one-time");
export const ONGOING_OFFERS = OFFERS.filter((o) => o.group === "ongoing");

export const PAYMENT_TERMS =
  "50% to start, 50% at launch. On the MVP and iOS packages: 40% to start, 30% at the mid-build preview, 30% at launch.";

// Proposed wording; shown only while GUARANTEE_APPROVED is true. Jason decides.
export const GUARANTEE_APPROVED = false;
export const GUARANTEE =
  "The quote is the price. If scope changes, you get a written change order before anything is billed. If the first weekly preview doesn't match the brief, stop there and pay only for that week.";
