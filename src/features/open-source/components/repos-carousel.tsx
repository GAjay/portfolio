"use client";

import type { CSSProperties } from "react";
import { AnimatedValue } from "@/shared/components/animated-value";
import { IconFork, IconStar } from "@/shared/components/portfolio-icons";
import { PortfolioBody, PortfolioH3 } from "@/shared/components/portfolio-typography";
import { RippleAnchor } from "@/shared/components/ripple";
import { useAutoplayCarousel } from "@/shared/hooks/use-autoplay-carousel";
import type { OpenSourceRepo } from "../data/repos.types";

const VISIBLE_SLOTS = 3;

type ReposCarouselProps = {
  repos: OpenSourceRepo[];
};

export function ReposCarousel({ repos }: ReposCarouselProps) {
  const { trackRef, pauseHandlers } = useAutoplayCarousel(VISIBLE_SLOTS);

  return (
    <div
      className="repo-carousel"
      aria-roledescription="carousel"
      aria-label="GitHub repositories"
      {...pauseHandlers}
    >
      <div
        ref={trackRef}
        className="repo-carousel__track"
        style={{ "--visible-slots": VISIBLE_SLOTS } as CSSProperties}
      >
        {repos.map((repo) => (
          <div key={repo.id} className="repo-carousel__slide">
            <RippleAnchor
              href={repo.href}
              className="card repo repo-carousel-tile repo-carousel-tile__link"
              hoverRipple
              target="_blank"
              rel="noopener noreferrer"
            >
              <PortfolioH3>
                <svg className="i" viewBox="0 0 24 24" aria-hidden>
                  <path d="M5 4h12a2 2 0 012 2v13H7a2 2 0 01-2-2zM5 17a2 2 0 012-2h12" />
                </svg>
                {repo.name}
              </PortfolioH3>
              <PortfolioBody>{repo.description}</PortfolioBody>
              <div className="tags">
                <span className="chip">{repo.language}</span>
              </div>
              <div className="m">
                <span>
                  <IconStar />
                  <AnimatedValue value={repo.stars} />
                </span>
                <span>
                  <IconFork />
                  <AnimatedValue value={repo.forks} />
                </span>
              </div>
            </RippleAnchor>
          </div>
        ))}
      </div>
    </div>
  );
}
