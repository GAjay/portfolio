"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavActive } from "@/features/header/hooks/use-nav-active";
import type { NavSectionId } from "@/shared/config/site";
import { navigateToSection } from "@/shared/lib/navigate-to-section";
import { domIdForNavSection } from "@/shared/lib/scroll-section";
import {
  SCROLL_TOP_SHOW_AFTER_PX,
  scrollPageToTop,
} from "@/shared/lib/scroll-to-top";
import {
  bottomNavAllTabs,
  bottomNavLeftTabs,
  bottomNavRightTabs,
  type BottomNavTab,
} from "../data/bottom-nav";
import { BottomNavIcon } from "./bottom-nav-icons";

function isBottomTabActive(
  tab: BottomNavTab,
  pathname: string,
  activeSection: NavSectionId,
  pendingNavId: NavSectionId | null,
): boolean {
  if (tab.id === "blog") {
    return pathname === "/blog" || pathname.endsWith("/blog");
  }
  if (pendingNavId) return tab.id === pendingNavId;
  if (tab.id === "projects") {
    return pathname === "/projects" || pathname.startsWith("/projects/");
  }
  if (pathname !== "/") return false;
  return activeSection === tab.id;
}

type IndicatorStyle = {
  width: number;
  x: number;
  visible: boolean;
};

export function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const listRef = useRef<HTMLUListElement>(null);
  const tabRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [pendingNavId, setPendingNavId] = useState<NavSectionId | null>(null);
  const {
    activeSection,
    setActiveNavSection,
    completeNavScroll,
    indicatorAnimate,
  } = useNavActive();

  const activeId =
    bottomNavAllTabs.find((tab) =>
      isBottomTabActive(tab, pathname, activeSection, pendingNavId),
    )?.id ?? null;

  const [indicator, setIndicator] = useState<IndicatorStyle>({
    width: 0,
    x: 0,
    visible: false,
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  const measureIndicator = useCallback(() => {
    const list = listRef.current;
    if (!list || !activeId) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }

    const el = tabRefs.current.get(activeId);
    if (!el) return;

    const listRect = list.getBoundingClientRect();
    const tabRect = el.getBoundingClientRect();

    setIndicator({
      width: tabRect.width,
      x: tabRect.left - listRect.left,
      visible: true,
    });
  }, [activeId]);

  useLayoutEffect(() => {
    measureIndicator();

    const list = listRef.current;
    if (!list) return;

    const ro = new ResizeObserver(() => measureIndicator());
    ro.observe(list);
    for (const el of tabRefs.current.values()) {
      ro.observe(el);
    }

    window.addEventListener("resize", measureIndicator);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureIndicator);
    };
  }, [measureIndicator, pathname, activeId, activeSection, pendingNavId]);

  useEffect(() => {
    if (pathname === "/") setPendingNavId(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > SCROLL_TOP_SHOW_AFTER_PX);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sectionHref = (domId: string) =>
    domId === "home" ? "/" : `/#${domId}`;

  const onSectionTabClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    tabId: NavSectionId,
  ) => {
    if (tabId === "projects") {
      if (pathname === "/projects" || pathname.startsWith("/projects/")) {
        event.preventDefault();
      }
      return;
    }

    event.preventDefault();
    setPendingNavId(tabId);

    navigateToSection(tabId, {
      pathname,
      push: (href) => router.push(href),
      onBeforeScroll: (id, durationMs) => setActiveNavSection(id, durationMs),
      onScrollComplete: () => {
        completeNavScroll();
        setPendingNavId(null);
      },
    });
  };

  const setTabRef = (id: string, node: HTMLElement | null) => {
    if (node) tabRefs.current.set(id, node);
    else tabRefs.current.delete(id);
  };

  const renderTab = (tab: BottomNavTab) => {
    const active = isBottomTabActive(
      tab,
      pathname,
      activeSection,
      pendingNavId,
    );

    let href = "/";
    if (tab.id === "blog") {
      href = "/blog";
    } else if (tab.id === "projects") {
      href = "/projects";
    } else {
      href = sectionHref(domIdForNavSection(tab.id));
    }

    return (
      <li key={tab.id} className="bottom-nav__item">
        <Link
          ref={(node) => setTabRef(tab.id, node)}
          href={href}
          className={`bottom-nav__tab${active ? " bottom-nav__tab--active" : ""}`}
          aria-current={active ? "page" : undefined}
          onClick={(event) => {
            if (tab.id === "blog") return;
            onSectionTabClick(event, tab.id as NavSectionId);
          }}
        >
          <BottomNavIcon id={tab.id} />
          <span className="bottom-nav__label">{tab.shortLabel}</span>
        </Link>
      </li>
    );
  };

  return (
    <nav
      className={`bottom-nav${showScrollTop ? " bottom-nav--fab-ready" : ""}`}
      aria-label="Primary"
      data-path={pathname}
    >
      <div className="bottom-nav__chrome" aria-hidden />
      <button
        type="button"
        className="bottom-nav__fab"
        aria-label="Back to top"
        onClick={() => scrollPageToTop(pathname)}
      >
        <svg className="bottom-nav__fab-icon" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M12 6v12M7 11l5-5 5 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <ul
        ref={listRef}
        className="bottom-nav__list"
        data-animate={indicatorAnimate ? "true" : "false"}
      >
        <span
          className="bottom-nav__indicator"
          aria-hidden
          data-visible={indicator.visible ? "true" : "false"}
          data-animate={indicatorAnimate ? "true" : "false"}
          style={{
            width: indicator.width,
            transform: `translateX(${indicator.x}px)`,
          }}
        />
        {bottomNavLeftTabs.map(renderTab)}
        <li className="bottom-nav__fab-slot" aria-hidden="true" />
        {bottomNavRightTabs.map(renderTab)}
      </ul>
    </nav>
  );
}
