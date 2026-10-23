import Link from "next/link";
import { OFFERS, circuitOf } from "@/lib/offers";
import { HERO } from "./copy";
import { Signature } from "./Signature";

// Option 6: the offer first. No photo on the first screen; the panel directory Jason picked is the
// picture, in the steel tone, with the breakers flipping on as the page loads. The hard hat is a 40px
// signature above the headline, and the full photo stays in the Why section below.
const CIRCUITS = ["launch-site", "business-on-claude", "mvp", "ios-app"]
  .map((id) => OFFERS.find((o) => o.id === id))
  .filter((o): o is NonNullable<typeof o> => !!o);

export function HeroBreakers() {
  return (
    <section className="hx hx-brk tone-steel" aria-label="Intro">
      <div className="wrap hx-body">
        <Signature sub="IBEW Local 369 · Louisville, Kentucky" />
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
                  <span className="mono pd-ckt" aria-hidden="true">{circuitOf(o.id)}</span>
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
        <div className="actions hx-actions">
          <a href="#prices" className="btn btn-primary btn-lg">See the prices</a>
          <Link href="/work" className="btn btn-ghost btn-lg">See the work</Link>
        </div>
        <p className="lede hx-lede">{HERO.lede}</p>
      </div>
    </section>
  );
}
