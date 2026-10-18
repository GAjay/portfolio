"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { navIdFromHash, sectionDomIdFromHash } from "@/shared/lib/nav-hash";
import { scrollToSectionId } from "@/shared/lib/scroll-section";

/**
 * On the home page, scroll to `#section` after client navigations (bottom nav, menu, deep links).
 */
export function SectionHashSync() {
  const pathname = usePathname();
  const lastScrolledRef = useRef<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    const scrollToHash = (behavior: ScrollBehavior = "auto") => {
      const raw = window.location.hash;
      const domId = raw ? sectionDomIdFromHash(raw) : "home";
      const key = `${pathname}${raw || "#home"}`;
      if (!domId || lastScrolledRef.current === key) return;

      const el = document.getElementById(domId);
      if (!el) return;

      lastScrolledRef.current = key;
      scrollToSectionId(domId, { behavior });
    };

    const run = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToHash("auto"));
      });
    };

    run();
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") lastScrolledRef.current = null;
  }, [pathname]);

  return null;
}
