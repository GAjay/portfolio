#!/usr/bin/env node
/**
 * Publish crawled Instagram data for the site:
 * - public/data/instagram-feed.json (fetched at /data/instagram-feed.json)
 * - content.generated.json instagram channel + metrics
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const POSTS_PATH = join(root, "src/features/content/data/instagram.generated.json");
const META_PATH = join(root, "src/features/content/data/instagram.sync-meta.json");
const SEED_PATH = join(root, "src/features/content/data/content.seed.json");
const CONTENT_PATH = join(root, "src/features/content/data/content.generated.json");
const PUBLIC_FEED_PATH = join(root, "public/data/instagram-feed.json");

function formatHumanCount(n) {
  if (!Number.isFinite(n) || n < 0) return null;
  if (n >= 1_000_000) {
    const v = n / 1_000_000;
    return `${v >= 10 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (n >= 10_000) return `${Math.round(n / 1000)}K`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function main() {
  const posts = readJson(POSTS_PATH);
  if (!Array.isArray(posts)) {
    throw new Error("instagram.generated.json must be an array");
  }

  let followers = null;
  try {
    const meta = readJson(META_PATH);
    if (typeof meta.followers === "number" && Number.isFinite(meta.followers)) {
      followers = meta.followers;
    }
  } catch {
    /* optional */
  }

  const seed = readJson(SEED_PATH);
  const instagramSeed = seed.instagram ?? {};
  const syncedAt = new Date().toISOString();

  const feed = {
    syncedAt,
    profileUrl: instagramSeed.url,
    handle: instagramSeed.handle,
    followers,
    posts,
  };

  mkdirSync(dirname(PUBLIC_FEED_PATH), { recursive: true });
  writeFileSync(PUBLIC_FEED_PATH, `${JSON.stringify(feed, null, 2)}\n`);

  let content;
  try {
    content = readJson(CONTENT_PATH);
  } catch {
    console.warn("content.generated.json missing — wrote public feed only");
    return;
  }

  const channels = content.channels ?? [];
  const igIndex = channels.findIndex((c) => c.id === "instagram");
  if (igIndex === -1) {
    console.warn("No instagram channel in content.generated.json");
    return;
  }

  const followerLabel =
    followers != null ? `${formatHumanCount(followers)} followers` : channels[igIndex].stat;

  channels[igIndex] = {
    ...channels[igIndex],
    stat: followerLabel,
    items: posts.map(({ title, meta, href, image }) => ({
      title,
      meta,
      ...(href ? { href } : {}),
      ...(image ? { image } : {}),
    })),
  };

  content.channels = channels;
  content.syncedAt = syncedAt;
  content.metrics = {
    ...content.metrics,
    instagramFollowers: followers ?? content.metrics?.instagramFollowers ?? null,
  };

  const reachParts = [
    content.metrics.youtubeSubscribers,
    content.metrics.mediumFollowers,
    content.metrics.instagramFollowers,
  ].filter((n) => typeof n === "number" && Number.isFinite(n));
  const audienceReach = reachParts.reduce((sum, n) => sum + n, 0);
  content.metrics.audienceReach = audienceReach;
  content.metrics.audienceReachLabel =
    audienceReach >= 1000 ? `${formatHumanCount(audienceReach)}+` : audienceReach > 0 ? `${audienceReach}+` : "—";

  writeFileSync(CONTENT_PATH, `${JSON.stringify(content, null, 2)}\n`);
  console.log(
    `Published Instagram feed (${posts.length} posts) → public/data/instagram-feed.json`,
  );
}

main();
