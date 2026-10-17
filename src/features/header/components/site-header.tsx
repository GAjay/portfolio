"use client";

import Link from "next/link";
import { ThemeToggle } from "@/features/navigation/components/theme-toggle";
import { IconArrow } from "@/shared/components/portfolio-icons";
import { RippleAnchor } from "@/shared/components/ripple";
import { journeyEntries } from "@/features/journey/data/journey";
import { navHref, navLinks, siteConfig, type NavSectionId } from "@/shared/config/site";
import { scrollToSectionId } from "@/shared/lib/scroll-section";
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
  const { isActive, pathname, headerScrolled } = useNavActive();

  const onSectionNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: NavSectionId,
  ) => {
    if (pathname !== "/") return;
    event.preventDefault();
    scrollToSectionId(navSectionDomId[sectionId]);
  };

  return (
    <header className={`nav${headerScrolled ? " nav--scrolled" : ""}`}>
      <div className="nav__inner">
      <Link className="logo" href="/">
        <b>{siteConfig.initials}</b>
        <span className="logo__text">
          <span className="logo__name">{siteConfig.name}</span>
          {currentJob ? (
            <>
              <small className="logo__company">{currentJob.company}</small>
              <small className="logo__title">{currentJob.role}</small>
            </>
          ) : (
            <small>{siteConfig.role}</small>
          )}
        </span>
      </Link>

      <nav className="pill" aria-label="Primary">
        {navLinks.map((item) => {
          const href = navHref(item);
          const active = isActive(item);
          if (item.href === "/blog") {
            return (
              <Link
                key={item.id}
                href="/blog"
                className={active ? "is-active" : undefined}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          }

          return (
            <a
              key={item.id}
              href={href}
              className={active ? "is-active" : undefined}
              aria-current={active ? "location" : undefined}
              onClick={(event) => onSectionNavClick(event, item.id)}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="right">
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
    </header>
  );
}
