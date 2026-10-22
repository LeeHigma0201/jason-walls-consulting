import Image from "next/image";

// The App Store badge as a link. Use next to the ChargeRight and BendRight icons (40px), with the
// store URLs from STORE in lib/assets.ts or SITE.appStoreDeveloper. Server component.
export function StoreBadge({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} rel="noopener" aria-label={label} style={{ display: "inline-flex", minHeight: 48, alignItems: "center" }}>
      <Image src="/apps/app-store-badge.svg" alt="Download on the App Store" width={120} height={40} style={{ width: 120, height: 40 }} />
    </a>
  );
}
