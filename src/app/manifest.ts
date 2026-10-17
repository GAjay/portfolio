import type { MetadataRoute } from "next";
import { basePath } from "@/shared/config/base-path";
import { siteConfig } from "@/shared/config/site";

export default function manifest(): MetadataRoute.Manifest {
  const start = basePath ? `${basePath}/` : "/";

  return {
    name: `${siteConfig.name} — Portfolio`,
    short_name: siteConfig.name,
    description: siteConfig.seo.description,
    start_url: start,
    display: "standalone",
    background_color: "#fbfbfc",
    theme_color: "#fbfbfc",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
