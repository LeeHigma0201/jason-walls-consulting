// Case studies. Real projects only. Every claim traces to PORTFOLIO-EVIDENCE.md.
// `stage` is shown on the card. Never invent a metric; `result` lines are facts or Jason's own account.

export type Stage = "Live" | "App Store" | "Beta" | "Lab" | "Private";

export type Work = {
  slug: string;
  name: string;
  kicker: string;
  stage: Stage[];
  year: string;
  summary: string;
  problem: string;
  built: string[];
  result: string[];
  stack: string[];
  links: { label: string; href: string }[];
  image?: { src: string; alt: string; w: number; h: number };
  icon?: string;
  embed?: string; // a URL that allows framing
  featured?: boolean;
};

export const WORK: Work[] = [
  {
    slug: "chargeright",
    name: "ChargeRight",
    kicker: "EV charger panel check · web + iOS",
    stage: ["Live", "App Store"],
    year: "2025–2026",
    summary:
      "A homeowner answers a few questions, uploads a photo of the panel, and gets an NEC load calculation that says whether the panel can take a Level 2 charger before anyone pays for an upgrade.",
    problem:
      "Homeowners were being quoted panel upgrades they often didn't need. The math that answers it is in NEC Article 220, and almost nobody runs it before quoting.",
    built: [
      "Questionnaire and report flow with Stripe checkout for the one-time report",
      "NEC Article 220 engine (220.83(A) existing dwelling, 220.87 measured load) with edition tables for 2017 to 2026",
      "Two-pass Gemini vision pipeline: find the main and each breaker, crop, then read amperage and labels with per-field confidence",
      "Native SwiftUI iOS app with StoreKit purchases and receipt verification",
      "Test suite on the calculators, Annex D examples and the money path",
    ],
    result: [
      "Live at evchargeright.com and on the App Store (ChargeRight 4.0.1)",
      "Paying customers for the report",
      "One post about it passed 890,000 views on X; Mark Cuban reposted it and sent a DM",
    ],
    stack: ["Next.js", "Stripe", "Gemini", "Supabase", "SwiftUI", "StoreKit", "Vercel"],
    links: [
      { label: "evchargeright.com", href: "https://evchargeright.com" },
      { label: "App Store", href: "https://apps.apple.com/us/app/chargeright/id6755695416" },
    ],
    image: { src: "/work/chargeright-og.png", alt: "ChargeRight: does your panel have room for an EV charger?", w: 1200, h: 630 },
    icon: "/apps/chargeright.jpg",
    featured: true,
  },
  {
    slug: "bendright",
    name: "BendRight",
    kicker: "Conduit bending calculator · iOS",
    stage: ["App Store"],
    year: "2026",
    summary:
      "Offsets, saddles and kicks worked out on the phone in the pocket, with an AR measure in 1.1. Built the way an electrician would want it: fast, no account, $6.99 once.",
    problem:
      "Bending math gets done on a scrap of conduit with a Sharpie. The apps that exist were either ad-filled or asked for a subscription.",
    built: [
      "Vite + React PWA wrapped with Capacitor 8 for iOS",
      "ARKit measure feature in version 1.1",
      "Paid app on the App Store, launched 2026-07-15, now at 1.1",
    ],
    result: ["Live on the App Store at $6.99", "Promo videos on the ChargeRight YouTube channel"],
    stack: ["Vite", "React", "Capacitor", "ARKit", "Swift"],
    links: [{ label: "App Store", href: "https://apps.apple.com/us/app/bendright/id6779847124" }],
    icon: "/apps/bendright.jpg",
    featured: true,
  },
  {
    slug: "zombiewells",
    name: "ZombieWells",
    kicker: "Public-interest well map · web",
    stage: ["Live"],
    year: "2026",
    summary:
      "A public site that connects the records on abandoned, leaking oil wells in the Permian Basin and lets anyone report a suspected well. Built with attorney Sarah Stogner.",
    problem:
      "The facts were spread across RRC filings, federal funding notices and news reports. Nobody could see them in one place, and the cleanup money runs out in 2030.",
    built: [
      "Research page with sourced figures (RRC, Carbon Tracker, DOI) and an incident record",
      "Report-a-well flow with district and county context",
      "First version built in a day, then iterated with Sarah",
    ],
    result: ["Live at zombiewells.com", "Used by a Texas attorney as a public record of the problem"],
    stack: ["Next.js", "Vercel"],
    links: [{ label: "zombiewells.com", href: "https://zombiewells.com" }],
    image: { src: "/work/zombiewells-og.png", alt: "Zombie Wells: abandoned oil wells poisoning Texas land and water", w: 1200, h: 630 },
    embed: "https://zombiewells.com",
    featured: true,
  },
  {
    slug: "shop-tooling",
    name: "The shop's own tooling",
    kicker: "AI operations for a one-person company",
    stage: ["Live", "Private"],
    year: "2026",
    summary:
      "The systems that let one electrician run product, marketing and support with AI: a marketing operating system with a claims linter, a founder cockpit that pulls every number at 6 AM, and a set of Claude Code mods, four of them public.",
    problem:
      "One person, several products, and an AI that will happily invent a price or a code citation if nobody checks. The tooling exists so nothing goes out unchecked.",
    built: [
      "Marketing OS: rulebook, claims.json, a linter every post runs through, caps on outward actions, a blockers ledger",
      "Founder cockpit: one read-only pull of Stripe, Vercel, Gmail, Calendar and usage into a dashboard and a 10-line morning brief",
      "Claude Code mods: session-claims (parallel sessions see each other), burn-watch (flags banned claims and 'done' without a check), usage-meter, check-ledger, mod-scout, resume-nudge, chrome-cockpit",
      "Video pipeline: stills first, real audio from frame 0, the exported file inspected by contact sheet, silence scan and transcript before anyone sees it",
    ],
    result: [
      "Four mods published as a public Claude Code marketplace",
      "The same tooling is what the 'Your Business on Claude' package installs for a client",
    ],
    stack: ["Claude Code", "TypeScript", "Python", "launchd", "ffmpeg"],
    links: [{ label: "github.com/LeeHigma0201/claude-code-mods", href: "https://github.com/LeeHigma0201/claude-code-mods" }],
  },
  {
    slug: "inspectright",
    name: "InspectRight",
    kicker: "Panel-photo findings for home inspectors · web",
    stage: ["Beta"],
    year: "2026",
    summary:
      "AI panel-photo analysis for home inspectors that returns NEC-cited findings and a shareable report. In beta; not linked until the copy pass is done.",
    problem: "Inspectors photograph every panel and write the same findings by hand.",
    built: ["Next.js app with Supabase, Stripe and Gemini on Vertex AI", "Finding schema with NEC citations and a report view"],
    result: ["Web beta; iOS not shipped"],
    stack: ["Next.js", "Supabase", "Gemini", "Stripe"],
    links: [],
  },
  {
    slug: "lab",
    name: "In the lab",
    kicker: "Prototypes and private builds",
    stage: ["Lab", "Private"],
    year: "2026",
    summary:
      "BidRight reads a full electrical drawing set and flags cross-trade conflicts, scope gaps and RFIs for estimators (prototype). A timesheet tool turns a photo of a handwritten crew sheet into a spreadsheet. And a private, offline voxel game built for my kids.",
    problem: "Ideas get tested as working code in days, then kept or shelved on evidence.",
    built: ["BidRight: TypeScript engine, review UI, YAML knowledge base, 34 tests", "Timesheet photo to Excel with Gemini behind a serverless proxy", "A kid-safe building game, two editions from one codebase"],
    result: ["Prototypes stay honest: no demo numbers get presented as field results"],
    stack: ["TypeScript", "Next.js", "Gemini", "three.js"],
    links: [],
  },
];

export const FEATURED_WORK = WORK.filter((w) => w.featured);
