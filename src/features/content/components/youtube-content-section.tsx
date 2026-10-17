import { RefSection } from "@/shared/components/ref-section";
import { siteConfig } from "@/shared/config/site";
import { contentChannels } from "../data/content";
import { ContentPlatformKickerChips } from "./content-platform-kicker-chips";
import { ContentChannelCarousel } from "./content-channel-carousel";

export function YoutubeContentSection() {
  const copy = siteConfig.contentPlatforms.youtube;
  const channel = contentChannels.find((c) => c.id === "youtube");

  if (!channel) return null;

  return (
    <RefSection
      id="content-youtube"
      revealOrder={7}
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
      <ContentChannelCarousel
        channelId="youtube"
        items={channel.items}
        profileUrl={channel.viewAll}
      />
    </RefSection>
  );
}
