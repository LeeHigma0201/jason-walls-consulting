import type { Metadata } from "next";
import Link from "next/link";
import { FAQ } from "@/lib/faq";
import { JsonLd, breadcrumb, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Is the price fixed? Do I own the code? How can one person build this fast? Web or iOS? What happens after launch?",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[faqSchema(), breadcrumb([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])]} />
      <section className="section" style={{ paddingBottom: 24 }}>
        <div className="wrap" style={{ display: "grid", gap: 16, maxWidth: 860 }}>
          <p className="kicker sr">FAQ</p>
          <h1 className="display h1 sr" style={{ margin: 0, fontSize: "clamp(36px, 6vw, 64px)", ["--d" as string]: "60ms" }}>
            Straight answers, <em>before the call.</em>
          </h1>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 8 }}>
        <div className="wrap" style={{ maxWidth: 860 }}>
          {FAQ.map((f, i) => (
            <details className="faq sr" key={f.q} style={{ ["--d" as string]: `${i * 40}ms` }} open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
          <div style={{ marginTop: 40 }}>
            <Link href="/contact" className="btn btn-primary btn-lg">Ask the rest on a call</Link>
          </div>
        </div>
      </section>
    </>
  );
}
