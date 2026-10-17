import type { NavSectionId } from "@/shared/config/site";
import { NAV_SCROLL_SECTIONS } from "@/shared/lib/nav-scroll-sections";
import { smoothScrollToY } from "@/shared/lib/smooth-scroll";

/** Pixels from viewport top — matches sticky header + breathing room. */
export const SECTION_SCROLL_OFFSET = 112;

export function domIdForNavSection(navId: NavSectionId): string {
  if (navId === "home") return "home";
  const hit = NAV_SCROLL_SECTIONS.find((s) => s.navId === navId);
  return hit?.domId ?? navId;
}

export function scrollTopForSectionId(sectionId: string): number | null {
  const el = document.getElementById(sectionId);
  if (!el) return null;
  return Math.max(0, el.getBoundingClientRect().top + window.scrollY - SECTION_SCROLL_OFFSET);
}

export type ScrollToSectionOptions = {
  behavior?: ScrollBehavior;
  onComplete?: () => void;
};

export function scrollToSectionId(
  sectionId: string,
  options: ScrollToSectionOptions = {},
): { ok: boolean; durationMs: number } {
  const { behavior = "smooth", onComplete } = options;
  const el = document.getElementById(sectionId);
  if (!el) return { ok: false, durationMs: 0 };

  const top = Math.max(
    0,
    el.getBoundingClientRect().top + window.scrollY - SECTION_SCROLL_OFFSET,
  );

  let durationMs = 0;
  if (behavior === "smooth") {
    durationMs = smoothScrollToY(top, onComplete).durationMs;
  } else {
    window.scrollTo(0, top);
    onComplete?.();
  }

  const path = window.location.pathname;
  if (sectionId === "home") {
    history.replaceState(null, "", path);
  } else {
    history.replaceState(null, "", `${path}#${sectionId}`);
  }

  window.dispatchEvent(new HashChangeEvent("hashchange"));

  return { ok: true, durationMs };
}
