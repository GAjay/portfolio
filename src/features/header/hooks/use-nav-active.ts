"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NavLink, NavSectionId } from "@/shared/config/site";
import { navLinks } from "@/shared/config/site";
import {
  NAV_SCROLL_SECTIONS,
  navIdForDomSectionId,
} from "@/shared/lib/nav-scroll-sections";
import {
  domIdForNavSection,
  scrollTopForSectionId,
  SECTION_SCROLL_OFFSET,
} from "@/shared/lib/scroll-section";

const sectionIds = navLinks
  .filter((link): link is NavLink & { id: NavSectionId } => !link.href)
  .map((link) => link.id);

function sectionDocumentTop(el: HTMLElement): number {
  return el.getBoundingClientRect().top + window.scrollY;
}

function activeSectionFromScroll(): NavSectionId {
  const scrollLine = window.scrollY + SECTION_SCROLL_OFFSET;
  let active: NavSectionId = "home";

  for (const { domId, navId } of NAV_SCROLL_SECTIONS) {
    const el = document.getElementById(domId);
    if (!el) continue;
    if (scrollLine >= sectionDocumentTop(el) - 2) {
      active = navId;
    }
  }

  return active;
}

function hashToNavId(hash: string): NavSectionId | null {
  const id = hash.replace("#", "");
  if (!id) return "home";
  if (sectionIds.includes(id as NavSectionId)) return id as NavSectionId;
  return navIdForDomSectionId(id);
}

const NAV_PILL_ANIM_MS = 560;

export function useNavActive() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<NavSectionId>("home");
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const navScrollTargetRef = useRef<NavSectionId | null>(null);
  const indicatorTimerRef = useRef(0);
  const [indicatorAnimate, setIndicatorAnimate] = useState(false);

  const completeNavScroll = useCallback(() => {
    navScrollTargetRef.current = null;
  }, []);

  const setActiveNavSection = useCallback((id: NavSectionId, animMs = NAV_PILL_ANIM_MS) => {
    navScrollTargetRef.current = id;
    setActiveSection(id);
    setIndicatorAnimate(true);
    window.clearTimeout(indicatorTimerRef.current);
    indicatorTimerRef.current = window.setTimeout(
      () => setIndicatorAnimate(false),
      Math.max(animMs, NAV_PILL_ANIM_MS),
    );
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const syncFromScroll = () => {
      setActiveSection(activeSectionFromScroll());
      setHeaderScrolled(window.scrollY > 12);
    };

    const releaseNavScrollTarget = (target: NavSectionId) => {
      const top = scrollTopForSectionId(domIdForNavSection(target));
      if (top === null) return true;
      return Math.abs(window.scrollY - top) <= 10;
    };

    const fromHash = hashToNavId(window.location.hash);
    if (fromHash) setActiveSection(fromHash);
    else syncFromScroll();

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const scrolled = window.scrollY > 12;
        setHeaderScrolled((prev) => (prev === scrolled ? prev : scrolled));

        const scrollTarget = navScrollTargetRef.current;
        if (scrollTarget) {
          setActiveSection(scrollTarget);
          if (releaseNavScrollTarget(scrollTarget)) {
            navScrollTargetRef.current = null;
          }
          return;
        }

        syncFromScroll();
      });
    };

    const onHashChange = () => {
      if (navScrollTargetRef.current) {
        setActiveSection(navScrollTargetRef.current);
        return;
      }
      const fromHash = hashToNavId(window.location.hash);
      if (fromHash) setActiveSection(fromHash);
      else syncFromScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(indicatorTimerRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const isActive = (link: NavLink) => {
    if (link.href === "/blog") return pathname === "/blog";
    if (pathname !== "/") return false;
    return link.id === activeSection;
  };

  return {
    isActive,
    activeSection,
    indicatorAnimate,
    pathname,
    headerScrolled,
    setActiveNavSection,
    completeNavScroll,
  };
}
