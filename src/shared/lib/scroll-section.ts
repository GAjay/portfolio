/** Pixels from viewport top — matches sticky header + breathing room. */
export const SECTION_SCROLL_OFFSET = 112;

export function scrollToSectionId(sectionId: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(sectionId);
  if (!el) return false;

  const top = el.getBoundingClientRect().top + window.scrollY - SECTION_SCROLL_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior });

  if (sectionId === "home") {
    history.replaceState(null, "", window.location.pathname);
  } else {
    history.replaceState(null, "", `${window.location.pathname}#${sectionId}`);
  }

  return true;
}
