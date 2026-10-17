import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/shared/lib/site-url";

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
