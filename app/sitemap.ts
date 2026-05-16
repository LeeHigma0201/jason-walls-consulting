import type { MetadataRoute } from "next";
import { SITE } from "@/lib/schema";
import { TEMPLATES } from "@/lib/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const baseRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url + "/", lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: SITE.url + "/templates", lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: SITE.url + "/concepts", lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: SITE.url + "/trades", lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: SITE.url + "/story", lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: SITE.url + "/lab", lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];
  const templateRoutes: MetadataRoute.Sitemap = TEMPLATES.map((t) => ({
    url: SITE.url + "/templates/" + t.slug,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...baseRoutes, ...templateRoutes];
}
