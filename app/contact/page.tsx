import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd, breadcrumb } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a call",
  description: "A 20-minute call, then a written brief with a fixed quote. Tell me the job.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ package?: string }> }) {
  const sp = await searchParams;
  const initialPackage = sp.package ?? "";
  return (
    <>
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <section className="section" style={{ paddingBottom: 24 }}>
        <div className="wrap grid-2" style={{ alignItems: "start" }}>
          <div style={{ display: "grid", gap: 16 }}>
            <p className="kicker sr">Book a call</p>
            <h1 className="display h1 sr" style={{ margin: 0, fontSize: "clamp(36px, 6vw, 64px)", ["--d" as string]: "60ms" }}>
              Tell me the job. <em>I’ll tell you the price.</em>
            </h1>
            <p className="lede sr" style={{ margin: 0, ["--d" as string]: "120ms" }}>
              Write a paragraph below. I reply within one business day with a few times for a 20-minute call. After the call you get a written brief with a fixed quote.
            </p>
            <ul className="check-list sr" style={{ ["--d" as string]: "160ms" }}>
              <li>No retainer talk, no sales deck</li>
              <li>If a package isn’t right for you, I’ll say so</li>
              <li>Your idea stays yours; I don’t shop it around</li>
            </ul>
            <p className="mono sr" style={{ margin: 0, fontSize: 12, color: "var(--text-mid)", ["--d" as string]: "200ms" }}>
              Prefer email? <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>
          <div className="sr" style={{ ["--d" as string]: "140ms" }}>
            {SITE.calLink ? (
              <div className="embed" style={{ marginBottom: 20 }}>
                <iframe src={SITE.calLink} title="Book a 20-minute call" loading="lazy" style={{ height: 640 }} />
              </div>
            ) : null}
            <ContactForm initialPackage={initialPackage} />
          </div>
        </div>
      </section>
    </>
  );
}
