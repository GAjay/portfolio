"use client";

import type { CSSProperties } from "react";
import { RippleAnchor } from "@/shared/components/ripple";
import { useAutoplayCarousel } from "@/shared/hooks/use-autoplay-carousel";
import type { ContentItem } from "../data/content";

const VISIBLE_SLOTS = 3;

type MediumCarouselProps = {
  articles: ContentItem[];
};

export function MediumCarousel({ articles }: MediumCarouselProps) {
  const { trackRef, pauseHandlers } = useAutoplayCarousel(VISIBLE_SLOTS);

  return (
    <div
      className="content-carousel content-carousel--medium"
      aria-roledescription="carousel"
      aria-label="Medium articles"
      {...pauseHandlers}
    >
      <div
        ref={trackRef}
        className="content-carousel__track"
        style={{ "--visible-slots": VISIBLE_SLOTS } as CSSProperties}
      >
        {articles.map((article) => (
          <div key={article.href ?? article.title} className="content-carousel__slide">
            <RippleAnchor
              href={article.href ?? "#"}
              className="card content-tile content-tile--post content-tile--medium content-tile__link"
              hoverRipple
              target="_blank"
              rel="noopener noreferrer"
            >
              {article.image ? (
                <span className="content-tile__thumb-wrap content-tile__thumb-wrap--medium">
                  <img
                    src={article.image}
                    alt=""
                    className="content-tile__thumb"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </span>
              ) : (
                <span
                  className="content-tile__thumb-placeholder content-tile__thumb-placeholder--medium"
                  aria-hidden
                >
                  <span className="content-tile__mark">M</span>
                </span>
              )}
              <span className="content-tile__title">{article.title}</span>
              <time className="content-tile__meta" dateTime={article.meta}>
                {article.meta}
              </time>
            </RippleAnchor>
          </div>
        ))}
      </div>
    </div>
  );
}
