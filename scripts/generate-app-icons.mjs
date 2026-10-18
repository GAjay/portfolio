#!/usr/bin/env node
/**
 * Renders public/icons/icon.svg → PNGs + favicon.ico for PWA and browsers.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const iconsDir = join(root, "public", "icons");

async function fromSvg(name, size, outName) {
  const svg = readFileSync(join(iconsDir, name), "utf8");
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(join(iconsDir, outName));
  console.log(`✓ ${outName}`);
}

async function main() {
  await fromSvg("icon.svg", 192, "icon-192.png");
  await fromSvg("icon.svg", 512, "icon-512.png");
  await fromSvg("icon-maskable.svg", 512, "icon-maskable-512.png");
  await fromSvg("icon.svg", 180, "apple-touch-icon.png");

  const faviconSvg = readFileSync(join(iconsDir, "icon.svg"), "utf8");
  await sharp(Buffer.from(faviconSvg))
    .resize(32, 32)
    .toFile(join(root, "public", "favicon.ico"));

  console.log("✓ favicon.ico");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
