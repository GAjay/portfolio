"use client";

import { useEffect, useRef, useState } from "react";

export type ScrollCascade = "down" | "up";

type ScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  /** down = top→bottom cascade; up = bottom→top cascade */
  cascade?: ScrollCascade;
};

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options?: ScrollRevealOptions,
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  const threshold = options?.threshold ?? 0.08;
  const rootMargin = options?.rootMargin ?? "0px 0px -2% 0px";
  const cascade = options?.cascade ?? "down";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const reveal = () => {
      setVisible(true);
      observer.disconnect();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) reveal();
      },
      { threshold, rootMargin },
    );

    observer.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
      requestAnimationFrame(reveal);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  const className = [
    "scroll-reveal",
    `scroll-reveal--cascade-${cascade}`,
    visible ? "scroll-reveal--in" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return { ref, visible, className, cascade };
}

export function cascadeForSectionIndex(index: string): ScrollCascade {
  const n = Number.parseInt(index, 10);
  if (!Number.isFinite(n) || n <= 0) return "up";
  return n % 2 === 1 ? "down" : "up";
}
