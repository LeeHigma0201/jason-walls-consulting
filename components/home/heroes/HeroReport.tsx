import Image from "next/image";
import Link from "next/link";
import { A, SIZE } from "@/lib/assets";
import { HERO } from "./copy";
import { Signature } from "./Signature";

// Option 4: the product leads. The approved evening-home scene on top, fading into the Electric Blue
// glow, and the real ChargeRight result tilted in 3D with its numbers legible (the house ad layout in
// TASTE.md, adapted to the site). No portrait on the first screen; the hard hat is a small signature
// under the intro line.
export function HeroReport() {
  return (
    <section className="hx hx-report" aria-label="Intro">
      <div className="hx-media">
        <Image
          src={A.homeEvening}
          alt="A ranch house at dusk with the garage open and an EV parked beside a wall charger."
          fill
          preload
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "72% 50%" }}
        />
      </div>
      <div className="hx-shade" aria-hidden="true" />
      <div className="wrap hx-body">
        <p className="kicker hx-kicker">{HERO.kicker}</p>
        <h1 className="display hx-h1">
          Software built by an electrician <em>who ships.</em>
        </h1>
        <div className="hx-stage">
          <div className="phone hx-crop">
            <Image
              src={A.cr01}
              alt="ChargeRight on iPhone: a panel gauge at 52 percent for a 200A panel, 54A available, marked Ready for EV Charger."
              width={SIZE.screen.w}
              height={SIZE.screen.h}
              sizes="(min-width:900px) 320px, 70vw"
            />
          </div>
          <p className="mono hx-stage-note">ChargeRight, live on the App Store</p>
        </div>
        <div className="actions hx-actions">
          <a href="#prices" className="btn btn-primary btn-lg">See the prices</a>
          <Link href="/work" className="btn btn-ghost btn-lg">See the work</Link>
        </div>
        <p className="lede hx-lede">{HERO.lede}</p>
        <Signature />
      </div>
    </section>
  );
}
