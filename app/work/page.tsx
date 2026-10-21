import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WORK } from "@/lib/work";
import { StagePills } from "@/components/WorkCard";
import { JsonLd, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Work",
  description: "Real projects, honest about stage: ChargeRight (web + iOS), BendRight (iOS), ZombieWells (web), and the AI tooling that runs a one-person shop.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }])} />
      <section className="section" style={{ paddingBottom: 32 }}>
        <div className="wrap" style={{ display: "grid", gap: 16, maxWidth: 860 }}>
          <p className="kicker sr">Work</p>
          <h1 className="display h1 sr" style={{ margin: 0, fontSize: "clamp(36px, 6vw, 64px)", ["--d" as string]: "60ms" }}>
            Problem, what got built, <em>what happened.</em>
          </h1>
          <p className="lede sr" style={{ margin: 0, ["--d" as string]: "120ms" }}>
            Every project below is real and the stage is labelled. Live means you can open it right now. Beta and lab mean exactly that.
          </p>
        </div>
      </section>

      {WORK.map((w, i) => (
        <section key={w.slug} id={w.slug} className="section" style={{ paddingTop: 24, scrollMarginTop: 80 }}>
          <div className="wrap">
            <hr className="rule" style={{ marginBottom: 40 }} />
            <div className="grid-2" style={{ alignItems: "start" }}>
              <div className="sr" style={{ display: "grid", gap: 14 }}>
                <StagePills stage={w.stage} />
                <h2 className="display h2" style={{ margin: 0 }}>{w.name}</h2>
                <p className="kicker" style={{ margin: 0 }}>{w.kicker} · {w.year}</p>
                <p style={{ margin: 0, color: "var(--text-mid)" }}>{w.summary}</p>
                {w.links.length > 0 && (
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {w.links.map((l) => (
                      <a key={l.href} href={l.href} rel="noopener" className="btn btn-ghost" style={{ minHeight: 40, padding: "8px 14px" }}>{l.label} ↗</a>
                    ))}
                  </div>
                )}
                <p className="mono" style={{ margin: 0, fontSize: 11, color: "var(--text-dim)" }}>{w.stack.join(" · ")}</p>
              </div>
              <div className="sr" style={{ ["--d" as string]: "120ms", display: "grid", gap: 16 }}>
                {w.embed ? (
                  <div className="embed">
                    <iframe src={w.embed} title={`${w.name}, live`} loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups" />
                    <p className="mono" style={{ margin: 0, padding: "8px 12px", fontSize: 11, color: "#444", background: "#f4f4f4" }}>live embed of {w.links[0]?.label}</p>
                  </div>
                ) : w.image ? (
                  <Image src={w.image.src} alt={w.image.alt} width={w.image.w} height={w.image.h} sizes="(min-width: 820px) 560px, 100vw" style={{ borderRadius: 8, border: "1px solid var(--rule)", boxShadow: "var(--shadow)" }} />
                ) : w.icon ? (
                  <div className="card" style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <Image src={w.icon} alt={`${w.name} app icon`} width={96} height={96} style={{ borderRadius: 22, width: 96, height: 96 }} />
                    <div style={{ display: "grid", gap: 8 }}>
                      <span className="kicker">On the App Store</span>
                      <a href={w.links[0]?.href} rel="noopener"><Image src="/apps/app-store-badge.svg" alt="Download on the App Store" width={140} height={47} style={{ width: 140, height: 47 }} /></a>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="grid-3" style={{ marginTop: 32 }}>
              <div className="card sr" style={{ ["--d" as string]: "80ms" }}>
                <p className="kicker" style={{ marginBottom: 10 }}>Problem</p>
                <p style={{ margin: 0, fontSize: 15 }}>{w.problem}</p>
              </div>
              <div className="card sr" style={{ ["--d" as string]: "160ms" }}>
                <p className="kicker" style={{ marginBottom: 10 }}>What got built</p>
                <ul className="check-list">{w.built.map((b) => <li key={b}>{b}</li>)}</ul>
              </div>
              <div className="card sr" style={{ ["--d" as string]: "240ms" }}>
                <p className="kicker" style={{ marginBottom: 10 }}>What happened</p>
                <ul className="check-list">{w.result.map((b) => <li key={b}>{b}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="card card-featured sr" style={{ textAlign: "center", display: "grid", gap: 14, padding: "40px 24px" }}>
            <h2 className="display h2" style={{ margin: 0 }}>Yours could be next on this page.</h2>
            <div><Link href="/contact" className="btn btn-primary btn-lg">Book a call</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
