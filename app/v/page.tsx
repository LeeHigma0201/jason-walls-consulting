import Link from "next/link";

const DIRS = [
  ["a", "Panel room", "Full-bleed photo of Jason at the switchgear, slab headline that states the result, price in the hero, real app screens, prices on the page. Pattern: Hook Agency + Raft Labs + Marc Lou."],
  ["b", "Scoreboard", "Paper, first person, a live scoreboard of everything shipped (honest about stage), real screens in a swipe strip, a plain price table. Pattern: Marc Lou + UX Continuum + 37signals."],
  ["c", "Product first", "Phone in the hero cycling real ChargeRight and BendRight screens, a three-way intent picker, a recommended tier, a week-by-week timeline, a sticky price-and-call bar. Pattern: Linear + House of MVPs + Jobber."],
];

export default function PickPage() {
  return (
    <section className="section">
      <div className="wrap" style={{ display: "grid", gap: 20, maxWidth: 720 }}>
        <p className="kicker">Pick one on your phone</p>
        <h1 className="display h2" style={{ margin: 0 }}>Three directions, same facts.</h1>
        {DIRS.map(([k, name, blurb]) => (
          <Link key={k} href={`/v/${k}`} className="card card-hover" style={{ textDecoration: "none", display: "grid", gap: 8 }}>
            <span className="mono" style={{ color: "var(--accent)", fontSize: 12 }}>{k.toUpperCase()}</span>
            <strong className="display h3">{name}</strong>
            <span style={{ color: "var(--text-mid)", fontSize: 15 }}>{blurb}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
