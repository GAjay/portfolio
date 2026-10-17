"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IconArrow } from "@/shared/components/portfolio-icons";
import { AnimatedValue } from "@/shared/components/animated-value";
import { RippleAnchor } from "@/shared/components/ripple";
import { assetPath, withBasePath } from "@/shared/config/base-path";
import { PortfolioLead } from "@/shared/components/portfolio-typography";
import { resumeHref, siteConfig } from "@/shared/config/site";
import { HeroDeveloperCode } from "./hero-developer-code";
import { HeroReachCard } from "./hero-reach-card";
import { HeroTypewriterHeadline } from "./hero-typewriter-headline";

export function HeroSection() {
  const [reachActive, setReachActive] = useState(false);
  const onReachCue = useCallback(() => setReachActive(true), []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReachActive(true);
    }
  }, []);
  return (
    <>
      <section className="hero">
        <div>
          <span className="tagp">{siteConfig.greeting}</span>
          <HeroTypewriterHeadline />
          <PortfolioLead className="l">{siteConfig.bio}</PortfolioLead>
          <div className="cta">
            <RippleAnchor className="btn" rippleLight href={withBasePath("/#projects")}>
              Explore my work
              <IconArrow />
            </RippleAnchor>
            <RippleAnchor
              className="btn o"
              href={resumeHref()}
              download={siteConfig.resumeDownloadName}
            >
              {siteConfig.resumeLabel}
              <svg className="i" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
              </svg>
            </RippleAnchor>
          </div>
        </div>
        <div className="vis">
          <Image
            src={assetPath(siteConfig.heroPortrait)}
            alt={`Portrait of ${siteConfig.name}`}
            width={621}
            height={621}
            sizes="(max-width: 680px) 72vw, 380px"
            priority
            className="hero-photo"
          />
          <HeroDeveloperCode onReachCue={onReachCue} />
          <HeroReachCard
            label={siteConfig.chart.label}
            delta={siteConfig.chart.delta}
            value={siteConfig.chart.value}
            active={reachActive}
          />
          <div className="hand">
            Build
            <br />
            Learn
            <br />
            AI
            <br />
            Share
            <br />
            Mentor
          </div>
        </div>
      </section>
      <div className="stats">
        {siteConfig.stats.map((stat) => (
          <div key={stat.label}>
            <AnimatedValue as="b" value={stat.value} immediate />
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
