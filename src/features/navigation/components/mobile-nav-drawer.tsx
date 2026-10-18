"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { useNavActive } from "@/features/header/hooks/use-nav-active";
import { navigateToSection } from "@/shared/lib/navigate-to-section";
import { IconArrow } from "@/shared/components/portfolio-icons";
import { RippleAnchor } from "@/shared/components/ripple";
import type { NavLink, NavSectionId } from "@/shared/config/site";
import { navHref, navLinks, resumeHref, siteConfig } from "@/shared/config/site";

type MobileNavDrawerProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
  isActive: (link: NavLink) => boolean;
  onSectionClick: (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: NavSectionId,
  ) => void;
};

export function MobileNavDrawer({
  open,
  onClose,
  pathname,
  isActive,
  onSectionClick,
}: MobileNavDrawerProps) {
  const titleId = useId();
  const router = useRouter();
  const [portalReady, setPortalReady] = useState(false);
  const { setActiveNavSection, completeNavScroll } = useNavActive();

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-drawer-open", open);
    return () => document.body.classList.remove("nav-drawer-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const onNavItemClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    item: NavLink,
  ) => {
    onClose();
    if (item.href === "/blog") return;
    event.preventDefault();
    const sectionId = item.id as NavSectionId;
    if (pathname === "/") {
      onSectionClick(event, sectionId);
      return;
    }
    navigateToSection(sectionId, {
      pathname,
      push: (href) => router.push(href),
      onBeforeScroll: (id, ms) => setActiveNavSection(id, ms),
      onScrollComplete: completeNavScroll,
    });
  };

  const drawer = (
    <div
      className={`mobile-drawer${open ? " mobile-drawer--open" : ""}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="mobile-drawer__backdrop"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <aside
        id="mobile-nav-drawer"
        className="mobile-drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="mobile-drawer__head">
          <p id={titleId} className="mobile-drawer__title">Menu</p>
          <button
            type="button"
            className="mobile-drawer__close"
            aria-label="Close menu"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <nav className="mobile-drawer__nav" aria-label="Site sections">
          <ul className="mobile-drawer__list">
            {navLinks.map((item) => {
              const active = isActive(item);
              const href = item.href === "/blog" ? "/blog" : navHref(item);

              if (item.href === "/blog") {
                return (
                  <li key={item.id}>
                    <Link
                      href="/blog"
                      className={`mobile-drawer__link${active ? " mobile-drawer__link--active" : ""}`}
                      aria-current={active ? "page" : undefined}
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <a
                    href={href}
                    className={`mobile-drawer__link${active ? " mobile-drawer__link--active" : ""}`}
                    aria-current={active ? "location" : undefined}
                    onClick={(event) => onNavItemClick(event, item)}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mobile-drawer__actions">
          <RippleAnchor
            className="btn mobile-drawer__cta"
            rippleLight
            href={siteConfig.topmateUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            Book on Topmate
            <IconArrow />
          </RippleAnchor>
          <a
            className="btn o mobile-drawer__cta"
            href={resumeHref()}
            onClick={onClose}
          >
            Download resume
          </a>
        </div>

        <footer className="mobile-drawer__meta">
          <p className="mobile-drawer__copyright">
            © {siteConfig.contact.copyrightYear} {siteConfig.name}
          </p>
          <p className="mobile-drawer__role">{siteConfig.role}</p>
        </footer>
      </aside>
    </div>
  );

  if (!portalReady) return null;
  return createPortal(drawer, document.body);
}
