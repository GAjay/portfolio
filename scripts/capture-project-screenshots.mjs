/**
 * Captures live site screenshots for project case studies (Playwright + sharp).
 * Run: npm run sync:project-screenshots
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "assets", "projects");

/** Keep in sync with `projectCaseStudies` live URLs. */
const TARGETS = [
  { slug: "lloyds-bcb-deposits", url: "https://www.lloydsbank.com/business/" },
  { slug: "apollo-digital", url: "https://www.apollo.com/" },
  { slug: "vymo-sales", url: "https://vymo.com/" },
  { slug: "asriui", url: "https://gajay.github.io/asriui/" },
  { slug: "json-formatter", url: "https://gajay.github.io/js-formatter/" },
];

const VIEWPORT = { width: 1280, height: 800 };

async function captureOne(browser, { slug, url }) {
  const outPath = path.join(outDir, `${slug}.webp`);
  const page = await browser.newPage({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
  });

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForTimeout(2500);
    const png = await page.screenshot({ type: "png", fullPage: false });
    await sharp(png)
      .resize(1280, 800, { fit: "cover", position: "top" })
      .webp({ quality: 84 })
      .toFile(outPath);
    console.log(`✓ ${slug} → ${path.relative(root, outPath)}`);
  } catch (error) {
    console.warn(`✗ ${slug}: ${error instanceof Error ? error.message : error}`);
    throw error;
  } finally {
    await page.close();
  }
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  let failed = 0;
  for (const target of TARGETS) {
    try {
      await captureOne(browser, target);
    } catch {
      failed += 1;
    }
  }

  await browser.close();
  if (failed > 0) {
    console.warn(`${failed} screenshot(s) failed — UI falls back to illustrated previews.`);
    process.exitCode = failed === TARGETS.length ? 1 : 0;
  }
}

main();
