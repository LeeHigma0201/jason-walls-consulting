import Link from "next/link";
import { SITE } from "@/lib/site";

// The one closing call-to-action block. Replaces every hand-rolled CTA card. Server component.
// Wrap it in a <section className="section"><div className="wrap">. Heading is an h2.
export function CtaCard({
  title = "Tell me what is eating your week.",
  body = "The first call is free and runs 20 minutes. Afterward I write up what I would build, what I would leave out, and the price, and you decide after you read it.",
  primaryLabel,
  showEmail = true,
}: {
  title?: string;
  body?: string;
  primaryLabel?: string;
  showEmail?: boolean;
}) {
  const label = primaryLabel ?? (SITE.calLink ? "Book a free 20-minute call" : "Write to me about the job");
  return (
    <div className="card card-featured sr" style={{ display: "grid", gap: 16 }}>
      <h2 className="display h2" style={{ margin: 0, maxWidth: "20ch" }}>{title}</h2>
      <p className="measure" style={{ margin: 0, color: "var(--text-mid)" }}>{body}</p>
      <div className="actions">
        <Link href="/contact" className="btn btn-primary btn-lg">{label}</Link>
      </div>
      {showEmail && SITE.email && (
        <p style={{ margin: 0, color: "var(--text-mid)", fontSize: 16 }}>
          Or write to <a className="text-link" href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      )}
    </div>
  );
}
