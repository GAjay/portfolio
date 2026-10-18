import type { NavSectionId } from "@/shared/config/site";
import { domIdForNavSection, scrollToSectionId } from "@/shared/lib/scroll-section";
import { scrollDurationForDistance } from "@/shared/lib/smooth-scroll";

type NavigateToSectionOptions = {
  pathname: string;
  push: (href: string) => void;
  onBeforeScroll?: (navId: NavSectionId, durationMs: number) => void;
  onScrollComplete?: () => void;
};

function homeSectionHref(domId: string): string {
  return domId === "home" ? "/" : `/#${domId}`;
}

/** Home: smooth scroll. Other routes: client navigate to `/#section` (SectionHashSync scrolls). */
export function navigateToSection(
  navId: NavSectionId,
  { pathname, push, onBeforeScroll, onScrollComplete }: NavigateToSectionOptions,
): void {
  const domId = domIdForNavSection(navId);

  if (pathname !== "/") {
    onBeforeScroll?.(navId, 560);
    push(homeSectionHref(domId));
    return;
  }

  const el = document.getElementById(domId);
  const targetTop = el
    ? el.getBoundingClientRect().top + window.scrollY - 88
    : null;
  const durationMs =
    targetTop === null ? 560 : scrollDurationForDistance(targetTop - window.scrollY);

  onBeforeScroll?.(navId, durationMs);
  scrollToSectionId(domId, {
    behavior: "smooth",
    onComplete: onScrollComplete,
  });
}
