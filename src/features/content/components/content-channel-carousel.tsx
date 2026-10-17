"use client";

import type { CSSProperties } from "react";
import { PlatformIcon } from "@/shared/components/icons/platform-icons";
import { RippleAnchor } from "@/shared/components/ripple";
import { useAutoplayCarousel } from "@/shared/hooks/use-autoplay-carousel";
import type { ContentItem } from "../data/content";

const VISIBLE_SLOTS = 3;

type ContentChannelCarouselProps = {
  channelId: "youtube" | "instagram";
  items: ContentItem[];
  profileUrl: string;
};

export function ContentChannelCarousel({
  channelId,
  items,
  profileUrl,
}: ContentChannelCarouselProps) {
  const { trackRef, pauseHandlers } = useAutoplayCarousel(VISIBLE_SLOTS);

  return (
    <div
      className="content-carousel content-carousel--channel content-carousel--youtube"
      aria-roledescription="carousel"
      aria-label={`${channelId} highlights`}
      {...pauseHandlers}
    >
      <div
        ref={trackRef}
        className="content-carousel__track"
        style={{ "--visible-slots": VISIBLE_SLOTS } as CSSProperties}
      >
        {items.map((item) => (
          <div key={item.href ?? item.title} className="content-carousel__slide">
            <RippleAnchor
              href={item.href ?? profileUrl}
              className="card content-tile content-tile__link"
              hoverRipple
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="content-tile__icon" aria-hidden>
                <PlatformIcon id={channelId} />
              </span>
              <span className="content-tile__title">{item.title}</span>
              <span className="content-tile__meta">{item.meta}</span>
            </RippleAnchor>
          </div>
        ))}
      </div>
    </div>
  );
}
