import type { NavSectionId } from "@/shared/config/site";

/**
 * Home page blocks in DOM order → primary nav tab.
 * Matches `src/app/page.tsx` (hero/about/stack → journey/companies → projects → …).
 */
export const NAV_SCROLL_SECTIONS: { domId: string; navId: NavSectionId }[] = [
  { domId: "home", navId: "home" },
  { domId: "about", navId: "home" },
  { domId: "stack", navId: "home" },
  { domId: "journey", navId: "journey" },
  { domId: "companies", navId: "journey" },
  { domId: "projects", navId: "projects" },
  { domId: "content", navId: "content" },
  { domId: "content-youtube", navId: "content" },
  { domId: "content-medium", navId: "content" },
  { domId: "code", navId: "code" },
  { domId: "mentor", navId: "mentor" },
  { domId: "recommendations", navId: "mentor" },
  { domId: "contact", navId: "mentor" },
];

export const NAV_SECTION_LABELS: Record<NavSectionId, string> = {
  home: "Home",
  journey: "Experience",
  projects: "Projects",
  content: "Content",
  code: "Open Source",
  mentor: "Mentorship",
};

/** Header/footer tab order — first appearance of each nav id along the page. */
export const NAV_TAB_ORDER: NavSectionId[] = NAV_SCROLL_SECTIONS.reduce<NavSectionId[]>(
  (order, { navId }) => (order.includes(navId) ? order : [...order, navId]),
  [],
);

export function navIdForDomSectionId(domId: string): NavSectionId | null {
  const hit = NAV_SCROLL_SECTIONS.find((s) => s.domId === domId);
  return hit?.navId ?? null;
}
