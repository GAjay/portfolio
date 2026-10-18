import type { MetadataRoute } from "next";
import { getAllCaseStudySlugs } from "@/features/projects/data/case-studies";
import { getSiteUrl } from "@/shared/lib/site-url";

/** Required for `output: "export"` (GitHub Pages). */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  return [
    {
      url: base,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/projects`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...getAllCaseStudySlugs().map((slug) => ({
      url: `${base}/projects/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
