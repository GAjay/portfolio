"use client";

import { useEffect, useRef, useState } from "react";

const PROPERTIES = ["build", "learn", "share", "mentor", "ai"] as const;
const LINE_MS = 340;
const START_DELAY_MS = 400;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type HeroDeveloperCodeProps = {
  /** Fires around mid-snippet so the readers card can animate in parallel */
  onReachCue?: () => void;
  onComplete?: () => void;
};

export function HeroDeveloperCode({ onReachCue, onComplete }: HeroDeveloperCodeProps) {
  const reachCueRef = useRef(onReachCue);
  const completeRef = useRef(onComplete);
  reachCueRef.current = onReachCue;
  completeRef.current = onComplete;
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const totalSteps = 2 + PROPERTIES.length;

  useEffect(() => {
    if (prefersReducedMotion()) {
      setStep(totalSteps);
      reachCueRef.current?.();
      completeRef.current?.();
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const schedule = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    setTyping(true);
    let s = 0;
    const tick = () => {
      if (cancelled) return;
      s += 1;
      setStep(s);
      if (s === 3) reachCueRef.current?.();
      if (s < totalSteps) {
        schedule(tick, LINE_MS);
      } else {
        setTyping(false);
        completeRef.current?.();
      }
    };
    schedule(tick, START_DELAY_MS);

    return () => {
      cancelled = true;
      for (const id of timers) window.clearTimeout(id);
    };
  }, [totalSteps]);

  const showOpen = step >= 1;
  const showClose = step >= totalSteps;

  return (
    <div
      className={[
        "code",
        "hero-code",
        typing ? "hero-code--typing" : "",
        showClose ? "hero-code--done" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Developer traits"
    >
      <div
        className={[
          "hero-code__line",
          showOpen ? "hero-code__line--on" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="hero-code__kw">const</span>{" "}
        <span className="hero-code__id">developer</span> = {"{"}
      </div>
      {PROPERTIES.map((key, index) => {
        const on = step >= index + 2;
        return (
          <div
            key={key}
            className={["hero-code__line", "hero-code__line--prop", on ? "hero-code__line--on" : ""]
              .filter(Boolean)
              .join(" ")}
          >
            &nbsp;&nbsp;
            <span className="hero-code__key">{key}</span>
            <span className="hero-code__punct">: </span>
            <span className={["hero-code__bool", on ? "hero-code__bool--on" : ""].filter(Boolean).join(" ")}>
              true
            </span>
            ,
          </div>
        );
      })}
      <div
        className={[
          "hero-code__line",
          showClose ? "hero-code__line--on" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {"}"}
        {typing ? (
          <span className="hero-code__caret" aria-hidden="true" />
        ) : null}
      </div>
    </div>
  );
}
