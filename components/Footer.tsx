import Link from "next/link";
import { FOOTER_NAV, SITE } from "@/lib/site";
import { PROPOSED_NOTE } from "@/lib/offers";

export function Footer() {
  const elsewhere: { href: string; label: string; external?: boolean; rel?: string }[] = [
    { href: `mailto:${SITE.email}`, label: SITE.email },
    { href: SITE.appStoreDeveloper, label: "App Store developer page", external: true },
    { href: "https://evchargeright.com", label: "evchargeright.com", external: true },
    { href: SITE.x, label: "X", external: true, rel: "me" },
    { href: SITE.github, label: "GitHub", external: true, rel: "me" },
    { href: "/llms.txt", label: "llms.txt" },
    ...(SITE.linkedin ? [{ href: SITE.linkedin, label: "LinkedIn", external: true, rel: "me" }] : []),
  ];
  return (
    <footer style={{ borderTop: "1px solid var(--rule)", padding: "48px 0 40px", marginTop: 32 }}>
      <div className="wrap" style={{ display: "grid", gap: 32 }}>
        <div style={{ display: "grid", gap: 32, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <div>
            <p style={{ margin: 0, color: "var(--text-mid)", fontSize: 16, maxWidth: "36ch" }}>
              Jason Walls, electrician, IBEW Local 369, {SITE.location}.
            </p>
          </div>
          <nav aria-label="Pages">
            <p className="kicker" style={{ margin: "0 0 8px" }}>Pages</p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {FOOTER_NAV.map((n) => (
                <li key={n.href}><Link href={n.href} className="foot-link">{n.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="kicker" style={{ margin: "0 0 8px" }}>Elsewhere</p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {elsewhere.map((e) => (
                <li key={e.href}>
                  <a className="foot-link" href={e.href} {...(e.external ? { rel: `${e.rel ? e.rel + " " : ""}noopener` } : {})}>{e.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <p className="mono" style={{ margin: 0, fontSize: 15, color: "var(--text-mid)" }}>Prices on this site are {PROPOSED_NOTE}.</p>
          <p className="mono" style={{ margin: 0, fontSize: 15, color: "var(--text-mid)" }}>© {new Date().getFullYear()} Jason Walls</p>
        </div>
      </div>
    </footer>
  );
}
