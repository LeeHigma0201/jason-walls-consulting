// Site-wide constants. Facts here must trace to PORTFOLIO-EVIDENCE.md.

export const SITE = {
  name: "Jason Walls",
  url: "https://jason-walls.vercel.app", // no custom domain yet (Vercel project `jason-walls`)
  tagline: "Software built by an electrician who ships.",
  description:
    "I'm an electrician in Louisville. I build websites, AI workflows, web apps and iOS apps for trades and small businesses, and I have two apps on the App Store.",
  // Public address, from the environment only. Empty = no address shown; the form is the only route.
  // (hi@jasonwalls.work is not live: the domain is unregistered, so no default is hard-coded.)
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  // Set to a Cal.com / Calendly URL to show the booking embed on /contact. Empty = email-only.
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "",
  location: "Louisville, Kentucky",
  x: "https://x.com/walls_jason1",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  github: "https://github.com/LeeHigma0201",
  appStoreDeveloper: "https://apps.apple.com/us/developer/jason-lloyd-walls/id1855640312",
};

// Top bar and phone bar share this order. The label is "Prices"; the route stays /services.
export const NAV = [
  { href: "/services", label: "Prices" },
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
] as const;

// Last item in the top bar. The phone bar's accent "Call" tab points at the same href.
export const NAV_CTA = { href: "/contact", label: "Free 20-min call" } as const;

// Footer column 2.
export const FOOTER_NAV = [
  ...NAV,
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
