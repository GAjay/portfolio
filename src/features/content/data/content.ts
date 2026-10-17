import contentGenerated from "./content.generated.json";
import instagramPosts from "./instagram.generated.json";

export type ContentItem = {
  title: string;
  meta: string;
  href?: string;
  image?: string;
};

export type ContentChannel = {
  id: string;
  name: string;
  handle: string;
  stat: string;
  viewAll: string;
  items: ContentItem[];
};

export const contentChannels = contentGenerated.channels as ContentChannel[];

export const contentMetrics = contentGenerated.metrics;

function resolveInstagramFeed(): ContentItem[] {
  const generated = instagramPosts as ContentItem[];
  if (generated.length > 0) return generated;

  const channel = contentChannels.find((c) => c.id === "instagram");
  if (!channel?.items?.length) return [];

  return channel.items.map((item) => ({
    ...item,
    href: item.href ?? channel.viewAll,
  }));
}

export const instagramFeed = resolveInstagramFeed();
