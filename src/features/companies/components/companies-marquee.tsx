"use client";

import { useMemo } from "react";
import { RippleAnchor, RippleDiv } from "@/shared/components/ripple";
import { brandsForCarousel } from "../data/companies";
import { CompanyMark } from "./company-mark";

const LOOPS = 2;

export function CompaniesMarquee() {
  const brands = useMemo(() => brandsForCarousel(), []);
  const slides = useMemo(
    () =>
      Array.from({ length: LOOPS }, (_, loop) =>
        brands.map((company) => ({ ...company, key: `${company.id}-${loop}` })),
      ).flat(),
    [brands],
  );

  return (
    <div
      className="company-marquee"
      aria-label="Companies and brands"
      role="region"
    >
      <div className="company-marquee__viewport">
        <div className="company-marquee__track">
          {slides.map((company) => (
            <div key={company.key} className="company-marquee__slide">
              {company.website ? (
                <RippleAnchor
                  href={company.website}
                  className="card company-tile company-tile__link company-marquee__tile"
                  hoverRipple
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={company.name}
                >
                  <CompanyMark company={company} />
                </RippleAnchor>
              ) : (
                <RippleDiv className="card company-tile company-marquee__tile" hoverRipple>
                  <CompanyMark company={company} />
                </RippleDiv>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
