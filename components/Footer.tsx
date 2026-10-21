import Link from "next/link";
import { NAV, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--rule)", padding: "48px 0 40px", marginTop: 64 }}>
      <div className="wrap" style={{ display: "grid", gap: 28 }}>
        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <div>
            <p className="kicker" style={{ marginBottom: 10 }}>Jason Walls</p>
            <p style={{ margin: 0, color: "var(--text-mid)", fontSize: 15, maxWidth: 36 + "ch" }}>
              Electrician, IBEW Local 369. Builds websites, iOS apps and AI workflows for trades, local businesses and founders. {SITE.location}.
            </p>
          </div>
          <div>
            <p className="kicker" style={{ marginBottom: 10 }}>Pages</p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 6 }}>
              {[...NAV, { href: "/contact", label: "Contact" }].map((n) => (
                <li key={n.href}><Link href={n.href} className="nav-link" style={{ fontSize: 13 }}>{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="kicker" style={{ marginBottom: 10 }}>Elsewhere</p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 6 }}>
              <li><a className="nav-link" style={{ fontSize: 13 }} href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><a className="nav-link" style={{ fontSize: 13 }} href={SITE.x} rel="me noopener">X · @walls_jason1</a></li>
              <li><a className="nav-link" style={{ fontSize: 13 }} href={SITE.appStoreDeveloper} rel="noopener">App Store developer page</a></li>
              <li><a className="nav-link" style={{ fontSize: 13 }} href={SITE.github} rel="me noopener">GitHub</a></li>
              <li><a className="nav-link" style={{ fontSize: 13 }} href="/api/agent/v1/openapi.json">Agent API</a></li>
            </ul>
          </div>
        </div>
        <p className="mono" style={{ margin: 0, fontSize: 11, color: "var(--text-dim)" }}>
          © {new Date().getFullYear()} Jason Walls. Built with Claude Code and parallel agents, like everything else here.
        </p>
      </div>
    </footer>
  );
}
