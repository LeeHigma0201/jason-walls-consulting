import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd, breadcrumb, contactJsonLd } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { A } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell me about the job. We have a free 20-minute call, then I send a written scope with a fixed price.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ package?: string }> }) {
  const sp = await searchParams;
  const initialPackage = typeof sp.package === "string" ? sp.package : "";
  return (
    <>
      <JsonLd data={[contactJsonLd(), breadcrumb([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])]} />
      <style>{`
        .contact-avatar { position: relative; flex: none; width: 80px; height: 80px; border-radius: 50%; overflow: hidden; }
        @media (max-width: 559px) { .contact-avatar { width: 56px; height: 56px; } }
      `}</style>
      <section className="section ph" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="split">
            <div className="span-7">
              <p className="kicker">Contact</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "12px 0 0" }}>
                <div className="contact-avatar">
                  <Image
                    src={A.hardhat}
                    alt="Jason Walls in sunglasses and a gray hoodie under a hard hat covered in stickers"
                    width={160}
                    height={213}
                    sizes="160px"
                    style={{ position: "absolute", width: "190.5%", height: "auto", maxWidth: "none", left: "-35.7%", top: "-81%" }}
                  />
                </div>
                <h1 className="display h1" style={{ margin: 0 }}>Tell me about the job.</h1>
              </div>
              <p className="lede" style={{ margin: "16px 0 24px" }}>
                Write a few lines and pick the package closest to it, or say you aren’t sure. I read every message myself.
              </p>
              <ContactForm initialPackage={initialPackage} />
            </div>
            <aside className="span-5">
              <div className="card sr stack">
                <h2 className="display h3" style={{ margin: 0 }}>What happens next</h2>
                <p style={{ margin: 0 }}>
                  We have a 20-minute call. Then I send a written scope with a fixed price, and nothing starts until you agree to it.
                </p>
                {SITE.email ? (
                  <p style={{ margin: 0 }}>
                    Prefer email? Write to <a className="text-link" href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  </p>
                ) : null}
                {SITE.calLink ? (
                  <div className="embed">
                    <iframe src={SITE.calLink} title="Book a free 20-minute call" loading="lazy" style={{ height: 560 }} />
                  </div>
                ) : null}
                <p style={{ margin: 0, color: "var(--text-mid)" }}>I’m in Louisville and happy to meet around here.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
