import Image from "next/image";
import Link from "next/link";
import { A, SIZE, STORE } from "@/lib/assets";
import { HERO } from "./copy";

// Option 1: the house look. Real jobsite photo on top, fading into an Electric Blue glow, with the
// real ChargeRight screen tilted in 3D beside the headline: he leads, the product proves it.
export function HeroLift() {
  return (
    <section className="hx hx-lift" aria-label="Intro">
      <div className="hx-media">
        <Image
          src={A.lift}
          alt="Jason Walls in a sticker-covered hard hat, safety glasses and a hi-vis vest, under the steel roof of a warehouse job."
          fill
          preload
          sizes="(min-width:900px) 60vw, 100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="hx-shade" aria-hidden="true" />
      <div className="wrap hx-body">
        <div className="hx-lift-row">
          <div className="stack" style={{ gap: 12 }}>
            <p className="kicker hx-kicker">{HERO.kicker}</p>
            <h1 className="display hx-h1">
              Software built by an electrician <em>who ships.</em>
            </h1>
          </div>
          <div className="hx-tilt">
            <div className="phone">
              <Image
                src={A.cr01}
                alt="ChargeRight on iPhone: a panel gauge at 52 percent for a 200A panel, marked Ready for EV Charger."
                width={SIZE.screen.w}
                height={SIZE.screen.h}
                sizes="(min-width:900px) 240px, 34vw"
              />
            </div>
          </div>
        </div>
        <p className="lede hx-lede">{HERO.lede}</p>
        <ul className="hx-chips" aria-label="Live on the App Store">
          <li>
            <a href={STORE.chargeright} rel="noopener">
              <Image src={A.crIcon} alt="" width={28} height={28} />
              <span>ChargeRight</span>
            </a>
          </li>
          <li>
            <a href={STORE.bendright} rel="noopener">
              <Image src={A.brIcon} alt="" width={28} height={28} />
              <span>BendRight</span>
            </a>
          </li>
          <li className="mono hx-chip-note">on the App Store</li>
        </ul>
        <div className="actions hx-actions">
          <a href="#prices" className="btn btn-primary btn-lg">See the prices</a>
          <Link href="/work" className="btn btn-ghost btn-lg">See the work</Link>
        </div>
      </div>
    </section>
  );
}
