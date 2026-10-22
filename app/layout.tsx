import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { JsonLd, personSchema, websiteSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LookPicker } from "@/components/LookPicker";
import { Reveal } from "@/components/Reveal";

// Self-hosted (latin subsets from Google Fonts, variable files): no third-party font request at runtime.
const jbm = localFont({ src: "./fonts/JetBrainsMono.woff2", weight: "100 800", variable: "--font-jbm", display: "swap" });
const slab = localFont({ src: "./fonts/RobotoSlab.woff2", weight: "300 900", variable: "--font-slab", display: "swap" });
const plex = localFont({ src: "./fonts/IBMPlexSans.woff2", weight: "100 700", variable: "--font-plex", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} · ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  // No title/description here on purpose: Next fills og/twitter title and description from each page's own
  // title and description, so a shared /services link previews as Prices, not as the home page.
  // Canonical is set per page (the home page sets "/"), so pages without one do not claim "/".
  openGraph: { type: "website", siteName: SITE.name, locale: "en_US" },
  twitter: { card: "summary_large_image", creator: "@walls_jason1" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#1f3d74", width: "device-width", initialScale: 1 };

// If Reveal has not mounted after 2.5s, show everything (sr-off). When it does mount later, drop sr-off so scroll-in resumes.
const REVEAL_GATE =
  "var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(d.hasAttribute('data-reveal'))return;d.classList.add('sr-off');new MutationObserver(function(m,o){if(d.hasAttribute('data-reveal')){d.classList.remove('sr-off');o.disconnect()}}).observe(d,{attributes:true,attributeFilter:['data-reveal']})},2500)";

// Keep the UTM/ref tags from whichever page a visitor lands on, so ContactForm can send them later.
const UTM_CAPTURE =
  "try{var q=new URLSearchParams(location.search),o={},n=0;['utm_source','utm_medium','utm_campaign','utm_content','utm_term','ref'].forEach(function(k){var v=q.get(k);if(v){o[k]=v;n++}});if(n)localStorage.setItem('utm',JSON.stringify(o))}catch(e){}";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${jbm.variable} ${plex.variable} ${slab.variable}`}>
      <head>
        {/* Reveal is gated on html.js so a script failure hides nothing. If Reveal does not mount within 2.5s, show everything. */}
        <script dangerouslySetInnerHTML={{ __html: REVEAL_GATE }} />
        <script dangerouslySetInnerHTML={{ __html: UTM_CAPTURE }} />
      </head>
      <body className="has-bottom-nav">
        <a href="#main" className="skip">Skip to content</a>
        <JsonLd data={[personSchema(), websiteSchema()]} />
        <LookPicker />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
        <Analytics />
      </body>
    </html>
  );
}
