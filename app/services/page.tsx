import type { Metadata } from "next";
import Link from "next/link";
import { PackageCard } from "@/components/PackageCard";
import { ONE_TIME_OFFERS, ONGOING_OFFERS, PAYMENT_TERMS, GUARANTEE, GUARANTEE_APPROVED, PRICING_STATUS } from "@/lib/offers";
import { JsonLd, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Services and pricing",
  description: "Launch Site $3,500. Your Business on Claude $4,500. MVP web app from $12,000. iOS app to the App Store from $10,000. Care Plan $400/mo. Fixed price, scoped first.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <section className="section" style={{ paddingBottom: 32 }}>
        <div className="wrap" style={{ display: "grid", gap: 16, maxWidth: 860 }}>
          <p className="kicker sr">Services and pricing</p>
          <h1 className="display h1 sr" style={{ margin: 0, fontSize: "clamp(36px, 6vw, 64px)", ["--d" as string]: "60ms" }}>
            Pay for the build, <em>not the build time.</em>
          </h1>
          <p className="lede sr" style={{ margin: 0, ["--d" as string]: "120ms" }}>
            Four packages with a fixed price and a timeline. Every one starts with a 20-minute call and a written brief, so you know what you’re buying before you buy it.
          </p>
          {PRICING_STATUS === "proposed" && (
            <p className="mono sr" style={{ margin: 0, fontSize: 11, color: "var(--accent)", ["--d" as string]: "160ms" }}>
              Preview note: prices are proposed and awaiting approval.
            </p>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 16 }}>
        <div className="wrap" style={{ display: "grid", gap: 20 }}>
          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", paddingTop: 12 }}>
            {ONE_TIME_OFFERS.map((o, i) => <PackageCard key={o.id} o={o} delay={i * 80} />)}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ display: "grid", gap: 20 }}>
          <div className="sr">
            <p className="kicker" style={{ marginBottom: 10 }}>After launch</p>
            <h2 className="display h2" style={{ margin: 0 }}>Kept alive, <em>kept improving.</em></h2>
          </div>
          <div className="grid-2">
            {ONGOING_OFFERS.map((o, i) => <PackageCard key={o.id} o={o} delay={i * 80} />)}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap grid-2" style={{ alignItems: "start" }}>
          <div className="card sr">
            <p className="kicker" style={{ marginBottom: 10 }}>Payment</p>
            <p style={{ margin: 0, fontSize: 15 }}>{PAYMENT_TERMS}</p>
            <p style={{ margin: "12px 0 0", fontSize: 15, color: "var(--text-mid)" }}>Third-party costs (hosting, domains, Apple’s $99 developer fee, API usage) are billed to your own accounts, so nothing is marked up and nothing is hidden.</p>
          </div>
          <div className="card sr" style={{ ["--d" as string]: "100ms" }}>
            <p className="kicker" style={{ marginBottom: 10 }}>{GUARANTEE_APPROVED ? "The promise" : "How scope is protected"}</p>
            {GUARANTEE_APPROVED ? (
              <p style={{ margin: 0, fontSize: 15 }}>{GUARANTEE}</p>
            ) : (
              <p style={{ margin: 0, fontSize: 15 }}>The written brief is the contract. If scope changes mid-build, you get a written change order before anything is billed, and you decide.</p>
            )}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="card card-featured sr" style={{ textAlign: "center", display: "grid", gap: 14, padding: "40px 24px" }}>
            <h2 className="display h2" style={{ margin: 0 }}>Not sure which one? <em>That’s what the call is for.</em></h2>
            <div><Link href="/contact" className="btn btn-primary btn-lg">Book a 20-minute call</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
