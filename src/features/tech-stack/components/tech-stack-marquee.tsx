"use client";

import { useMemo } from "react";
import { RippleDiv } from "@/shared/components/ripple";
import { TechIcon } from "@/shared/components/icons/tech-icons";
import { techStack } from "../data/stack";

const LOOPS = 2;

export function TechStackMarquee() {
  const slides = useMemo(
    () =>
      Array.from({ length: LOOPS }, (_, loop) =>
        techStack.map((tool) => ({ ...tool, key: `${tool.name}-${loop}` })),
      ).flat(),
    [],
  );

  return (
    <div
      className="tech-marquee"
      aria-label="Technologies"
      role="region"
    >
      <div className="tech-marquee__shine" aria-hidden />
      <div className="tech-marquee__viewport">
        <div className="tech-marquee__track">
          {slides.map((tool) => (
            <div key={tool.key} className="tech-marquee__slide">
              <RippleDiv className="card tile carousel-tile tech-marquee__tile" hoverRipple>
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
    </div>
  );
}
