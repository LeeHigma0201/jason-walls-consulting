"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Preview-only switcher so Jason can flip between options on his phone. Delete after the pick.
// Under /v/hero/2 it switches between the option 2 tones; under /v/hero between the three hero options;
// elsewhere between directions A, B, C.
const DIRS = [
  ["/v/a", "A"],
  ["/v/b", "B"],
  ["/v/c", "C"],
] as const;
const HEROES = [
  ["/v/hero/1", "1"],
  ["/v/hero/2", "2"],
  ["/v/hero/3", "3"],
  ["/v/hero/4", "4"],
  ["/v/hero/5", "5"],
  ["/v/hero/6", "6"],
] as const;
// Option 2 brightness picks (Jason chose 2 but found it too dark).
const TONES = [
  ["/v/hero/2", "Blue"],
  ["/v/hero/2/steel", "Steel"],
  ["/v/hero/2/color", "Color"],
] as const;

export function PickNav() {
  const path = usePathname();
  const items = path?.startsWith("/v/hero/2") ? TONES : path?.startsWith("/v/hero") ? HEROES : DIRS;
  return (
    <nav className="pick-nav" aria-label="Direction">
      {items.map(([href, label]) => (
        <Link key={href} href={href} aria-current={path === href ? "page" : undefined}>{label}</Link>
      ))}
    </nav>
  );
}
