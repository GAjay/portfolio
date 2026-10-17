"use client";

import type { CSSProperties } from "react";
import { PlatformIcon } from "@/shared/components/icons/platform-icons";
import { RippleAnchor } from "@/shared/components/ripple";
import { useAutoplayCarousel } from "@/shared/hooks/use-autoplay-carousel";
import type { ContentItem } from "../data/content";

const VISIBLE_SLOTS = 3;

type InstagramCarouselProps = {
  posts: ContentItem[];
  profileUrl: string;
};

export function InstagramCarousel({ posts, profileUrl }: InstagramCarouselProps) {
  const { trackRef, pauseHandlers } = useAutoplayCarousel(VISIBLE_SLOTS);

  if (posts.length === 0) {
    return (
      <p className="content-platform-row__empty">
        Add post URLs in <code>content.seed.json</code> (<code>instagram.postUrls</code>), set{" "}
        <code>INSTAGRAM_ACCESS_TOKEN</code>, or run <code>npm run sync:data</code> after either.
      </p>
    );
  }

  return (
    <div
      className="content-carousel content-carousel--instagram"
      aria-roledescription="carousel"
      aria-label="Instagram posts"
      {...pauseHandlers}
    >
      <div
        ref={trackRef}
        className="content-carousel__track"
        style={{ "--visible-slots": VISIBLE_SLOTS } as CSSProperties}
      >
        {posts.map((post) => {
          const href = post.href ?? profileUrl;
          return (
            <div key={href} className="content-carousel__slide">
              <RippleAnchor
                href={href}
                className="card content-tile content-tile--post content-tile__link"
                hoverRipple
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.image ? (
                  <span className="content-tile__thumb-wrap">
                    <img
                      src={post.image}
                      alt=""
                      className="content-tile__thumb"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  </span>
                ) : (
                  <span className="content-tile__thumb-placeholder" aria-hidden>
                    <PlatformIcon id="instagram" />
                  </span>
                )}
                <span className="content-tile__title">{post.title}</span>
                <span className="content-tile__meta">{post.meta}</span>
              </RippleAnchor>
            </div>
          );
        })}
      </div>
    </div>
  );
}
