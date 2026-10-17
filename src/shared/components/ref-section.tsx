"use client";

import type { ReactNode } from "react";
import {
  cascadeForSectionIndex,
  useScrollReveal,
} from "@/shared/hooks/use-scroll-reveal";
import { PortfolioH2, PortfolioSectionDesc } from "./portfolio-typography";
import { IconArrow } from "./portfolio-icons";
import { RippleAnchor } from "./ripple";

type RefSectionProps = {
  id?: string;
  /** Alternates scroll-reveal direction (odd = down, even = up). */
  revealOrder?: number;
  kicker?: ReactNode;
  title?: string;
  description?: string;
  /** Omit intro column (e.g. stack carousels only). */
  hideIntro?: boolean;
  /** Full viewport min-height (off for compact bands like companies). */
  fullViewport?: boolean;
  /** Title and copy above content instead of beside it. */
  stacked?: boolean;
  /** Intro column left, body (carousel/grid) right — like Experience. */
  split?: boolean;
  action?: { label: string; href: string };
  /** White outline CTA (default is solid black pill). */
  outlineAction?: boolean;
  actions?: ReactNode;
  /** Extra block below intro actions (e.g. journey role nav). */
  introExtra?: ReactNode;
  children: ReactNode;
};

export function RefSection({
  id,
  revealOrder,
  kicker,
  title,
  description,
  hideIntro = false,
  fullViewport,
  stacked = false,
  split = false,
  action,
  outlineAction = false,
  actions,
  introExtra,
  children,
}: RefSectionProps) {
  const external = action?.href.startsWith("http");
  const useStacked = split ? false : stacked;
  const useFullViewport = fullViewport ?? !split;
  const { ref, className: revealClass } = useScrollReveal<HTMLElement>({
    cascade: cascadeForSectionIndex(
      revealOrder !== undefined ? String(revealOrder) : "1",
    ),
  });

  return (
    <section
      ref={ref}
      className={`sec${useFullViewport ? " sec--viewport" : " sec--compact"}${useStacked ? " sec--stacked" : ""}${split ? " sec--split" : ""}${id === "journey" ? " sec--journey sec--tall" : ""}${id === "projects" ? " sec--projects" : ""}${id === "code" ? " sec--oss" : ""}${id === "mentor" ? " sec--mentor" : ""}${id?.startsWith("content") ? " sec--content" : ""}${id === "recommendations" ? " sec--testimonials" : ""} ${revealClass}`}
      id={id}
    >
      {hideIntro ? null : (
        <div className="sec__intro">
          {kicker ? <div className="k">{kicker}</div> : null}
          {title ? (
            <PortfolioH2 id={id ? `${id}-heading` : undefined}>{title}</PortfolioH2>
          ) : null}
          {description ? <PortfolioSectionDesc>{description}</PortfolioSectionDesc> : null}
          {action ? (
            <RippleAnchor
              className={outlineAction ? "btn o s" : "btn s"}
              href={action.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              {action.label}
              <IconArrow />
            </RippleAnchor>
          ) : null}
          {actions ? <div className="sec-actions">{actions}</div> : null}
          {introExtra ? <div className="sec__intro-extra">{introExtra}</div> : null}
        </div>
      )}
      <div
        className={`sec__body${id === "recommendations" ? " sec__panel" : ""}`}
      >
        {children}
      </div>
    </section>
  );
}
