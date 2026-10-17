"use client";

import Link from "next/link";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { NavLink, NavSectionId } from "@/shared/config/site";
import { navHref } from "@/shared/config/site";

type NavPillProps = {
  links: NavLink[];
  pathname: string;
  isActive: (link: NavLink) => boolean;
  onSectionClick: (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: NavSectionId,
  ) => void;
  indicatorAnimate?: boolean;
};

type IndicatorStyle = {
  width: number;
  x: number;
  visible: boolean;
};

export function NavPill({
  links,
  pathname,
  isActive,
  onSectionClick,
  indicatorAnimate = false,
}: NavPillProps) {
  const pillRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [indicator, setIndicator] = useState<IndicatorStyle>({
    width: 0,
    x: 0,
    visible: false,
  });

  const activeId = links.find((item) => isActive(item))?.id ?? null;

  const measureIndicator = useCallback(() => {
    const pill = pillRef.current;
    if (!pill || !activeId) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }

    const el = linkRefs.current.get(activeId);
    if (!el) return;

    const pillRect = pill.getBoundingClientRect();
    const linkRect = el.getBoundingClientRect();

    setIndicator({
      width: linkRect.width,
      x: linkRect.left - pillRect.left + pill.scrollLeft,
      visible: true,
    });
  }, [activeId]);

  useLayoutEffect(() => {
    measureIndicator();

    if (indicatorAnimate && activeId) {
      const link = linkRefs.current.get(activeId);
      link?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }

    const pill = pillRef.current;
    if (!pill) return;

    const ro = new ResizeObserver(() => measureIndicator());
    ro.observe(pill);
    for (const el of linkRefs.current.values()) {
      ro.observe(el);
    }

    window.addEventListener("resize", measureIndicator);
    pill.addEventListener("scroll", measureIndicator, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureIndicator);
      pill.removeEventListener("scroll", measureIndicator);
    };
  }, [measureIndicator, pathname, activeId, indicatorAnimate]);

  const setLinkRef = (id: string, node: HTMLElement | null) => {
    if (node) linkRefs.current.set(id, node);
    else linkRefs.current.delete(id);
  };

  return (
    <nav
      className="pill"
      ref={pillRef}
      aria-label="Primary"
      data-animate={indicatorAnimate ? "true" : "false"}
    >
      <span
        className="pill__indicator"
        aria-hidden
        data-animate={indicatorAnimate ? "true" : "false"}
        data-visible={indicator.visible ? "true" : "false"}
        style={{
          width: indicator.width,
          transform: `translateX(${indicator.x}px)`,
        }}
      />
      {links.map((item) => {
        const href = navHref(item);
        const active = isActive(item);
        const className = active ? "is-active" : undefined;

        if (item.href === "/blog") {
          return (
            <Link
              key={item.id}
              href="/blog"
              ref={(node) => setLinkRef(item.id, node)}
              className={className}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <a
            key={item.id}
            href={href}
            ref={(node) => setLinkRef(item.id, node)}
            className={className}
            aria-current={active ? "location" : undefined}
            onClick={(event) => onSectionClick(event, item.id)}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
