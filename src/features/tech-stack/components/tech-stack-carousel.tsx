"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { RippleDiv } from "@/shared/components/ripple";
import { TechIcon } from "@/shared/components/icons/tech-icons";
import { techStack } from "../data/stack";

const AUTOPLAY_MS = 5000;
const VISIBLE_SLOTS = 6;

export function TechStackCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [paused, setPaused] = useState(false);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScroll(track.scrollWidth - track.clientWidth > 2);
  }, []);

  const scroll = useCallback((dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const step = track.clientWidth / VISIBLE_SLOTS;
    const max = track.scrollWidth - track.clientWidth;

    if (dir === 1 && track.scrollLeft >= max - 2) {
      track.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    if (!canScroll || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => scroll(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [canScroll, paused, scroll]);

  return (
    <div
      className="tech-carousel"
      aria-roledescription="carousel"
      aria-label="Tech stack tools"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="tech-carousel__track"
        style={{ "--visible-slots": VISIBLE_SLOTS } as CSSProperties}
      >
        {techStack.map((tool) => (
          <div key={tool.name} className="tech-carousel__slide">
            <RippleDiv className="card tile carousel-tile" hoverRipple>
              <span
                className={[
                  "tile__icon",
                  tool.payment ? "tile__icon--payment" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden
              >
                <TechIcon slug={tool.icon} />
              </span>
              <span className="tile__name">{tool.name}</span>
            </RippleDiv>
          </div>
        ))}
      </div>
    </div>
  );
}
