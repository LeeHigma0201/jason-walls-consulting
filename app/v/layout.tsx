import type { Metadata } from "next";
import { PickNav } from "./PickNav";

export const metadata: Metadata = { robots: { index: false, follow: false }, title: "Direction previews" };

export default function VLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PickNav />
      {children}
    </>
  );
}
