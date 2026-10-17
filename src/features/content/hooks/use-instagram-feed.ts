"use client";

import { useEffect, useState } from "react";
import type { ContentItem } from "../data/content";

export const INSTAGRAM_FEED_URL = "/data/instagram-feed.json";

export type InstagramFeedDocument = {
  syncedAt: string;
  profileUrl: string;
  handle: string;
  followers: number | null;
  posts: ContentItem[];
};

export function useInstagramFeed(fallbackPosts: ContentItem[]) {
  const [posts, setPosts] = useState(fallbackPosts);
  const [followers, setFollowers] = useState<number | null>(null);
  const [syncedAt, setSyncedAt] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(INSTAGRAM_FEED_URL, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: InstagramFeedDocument | null) => {
        if (cancelled || !data?.posts?.length) return;
        setPosts(data.posts);
        setFollowers(
          typeof data.followers === "number" && Number.isFinite(data.followers)
            ? data.followers
            : null,
        );
        setSyncedAt(data.syncedAt ?? null);
      })
      .catch(() => {
        /* keep build-time fallback */
      });

    return () => {
      cancelled = true;
    };
  }, [fallbackPosts]);

  return { posts, followers, syncedAt };
}
