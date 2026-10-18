import type { NavLink, NavSectionId } from "@/shared/config/site";
import { navLinks } from "@/shared/config/site";
import { navIdForDomSectionId } from "@/shared/lib/nav-scroll-sections";
import { domIdForNavSection } from "@/shared/lib/scroll-section";

const sectionNavIds = navLinks
  .filter((link): link is NavLink & { id: NavSectionId } => !link.href)
  .map((link) => link.id);

/** Map location hash to primary nav tab id. */
export function navIdFromHash(hash: string): NavSectionId | null {
  const id = hash.replace(/^#/, "").trim();
  if (!id) return "home";
  if (sectionNavIds.includes(id as NavSectionId)) return id as NavSectionId;
  return navIdForDomSectionId(id);
}

export function sectionDomIdFromHash(hash: string): string {
  const navId = navIdFromHash(hash);
  if (!navId) return hash.replace(/^#/, "").trim();
  return domIdForNavSection(navId);
}
