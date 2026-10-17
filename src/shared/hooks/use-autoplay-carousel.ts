"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useAutoplayCarousel(
  visibleSlots: number,
  autoplayMs = 5000,
  slideCount = 0,
) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [paused, setPaused] = useState(false);

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
  }, [measure, slideCount]);

  useEffect(() => {
    if (slideCount === 0) return;
    const track = trackRef.current;
    if (!track) return;
    measure();
    const raf = requestAnimationFrame(() => measure());
    const t = window.setTimeout(measure, 400);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [measure, slideCount]);

  useEffect(() => {
    if (!canScroll || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => scroll(1), autoplayMs);
    return () => window.clearInterval(id);
  }, [autoplayMs, canScroll, paused, scroll]);

  const pauseHandlers = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocusCapture: () => setPaused(true),
    onBlurCapture: () => setPaused(false),
  };

  return { trackRef, canScroll, pauseHandlers };
}
