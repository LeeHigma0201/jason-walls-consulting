import Image from "next/image";
import Link from "next/link";
import { A } from "@/lib/assets";
import { OFFERS } from "@/lib/offers";
import { HERO } from "./copy";

// Option 2: the panel. Jason's hard hat and sunglasses photo in brand duotone, and the four packages
// as breakers in a panel directory that flip on one after another as the panel scrolls into view
// (.sr hooks Reveal; shown on at once with reduced motion or without script). Each breaker links to
// its package. Odd circuit numbers, like the left side of a panel.
const CIRCUITS = ["launch-site", "business-on-claude", "mvp", "ios-app"]
  .map((id) => OFFERS.find((o) => o.id === id))
  .filter((o): o is NonNullable<typeof o> => !!o);

export function HeroPanel() {
  return (
    <section className="hx hx-panel" aria-label="Intro">
      <div className="hx-media hx-duo">
        <Image
          src={A.hardhat}
          alt="Jason Walls in sunglasses, a gray hoodie and a hard hat covered in stickers, under a canopy."
          fill
          preload
          sizes="(min-width:900px) 60vw, 100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="hx-shade" aria-hidden="true" />
      <div className="wrap hx-body">
        <p className="kicker hx-kicker">{HERO.kicker}</p>
        <h1 className="display hx-h1">
          Software built by an electrician <em>who ships.</em>
        </h1>
        <nav className="pd sr" aria-labelledby="pd-h">
          <div className="pd-head">
            <span id="pd-h" className="mono">Panel directory</span>
            <span className="mono pd-hint">tap a circuit</span>
          </div>
          <ol className="pd-rows">
            {CIRCUITS.map((o, i) => (
              <li key={o.id} style={{ ["--i" as string]: i }}>
                <Link href={`/services#${o.id}`} className="pd-row">
                  <span className="mono pd-ckt" aria-hidden="true">{i * 2 + 1}</span>
                  <span className="brk" aria-hidden="true"><span className="brk-handle" /></span>
                  <span className="pd-label">
                    <strong>{o.name}</strong>
                    <span className="mono">{o.duration}</span>
                  </span>
                  <span className="pd-led" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <p className="lede hx-lede">{HERO.lede}</p>
        <div className="actions hx-actions">
          <a href="#prices" className="btn btn-primary btn-lg">See the prices</a>
          <Link href="/work" className="btn btn-ghost btn-lg">See the work</Link>
        </div>
      </div>
    </section>
  );
}
