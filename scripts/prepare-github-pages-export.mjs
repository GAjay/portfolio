/**
 * GitHub Pages static export: drop dynamic metadata routes (use public/ files).
 */
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

if (!siteUrl) {
  console.error("NEXT_PUBLIC_SITE_URL is required");
  process.exit(1);
}

for (const rel of ["src/app/robots.ts", "src/app/sitemap.ts"]) {
  rmSync(join(root, rel), { force: true });
}

const manifestPath = join(root, "src/app/manifest.ts");
let manifest = readFileSync(manifestPath, "utf8");
if (!manifest.includes('export const dynamic = "force-static"')) {
  manifest = manifest.replace(
    /export default function manifest/,
    'export const dynamic = "force-static";\n\nexport default function manifest',
  );
  writeFileSync(manifestPath, manifest);
}

const sitemapUrl = `${siteUrl}/sitemap.xml`;
writeFileSync(
  join(root, "public/robots.txt"),
  `User-agent: *\nAllow: /\nDisallow: /offline/\n\nSitemap: ${sitemapUrl}\n`,
);

const home = `${siteUrl}${basePath ? `${basePath}/` : "/"}`;
const blog = `${siteUrl}${basePath}/blog/`;
writeFileSync(
  join(root, "public/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${home}</loc><changefreq>weekly</changefreq><priority>1</priority></url>
  <url><loc>${blog}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
</urlset>
`,
);

console.log("GitHub Pages: wrote public/robots.txt and public/sitemap.xml");
