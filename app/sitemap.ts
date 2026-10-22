import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Seven public routes. The /v preview picker is deliberately left out (noindex, Disallow: /v/).
// lastModified is the date each page's source last changed (git log on its page.tsx). Update a
// route's date when its content changes; no changeFrequency or priority, since neither is a fact.
const ROUTES: [string, string][] = [
  ["/", "2026-10-21"],
  ["/services", "2026-10-21"],
  ["/work", "2026-10-21"],
  ["/contact", "2026-10-21"],
  ["/process", "2026-10-21"],
  ["/about", "2026-10-21"],
  ["/faq", "2026-10-21"],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(([path, modified]) => ({
    url: SITE.url + path,
    lastModified: new Date(modified),
  }));
}
