"use client";

import { RefSection } from "@/shared/components/ref-section";
import { siteConfig } from "@/shared/config/site";
import { contentChannels, instagramFeed } from "../data/content";
import { ContentPlatformKickerChips } from "./content-platform-kicker-chips";
import { useInstagramFeed } from "../hooks/use-instagram-feed";
import { InstagramCarousel } from "./instagram-carousel";

function formatHumanCount(n: number) {
  if (n >= 1_000_000) {
    const v = n / 1_000_000;
    return `${v >= 10 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (n >= 10_000) return `${Math.round(n / 1000)}K`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export function InstagramContentSection() {
  const copy = siteConfig.contentPlatforms.instagram;
  const channel = contentChannels.find((c) => c.id === "instagram");
  const { posts, followers } = useInstagramFeed(instagramFeed);

  if (!channel) return null;

  const stat =
    followers != null
      ? `${formatHumanCount(followers)} followers`
      : channel.stat;

  return (
    <RefSection
      id="content"
      revealOrder={6}
      split
      kicker={
        <ContentPlatformKickerChips platformLabel={copy.kicker} stat={stat} />
      }
      title={copy.title}
      description={copy.description}
      action={{
        label: copy.cta,
        href: channel.viewAll,
      }}
    >
      <InstagramCarousel posts={posts} profileUrl={channel.viewAll} />
    </RefSection>
  );
}
