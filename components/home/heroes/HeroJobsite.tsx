import Image from "next/image";
import Link from "next/link";
import { A, SCREENS, SIZE } from "@/lib/assets";
import { HERO } from "./copy";

// Option 3: the jobsite frame. Full-bleed straight-on photo from a warehouse job that settles in with
// a slow zoom, a caption-style headline with the key words on Electric Blue (his picked caption look),
// and a strip of the six real App Store screens rolling underneath, with the intro line above it so
// the first screen is only the photo, the headline and the buttons. Reduced motion: no zoom, the strip
// becomes a swipe row.
export function HeroJobsite() {
  return (
    <>
      <section className="hx hx-job" aria-label="Intro">
        <div className="hx-media hx-zoom">
          <Image
            src={A.jobsite}
            alt="Jason Walls looking into the camera in a sticker-covered hard hat, safety glasses and a hi-vis vest, beside crated equipment on a warehouse job."
            fill
            preload
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hx-shade" aria-hidden="true" />
        <div className="wrap hx-body">
          <p className="kicker hx-kicker">{HERO.kicker}</p>
          <h1 className="display hx-h1 hx-cap">
            Software built by an <mark>electrician</mark> who <mark>ships.</mark>
          </h1>
          <div className="actions hx-actions">
            <a href="#prices" className="btn btn-primary btn-lg">See the prices</a>
            <Link href="/work" className="btn btn-ghost btn-lg">See the work</Link>
          </div>
        </div>
      </section>
      <div className="reel" role="region" aria-label="Real screens from ChargeRight and BendRight" tabIndex={0}>
        <div className="wrap">
          <p className="lede reel-lede">{HERO.lede}</p>
          <p className="mono reel-label">Shipped and live on the App Store</p>
        </div>
        <div className="reel-track">
          {[...SCREENS, ...SCREENS].map((s, i) => (
            <div className="phone" key={`${s.src}-${i}`} aria-hidden={i >= SCREENS.length ? true : undefined}>
              <Image src={s.src} alt={i >= SCREENS.length ? "" : s.alt} width={SIZE.screen.w} height={SIZE.screen.h} sizes="132px" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
