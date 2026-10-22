import type { Metadata } from "next";
import { FAQ } from "@/lib/faq";
import { JsonLd, breadcrumb, faqSchema } from "@/lib/schema";
import { CtaCard } from "@/components/ui/CtaCard";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Is the price fixed, how long does it take, who owns it, what happens after launch, and who actually does the work. Answers from Jason Walls, an electrician in Louisville.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[faqSchema(), breadcrumb([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])]} />
      <PageHead kicker="FAQ" title="Questions owners ask me.">
        <p className="lede">Price, time, who owns it, and what happens if something goes wrong, in that order.</p>
      </PageHead>
      <section className="section" style={{ paddingTop: 8 }}>
        <div className="wrap narrow">
          {FAQ.map((f, i) => (
            <details className={i < 4 ? "faq" : "faq sr"} key={f.q} style={i < 4 ? undefined : { ["--d" as string]: `${Math.min(i - 4, 6) * 40}ms` }}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="section" style={{ paddingTop: 8 }}>
        <div className="wrap narrow">
          <CtaCard title="Not answered here? Ask me." />
        </div>
      </section>
    </>
  );
}
