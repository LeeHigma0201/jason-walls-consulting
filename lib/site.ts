// Site-wide constants. Facts here must trace to PORTFOLIO-EVIDENCE.md.

export const SITE = {
  name: "Jason Walls",
  legalName: "Jason Walls",
  url: "https://jason-walls.vercel.app", // no custom domain yet (Vercel project `jason-walls`)
  tagline: "Software built by an electrician who ships.",
  description:
    "Websites, iOS apps, internal tools and AI workflows for trades, local businesses and founders. Fixed price, weekly previews, weeks not quarters. Built by an electrician (IBEW Local 369) with two apps on the App Store.",
  email: "hi@jasonwalls.work",
  // Set to a Cal.com / Calendly URL to show the booking embed on /contact. Empty = email-only.
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "",
  location: "Louisville, Kentucky",
  x: "https://x.com/walls_jason1",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  github: "https://github.com/LeeHigma0201",
  appStoreDeveloper: "https://apps.apple.com/us/developer/jason-lloyd-walls/id1855640312",
};

export const NAV = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

// Checkable numbers (PORTFOLIO-EVIDENCE.md §3). Each has a source line.
export const PROOF = [
  { n: "2", label: "apps on the App Store", src: "iTunes lookup API, 2026-10-21" },
  { n: "40", label: "Claude Code sessions a week", src: "OPERATING-MANUAL.md v1.1" },
  { n: "250", label: "agent runs a week", src: "OPERATING-MANUAL.md v1.1" },
  { n: "48", label: "repos in the shop", src: "find ~/dev -maxdepth 2 -name .git | wc -l" },
  { n: "1", label: "person", src: "" },
] as const;
