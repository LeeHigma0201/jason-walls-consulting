"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/site";

const ICONS: Record<string, React.ReactNode> = {
  "/": <path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  "/work": <path d="M4 7h16v12H4zM9 7V4h6v3M4 12h16" />,
  "/services": <path d="M12 3v18M5 8h9a3 3 0 0 1 0 6H6a3 3 0 0 0 0 6h13" />,
  "/process": <path d="M4 6h6v6H4zM14 12h6v6h-6zM10 9h4M17 12V9h-3" />,
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
  const path = usePathname();
  const cur = (href: string) => (href === "/" ? path === "/" : path.startsWith(href)) ? "page" : undefined;
  const bottom = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/services", label: "Pricing" },
    { href: "/process", label: "Process" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <>
      <header className="nav-top">
        <div className="wrap nav-inner">
          <Link href="/" className="mono" style={{ textDecoration: "none", fontSize: 13, letterSpacing: "0.06em", fontWeight: 700 }}>
            JASON WALLS <span style={{ color: "var(--text-dim)", fontWeight: 400 }}>/ builds</span>
          </Link>
          <nav className="nav-links" aria-label="Primary">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="nav-link" aria-current={cur(n.href)}>
                {n.label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className="btn btn-primary" style={{ minHeight: 40, padding: "10px 16px" }}>
            Book a call
          </Link>
        </div>
      </header>
      <nav className="nav-bottom" aria-label="Mobile">
        {bottom.map((b) => (
          <Link key={b.href} href={b.href} aria-current={cur(b.href)}>
            <Icon d={ICONS[b.href]} />
            {b.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
