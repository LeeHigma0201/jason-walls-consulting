import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/lib/work";

export function StagePills({ stage }: { stage: Work["stage"] }) {
  return (
    <span style={{ display: "inline-flex", gap: 6, flexWrap: "wrap" }}>
      {stage.map((s) => (
        <span key={s} className={`pill ${s === "Live" || s === "App Store" ? "pill-live" : ""}`}>{s}</span>
      ))}
    </span>
  );
}

export function WorkCard({ w, delay = 0 }: { w: Work; delay?: number }) {
  return (
    <article className="card card-hover sr" style={{ ["--d" as string]: `${delay}ms`, padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {w.image ? (
        <Image src={w.image.src} alt={w.image.alt} width={w.image.w} height={w.image.h} sizes="(min-width: 820px) 400px, 100vw" style={{ width: "100%", height: "auto", borderBottom: "1px solid var(--rule)" }} />
      ) : w.icon ? (
        <div style={{ padding: "28px 24px 0", display: "flex", alignItems: "center", gap: 16 }}>
          <Image src={w.icon} alt={`${w.name} app icon`} width={72} height={72} style={{ borderRadius: 16, width: 72, height: 72 }} />
          <Image src="/apps/app-store-badge.svg" alt="Download on the App Store" width={120} height={40} style={{ width: 120, height: 40 }} />
        </div>
      ) : (
        <div style={{ padding: "28px 24px 0" }}><span className="kicker">{w.year}</span></div>
      )}
      <div style={{ padding: 24, display: "grid", gap: 10, flex: 1 }}>
        <StagePills stage={w.stage} />
        <h3 className="display h3" style={{ margin: 0 }}>{w.name}</h3>
        <p className="kicker" style={{ margin: 0 }}>{w.kicker}</p>
        <p style={{ margin: 0, color: "var(--text-mid)", fontSize: 15 }}>{w.summary}</p>
        <Link href={`/work#${w.slug}`} className="nav-link" style={{ fontSize: 12, marginTop: "auto", alignSelf: "start" }}>Read the case →</Link>
      </div>
    </article>
  );
}
