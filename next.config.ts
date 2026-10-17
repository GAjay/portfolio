import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";
import { resolveGithubPagesBasePath } from "./scripts/github-pages-env.mjs";

const githubPages = process.env.GITHUB_PAGES === "1";
const basePath = resolveGithubPagesBasePath();

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: basePath || "/",
  fallbacks: {
    document: "/offline",
  },
});

const nextConfig: NextConfig = {
  ...(githubPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath,
        assetPrefix: basePath || undefined,
      }
    : {}),
  images: {
    unoptimized: githubPages,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
    ],
  },
  ...(githubPages
    ? {}
    : {
        cacheComponents: true,
        partialPrefetching: true,
      }),
  turbopack: {
    rules: {
      "src/app/globals.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withPWA(nextConfig);
