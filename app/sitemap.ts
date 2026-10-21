import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: [string, number][] = [
    ["/", 1.0],
    ["/services", 0.95],
    ["/work", 0.9],
    ["/process", 0.8],
    ["/about", 0.7],
    ["/faq", 0.7],
    ["/contact", 0.9],
  ];
  return routes.map(([path, priority]) => ({ url: SITE.url + path, lastModified: now, changeFrequency: "weekly", priority }));
}
