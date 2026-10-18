"use client";

import { useState } from "react";
import Link from "next/link";
import { NavPill } from "./nav-pill";
import { MobileNavDrawer } from "@/features/navigation/components/mobile-nav-drawer";
import { MobileNavMenuButton } from "@/features/navigation/components/mobile-nav-menu-button";
import { ThemeToggle } from "@/features/navigation/components/theme-toggle";
import { IconArrow } from "@/shared/components/portfolio-icons";
import { RippleAnchor } from "@/shared/components/ripple";
import { journeyEntries } from "@/features/journey/data/journey";
import { navLinks, siteConfig, type NavSectionId } from "@/shared/config/site";
import { scrollToSectionId, scrollTopForSectionId } from "@/shared/lib/scroll-section";
import { scrollDurationForDistance } from "@/shared/lib/smooth-scroll";
import { useNavActive } from "../hooks/use-nav-active";

const navSectionDomId: Record<NavSectionId, string> = {
  home: "home",
  projects: "projects",
  journey: "journey",
  content: "content",
  code: "code",
  mentor: "mentor",
};

const currentJob = journeyEntries[0];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    isActive,
    pathname,
    headerScrolled,
    indicatorAnimate,
    setActiveNavSection,
    completeNavScroll,
  } = useNavActive();

  const onSectionNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: NavSectionId,
  ) => {
    if (pathname !== "/") return;
    event.preventDefault();
    const domId = navSectionDomId[sectionId];
    const targetTop = scrollTopForSectionId(domId);
    const durationMs =
      targetTop === null ? 560 : scrollDurationForDistance(targetTop - window.scrollY);
    setActiveNavSection(sectionId, durationMs);
    scrollToSectionId(domId, {
      behavior: "smooth",
      onComplete: completeNavScroll,
    });
  };

  return (
    <header className={`nav${headerScrolled ? " nav--scrolled" : ""}`}>
      <div className="nav__inner">
      <Link className="logo" href="/">
        <b>{siteConfig.initials}</b>
        <span className="logo__text">
          <span className="logo__name">{siteConfig.name}</span>
          <small className="logo__title">
            {currentJob?.role ?? siteConfig.role}
          </small>
        </span>
      </Link>

      <NavPill
        links={navLinks}
        pathname={pathname}
        isActive={isActive}
        indicatorAnimate={indicatorAnimate}
        onSectionClick={onSectionNavClick}
      />

      <div className="right">
        <MobileNavMenuButton open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
        <ThemeToggle />
        <RippleAnchor
          className="btn s nav-cta"
          rippleLight
          href={siteConfig.topmateUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book on Topmate
          <IconArrow />
        </RippleAnchor>
      </div>
      </div>
      <MobileNavDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
        isActive={isActive}
        onSectionClick={onSectionNavClick}
      />
    </header>
  );
}
