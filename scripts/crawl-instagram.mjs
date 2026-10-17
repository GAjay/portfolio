#!/usr/bin/env node
/**
 * Web-crawl Instagram profile grid (headless Chromium via Playwright).
 * No API token or Instagram password — renders the public profile page and reads post links + thumbnails.
 *
 * One-time: npx playwright install chromium
 * Skip: INSTAGRAM_SKIP_CRAWL=1
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SEED_PATH = join(root, "src/features/content/data/content.seed.json");
const OUT_PATH = join(root, "src/features/content/data/instagram.generated.json");
const META_PATH = join(root, "src/features/content/data/instagram.sync-meta.json");
const MAX_POSTS = 12;

function usernameFromUrl(url) {
  const match = url.match(/instagram\.com\/([^/?#]+)/i);
  if (!match) return null;
  const name = match[1].replace(/\/$/, "").toLowerCase();
  if (["p", "reel", "tv", "stories", "explore"].includes(name)) return null;
  return name;
}

function parseAlt(alt, href) {
  const isReel = /\/reel\//.test(href) || /^Video\b/.test(alt ?? "");
  const meta = isReel ? "Reel" : /CAROUSEL/i.test(alt ?? "") ? "Carousel" : "Post";

  const says = alt?.match(/says '(.+?)'\.?$/);
  if (says?.[1]) {
    const t = says[1].replace(/\s+/g, " ").trim();
    return { title: t.length > 120 ? `${t.slice(0, 117)}…` : t, meta };
  }

  const date = alt?.match(/\bon ([A-Za-z]+ \d{1,2}, \d{4})\b/);
  const title = date ? `Post · ${date[1]}` : "Instagram post";
  return { title, meta };
}

function parseFollowers(ogDescription) {
  if (!ogDescription) return null;
  const m = ogDescription.match(/([\d,]+)\s+Followers/i);
  if (!m) return null;
  const n = Number.parseInt(m[1].replace(/,/g, ""), 10);
  return Number.isFinite(n) ? n : null;
}

export async function crawlInstagram({ profileUrl, maxPosts = MAX_POSTS }) {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    return {
      ok: false,
      code: 2,
      message: "playwright not installed — npm i && npm run playwright:install",
    };
  }

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (err) {
    const msg = String(err?.message ?? err);
    if (msg.includes("Executable doesn't exist")) {
      return { ok: false, code: 2, message: "Chromium missing — npm run playwright:install" };
    }
    return { ok: false, code: 1, message: msg.split("\n")[0] };
  }
  try {
    const page = await browser.newPage({
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      locale: "en-US",
    });

    await page.goto(profileUrl, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector('a[href*="/p/"], a[href*="/reel/"]', { timeout: 45_000 }).catch(() => {});

    const ogDescription = await page
      .$eval('meta[property="og:description"]', (el) => el.getAttribute("content"))
      .catch(() => null);
    const followers = parseFollowers(ogDescription);

    const raw = await page.$$eval('a[href*="/p/"], a[href*="/reel/"]', (anchors, limit) => {
      const seen = new Set();
      const out = [];
      for (const a of anchors) {
        const href = a.href?.split("?")[0];
        if (!href || seen.has(href)) continue;
        seen.add(href);
        const img = a.querySelector("img");
        out.push({
          href,
          image: img?.src || undefined,
          alt: img?.alt || "",
        });
        if (out.length >= limit) break;
      }
      return out;
    }, maxPosts);

    const posts = raw.map((row) => {
      const { title, meta } = parseAlt(row.alt, row.href);
      return { title, meta, href: row.href, image: row.image };
    });

    return { ok: posts.length > 0, code: posts.length > 0 ? 0 : 1, posts, followers };
  } finally {
    await browser.close();
  }
}

function loadProfileUrl() {
  const seed = JSON.parse(readFileSync(SEED_PATH, "utf8"));
  const url = seed?.instagram?.url;
  if (!url) throw new Error("content.seed.json missing instagram.url");
  const user = usernameFromUrl(url);
  if (!user) throw new Error("Could not parse Instagram username from seed");
  return url.endsWith("/") ? url : `${url}/`;
}

function writeOutputs(posts, followers) {
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, `${JSON.stringify(posts, null, 2)}\n`);
  writeFileSync(META_PATH, `${JSON.stringify({ followers }, null, 2)}\n`);
}

async function main() {
  if (process.env.INSTAGRAM_SKIP_CRAWL === "1") {
    process.exit(0);
  }

  const profileUrl = loadProfileUrl();
  const result = await crawlInstagram({ profileUrl, maxPosts: MAX_POSTS });

  if (!result.ok) {
    if (result.message) console.error(result.message);
    process.exit(result.code ?? 1);
  }

  writeOutputs(result.posts, result.followers ?? null);
  const user = usernameFromUrl(profileUrl);
  console.error(
    `Instagram crawl @${user}: ${result.posts.length} posts` +
      (result.followers != null ? `, ${result.followers} followers` : ""),
  );
}

const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  main().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}
