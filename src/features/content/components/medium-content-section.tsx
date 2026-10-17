import { RefSection } from "@/shared/components/ref-section";
import { siteConfig } from "@/shared/config/site";
import { contentChannels } from "../data/content";
import { ContentPlatformKickerChips } from "./content-platform-kicker-chips";
import mediumArticles from "../data/medium.generated.json";
import { MediumCarousel } from "./medium-carousel";
import type { ContentItem } from "../data/content";

export function MediumContentSection() {
  const copy = siteConfig.contentPlatforms.medium;
  const channel = contentChannels.find((c) => c.id === "medium");
  const articles = mediumArticles as ContentItem[];

  if (!channel) return null;

  return (
    <RefSection
      id="content-medium"
      revealOrder={8}
      split
      kicker={
        <ContentPlatformKickerChips platformLabel={copy.kicker} stat={channel.stat} />
      }
      title={copy.title}
      description={copy.description}
      action={{
        label: copy.cta,
        href: channel.viewAll,
      }}
    >
      <MediumCarousel articles={articles} />
    </RefSection>
  );
}
