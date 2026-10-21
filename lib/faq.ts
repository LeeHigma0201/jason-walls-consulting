export type Faq = { q: string; a: string };

export const FAQ: Faq[] = [
  {
    q: "Is the price really fixed?",
    a: "Yes. Every package starts with a written scope and a quote. The quote is the price. If you add scope mid-build, you get a written change order first, and you decide.",
  },
  {
    q: "How can one person build this fast?",
    a: "I build with Claude Code and run parallel agent sessions from my phone, with an independent verifier that checks the builder's work. About 40 sessions and 250 agent runs a week. That's the same way ChargeRight, BendRight and ZombieWells were built. You get a preview link every week so the speed is visible, not claimed.",
  },
  {
    q: "Do I own the code?",
    a: "Yes. Everything is built on accounts in your name (hosting, domain, payments, app store). At launch you have the repo, the docs and a recorded walkthrough. You can take it to anyone.",
  },
  {
    q: "What do you need from me?",
    a: "One decision maker who can answer questions weekly, real examples (photos, paperwork, data), and the accounts in your name. Each package lists exactly what you provide.",
  },
  {
    q: "What if I only have an idea and no spec?",
    a: "That's normal. The discovery call is 20 minutes. From it I write a scoped brief: what we build, what we don't, what you provide, and the price. You review it before anything starts.",
  },
  {
    q: "Are you an electrician or a developer?",
    a: "Both. I'm an electrician, IBEW Local 369, and I wrote the NEC Article 220 engine that ChargeRight runs on. That's why trades and home-service businesses are the people I build for first: I know what the job actually needs.",
  },
  {
    q: "Web app or iOS app?",
    a: "If your customers use it at a desk or from a link, web. If they reach for it on a job site or in a driveway, iOS. Many builds are web first with an iOS wrapper (Capacitor) later, from one codebase. We decide on the call.",
  },
  {
    q: "What happens after launch?",
    a: "Every package includes 30 days of fixes. After that, the Care Plan ($400 a month) watches hosting, keeps dependencies updated and includes three hours of changes. Or book a day when you need one.",
  },
  {
    q: "Do you work with businesses outside Kentucky?",
    a: "Yes. The work is remote; the weekly preview and the walkthrough recordings work anywhere. I'm in Louisville and happy to meet in person around here.",
  },
  {
    q: "What's not a fit?",
    a: "Big-team enterprise projects, open-ended retainers without a scope, and anything that needs me to invent numbers or claims. If a package isn't right for you, I'll say so on the call.",
  },
];
