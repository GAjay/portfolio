"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatedValue } from "@/shared/components/animated-value";

const barHeights = ["20%", "32%", "44%", "58%", "80%", "100%"];

type HeroReachCardProps = {
  label: string;
  delta?: string;
  value: string;
  /** When true, run entrance + bar animations */
  active: boolean;
};

export function HeroReachCard({ label, delta, value, active }: HeroReachCardProps) {
  const [barsOn, setBarsOn] = useState(false);
  const [countOn, setCountOn] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!active) return;
    if (reducedRef.current) {
      setBarsOn(true);
      setCountOn(true);
      return;
    }
    const t1 = window.setTimeout(() => setBarsOn(true), 120);
    const t2 = window.setTimeout(() => setCountOn(true), 280);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [active]);

  return (
    <div
      className={["reach", "hero-reach", active ? "hero-reach--on" : ""].filter(Boolean).join(" ")}
    >
      <small>
        <span>{label}</span>
        {delta ? <span>{delta}</span> : null}
      </small>
      {countOn ? (
        <AnimatedValue as="b" value={value} immediate duration={1200} />
      ) : (
        <b className="hero-reach__value-placeholder" aria-hidden="true">0</b>
      )}
      <div className={["bars", "hero-reach__bars", barsOn ? "hero-reach__bars--on" : ""].filter(Boolean).join(" ")}>
        {barHeights.map((height, index) => (
          <i key={height} style={{ height }} data-i={index} />
        ))}
      </div>
    </div>
  );
}
