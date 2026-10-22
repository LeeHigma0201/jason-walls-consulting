import { StagePills } from "@/components/WorkCard";
import type { Work } from "@/lib/work";

// Compact rows for the unfinished or non-public work. Uses the shared .board look; the
// stage pills drop under the text on a phone so a 320px screen never squeezes the sentence.
const dotClass = (stage: readonly string[]) => (stage.includes("Lab") ? " proto" : stage.includes("Beta") ? " beta" : "");

export function WorkBoard({ items }: { items: Work[] }) {
  return (
    <>
      <ul className="board work-board">
        {items.map((w) => (
          <li key={w.slug} id={w.slug}>
            <span className={`dot${dotClass(w.stage)}`} aria-hidden="true" />
            <div>
              <h3 className="display h3">
                {w.links[0] ? (
                  <a href={w.links[0].href} rel="noopener">{w.name}</a>
                ) : (
                  w.name
                )}
              </h3>
              <small>{w.summary}</small>
            </div>
            <StagePills stage={w.stage} />
          </li>
        ))}
      </ul>
      <style>{`
        .work-board .h3 { font-size: 19px; line-height: 1.25; margin: 0; }
        .work-board small { font-size: 16px; max-width: 62ch; }
        @media (max-width: 559px) {
          .work-board li { grid-template-columns: 14px 1fr; }
          .work-board li > :last-child { grid-column: 2; margin-top: 4px; }
        }
      `}</style>
    </>
  );
}
