import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd, breadcrumb, aboutJsonLd } from "@/lib/schema";
import { A, SIZE } from "@/lib/assets";
import { AppStoreCard } from "@/components/about/AppStoreCard";
import { Dates } from "@/components/about/Dates";
import { CtaCard } from "@/components/ui/CtaCard";

export const metadata: Metadata = {
  title: "About",
  description:
    "I'm Jason Walls, an electrician in IBEW Local 369 in Louisville, Kentucky. I built ChargeRight, BendRight and ZombieWells with Claude Code and a crew of agents.",
  alternates: { canonical: "/about" },
};

// Page-local styles: the photo frame crops the tall portrait to 4:5 so it does not fill three phone screens.
const css = `
.about-photo { position: relative; aspect-ratio: 4 / 5; width: 100%; max-width: 480px; overflow: hidden; border-radius: 8px; border: 1px solid var(--rule); background: var(--surface); box-shadow: var(--shadow); }
.about-photo img { display: block; }
.about-dates-h { margin: 0 0 var(--s4); }
`;

export default function AboutPage() {
  return (
    <>
      <style>{css}</style>
      <JsonLd data={[breadcrumb([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]), aboutJsonLd()]} />
      <section className="section">
        <div className="wrap split">
          <div className="span-5 sticky-col">
            <div className="about-photo">
              <Image
                src={A.electrician}
                alt="Jason Walls, an electrician in a hard hat and safety vest, holding a lockout lock in front of an electrical panel."
                width={SIZE.electrician.w}
                height={SIZE.electrician.h}
                preload
                sizes="(min-width:900px) 480px, 100vw"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%" }}
              />
            </div>
          </div>

          <div className="span-7 stack-lg">
            <div className="stack">
              <p className="kicker">About</p>
              <h1 className="display h1" style={{ margin: 0 }}>
                I’m an electrician who builds software.
              </h1>
              <div className="prose stack">
                <p style={{ margin: 0 }}>
                  I’m Jason Walls, an electrician in IBEW Local 369 in Louisville, Kentucky. On a job you learn what the work needs, which is not always what the brochure says.
                </p>
                <p style={{ margin: 0 }}>
                  When AI made it possible for one person to build real software, I started with the tool I wished I’d had on the job, a load calculation a homeowner could run before paying for a panel upgrade they didn’t need. I wrote that engine, and it became ChargeRight. I also built BendRight, and a public map of leaking oil wells with a Texas attorney.
                </p>
                <p style={{ margin: 0 }}>
                  I built all of it with Claude Code and a crew of agents I steer from my phone, and an independent verifier checks the work.
                </p>
              </div>
            </div>

            <AppStoreCard />

            <div>
              <h2 className="display h3 about-dates-h">The dates</h2>
              <Dates />
            </div>

            <div className="card sr" style={{ display: "grid", gap: 8 }}>
              <h2 className="display h3" style={{ margin: 0 }}>Calls</h2>
              <p style={{ margin: 0, color: "var(--text-mid)" }}>
                The Sunday Times asked for a call, and Anthropic reached out. No outlet has published a piece.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap narrow">
          <CtaCard />
        </div>
      </section>
    </>
  );
}
