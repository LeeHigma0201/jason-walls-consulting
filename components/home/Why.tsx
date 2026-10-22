import Link from "next/link";
import Image from "next/image";
import { A, SIZE } from "@/lib/assets";
import { Checker } from "@/components/ui/Checker";

export type WhyPhoto = { src: string; alt: string; w: number; h: number };

const HARDHAT: WhyPhoto = {
  src: A.hardhat,
  alt: "Jason Walls in sunglasses, a gray hoodie and a hard hat covered in stickers, under a canopy.",
  w: SIZE.hardhat.w,
  h: SIZE.hardhat.h,
};

// Home section 6: why an electrician. Photo first in the DOM (phone: photo on top), 5 / 7 columns at 900+.
// The hero options pass a different photo so the same picture never shows twice on one page.
export function Why({ photo = HARDHAT }: { photo?: WhyPhoto }) {
  return (
    <section className="section" aria-labelledby="why-h">
      <div className="wrap split">
        <div className="span-5 sr">
          <Image
            className="why-photo"
            src={photo.src}
            alt={photo.alt}
            width={photo.w}
            height={photo.h}
            sizes="(min-width:900px) 440px, 100vw"
            style={{ width: "100%", borderRadius: 8, border: "1px solid var(--rule)" }}
          />
        </div>
        <div className="span-7 stack-lg">
          <div className="stack sr">
            <h2 id="why-h" className="display h2" style={{ margin: 0 }}>
              I wrote the load calculation that ChargeRight runs on.
            </h2>
            <p className="prose" style={{ margin: 0, color: "var(--text-mid)" }}>
              I’m an electrician in IBEW Local 369, so I know what a panel schedule, a timesheet and a quote look like on a real job. I build with Claude Code and start about 40 sessions a week, with about 250 agent and scheduled runs a week behind them.
            </p>
          </div>
          <Checker />
          <p className="sr" style={{ margin: 0 }}>
            <Link className="text-link" href="/about">About me</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
