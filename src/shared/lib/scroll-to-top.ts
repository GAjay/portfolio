import { basePath } from "@/shared/config/base-path";
import { scrollToSectionId } from "@/shared/lib/scroll-section";

export const SCROLL_TOP_SHOW_AFTER_PX = 420;

export function isHomePath(pathname: string): boolean {
  if (pathname === "/") return true;
  if (!basePath) return false;
  return pathname === basePath || pathname === `${basePath}/`;
}

export function scrollPageToTop(pathname: string): void {
  if (isHomePath(pathname)) {
    scrollToSectionId("home");
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
