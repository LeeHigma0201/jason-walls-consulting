import type { Metadata } from "next";
import { A } from "@/lib/assets";
import { WORK } from "@/lib/work";
import { WorkCard } from "@/components/WorkCard";
import { WorkBoard } from "@/components/work/WorkBoard";
import { CtaCard } from "@/components/ui/CtaCard";
import { PageHead } from "@/components/PageHead";
import { JsonLd, breadcrumb, workJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Work",
  description:
    "What I have built and where each one stands: ChargeRight (web and iOS), BendRight (iOS), ZombieWells (web), and the tooling behind a one-person shop.",
  alternates: { canonical: "/work" },
};

const bySlug = (slug: string) => WORK.find((w) => w.slug === slug)!;

const CR_SCREENS = [
  { src: A.cr01, alt: "ChargeRight on iPhone: a 200A panel at 52% utilization with 54A available and the label Ready for EV Charger." },
  { src: A.cr02, alt: "ChargeRight on iPhone: the assessment step that asks for a photo of the electrical panel, showing a panel with the door open." },
  { src: A.cr03, alt: "ChargeRight on iPhone: the home questions screen with panel size, square footage, heating type and appliances." },
];
const BR_SCREENS = [
  { src: A.br01, alt: "BendRight on iPhone: the offset bend screen with a strut to box knockout rise of 1 1/8 inch at a 30 degree angle." },
  { src: A.br02, alt: "BendRight on iPhone: offset marks, 2 1/4 inches between marks, with the finished offset and the marks on the stick." },
  { src: A.br03, alt: "BendRight on iPhone: the 90 degree stub-up screen with a 12 inch stub and a mark at 7 inches from the end." },
];

export default function WorkPage() {
  const cr = bySlug("chargeright");
  const br = bySlug("bendright");
  const zw = bySlug("zombiewells");
  const board = ["shop-tooling", "inspectright", "lab"].map(bySlug);

  return (
    <>
      <JsonLd data={[breadcrumb([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }]), workJsonLd(WORK)]} />

      <PageHead kicker="Work" title={<>What I have built, and where <em>each one stands.</em></>} />

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap" style={{ display: "grid", gap: 32 }}>
          <h2 className="display h2" style={{ margin: 0 }}>Three you can open today.</h2>
          <div className="stack-lg">
            <WorkCard w={cr} wide screens={CR_SCREENS} />
            <div className="grid-2" style={{ alignItems: "start" }}>
              <WorkCard w={br} screens={BR_SCREENS} delay={60} />
              <WorkCard w={zw} delay={120} />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap narrow" style={{ display: "grid", gap: 24 }}>
          <h2 className="display h2" style={{ margin: 0 }}>The rest of the shop.</h2>
          <WorkBoard items={board} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap narrow">
          <CtaCard title="Have something like one of these in mind?" />
        </div>
      </section>
    </>
  );
}
