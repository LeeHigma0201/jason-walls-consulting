import type { Metadata } from "next";
import { JetBrains_Mono, IBM_Plex_Sans, Newsreader, Fraunces } from "next/font/google";
import "./globals.css";

import { JsonLd, personSchema, organizationSchema, servicesSchema, SITE } from "@/lib/schema";

const jbm = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["200", "400", "500", "700"],
  variable: "--font-jbm",
  display: "swap",
});
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name + " · " + SITE.tagline,
    template: "%s · " + SITE.name,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.name + " · " + SITE.tagline,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${jbm.variable} ${plex.variable} ${newsreader.variable} ${fraunces.variable}`}
    >
      <body>
        <JsonLd data={[personSchema(), organizationSchema(), ...servicesSchema()]} />
        {children}
      </body>
    </html>
  );
}
