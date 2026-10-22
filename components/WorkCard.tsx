import Image from "next/image";
import { StoreBadge } from "@/components/ui/StoreBadge";
import { Phones } from "@/components/ui/Phones";

// Honest-state pills. Accepts any label; known ones get a style. "Lab" displays as "Prototype".
const PILL: Record<string, { cls: string; text?: string }> = {
  Live: { cls: "pill-live" },
  "App Store": { cls: "pill-store" },
  Beta: { cls: "pill-beta" },
  Prototype: { cls: "pill-proto" },
  Lab: { cls: "pill-proto", text: "Prototype" },
  Private: { cls: "" },
};

export function StagePills({ stage }: { stage: readonly string[] }) {
  return (
    <span style={{ display: "inline-flex", gap: 6, flexWrap: "wrap" }}>
      {stage.map((s) => (
        <span key={s} className={`pill ${PILL[s]?.cls ?? ""}`}>{PILL[s]?.text ?? s}</span>
      ))}
    </span>
  );
}

// Structural subset of lib/work.ts Work, so a Work entry can be passed straight in.
export type WorkCardData = {
  slug: string;
  name: string;
  kicker: string;
  stage: readonly string[];
  summary?: string;
  icon?: string;
  links?: readonly { label: string; href: string }[];
};

// One product entry on /work: app icon if there is one, StagePills, h3, kicker, one paragraph,
// links (App Store links show the badge), optional real screens. wide = full width at 900+ (ChargeRight).
// body defaults to w.summary.
export function WorkCard({
  w, body, screens, wide = false, delay = 0,
}: {
  w: WorkCardData;
  body?: string;
  screens?: { src: string; alt: string }[];
  wide?: boolean;
  delay?: number;
}) {
  return (
    <article id={w.slug} className={`card work-card sr${wide ? " wide" : ""}`} style={{ ["--d" as string]: `${delay}ms` }}>
      {w.icon && (
        <div className="work-media work-icon">
          <Image src={w.icon} alt="" width={72} height={72} style={{ borderRadius: 16, width: 72, height: 72 }} />
        </div>
      )}
      <div className="work-body">
        <StagePills stage={w.stage} />
        <h3 className="display h3" style={{ margin: 0 }}>{w.name}</h3>
        <p className="kicker" style={{ margin: 0 }}>{w.kicker}</p>
        <p style={{ margin: 0, color: "var(--text-mid)", maxWidth: "62ch" }}>{body ?? w.summary}</p>
        {w.links && w.links.length > 0 && (
          <div className="work-links">
            {w.links.map((l) =>
              l.href.includes("apps.apple.com") ? (
                <StoreBadge key={l.href} href={l.href} label={l.label} />
              ) : (
                <a key={l.href} className="text-link" href={l.href} rel="noopener">{l.label}</a>
              ),
            )}
          </div>
        )}
      </div>
      {screens && screens.length > 0 && (
        <div className="work-screens"><Phones screens={screens} /></div>
      )}
    </article>
  );
}
