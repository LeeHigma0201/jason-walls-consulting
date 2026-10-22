"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Preview-only switcher so Jason can flip between options on his phone. Delete after the pick.
// Under /v/hero it switches between the three hero options; elsewhere between directions A, B, C.
const DIRS = [
  ["/v/a", "A"],
  ["/v/b", "B"],
  ["/v/c", "C"],
] as const;
const HEROES = [
  ["/v/hero/1", "1"],
  ["/v/hero/2", "2"],
  ["/v/hero/3", "3"],
] as const;

export function PickNav() {
  const path = usePathname();
  const items = path?.startsWith("/v/hero") ? HEROES : DIRS;
  return (
    <nav className="pick-nav" aria-label="Direction">
      {items.map(([href, label]) => (
        <Link key={href} href={href} aria-current={path === href ? "page" : undefined}>{label}</Link>
      ))}
    </nav>
  );
}
