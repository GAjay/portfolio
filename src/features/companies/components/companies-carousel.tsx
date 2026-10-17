"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { RippleAnchor, RippleDiv } from "@/shared/components/ripple";
import { brandsForCarousel } from "../data/companies";
import type { Company } from "../data/companies";
import { CompanyMark } from "./company-mark";

const brands = brandsForCarousel();
const AUTOPLAY_MS = 4500;
const VISIBLE_SLOTS = 4;
const VISIBLE_SLOTS_STRIP = 7;

type CompaniesCarouselProps = {
  /** Full-width band below journey (logo-only tiles, tighter grid). */
  variant?: "default" | "strip";
};

function CompanySlide({ company }: { company: Company }) {
  const tileClass = `card company-tile${
    company.website ? " company-tile__link" : ""
  }`;

  const inner = <CompanyMark company={company} />;

  if (company.website) {
    return (
      <RippleAnchor
        href={company.website}
        className={tileClass}
        hoverRipple
        target="_blank"
        rel="noopener noreferrer"
        aria-label={company.name}
      >
        {inner}
      </RippleAnchor>
    );
  }

  return (
    <RippleDiv className={tileClass} hoverRipple role="img" aria-label={company.name}>
      {inner}
    </RippleDiv>
  );
}

export function CompaniesCarousel({ variant = "default" }: CompaniesCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [paused, setPaused] = useState(false);
  const visibleSlots = variant === "strip" ? VISIBLE_SLOTS_STRIP : VISIBLE_SLOTS;

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScroll(track.scrollWidth - track.clientWidth > 2);
  }, []);

  const scroll = useCallback(
    (dir: -1 | 1) => {
      const track = trackRef.current;
      if (!track) return;
      const step = track.clientWidth / visibleSlots;
      const max = track.scrollWidth - track.clientWidth;

      if (dir === 1 && track.scrollLeft >= max - 2) {
        track.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }
      track.scrollBy({ left: dir * step, behavior: "smooth" });
    },
    [visibleSlots],
  );

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
      className={`company-carousel${variant === "strip" ? " company-carousel--strip" : ""}`}
      aria-roledescription="carousel"
      aria-label="Companies and brands"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="company-carousel__track"
        style={{ "--visible-slots": visibleSlots } as CSSProperties}
      >
        {brands.map((company) => (
          <div key={company.id} className="company-carousel__slide">
            <CompanySlide company={company} />
          </div>
        ))}
      </div>
    </div>
  );
}
