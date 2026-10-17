"use client";

import { useEffect, useRef, useState } from "react";
import { Typography } from "asriui/typography";
import { siteConfig } from "@/shared/config/site";

const HEADLINE = siteConfig.headline;
const CHAR_MS = 38;
const START_DELAY_MS = 320;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Ghost layer reserves full headline size (no CLS); live layer types on top.
 */
export function HeroTypewriterHeadline() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisibleCount(HEADLINE.length);
      return;
    }

    let cancelled = false;

    const clearTimers = () => {
      for (const id of timersRef.current) {
        window.clearTimeout(id);
      }
      timersRef.current = [];
    };

    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timersRef.current.push(id);
      return id;
    };

    const runTypewriter = () => {
      if (cancelled) return;
      setTyping(true);
      setVisibleCount(0);

      let i = 0;
      const tick = () => {
        if (cancelled) return;
        i += 1;
        setVisibleCount(i);
        if (i < HEADLINE.length) {
          schedule(tick, CHAR_MS);
        } else {
          setTyping(false);
        }
      };
      schedule(tick, CHAR_MS);
    };

    schedule(runTypewriter, START_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, []);

  const visible = HEADLINE.slice(0, visibleCount);
  const caretOn = typing || visibleCount > 0;

  return (
    <Typography variant="h1" as="h1" className="hero-headline">
      <span className="hero-headline__ghost" aria-hidden="true">
        {HEADLINE}
      </span>
      <span className="hero-headline__live">
        <span className="hero-headline__text">{visible}</span>
        <span
          className={`hero-headline__caret${caretOn ? " hero-headline__caret--on" : ""}`}
          aria-hidden
        />
      </span>
    </Typography>
  );
}
