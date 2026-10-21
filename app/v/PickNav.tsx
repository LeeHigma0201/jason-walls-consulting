"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Preview-only switcher so Jason can flip between directions on his phone. Delete after the pick.
export function PickNav() {
  const path = usePathname();
  const items = [
    ["/v/a", "A"],
    ["/v/b", "B"],
    ["/v/c", "C"],
  ] as const;
  return (
    <nav className="pick-nav" aria-label="Direction">
      {items.map(([href, label]) => (
        <Link key={href} href={href} aria-current={path === href ? "page" : undefined}>{label}</Link>
      ))}
    </nav>
  );
}
