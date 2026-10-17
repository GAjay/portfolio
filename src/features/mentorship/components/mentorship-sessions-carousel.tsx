"use client";

import type { CSSProperties } from "react";
import { RippleAnchor } from "@/shared/components/ripple";
import { useAutoplayCarousel } from "@/shared/hooks/use-autoplay-carousel";
import { siteConfig } from "@/shared/config/site";
import type { MentorshipSession } from "../data/sessions";

const VISIBLE_SLOTS = 4;

type MentorshipSessionsCarouselProps = {
  sessions: MentorshipSession[];
};

export function MentorshipSessionsCarousel({
  sessions,
}: MentorshipSessionsCarouselProps) {
  const { trackRef, pauseHandlers } = useAutoplayCarousel(VISIBLE_SLOTS, 5000);

  return (
    <div
      className="mentor-carousel"
      aria-roledescription="carousel"
      aria-label="Mentorship sessions"
      {...pauseHandlers}
    >
      <div
        ref={trackRef}
        className="mentor-carousel__track"
        style={{ "--visible-slots": VISIBLE_SLOTS } as CSSProperties}
      >
        {sessions.map((session) => (
          <div key={session.id} className="mentor-carousel__slide">
            <RippleAnchor
              className="card svc mentor-carousel__card"
              href={siteConfig.topmateUrl}
              hoverRipple
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ic" aria-hidden>
                <svg className="i" viewBox="0 0 24 24">
                  <rect x="4" y="5" width="16" height="15" rx="3" />
                  <path d="M8 10h8M8 14h5" />
                </svg>
              </span>
              <b>{session.title}</b>
              <span>{session.duration} · {session.price}</span>
            </RippleAnchor>
          </div>
        ))}
      </div>
    </div>
  );
}
