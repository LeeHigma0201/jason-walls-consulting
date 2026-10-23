import { OFFERS, PROPOSED_NOTE } from "./offers";

export type Faq = { q: string; a: string };

// The Care Plan price comes from OFFERS so it cannot drift from /services.
const careTier = OFFERS.find((o) => o.id === "care");
const carePrice = careTier?.priceNum ?? 0;

// Order follows the objections owners raise: price, time, ownership, what if it goes wrong
// (something happens to me, after launch), then the rest. Any string that contains a price carries the proposed note.
export const FAQ: Faq[] = [
  {
    q: "Is the price really fixed?",
    a: "Yes. Every package starts with a written scope and a quote. The quote is the price. If you add scope mid-build, you get a written change order first, and you decide.",
  },
  {
    q: "How can one person build this fast?",
    a: "I build with Claude Code on my phone, a second check reviews the work, and on MVP and iOS jobs you see a preview every week. It's how I built ChargeRight, BendRight and ZombieWells.",
  },
  {
    q: "Do I own the code?",
    a: "Yes. Everything is built on accounts in your name (hosting, domain, payments, app store). On the MVP package you get the code, the handover docs and a recorded walkthrough at launch, so you can hand it to another developer. Each package lists what you receive.",
  },
  {
    q: "What if something happens to you?",
    a: "Hosting, domain, code and any payment account are set up in your name and are yours by launch. On the MVP package you also get handover docs and a recorded walkthrough, so another developer can pick it up.",
  },
  {
    q: "What happens after launch?",
    a: `Your Business on Claude, MVP and iOS packages include 30 days of fixes. After that, the Care Plan ($${carePrice} a month, ${PROPOSED_NOTE}) watches your hosting, keeps dependencies updated and includes up to three hours of changes a month. If you are already a client, you can also book a day when you need one.`,
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
    a: "I'm an electrician in IBEW Local 369, and I also wrote the NEC Article 220 engine that ChargeRight runs on. That's why I build for trades and home-service businesses first, because I know what the job actually needs.",
  },
  {
    q: "Web app or iOS app?",
    a: "If your customers use it at a desk or from a link, web. If they reach for it on a job site or in a driveway, iOS. Some builds start as web with an iOS wrapper (Capacitor) later, from one codebase. We decide on the call.",
  },
  {
    q: "Do you work with businesses outside Kentucky?",
    a: "Yes. The work is remote, and the previews and the walkthrough recordings work anywhere. I'm in Louisville and happy to meet in person around here.",
  },
  {
    q: "What's not a fit?",
    a: "Big-team enterprise projects, open-ended retainers without a scope, and anything that needs me to invent numbers or claims. If a package isn't right for you, I'll say so on the call.",
  },
];
