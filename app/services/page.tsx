import type { Metadata } from "next";
import { PackageCard } from "@/components/PackageCard";
import { PageHead } from "@/components/PageHead";
import { A } from "@/lib/assets";
import { CtaCard } from "@/components/ui/CtaCard";
import { FixesFact, PaymentFacts } from "@/components/services/ServiceFacts";
import { ONE_TIME_OFFERS, ONGOING_OFFERS, OFFERS, PROPOSED_NOTE } from "@/lib/offers";
import { JsonLd, breadcrumb, servicesJsonLd } from "@/lib/schema";

// Lowest one-time price, read from OFFERS at render time (never typed here).
const lowest = Math.min(...ONE_TIME_OFFERS.map((o) => o.priceNum ?? o.priceMin ?? Infinity));
const lowestLabel = `$${lowest.toLocaleString("en-US")}`;

export const metadata: Metadata = {
  title: "Prices: sites, AI workflows, MVPs, iOS apps",
  description: `Fixed-price packages from ${lowestLabel} for trades and small shops. Prices are ${PROPOSED_NOTE}.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumb([{ name: "Home", path: "/" }, { name: "Prices", path: "/services" }]),
          servicesJsonLd(OFFERS),
        ]}
      />

      <PageHead
        kicker="Prices"
        title="What it costs, what you get, and what I need from you."
        photo={{
          src: A.jobsite,
          alt: "Jason Walls looking into the camera in a sticker-covered hard hat, safety glasses and a hi-vis vest, beside crated equipment on a warehouse job.",
          pos: "30% 28%",
        }}
      >
        <p className="lede">
          Every job starts with a written scope and a fixed quote, and the price only changes if you approve a written change order. Every price here is {PROPOSED_NOTE}.
        </p>
      </PageHead>

      <section className="section" style={{ paddingTop: 16, paddingBottom: 48 }}>
        <div className="wrap narrow stack-lg">
          <h2 className="display h2" style={{ margin: 0 }}>The four packages.</h2>
          <div className="stack-lg" style={{ paddingTop: 12 }}>
            {ONE_TIME_OFFERS.map((o, i) => <PackageCard key={o.id} o={o} delay={i * 60} />)}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, paddingBottom: 48 }}>
        <div className="wrap narrow stack-lg">
          <div className="stack">
            <h2 className="display h2" style={{ margin: 0 }}>After launch.</h2>
            <FixesFact />
          </div>
          <div className="grid-2" style={{ alignItems: "stretch" }}>
            {ONGOING_OFFERS.map((o, i) => <PackageCard key={o.id} o={o} delay={i * 60} />)}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, paddingBottom: 48 }}>
        <div className="wrap narrow stack">
          <h2 className="display h2" style={{ margin: 0 }}>How payment works.</h2>
          <PaymentFacts />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap narrow">
          <CtaCard title="Tell me which package is closest." />
        </div>
      </section>
    </>
  );
}
