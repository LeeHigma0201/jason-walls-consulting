"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, NAV_CTA } from "@/lib/site";

// Inline stroke icons for the phone bar. Keys are routes.
const ICONS: Record<string, React.ReactNode> = {
  "/services": <path d="M12 3v18M5 8h9a3 3 0 0 1 0 6H6a3 3 0 0 0 0 6h13" />,
  "/work": <path d="M4 7h16v12H4zM9 7V4h6v3M4 12h16" />,
  "/process": <path d="M4 6h6v6H4zM14 12h6v6h-6zM10 9h4M17 12V9h-3" />,
  "/about": <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" />,
  "/contact": <path d="M3 6h18v12H3zM3 7l9 6 9-6" />,
};

function Icon({ d }: { d: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d}
    </svg>
  );
}

export function Nav() {
  const path = usePathname() ?? "/";
  const cur = (href: string) => (href === "/" ? path === "/" : path.startsWith(href)) ? "page" : undefined;
  // Phone bar: Prices, Work, Process, About, Call. Call is accent-filled and goes to /contact.
  const tabs = [...NAV.map((n) => ({ href: n.href, label: n.label })), { href: NAV_CTA.href, label: "Call" }];
  return (
    <>
      <header className="nav-top">
        <div className="wrap nav-inner">
          <Link href="/" className="wordmark" aria-label="Jason Walls, home" style={{ minHeight: 44, alignContent: "center" }}>
            <b>Jason Walls</b>
            <small style={{ fontSize: 13 }}>Electrician, Louisville</small>
          </Link>
          <nav className="nav-links" aria-label="Primary">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="nav-link" aria-current={cur(n.href)}>
                {n.label}
              </Link>
            ))}
          </nav>
          <Link href={NAV_CTA.href} className="btn btn-primary nav-cta">
            {NAV_CTA.label}
          </Link>
        </div>
      </header>
      <nav className="nav-bottom" aria-label="Mobile">
        {tabs.map((b) => (
          <Link
            key={b.href}
            href={b.href}
            aria-current={cur(b.href)}
            aria-label={b.label === "Call" ? "Free 20-minute call, contact page" : undefined}
            className={b.label === "Call" ? "tab-call" : undefined}
          >
            <Icon d={ICONS[b.href]} />
            {b.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
