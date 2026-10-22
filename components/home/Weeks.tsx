import Link from "next/link";

// Home section 5: what each package looks like by week. Vertical on phone, horizontal track at 900+.
// Package names only, no figures; prices live in the section above.
const WEEKS = [
  { wk: "Before week 1", title: "Call and quote", text: "A free 20-minute call, then a written brief and a fixed quote." },
  { wk: "Week 1", title: "Launch Site", text: "A Launch Site goes live on your domain." },
  { wk: "Week 2", title: "Your Business on Claude", text: "Your paperwork workflows are installed where your crew already works." },
  { wk: "Week 3", title: "MVP", text: "An MVP is live on your own accounts." },
  { wk: "Week 4", title: "iOS app", text: "An iOS app goes through App Store submission." },
];

export function Weeks() {
  return (
    <section className="section home-alt" aria-labelledby="weeks-h">
      <div className="wrap stack-lg">
        <div className="stack sr">
          <h2 id="weeks-h" className="display h2" style={{ margin: 0, maxWidth: "20ch" }}>
            What each package looks like by week.
          </h2>
          <p className="lede" style={{ margin: 0 }}>Each job is one of these, not a sequence.</p>
        </div>
        <ol className="timeline timeline-h sr" style={{ ["--d" as string]: "80ms" }}>
          {WEEKS.map((w) => (
            <li key={w.wk}>
              <span className="wk">{w.wk}</span>
              <strong>{w.title}</strong>
              <p>{w.text}</p>
            </li>
          ))}
        </ol>
        <p className="measure sr" style={{ margin: 0, color: "var(--text-mid)" }}>
          On MVP and iOS jobs you get a preview every week, so you see the progress.
        </p>
        <p className="sr" style={{ margin: 0 }}>
          <Link className="text-link" href="/process">How a job runs</Link>
        </p>
      </div>
    </section>
  );
}
