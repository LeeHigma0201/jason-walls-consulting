import Link from "next/link";
import { OFFERS } from "@/lib/offers";
import { FAQ } from "@/lib/faq";
import { PackageCard } from "@/components/PackageCard";
import { CtaCard } from "@/components/ui/CtaCard";
import { IntentPicker, type IntentOption } from "@/components/ui/IntentPicker";
import { Proof } from "@/components/home/Proof";
import { Why, type WhyPhoto } from "@/components/home/Why";

// Everything on the home page below the hero (sections 2 to 7). The live home page and the hero
// options under /v/hero share it, so the options differ only in the hero and the Why photo.

const INTENT: IntentOption[] = [
  { id: "trade", label: "I run a trade.", sub: "My website doesn’t bring in calls.", offerId: "launch-site" },
  { id: "paperwork", label: "I do the paperwork at night.", sub: "Quotes, summaries and replies eat my evenings.", offerId: "business-on-claude" },
  {
    id: "idea",
    label: "I have an idea.",
    sub: "Or a spreadsheet that runs the company.",
    offerId: "mvp",
    extraLink: { href: "/services#ios-app", label: "Needs the App Store? See the iOS package" },
  },
];

const PRICE_ORDER = ["launch-site", "business-on-claude", "mvp", "ios-app"];
const PACKAGES = PRICE_ORDER.map((id) => OFFERS.find((o) => o.id === id)).filter((o): o is NonNullable<typeof o> => !!o);

// Price, time, ownership, after launch, in that order. Matched by wording so a reorder in
// lib/faq.ts cannot change which four show here.
const FAQ_PICKS = [/price really fixed/i, /build this fast/i, /own the code/i, /after launch/i]
  .map((re) => FAQ.find((f) => re.test(f.q)))
  .filter((f): f is NonNullable<typeof f> => !!f);

export function HomeRest({ whyPhoto }: { whyPhoto?: WhyPhoto }) {
  return (
    <>
      {/* 2. PROOF */}
      <Proof />

      {/* 3. WHICH ONE SOUNDS LIKE YOU */}
      <section className="section home-alt" aria-labelledby="intent-h">
        <div className="wrap stack-lg">
          <h2 id="intent-h" className="display h2 sr" style={{ margin: 0 }}>Which of these sounds like you?</h2>
          <IntentPicker options={INTENT} />
        </div>
      </section>

      {/* 4. PRICES */}
      <section id="prices" className="section" aria-labelledby="prices-h">
        <div className="wrap stack-lg">
          <div className="stack sr">
            <h2 id="prices-h" className="display h2" style={{ margin: 0 }}>What it costs, in full.</h2>
            <p className="lede" style={{ margin: 0 }}>Every job starts with a written scope and a fixed quote, and you pay what the quote says.</p>
          </div>
          <div className="grid-2" style={{ paddingTop: 8 }}>
            {PACKAGES.map((o, i) => <PackageCard key={o.id} o={o} compact delay={i * 80} />)}
          </div>
          <p className="sr" style={{ margin: 0 }}>
            <Link className="text-link" href="/services#care">Care Plan and extra days</Link>
          </p>
        </div>
      </section>

      {/* 5. WHY AN ELECTRICIAN */}
      <Why photo={whyPhoto} />

      {/* 6. FAQ */}
      <section className="section home-alt" aria-labelledby="faq-h">
        <div className="wrap narrow stack-lg">
          <h2 id="faq-h" className="display h2 sr" style={{ margin: 0 }}>What owners ask first.</h2>
          <div className="stack">
            {FAQ_PICKS.map((f) => (
              <details className="faq sr" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <p className="sr" style={{ margin: 0 }}>
            <Link className="text-link" href="/faq">All questions</Link>
          </p>
        </div>
      </section>

      {/* 7. CLOSE */}
      <section className="section">
        <div className="wrap">
          <CtaCard />
        </div>
      </section>

      <style>{`
        .home-alt { background: var(--bg-2); border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
        .why-photo { height: auto; object-fit: cover; object-position: 50% 30%; }
        @media (max-width: 899px) { .why-photo { aspect-ratio: 1 / 1; } }
        @media (min-width: 900px) { .why-photo { aspect-ratio: 4 / 5; } }
      `}</style>
    </>
  );
}
