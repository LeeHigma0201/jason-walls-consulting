// Dated list for the About page. Every entry traces to PORTFOLIO-EVIDENCE.md (see the facts sheet).
const DATES: { wk: string; title: string }[] = [
  { wk: "2026-03", title: "ZombieWells built in a day, with a Texas attorney" },
  { wk: "2026-07-10", title: "ChargeRight for iOS released" },
  { wk: "2026-07-15", title: "BendRight released" },
  { wk: "2026-07-18", title: "ChargeRight web redesign live at evchargeright.com" },
  { wk: "2026-07-26", title: "Talk at Evolve KY, “Do you really need a panel upgrade?”" },
  { wk: "2026-10-01", title: "Four Claude Code mods go public" },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// "2026-03" -> "March 2026", "2026-07-10" -> "July 10, 2026". Fixed format, no locale or timezone drift.
function human(wk: string): string {
  const [y, m, day] = wk.split("-");
  const month = MONTHS[Number(m) - 1];
  return day ? `${month} ${Number(day)}, ${y}` : `${month} ${y}`;
}

export function Dates() {
  return (
    <ol className="timeline sr">
      {DATES.map((d) => (
        <li key={d.wk}>
          <time className="wk" dateTime={d.wk}>{human(d.wk)}</time>
          <strong>{d.title}</strong>
        </li>
      ))}
    </ol>
  );
}
