import type { Metadata } from "next";
import { JsonLd, homeJsonLd } from "@/lib/schema";
import { HomeRest } from "@/components/home/HomeRest";
import { HeroPanel } from "@/components/home/heroes/HeroPanel";
import { LOCKOUT } from "@/components/home/heroes/copy";

export const metadata: Metadata = {
  title: { absolute: "Jason Walls · Software built by an electrician who ships" },
  description:
    "I'm an electrician in IBEW Local 369 in Louisville. I build websites, AI workflows, web apps and iOS apps, and I have two apps on the App Store.",
  alternates: { canonical: "/" },
};

// Hero: option 2 "Panel" in the steel tone, picked by Jason on 2026-10-22 ("I like 2", then
// "looks good" on the brighter Blue / Steel / Color sheet). The lockout photo moves to the Why section.
export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <HeroPanel tone="steel" />
      <HomeRest whyPhoto={LOCKOUT} />
    </>
  );
}
