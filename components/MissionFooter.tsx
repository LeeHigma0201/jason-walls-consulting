// Shared footer. Renders the Mission and the cross-routes ("other doors")
// on every page. Theme-aware via CSS variables.

import Link from "next/link";

const DOORS = [
  { href: "/", label: "AI for the trades", subtitle: "the main door · for tradespeople", id: "home" },
  { href: "/templates", label: "Templates", subtitle: "prebuilt · pay once · take delivery", id: "templates" },
  { href: "/concepts", label: "Concepts", subtitle: "the graph that runs the brain", id: "concepts" },
  { href: "/trades", label: "The Receipts", subtitle: "the same offers, invoice-styled", id: "trades" },
  { href: "/story", label: "The Workshop", subtitle: "the editorial · for press", id: "story" },
  { href: "/lab", label: "The Lab", subtitle: "for technical buyers", id: "lab" },
];

export function MissionFooter({
  activeId,
}: {
  activeId: "home" | "lab" | "trades" | "story" | "concepts" | "templates";
}) {
  const others = DOORS.filter((d) => d.id !== activeId);
  return (
    <footer
      style={{
        borderTop: "1px solid var(--rule)",
        padding: "64px 32px 48px",
        marginTop: 96,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "var(--font-plex)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text-mid)",
            marginBottom: 16,
            fontWeight: 600,
          }}
        >
          The Mission
        </p>
        <p
          style={{
            fontFamily: "var(--font-plex)",
            fontSize: 18,
            lineHeight: 1.55,
            maxWidth: 760,
            color: "var(--text)",
            marginBottom: 8,
          }}
        >
          A Master Electrician and Claude, paying forward the expertise AI handed us — to
          the people who couldn't afford it either. <strong>One industry at a time.</strong>
        </p>
        <p
          style={{
            fontFamily: "var(--font-jbm)",
            fontSize: 12,
            color: "var(--text-mid)",
            marginBottom: 56,
            lineHeight: 1.7,
          }}
        >
          two-gate test → does this widen access to expertise, or narrow it?<br />
          does it sound like one of us, or one of them? · fail either, kill it.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 1,
            background: "var(--rule)",
            border: "1px solid var(--rule)",
            marginBottom: 48,
          }}
        >
          {others.map((d) => (
            <Link
              key={d.id}
              href={d.href}
              style={{
                background: "var(--bg)",
                padding: "28px 24px",
                textDecoration: "none",
                color: "var(--text)",
                display: "block",
                transition: "background 0.2s",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-jbm)",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--text-mid)",
                  marginBottom: 10,
                }}
              >
                Other doors → {d.id}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-jbm)",
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  marginBottom: 4,
                }}
              >
                {d.label} →
              </p>
              <p
                style={{
                  fontFamily: "var(--font-plex)",
                  fontSize: 14,
                  color: "var(--text-mid)",
                }}
              >
                {d.subtitle}
              </p>
            </Link>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            fontFamily: "var(--font-jbm)",
            fontSize: 10,
            color: "var(--text-mid)",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            paddingTop: 24,
            borderTop: "1px solid var(--rule)",
          }}
        >
          <span>© 2026 Jason Walls · IBEW Local 369</span>
          <span>
            <Link href="mailto:hi@jasonwalls.work" style={{ color: "var(--text)" }}>
              hi@jasonwalls.work
            </Link>
          </span>
          <span>built with claude · shipped on vercel</span>
        </div>
      </div>
    </footer>
  );
}
