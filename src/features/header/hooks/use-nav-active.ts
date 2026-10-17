"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavLink, NavSectionId } from "@/shared/config/site";
import { navLinks } from "@/shared/config/site";
import { SECTION_SCROLL_OFFSET } from "@/shared/lib/scroll-section";

const sectionIds = navLinks
  .filter((link): link is NavLink & { id: NavSectionId } => !link.href)
  .map((link) => link.id);

/** Page order — maps DOM ids to nav highlight. */
const scrollSectionIds: { domId: string; navId: NavSectionId }[] = [
  { domId: "home", navId: "home" },
  { domId: "stack", navId: "home" },
  { domId: "journey", navId: "journey" },
  { domId: "companies", navId: "journey" },
  { domId: "projects", navId: "projects" },
  { domId: "content", navId: "content" },
  { domId: "content-youtube", navId: "content" },
  { domId: "content-medium", navId: "content" },
  { domId: "code", navId: "code" },
  { domId: "mentor", navId: "mentor" },
  { domId: "recommendations", navId: "journey" },
  { domId: "contact", navId: "mentor" },
];

function activeSectionFromScroll(): NavSectionId {
  let active: NavSectionId = "home";
  let bestTop = Number.NEGATIVE_INFINITY;

  for (const { domId, navId } of scrollSectionIds) {
    const el = document.getElementById(domId);
    if (!el) continue;
    const top = el.getBoundingClientRect().top;
    if (top <= SECTION_SCROLL_OFFSET && top > bestTop) {
      bestTop = top;
      active = navId;
    }
  }

  return active;
}

function hashToNavId(hash: string): NavSectionId | null {
  const id = hash.replace("#", "");
  if (!id) return "home";
  if (sectionIds.includes(id as NavSectionId)) return id as NavSectionId;
  if (id === "content-youtube" || id === "content-medium") return "content";
  if (id === "recommendations" || id === "stack" || id === "companies") return null;
  return null;
}

export function useNavActive() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<NavSectionId>("home");
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;

    const syncFromScroll = () => {
      setActiveSection(activeSectionFromScroll());
      setHeaderScrolled(window.scrollY > 12);
    };

    syncFromScroll();

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncFromScroll);
    };

    const onHashChange = () => {
      const fromHash = hashToNavId(window.location.hash);
      if (fromHash) setActiveSection(fromHash);
      else syncFromScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
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

  return { isActive, pathname, headerScrolled };
}
