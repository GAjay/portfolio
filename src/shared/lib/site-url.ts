import { basePath } from "@/shared/config/base-path";

/** Default live site — used when env is missing or still points at localhost in production builds. */
export const DEFAULT_SITE_ORIGIN = "https://ajaymaheshwari.dev";

function isLocalhostHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]" ||
    hostname.endsWith(".localhost")
  );
}

function normalizeOrigin(raw: string): string {
  const trimmed = raw.trim();
  const withProtocol = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
  return withProtocol.replace(/\/$/, "");
}

function defaultGithubPagesOrigin(): string | undefined {
  if (process.env.GITHUB_PAGES !== "1") return undefined;
  const owner = process.env.GITHUB_REPOSITORY_OWNER;
  if (!owner) return undefined;
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
  if (!repo || repo.endsWith(".github.io")) {
    return `https://${owner}.github.io`;
  }
  return `https://${owner}.github.io/${repo}`;
}

/** Site origin only (no `basePath`). Safe for production — never returns localhost when `NODE_ENV=production`. */
export function getSiteOrigin(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
    defaultGithubPagesOrigin(),
    DEFAULT_SITE_ORIGIN,
  ];

  for (const raw of candidates) {
    if (!raw?.trim()) continue;
    const origin = normalizeOrigin(raw);
    try {
      const { hostname } = new URL(origin);
      if (process.env.NODE_ENV === "production" && isLocalhostHost(hostname)) {
        continue;
      }
      return origin;
    } catch {
      continue;
    }
  }

  return DEFAULT_SITE_ORIGIN;
}

/** Canonical origin + optional GitHub Pages `basePath`. */
export function getSiteUrl(): string {
  const origin = getSiteOrigin();
  if (!basePath) return origin;
  return `${origin}${basePath}`;
}

/** Absolute URL for metadata, sitemap, and share links. */
export function absoluteUrl(path: string = "/"): string {
  const site = getSiteUrl();
  if (!path || path === "/") {
    return site.endsWith("/") ? site : `${site}/`;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site}${normalized}`;
}
