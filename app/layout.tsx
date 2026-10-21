import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { JsonLd, personSchema, professionalServiceSchema, mobileAppsSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LookPicker } from "@/components/LookPicker";
import { Reveal } from "@/components/Reveal";

// Self-hosted (latin subsets from Google Fonts, variable files): no third-party font request at runtime.
const jbm = localFont({ src: "./fonts/JetBrainsMono.woff2", weight: "100 800", variable: "--font-jbm", display: "swap" });
const plex = localFont({ src: "./fonts/IBMPlexSans.woff2", weight: "100 700", variable: "--font-plex", display: "swap" });
const fraunces = localFont({
  src: [
    { path: "./fonts/Fraunces.woff2", style: "normal", weight: "100 900" },
    { path: "./fonts/Fraunces-Italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} · ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  openGraph: { type: "website", siteName: SITE.name, title: `${SITE.name} · ${SITE.tagline}`, description: SITE.description, locale: "en_US" },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description, creator: "@walls_jason1" },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0b1526", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-look="blueprint" className={`${jbm.variable} ${plex.variable} ${fraunces.variable}`}>
      <body className="has-bottom-nav">
        <a href="#main" className="skip">Skip to content</a>
        <JsonLd data={[personSchema(), professionalServiceSchema(), ...mobileAppsSchema()]} />
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
