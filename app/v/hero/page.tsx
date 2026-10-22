import Link from "next/link";

const OPTIONS = [
  ["1", "Lift", "The jobsite photo under the warehouse steel, fading into Electric Blue, with the real ChargeRight screen tilted in 3D beside the headline and both app icons."],
  ["2", "Panel", "Hard hat and sunglasses in brand duotone, and the four packages as breakers in a panel directory that flip on one by one. Tap a breaker to open that package."],
  ["3", "Jobsite", "Full-screen straight-on jobsite photo that slowly settles in, a caption-style headline with the key words on blue, and the six real app screens rolling underneath."],
];

export default function HeroPick() {
  return (
    <section className="section">
      <div className="wrap" style={{ display: "grid", gap: 20, maxWidth: 720 }}>
        <p className="kicker">Pick one on your phone</p>
        <h1 className="display h2" style={{ margin: 0 }}>Three heroes, same words, three photos.</h1>
        {OPTIONS.map(([k, name, blurb]) => (
          <Link key={k} href={`/v/hero/${k}`} className="card card-hover" style={{ textDecoration: "none", display: "grid", gap: 8 }}>
            <span className="mono" style={{ color: "var(--accent-text)", fontSize: 12 }}>{k}</span>
            <strong className="display h3">{name}</strong>
            <span style={{ color: "var(--text-mid)", fontSize: 15 }}>{blurb}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
