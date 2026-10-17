"use client";

import { RefSection } from "@/shared/components/ref-section";
import { siteConfig } from "@/shared/config/site";
import { recommendations } from "../data/recommendations";
import { RecommendationsCarousel } from "./recommendations-carousel";

export function RecommendationsSection() {
  if (recommendations.length === 0) return null;

  const sorted = [...recommendations].sort((a, b) => {
    if (a.source === b.source) return 0;
    return a.source === "linkedin" ? -1 : 1;
  });

  return (
    <RefSection
      id="recommendations"
      revealOrder={11}
      fullViewport={false}
      stacked
      kicker={siteConfig.testimonials.kicker}
      title={siteConfig.testimonials.title}
      description={siteConfig.testimonials.description}
    >
      <RecommendationsCarousel items={sorted} />
    </RefSection>
  );
}
