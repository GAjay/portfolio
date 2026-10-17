#!/usr/bin/env node
/**
 * Sync live profile, GitHub repos, Medium, YouTube, and Instagram into generated JSON.
 *
 * Instagram posts (thumbnails via sync):
 * - `scripts/crawl-instagram.mjs` — Playwright web crawl of public profile (default; `npx playwright install chromium`)
 * - `python3 scripts/sync_instagram.py` — instaloader fallback (`INSTAGRAM_USE_PYTHON=1`)
 * - `INSTAGRAM_ACCESS_TOKEN` — Meta Graph API
 * - `INSTAGRAM_POST_URLS` or `content.seed.json` → `instagram.postUrls` — oEmbed per URL
 */
import { spawnSync } from "node:child_process";
import { existsSync, writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const GITHUB_USER = "GAjay";
const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/ajaymaheshwari24/";
const TOPMATE_PROFILE_URL = "https://topmate.io/ajay_maheshwari";

function readJson(relPath) {
  return JSON.parse(readFileSync(join(root, relPath), "utf8"));
}

function extractJsonLdNodes(html) {
  const nodes = [];
  const pattern = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  for (const match of html.matchAll(pattern)) {
    const data = JSON.parse(match[1]);
    const graph = data["@graph"] ?? [data];
    nodes.push(...graph);
  }
  return nodes;
}

function parseTopmateReviews(html) {
  const person = extractJsonLdNodes(html).find((n) => n["@type"] === "Person");
  const reviews = person?.review ?? [];
  return reviews.map((r, index) => {
    const author = r.author?.name ?? "Anonymous";
    const avatarQuery = encodeURIComponent(author === "Anonymous" ? "Guest" : author);
    return {
    id: `rec-topmate-${index}`,
    quote: r.reviewBody?.trim() ?? "",
    author,
    role: "Mentorship session · Topmate",
    source: "topmate",
    avatarUrl: `https://ui-avatars.com/api/?name=${avatarQuery}&background=6b6b74&color=fff&size=128&bold=true`,
    href: TOPMATE_PROFILE_URL,
    date: r.datePublished
      ? new Date(r.datePublished).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : undefined,
  };
  }).filter((r) => r.quote.length > 0);
}

function mergeRecommendations(seed, topmate) {
  const seen = new Set();
  const out = [];
  for (const item of [...seed, ...topmate]) {
    const key = item.quote.slice(0, 80);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

async function fetchJson(url, { accept } = {}) {
  const headers = {
    Accept: accept ?? "application/json",
    "User-Agent": "portfolio-sync",
  };
  if (!accept && url.includes("api.github.com") && process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    headers.Accept = "application/vnd.github+json";
  }
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.json();
}

async function fetchText(url, { accept } = {}) {
  const res = await fetch(url, {
    headers: {
      Accept: accept ?? "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    },
  });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.text();
}

function parseHumanCount(raw) {
  if (raw == null) return null;
  const t = String(raw).replace(/,/g, "").trim();
  if (!t) return null;
  if (/K$/i.test(t)) return Math.round(Number.parseFloat(t) * 1000);
  if (/M$/i.test(t)) return Math.round(Number.parseFloat(t) * 1_000_000);
  const n = Number.parseInt(t, 10);
  return Number.isFinite(n) ? n : null;
}

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

function formatReachLabel(total) {
  if (!Number.isFinite(total) || total <= 0) return "—";
  if (total >= 1000) return `${formatHumanCount(total)}+`;
  return `${total}+`;
}

function decodeYouTubeLabel(label) {
  return label.replace(/\\u0026/g, "&").replace(/\\"/g, '"').trim();
}

function parseYouTubeChannelId(html) {
  const matches = html.match(/"channelId":"(UC[\w-]{20,})"/g) ?? [];
  for (const raw of matches) {
    const id = raw.match(/"channelId":"(UC[\w-]{20,})"/)?.[1];
    if (id) return id;
  }
  return html.match(/"externalId":"(UC[\w-]{20,})"/)?.[1] ?? null;
}

function parseYouTubeFeed(xml, limit = 2) {
  const items = [];
  for (const block of xml.split("<entry>").slice(1, limit + 1)) {
    const title = block.match(/<title>([^<]+)<\/title>/)?.[1]?.trim();
    const published = block.match(/<published>([^<]+)<\/published>/)?.[1];
    if (!title) continue;
    const meta = published
      ? new Date(published).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "Video";
    items.push({ title, meta });
  }
  return items;
}

function parseYouTubeChannel(html) {
  const subMatch = html.match(/accessibilityLabel":"([\d,.]+[KMB]?)\s+subscribers?"/i);
  const subscribers = subMatch ? parseHumanCount(subMatch[1]) : null;
  const channelId = parseYouTubeChannelId(html);

  const items = [];
  const seen = new Set();
  for (const match of html.matchAll(
    /accessibilityLabel":"([^"]+?) - ([\d,.]+[KMB]?)\s+views"/gi,
  )) {
    const title = decodeYouTubeLabel(match[1]);
    if (!title || seen.has(title)) continue;
    seen.add(title);
    items.push({
      title,
      meta: `${match[2]} views`,
    });
    if (items.length >= 2) break;
  }

  return { subscribers, items, channelId };
}

async function fetchYouTubeChannel(url) {
  const html = await fetchText(url);
  const parsed = parseYouTubeChannel(html);
  if (parsed.items.length < 2 && parsed.channelId) {
    try {
      const feed = await fetchText(
        `https://www.youtube.com/feeds/videos.xml?channel_id=${parsed.channelId}`,
        { accept: "application/atom+xml, application/xml, text/xml, */*" },
      );
      const fromFeed = parseYouTubeFeed(feed, 2);
      if (fromFeed.length > 0) {
        parsed.items = fromFeed;
      }
    } catch (err) {
      console.warn("YouTube feed:", err.message);
    }
  }
  return parsed;
}

function maxIntFromHtml(html, patterns) {
  let best = null;
  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      const n = Number.parseInt(match[1].replace(/,/g, ""), 10);
      if (!Number.isFinite(n)) continue;
      if (best == null || n > best) best = n;
    }
  }
  return best;
}

function parseMediumProfileHtml(html) {
  const followers = maxIntFromHtml(html, [
    /"followersCount":(\d+)/g,
    /"followerCount":(\d+)/g,
    /"socialStats":\{[^}]*"followerCount":(\d+)/g,
  ]);

  const articleCount = maxIntFromHtml(html, [
    /"publishedPostsCount":(\d+)/g,
    /"userPostCount":(\d+)/g,
    /"postCount":(\d+)/g,
    /"postsPublishedCount":(\d+)/g,
    /"numberOfPostsPublished":(\d+)/g,
  ]);

  const postNodes = (html.match(/"__typename":"Post"/g) || []).length;
  const mergedArticles =
    articleCount == null
      ? postNodes > 0
        ? postNodes
        : null
      : Math.max(articleCount, postNodes);

  return { followers, articleCount: mergedArticles };
}

async function fetchMediumProfileMetrics(profileUrls) {
  const merged = { followers: null, articleCount: null };
  for (const url of profileUrls) {
    try {
      const html = await fetchText(url, {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      });
      const parsed = parseMediumProfileHtml(html);
      if (parsed.followers != null) merged.followers = parsed.followers;
      if (parsed.articleCount != null) merged.articleCount = parsed.articleCount;
      if (merged.followers != null && merged.articleCount != null) break;
    } catch {
      /* try next URL */
    }
  }
  return merged;
}

function normalizeInstagramPostUrl(url) {
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed.split("?")[0];
  if (trimmed.startsWith("/p/") || trimmed.startsWith("/reel/")) {
    return `https://www.instagram.com${trimmed}`;
  }
  return `https://www.instagram.com/p/${trimmed}/`;
}

async function fetchInstagramOembed(postUrl) {
  const res = await fetch(
    `https://api.instagram.com/oembed?url=${encodeURIComponent(postUrl)}&omitscript=true&maxwidth=640`,
    { headers: { Accept: "application/json", "User-Agent": "portfolio-sync" } },
  );
  if (!res.ok) return null;
  return res.json();
}

function formatInstagramTitle(caption) {
  const line = (caption ?? "Instagram post").split("\n")[0].trim();
  if (!line) return "Instagram post";
  return line.length > 120 ? `${line.slice(0, 117)}…` : line;
}

function formatInstagramMediaMeta(mediaType) {
  if (mediaType === "VIDEO") return "Reel";
  if (mediaType === "CAROUSEL_ALBUM") return "Carousel";
  return "Post";
}

async function runInstagramCrawl(seed) {
  if (process.env.INSTAGRAM_SKIP_CRAWL === "1") {
    return { posts: null, followers: null };
  }
  try {
    const { crawlInstagram } = await import("./crawl-instagram.mjs");
    const profileUrl = seed.instagram.url.replace(/\/?$/, "/");
    const result = await crawlInstagram({ profileUrl });
    if (result.ok && result.posts?.length) {
      return { posts: result.posts, followers: result.followers ?? null };
    }
    if (result.code === 2) {
      /* playwright missing */
    } else if (result.message) {
      console.warn("Instagram crawl:", result.message);
    }
  } catch (err) {
    console.warn("Instagram crawl:", err.message);
  }
  return { posts: null, followers: null };
}

function runPythonInstagramSync() {
  if (process.env.INSTAGRAM_USE_PYTHON !== "1") {
    return { posts: null, followers: null };
  }
  const scriptPath = join(root, "scripts/sync_instagram.py");
  if (!existsSync(scriptPath)) return { posts: null, followers: null };

  const result = spawnSync("python3", [scriptPath], {
    cwd: root,
    encoding: "utf8",
    env: process.env,
    timeout: 180_000,
  });

  const errOut = (result.stderr || result.stdout || "").trim();
  if (result.status !== 0) {
    if (result.status === 2) {
      /* instaloader not installed — skip quietly */
    } else if (errOut) {
      console.warn("Instagram (Python):", errOut.split("\n").pop());
    }
    return { posts: null, followers: null };
  }

  let posts = null;
  let followers = null;
  try {
    const parsed = readJson("src/features/content/data/instagram.generated.json");
    if (Array.isArray(parsed) && parsed.length > 0) posts = parsed;
  } catch {
    /* no output */
  }
  try {
    const meta = readJson("src/features/content/data/instagram.sync-meta.json");
    if (typeof meta.followers === "number" && Number.isFinite(meta.followers)) {
      followers = meta.followers;
    }
  } catch {
    /* optional */
  }
  if (errOut) console.log(errOut.split("\n").pop());
  return { posts, followers };
}

async function syncInstagramFromGraph(accessToken, handle) {
  const fields =
    "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";
  const data = await fetchJson(
    `https://graph.instagram.com/me/media?fields=${fields}&limit=12&access_token=${encodeURIComponent(accessToken)}`,
  );
  const media = data.data ?? [];
  return media.map((item) => ({
    title: formatInstagramTitle(item.caption),
    meta: formatInstagramMediaMeta(item.media_type),
    href: item.permalink,
    image: item.thumbnail_url ?? item.media_url ?? undefined,
  }));
}

async function syncInstagramPosts(seed, previousPosts = []) {
  const profileUrl = seed.instagram.url;
  const handle = seed.instagram.handle;

  const crawled = await runInstagramCrawl(seed);
  if (crawled.posts?.length) {
    return { posts: crawled.posts, followers: crawled.followers };
  }

  const python = runPythonInstagramSync();
  if (python.posts?.length) {
    return { posts: python.posts, followers: python.followers };
  }

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  if (accessToken) {
    try {
      const graphPosts = await syncInstagramFromGraph(accessToken, handle);
      if (graphPosts.length > 0) return { posts: graphPosts, followers: null };
    } catch (err) {
      console.warn("Instagram Graph API:", err.message);
    }
  }

  const fromEnv =
    process.env.INSTAGRAM_POST_URLS?.split(",")
      .map((s) => normalizeInstagramPostUrl(s))
      .filter(Boolean) ?? [];
  const fromSeed = (seed.instagram.postUrls ?? [])
    .map((u) => normalizeInstagramPostUrl(u))
    .filter(Boolean);
  const fromItems = (seed.instagram.items ?? [])
    .map((item) => (item.href ? normalizeInstagramPostUrl(item.href) : null))
    .filter(Boolean);

  const urls = [...new Set([...fromEnv, ...fromSeed, ...fromItems])];

  if (urls.length === 0) {
    if (previousPosts.length > 0) return { posts: previousPosts, followers: null };
    return {
      posts: (seed.instagram.items ?? []).map((item) => ({
        title: item.title,
        meta: item.meta,
        href: item.href ?? profileUrl,
        image: item.image,
      })),
      followers: null,
    };
  }

  const posts = [];
  for (const url of urls.slice(0, 12)) {
    const seedItem = (seed.instagram.items ?? []).find(
      (item) => item.href && normalizeInstagramPostUrl(item.href) === url,
    );
    const fallback = seedItem ?? { title: "Instagram post", meta: "Post" };

    let oembed = null;
    try {
      oembed = await fetchInstagramOembed(url);
    } catch {
      /* oembed unavailable */
    }

    const title = (oembed?.title ?? fallback.title).replace(/\s+/g, " ").trim();
    posts.push({
      title: title.length > 120 ? `${title.slice(0, 117)}…` : title,
      meta: oembed?.author_name ? `@${oembed.author_name}` : fallback.meta,
      href: url,
      image: oembed?.thumbnail_url ?? fallback.image,
    });
  }

  return { posts, followers: null };
}

function formatMediumStat(followers, articleCount) {
  const parts = [];
  if (followers != null) {
    parts.push(`${formatHumanCount(followers)} followers`);
  }
  if (articleCount != null && articleCount > 0) {
    parts.push(`${formatHumanCount(articleCount)} articles`);
  }
  return parts.length > 0 ? parts.join(" · ") : "—";
}

function buildContentChannels({
  seed,
  youtube,
  mediumItems,
  mediumFollowers,
  mediumArticleCount,
  instagramFollowers,
  instagramItems,
  previous,
}) {
  const prevChannels = previous?.channels ?? [];
  const prevById = Object.fromEntries(prevChannels.map((c) => [c.id, c]));

  const youtubeStat =
    youtube?.subscribers != null
      ? `${formatHumanCount(youtube.subscribers)} subscribers`
      : prevById.youtube?.stat ?? "— subscribers";

  const instagramStat =
    instagramFollowers != null
      ? `${formatHumanCount(instagramFollowers)} followers`
      : prevById.instagram?.stat ?? "— followers";

  const mediumStatFormatted = formatMediumStat(mediumFollowers, mediumArticleCount);
  const mediumStat =
    mediumStatFormatted !== "—"
      ? mediumStatFormatted
      : prevById.medium?.stat ?? "—";

  return [
    {
      id: "youtube",
      name: "YouTube",
      handle: seed.youtube.handle,
      stat: youtubeStat,
      viewAll: seed.youtube.url,
      items:
        youtube?.items?.length > 0
          ? youtube.items
          : prevById.youtube?.items ?? [],
    },
    {
      id: "instagram",
      name: "Instagram",
      handle: seed.instagram.handle,
      stat: instagramStat,
      viewAll: seed.instagram.url,
      items:
        instagramItems?.length > 0
          ? instagramItems
          : prevById.instagram?.items ?? seed.instagram.items ?? [],
    },
    {
      id: "medium",
      name: "Medium",
      handle: seed.medium.handle,
      stat: mediumStat,
      viewAll: seed.medium.url,
      items: mediumItems.slice(0, 3),
    },
  ];
}

function countMediumFeedArticles(xml) {
  return xml.split("<item>").length - 1;
}

function parseMediumItems(xml, limit = 6) {
  const items = [];
  const blocks = xml.split("<item>").slice(1);
  const slice = limit == null ? blocks : blocks.slice(0, limit);
  for (const block of slice) {
    const title =
      block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ??
      block.match(/<title>(.*?)<\/title>/)?.[1];
    const link = block.match(/<link>(.*?)<\/link>/)?.[1]?.trim();
    const pub = block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1];
    if (title && link) {
      const date = pub
        ? new Date(pub).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "";
      items.push({
        title: title.replace(/\s+/g, " ").trim(),
        meta: date,
        href: link.split("?")[0],
      });
    }
  }
  return items;
}

async function loadGithubSnapshot() {
  const user = await fetchJson(`https://api.github.com/users/${GITHUB_USER}`);
  const reposRaw = await fetchJson(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
  );

  const repos = reposRaw
    .filter((r) => !r.fork && r.name !== GITHUB_USER)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || b.updated_at.localeCompare(a.updated_at));

  const totalStars = repos.reduce((n, r) => n + r.stargazers_count, 0);

  const profile = {
    name: user.name || "Ajay Kumar Maheshwari",
    handle: GITHUB_USER,
    bio: user.bio || "",
    location: user.location || "India",
    avatarUrl: user.avatar_url,
    blog: user.blog || "",
    publicRepos: user.public_repos,
    followers: user.followers,
    totalStars,
    githubUrl: user.html_url,
  };

  const mapRepo = (r) => ({
    id: r.name,
    name: r.name,
    description: r.description || "Open-source project on GitHub.",
    language: r.language || "Code",
    stars: String(r.stargazers_count),
    forks: String(r.forks_count),
    href: r.html_url,
    homepage: r.homepage || "",
    topics: r.topics?.slice(0, 4) ?? [],
  });

  const featured = repos.slice(0, 6).map(mapRepo);
  const oss = repos.slice(0, 8).map(mapRepo);

  return { profile, featured, oss, user, totalStars };
}

async function main() {
  let profile;
  let featured;
  let oss;
  let user;
  let totalStars;
  let githubSynced = true;

  try {
    const snapshot = await loadGithubSnapshot();
    profile = snapshot.profile;
    featured = snapshot.featured;
    oss = snapshot.oss;
    user = snapshot.user;
    totalStars = snapshot.totalStars;
  } catch (err) {
    githubSynced = false;
    console.warn("GitHub sync skipped:", err.message);
    profile = readJson("src/shared/config/profile.generated.json");
    featured = readJson("src/features/projects/data/projects.generated.json");
    oss = readJson("src/features/open-source/data/repos.generated.json");
    user = { followers: profile.followers ?? profile.metrics?.githubFollowers ?? 0 };
    totalStars = profile.totalStars ?? profile.metrics?.totalStars ?? 0;
  }

  const contentSeed = readJson("src/features/content/data/content.seed.json");
  let previousContent = {};
  try {
    previousContent = readJson("src/features/content/data/content.generated.json");
  } catch {
    /* first sync */
  }

  let previousInstagramPosts = [];
  try {
    previousInstagramPosts = readJson("src/features/content/data/instagram.generated.json");
  } catch {
    /* first sync */
  }

  const mediumXml = await fetchText("https://theplainscript.medium.com/feed", {
    accept: "application/rss+xml, application/xml, text/xml, */*",
  });
  const mediumFeedArticleCount = countMediumFeedArticles(mediumXml);
  const mediumItems = parseMediumItems(mediumXml, 6);

  const youtube = await fetchYouTubeChannel(contentSeed.youtube.url).catch((err) => {
    console.warn("YouTube metrics:", err.message);
    return null;
  });

  const mediumProfile = await fetchMediumProfileMetrics(
    contentSeed.medium.profileUrls ?? [contentSeed.medium.url],
  ).catch((err) => {
    console.warn("Medium profile:", err.message);
    return { followers: null, articleCount: null };
  });

  const envMediumFollowers = process.env.MEDIUM_FOLLOWERS;
  const mediumFollowers =
    envMediumFollowers != null && envMediumFollowers !== ""
      ? Number.parseInt(envMediumFollowers, 10)
      : mediumProfile.followers ??
        contentSeed.medium.followerCount ??
        previousContent?.metrics?.mediumFollowers ??
        null;

  const envMediumArticles = process.env.MEDIUM_ARTICLE_COUNT;
  let mediumArticleCount = null;
  if (envMediumArticles != null && envMediumArticles !== "") {
    mediumArticleCount = Number.parseInt(envMediumArticles, 10);
  } else if (contentSeed.medium.articleCount != null) {
    mediumArticleCount = contentSeed.medium.articleCount;
  } else {
    const fromSources = Math.max(
      mediumProfile.articleCount ?? 0,
      mediumFeedArticleCount,
      0,
    );
    mediumArticleCount =
      fromSources > 0
        ? fromSources
        : previousContent?.metrics?.mediumArticleCount ?? null;
  }

  const envInstagram = process.env.INSTAGRAM_FOLLOWERS;
  let instagramFollowers =
    envInstagram != null && envInstagram !== ""
      ? Number.parseInt(envInstagram, 10)
      : contentSeed.instagram.followerCount ??
        previousContent?.metrics?.instagramFollowers ??
        null;

  const youtubeSubscribers =
    youtube?.subscribers ?? previousContent?.metrics?.youtubeSubscribers ?? null;

  const instagramSync = await syncInstagramPosts(
    contentSeed,
    Array.isArray(previousInstagramPosts) ? previousInstagramPosts : [],
  ).catch((err) => {
    console.warn("Instagram posts:", err.message);
    const fallback = Array.isArray(previousInstagramPosts) ? previousInstagramPosts : [];
    return { posts: fallback, followers: null };
  });

  const instagramItems = instagramSync.posts ?? [];
  if (
    instagramSync.followers != null &&
    (envInstagram == null || envInstagram === "")
  ) {
    instagramFollowers = instagramSync.followers;
  }

  const audienceReach = [youtubeSubscribers, mediumFollowers, instagramFollowers]
    .filter((n) => typeof n === "number" && Number.isFinite(n))
    .reduce((sum, n) => sum + n, 0);

  const contentChannels = buildContentChannels({
    seed: contentSeed,
    youtube,
    mediumItems,
    mediumFollowers,
    mediumArticleCount,
    instagramFollowers,
    instagramItems,
    previous: previousContent,
  });

  const instagramChannel = contentChannels.find((c) => c.id === "instagram");
  const instagramForFile =
    instagramItems.length > 0
      ? instagramItems
      : (instagramChannel?.items ?? []).map((item) => ({
          title: item.title,
          meta: item.meta,
          href: item.href ?? contentSeed.instagram.url,
          image: item.image,
        }));

  const contentGenerated = {
    syncedAt: new Date().toISOString(),
    channels: contentChannels,
    metrics: {
      youtubeSubscribers,
      mediumFollowers,
      mediumArticleCount,
      instagramFollowers,
      audienceReach,
      audienceReachLabel: formatReachLabel(audienceReach),
    },
  };

  profile.metrics = {
    youtubeSubscribers,
    mediumFollowers,
    mediumArticleCount,
    instagramFollowers,
    githubFollowers: user.followers,
    totalStars,
    audienceReach,
    audienceReachLabel: formatReachLabel(audienceReach),
  };

  const topmateHtml = await fetchText(TOPMATE_PROFILE_URL);
  const topmateReviews = parseTopmateReviews(topmateHtml);

  const journeySeed = readJson("src/features/journey/data/journey.seed.json");
  const recommendationsSeed = readJson(
    "src/features/recommendations/data/recommendations.seed.json",
  );
  const recommendations = mergeRecommendations(recommendationsSeed, topmateReviews);

  const sharedDir = join(root, "src/shared/config");
  const contentDir = join(root, "src/features/content/data");
  const projectsDir = join(root, "src/features/projects/data");
  const ossDir = join(root, "src/features/open-source/data");
  const journeyDir = join(root, "src/features/journey/data");
  const recommendationsDir = join(root, "src/features/recommendations/data");

  mkdirSync(sharedDir, { recursive: true });
  mkdirSync(contentDir, { recursive: true });
  mkdirSync(projectsDir, { recursive: true });
  mkdirSync(ossDir, { recursive: true });
  mkdirSync(journeyDir, { recursive: true });
  mkdirSync(recommendationsDir, { recursive: true });

  if (githubSynced) {
    writeFileSync(join(sharedDir, "profile.generated.json"), JSON.stringify(profile, null, 2));
    writeFileSync(join(projectsDir, "projects.generated.json"), JSON.stringify(featured, null, 2));
    writeFileSync(join(ossDir, "repos.generated.json"), JSON.stringify(oss, null, 2));
  }
  writeFileSync(join(contentDir, "medium.generated.json"), JSON.stringify(mediumItems, null, 2));
  writeFileSync(
    join(contentDir, "instagram.generated.json"),
    JSON.stringify(instagramForFile, null, 2),
  );
  writeFileSync(
    join(contentDir, "content.generated.json"),
    JSON.stringify(contentGenerated, null, 2),
  );
  writeFileSync(
    join(journeyDir, "journey.generated.json"),
    JSON.stringify(journeySeed, null, 2),
  );
  writeFileSync(
    join(recommendationsDir, "recommendations.generated.json"),
    JSON.stringify(recommendations, null, 2),
  );

  console.log(
    `Synced${githubSynced ? "" : " (GitHub cached)"} profile (${user.followers} GitHub followers, ${totalStars} stars), ${featured.length} projects, ${oss.length} OSS repos, Instagram ${instagramForFile.length} posts, Medium ${mediumFollowers ?? "?"} followers / ${mediumArticleCount ?? "?"} articles, audience reach ${profile.metrics.audienceReachLabel}, ${journeySeed.length} journey roles, ${recommendations.length} recommendations`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
