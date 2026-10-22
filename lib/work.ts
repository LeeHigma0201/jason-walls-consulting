// Work entries. Real projects only. Every claim traces to PORTFOLIO-EVIDENCE.md.
// `stage` is shown on the card as an honest-state pill. Never invent a metric.
// `summary` is the one paragraph the /work page shows for the entry.

export type Stage = "Live" | "App Store" | "Beta" | "Lab" | "Private";

export type Work = {
  slug: string;
  name: string;
  kicker: string;
  stage: Stage[];
  summary: string;
  links: { label: string; href: string }[];
  icon?: string;
  featured?: boolean;
};

export const WORK: Work[] = [
  {
    slug: "chargeright",
    name: "ChargeRight",
    kicker: "EV charger panel check · web + iOS",
    stage: ["Live", "App Store"],
    summary:
      "A homeowner who wants an EV charger needs to know whether the panel has room before paying for an upgrade. ChargeRight answers that with an NEC Article 220 load calculation (220.83(A) for an existing home adding load). I wrote the engine, with edition tables from 2017 to 2026, and built the web app with Stripe checkout and a native SwiftUI iOS app. It is live at evchargeright.com and on the App Store as version 4.0.1.",
    links: [
      { label: "evchargeright.com", href: "https://evchargeright.com" },
      { label: "ChargeRight on the App Store", href: "https://apps.apple.com/us/app/chargeright/id6755695416" },
    ],
    icon: "/screens/cr-icon.png",
    featured: true,
  },
  {
    slug: "bendright",
    name: "BendRight",
    kicker: "Conduit bending calculator · iOS",
    stage: ["App Store"],
    summary:
      "Bending math tends to get done on a scrap of conduit with a Sharpie, so I put offsets, saddles and kicks in a phone app. Version 1.1 adds an AR measure. It is $6.99 on the App Store and was released July 15, 2026.",
    links: [{ label: "BendRight on the App Store", href: "https://apps.apple.com/us/app/bendright/id6779847124" }],
    icon: "/screens/br-icon.png",
    featured: true,
  },
  {
    slug: "zombiewells",
    name: "ZombieWells",
    kicker: "Public-interest well map · web",
    stage: ["Live"],
    summary:
      "The facts about abandoned, leaking oil wells in the Permian Basin were scattered across RRC filings, federal funding notices and news reports, and the cleanup money runs out in 2030. I built a public site with a Texas attorney that gathers the sourced figures and lets anyone report a suspected well. I built the first version in a day.",
    links: [{ label: "zombiewells.com", href: "https://zombiewells.com" }],
    featured: true,
  },
  {
    slug: "shop-tooling",
    name: "The shop's own tooling",
    kicker: "AI operations for a one-person company",
    stage: ["Live", "Private"],
    summary:
      "I run a one-person company, so I built a check that runs on my public posts for banned wording and claims I haven't approved before they go out. I also published four Claude Code mods in a public marketplace on GitHub.",
    links: [{ label: "Claude Code mods on GitHub", href: "https://github.com/LeeHigma0201/claude-code-mods" }],
  },
  {
    slug: "inspectright",
    name: "InspectRight",
    kicker: "Panel-photo findings for home inspectors · web",
    stage: ["Beta"],
    summary:
      "Panel-photo findings for home inspectors. It is in beta on the web, there is no iOS app yet, and there is no public link.",
    links: [],
  },
  {
    slug: "lab",
    name: "In the lab",
    kicker: "Prototypes",
    stage: ["Lab", "Private"],
    summary:
      "BidRight reads a drawing set and flags conflicts between trades. It only runs on my machine, and I am not publishing numbers for it.",
    links: [],
  },
];

export const FEATURED_WORK = WORK.filter((w) => w.featured);
