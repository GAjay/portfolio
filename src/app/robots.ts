import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/shared/lib/site-url";

/** Required for `output: "export"` (GitHub Pages). */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/offline"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
