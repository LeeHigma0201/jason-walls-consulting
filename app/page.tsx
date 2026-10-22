import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { A, SIZE } from "@/lib/assets";
import { JsonLd, homeJsonLd } from "@/lib/schema";
import { HomeRest } from "@/components/home/HomeRest";

export const metadata: Metadata = {
  title: { absolute: "Jason Walls · Software built by an electrician who ships" },
  description:
    "I'm an electrician in IBEW Local 369 in Louisville. I build websites, AI workflows, web apps and iOS apps, and I have two apps on the App Store.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />

      {/* 1. HERO. The hero never animates. */}
      <section className="hero-photo" aria-label="Intro">
        <div className="hero-media">
          <Image
            src={A.electrician}
            alt="Jason Walls, an electrician in a hard hat and safety vest, holding a red lockout device and padlock in front of electrical panels."
            width={SIZE.electrician.w}
            height={SIZE.electrician.h}
            preload
            sizes="(min-width:900px) 480px,100vw"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="shade" />
        <div className="wrap stack">
          <p className="kicker" style={{ margin: 0, color: "var(--text)" }}>Electrician, IBEW Local 369, Louisville, Kentucky</p>
          <h1 className="display h1" style={{ margin: 0, maxWidth: "14ch" }}>
            Software built by an electrician <em>who ships.</em>
          </h1>
          <p className="lede" style={{ margin: 0, color: "var(--text)", maxWidth: "46ch" }}>
            I’m Jason. I have two apps on the App Store and a web product that takes payments, and I build with a crew of AI agents I run from my phone.
          </p>
          <div className="actions">
            <a href="#prices" className="btn btn-primary btn-lg">See the prices</a>
            <Link href="/work" className="btn btn-ghost btn-lg" style={{ background: "rgba(16,32,61,0.55)" }}>See the work</Link>
          </div>
        </div>
      </section>

      <HomeRest />
    </>
  );
}
