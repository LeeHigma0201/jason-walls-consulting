import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JsonLd, breadcrumb } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Jason Walls",
  description: "Electrician, IBEW Local 369, Louisville. Built ChargeRight, BendRight and ZombieWells with Claude Code. Builds software for trades, local businesses and founders.",
  alternates: { canonical: "/about" },
};

const TIMELINE = [
  ["2025 · 12", "ChargeRight starts as a tool for one job: is this panel big enough for a charger? First paying customer by New Year’s Eve. She hit a bug; I refunded her and walked her through the calc by email."],
  ["2026 · 03", "A post about ChargeRight passes 890,000 views. Mark Cuban reposts it and sends a DM. Danny Fortson at the Sunday Times asks for a call. Anthropic reaches out. ZombieWells gets built with attorney Sarah Stogner."],
  ["2026 · 07", "ChargeRight’s redesign goes live at evchargeright.com. ChargeRight and BendRight ship on the App Store. A talk at Evolve KY: do you really need a panel upgrade?"],
  ["2026 · 10", "The shop’s tooling goes public: four Claude Code mods as a marketplace. This page gets rebuilt to do for other people what the last year did for me."],
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <section className="section" style={{ paddingBottom: 32 }}>
        <div className="wrap grid-2" style={{ alignItems: "center" }}>
          <div style={{ display: "grid", gap: 16 }}>
            <p className="kicker sr">About</p>
            <h1 className="display h1 sr" style={{ margin: 0, fontSize: "clamp(36px, 6vw, 64px)", ["--d" as string]: "60ms" }}>
              Electrician first. <em>Builder because of it.</em>
            </h1>
            <div className="prose sr" style={{ color: "var(--text-mid)", ["--d" as string]: "120ms" }}>
              <p>I’m Jason. Electrician, IBEW Local 369, Louisville, Kentucky. Twelve years pulling wire, and I still carry the card.</p>
              <p>The thing about a trade is you learn what a job actually needs, not what the brochure says. When AI made it possible for one person to build real software, the first thing I built was the tool I wished I’d had on the job: a load calculation a homeowner could run before paying for a panel upgrade they didn’t need. That became ChargeRight. Then BendRight for bending conduit. Then a public map of leaking oil wells for an attorney in Texas.</p>
              <p>None of it was built by an agency. It was built by me, with Claude Code and a crew of agents I steer from my phone, checked by an independent verifier, with every public claim run through a linter before it goes out. That’s the process I now sell.</p>
            </div>
          </div>
          <div className="sr" style={{ ["--d" as string]: "160ms" }}>
            <div className="card" style={{ display: "grid", gap: 18 }}>
              <p className="kicker">On the App Store, under my name</p>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <Image src="/apps/chargeright.jpg" alt="ChargeRight app icon" width={64} height={64} style={{ borderRadius: 14, width: 64, height: 64 }} />
                <div><strong>ChargeRight</strong><br /><span className="mono" style={{ fontSize: 11, color: "var(--text-mid)" }}>free · v4.0.1</span></div>
              </div>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <Image src="/apps/bendright.jpg" alt="BendRight app icon" width={64} height={64} style={{ borderRadius: 14, width: 64, height: 64 }} />
                <div><strong>BendRight</strong><br /><span className="mono" style={{ fontSize: 11, color: "var(--text-mid)" }}>$6.99 · v1.1</span></div>
              </div>
              <a href={SITE.appStoreDeveloper} rel="noopener"><Image src="/apps/app-store-badge.svg" alt="Download on the App Store" width={140} height={47} style={{ width: 140, height: 47 }} /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 16 }}>
        <div className="wrap" style={{ display: "grid", gap: 20, maxWidth: 860 }}>
          <p className="kicker sr">The short version</p>
          {TIMELINE.map(([d, t], i) => (
            <div key={d} className="sr" style={{ display: "grid", gridTemplateColumns: "92px 1fr", gap: 16, borderTop: "1px solid var(--rule)", paddingTop: 16, ["--d" as string]: `${i * 60}ms` }}>
              <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>{d}</span>
              <p style={{ margin: 0, color: "var(--text-mid)", fontSize: 15 }}>{t}</p>
            </div>
          ))}
          <p className="mono sr" style={{ margin: 0, fontSize: 11, color: "var(--text-dim)" }}>
            Press is a credential, not the pitch. No outlet has published a feature; the calls were real.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="card card-featured sr" style={{ textAlign: "center", display: "grid", gap: 14, padding: "40px 24px" }}>
            <h2 className="display h2" style={{ margin: 0 }}>If you’ve got a job, <em>I’ve got 20 minutes.</em></h2>
            <div><Link href="/contact" className="btn btn-primary btn-lg">Book a call</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
