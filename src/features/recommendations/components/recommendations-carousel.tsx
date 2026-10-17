"use client";

import type { CSSProperties } from "react";
import { Quote } from "asriui/quote";
import { Badge } from "asriui/badge";
import { RippleAnchor } from "@/shared/components/ripple";
import { useAutoplayCarousel } from "@/shared/hooks/use-autoplay-carousel";
import type { Recommendation } from "../data/recommendations.types";
import { RecommendationAvatar } from "./recommendation-avatar";

const VISIBLE_SLOTS = 3;

const sourceLabel: Record<Recommendation["source"], string> = {
  linkedin: "LinkedIn",
  topmate: "Topmate",
};

type RecommendationsCarouselProps = {
  items: Recommendation[];
};

function itemsForCarousel(items: Recommendation[], visibleSlots: number) {
  if (items.length === 0) return [];
  let expanded = [...items];
  const minSlides = Math.max(visibleSlots + 2, visibleSlots * 2);
  while (expanded.length < minSlides) {
    expanded = [...expanded, ...items];
  }
  return expanded;
}

export function RecommendationsCarousel({ items }: RecommendationsCarouselProps) {
  const slides = itemsForCarousel(items, VISIBLE_SLOTS);
  const { trackRef, pauseHandlers } = useAutoplayCarousel(
    VISIBLE_SLOTS,
    5500,
    slides.length,
  );

  return (
    <div
      className="rec-carousel"
      aria-roledescription="carousel"
      aria-label="Recommendations and testimonials"
      {...pauseHandlers}
    >
      <div
        ref={trackRef}
        className="rec-carousel__track"
        style={{ "--visible-slots": VISIBLE_SLOTS } as CSSProperties}
      >
        {slides.map((item, index) => (
          <div key={`${item.id}-${index}`} className="rec-carousel__slide">
            <article className="card rec-card">
              <header className="rec-card__head">
                <RecommendationAvatar item={item} />
                <Badge variant="secondary" className="chip rec-card__source">
                  {sourceLabel[item.source]}
                  {item.date ? ` · ${item.date}` : ""}
                </Badge>
              </header>
              <div className="rec-card__body">
                <Quote className="rec-quote" cite={item.href ?? undefined}>
                  {item.quote}
                </Quote>
              </div>
              <footer className="rec-card__foot">
                <div className="rec-card__who">
                  <strong className="rec-author">{item.author}</strong>
                  {item.role ? <span className="rec-role">{item.role}</span> : null}
                </div>
                {item.href ? (
                  <RippleAnchor
                    className="rec-link"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more
                  </RippleAnchor>
                ) : null}
              </footer>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
