import type { Metadata } from "next";
import Link from "next/link";
import { Checker } from "@/components/ui/Checker";
import { CtaCard } from "@/components/ui/CtaCard";
import { JsonLd, breadcrumb, processJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How a job runs: a free 20-minute call, a written brief, a fixed quote, the build, launch on accounts in your name, and care if you want it.",
  alternates: { canonical: "/process" },
};

const STEPS = [
  {
    wk: "Step 1",
    name: "Discovery call",
    text: "Twenty minutes and free. You tell me what you want built, and I will say on the call if a package is not right for you.",
  },
  {
    wk: "Step 2",
    name: "Scoped brief",
    text: "I write down what we build, what we do not build, what you provide, and the price. You read it before anything starts.",
  },
  {
    wk: "Step 3",
    name: "Fixed quote",
    text: "The quote is the price. If you add scope mid-build I send a written change order first and you decide. You pay 50% to start, or 40% on an MVP or iOS job.",
  },
  {
    wk: "Step 4",
    name: "Build",
    text: "On MVP and iOS jobs you get a preview every week, a link for web or a TestFlight build for iOS.",
  },
  {
    wk: "Step 5",
    name: "Launch",
    text: "Everything goes live on accounts in your name, and you own all of it.",
  },
  {
    wk: "Step 6",
    name: "Care",
    text: "If you want it, the Care Plan keeps it running.",
    link: { href: "/services#care", label: "See the Care Plan" },
  },
];

export default function ProcessPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumb([{ name: "Home", path: "/" }, { name: "Process", path: "/process" }]),
          processJsonLd(STEPS.map((s) => ({ name: s.name, text: s.text }))),
        ]}
      />

      <section className="section" style={{ paddingBottom: 32 }}>
        <div className="wrap narrow" style={{ display: "grid", gap: 16 }}>
          <p className="kicker">Process</p>
          <h1 className="display h1" style={{ margin: 0 }}>How a job runs, from the first call to launch.</h1>
          <p className="lede" style={{ margin: 0 }}>The order is the same for every package.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 16 }}>
        <div className="wrap narrow">
          <ol className="timeline">
            {STEPS.map((s, i) => (
              <li key={s.name} id={`step-${i + 1}`} className={i < 2 ? undefined : "sr"} style={i < 2 ? undefined : { ["--d" as string]: `${(i - 2) * 60}ms` }}>
                <span className="wk">{s.wk}</span>
                <strong className="display">{s.name}</strong>
                <p>
                  {s.text}
                  {s.link && (
                    <>
                      {" "}
                      <Link href={s.link.href} className="text-link">{s.link.label}</Link>
                    </>
                  )}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
        <div className="wrap narrow" style={{ display: "grid", gap: 24 }}>
          <h2 className="display h2" style={{ margin: 0 }}>How the work gets checked.</h2>
          <Checker />
          <p className="measure" style={{ margin: 0, color: "var(--text-mid)" }}>
            Every price and code citation in my public posts is checked against a list of what I can actually claim before it goes out.
          </p>
          <p style={{ margin: 0 }}>
            <Link href="/faq" className="text-link">Questions owners ask me</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <CtaCard />
        </div>
      </section>
    </>
  );
}
