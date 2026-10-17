import type { MetadataRoute } from "next";
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
  ];
}
