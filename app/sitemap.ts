import type { MetadataRoute } from "next";
import { work } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...work.map((w) => ({
      url: `${siteUrl}/work/${w.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
