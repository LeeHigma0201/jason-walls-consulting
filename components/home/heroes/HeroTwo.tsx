import Image from "next/image";
import Link from "next/link";
import { A, SIZE, STORE } from "@/lib/assets";
import { HERO } from "./copy";

// Option 5: two real screens, no photo. ChargeRight and BendRight side by side on the mid-navy with
// the Electric Blue glow, the headline above them and both buttons on the first screen. The work is
// the picture; the App Store chips under the intro line link to the listings.
export function HeroTwo() {
  return (
    <section className="hx hx-two" aria-label="Intro">
      <div className="wrap hx-body">
        <p className="kicker hx-kicker">{HERO.kicker}</p>
        <h1 className="display hx-h1">
          Software built by an electrician <em>who ships.</em>
        </h1>
        <div className="phones hx-pair">
          <div className="phone hx-crop">
            <Image
              src={A.cr01}
              alt="ChargeRight on iPhone: a panel gauge at 52 percent for a 200A panel, 54A available, marked Ready for EV Charger."
              width={SIZE.screen.w}
              height={SIZE.screen.h}
              sizes="(min-width:900px) 220px, 44vw"
            />
          </div>
          <div className="phone hx-crop hx-crop-top">
            <Image
              src={A.br01}
              alt="BendRight on iPhone: an offset bend from strut to a box knockout, rise 1 1/8 inch."
              width={SIZE.screen.w}
              height={SIZE.screen.h}
              sizes="(min-width:900px) 220px, 44vw"
            />
          </div>
        </div>
        <div className="actions hx-actions">
          <a href="#prices" className="btn btn-primary btn-lg">See the prices</a>
          <Link href="/work" className="btn btn-ghost btn-lg">See the work</Link>
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
      </div>
    </section>
  );
}
