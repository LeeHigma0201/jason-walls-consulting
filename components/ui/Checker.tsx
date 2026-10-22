// How the work is checked: three steps joined by a rule that light up in order, once, as they scroll
// into view (.sr with --d 0 / 150 / 300ms; Reveal adds .in, CSS lights the border). No numbers, no
// percentages, no invented rows. Server component, no props.
const STEPS = ["Agents build it", "An independent verifier checks it", "I approve what goes public or moves money"];

export function Checker() {
  return (
    <ol className="checker" role="list" aria-label="How the work is checked" style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {STEPS.map((s, i) => (
        <li key={s} role="listitem" className="checker-step sr" style={{ ["--d" as string]: `${i * 150}ms` }}>
          {s}
        </li>
      ))}
    </ol>
  );
}
