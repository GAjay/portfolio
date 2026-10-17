"use client";

import { companyCatalog } from "@/features/companies/data/companies";
import {
  PortfolioBody,
  PortfolioH3,
  PortfolioLead,
  PortfolioMuted,
} from "@/shared/components/portfolio-typography";
import { IconArrow } from "@/shared/components/portfolio-icons";
import { RippleAnchor } from "@/shared/components/ripple";
import { assetPath } from "@/shared/config/base-path";
import { siteConfig } from "@/shared/config/site";
import type { JourneyEntry } from "../data/journey";

function startYear(period: string): string {
  const match = period.match(/\d{4}/);
  return match?.[0] ?? "";
}

function JourneyLogo({ logoId }: { logoId?: string }) {
  if (!logoId) {
    return <span className="journey-card__logo-fallback" aria-hidden>AK</span>;
  }
  const company = companyCatalog[logoId];
  if (!company) {
    return <span className="journey-card__logo-fallback" aria-hidden>•</span>;
  }
  return (
    <img
      src={assetPath(company.logo)}
      alt=""
      className={`company-logo company-logo--${logoId}${company.monoDark ? " company-logo--mono" : ""}`}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}

export function JourneyExperienceNav({
  entries,
  activeId,
  onSelect,
}: {
  entries: JourneyEntry[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav className="journey-nav" aria-label="Roles by company">
      <PortfolioMuted className="journey-nav__heading">Roles</PortfolioMuted>
      <ul className="journey-nav__list">
        {entries.map((entry, index) => {
          const isActive = entry.id === activeId;
          const year = startYear(entry.period);
          const isCurrent = index === 0;

          return (
            <li key={entry.id}>
              <button
                type="button"
                className={`journey-nav__item${isActive ? " journey-nav__item--active" : ""}${isCurrent ? " journey-nav__item--current" : ""}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => onSelect(entry.id)}
              >
                <span className="journey-nav__logo" aria-hidden>
                  <JourneyLogo logoId={entry.logoId} />
                </span>
                <span className="journey-nav__copy">
                  <span className="journey-nav__company">{entry.company}</span>
                  <span className="journey-nav__role">{entry.role}</span>
                </span>
                <span className="journey-nav__meta">
                  {isCurrent ? (
                    <span className="journey-nav__pill">Now</span>
                  ) : null}
                  <time className="journey-nav__year" dateTime={year}>
                    {year || entry.period}
                  </time>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function JourneyExperienceDetail({
  entry,
  isCurrent,
}: {
  entry: JourneyEntry;
  isCurrent: boolean;
}) {
  const highlights = entry.highlights ?? [];
  const overview = entry.overview ?? [];
  const linkedIn = siteConfig.social.linkedin;

  return (
    <div className="journey-detail">
      <article
        className={`journey-card__inner journey-detail__panel${isCurrent ? " journey-detail__panel--current" : ""}`}
        aria-labelledby={`journey-role-${entry.id}`}
        key={entry.id}
      >
        <div className="journey-card__split journey-detail__split">
          <aside className="journey-card__identity journey-detail__identity">
            <div className="journey-card__logo" aria-hidden>
              <JourneyLogo logoId={entry.logoId} />
            </div>
            <PortfolioBody className="journey-card__company">{entry.company}</PortfolioBody>
            <PortfolioH3
              className="journey-card__role journey-detail__title"
              id={`journey-role-${entry.id}`}
            >
              {entry.role}
            </PortfolioH3>
            <time className="journey-card__period">{entry.period}</time>
            {isCurrent ? (
              <span className="journey-card__badge">Current role</span>
            ) : null}
          </aside>
          <div className="journey-card__detail journey-detail__body">
            <header className="journey-detail__header">
              <PortfolioLead className="journey-detail__lede">{entry.summary}</PortfolioLead>
            </header>
            {overview.length > 0 ? (
              <>
                <div className="journey-detail__story">
                  {overview.map((paragraph) => (
                    <PortfolioBody key={paragraph.slice(0, 48)}>{paragraph}</PortfolioBody>
                  ))}
                </div>
                <div className="journey-detail__rule" aria-hidden />
              </>
            ) : null}
            {highlights.length > 0 ? (
              <section className="journey-detail__section" aria-labelledby={`journey-contrib-${entry.id}`}>
                <h4 className="journey-card__detail-label" id={`journey-contrib-${entry.id}`}>
                  Key contributions
                </h4>
                <ul className="journey-card__highlights">
                  {highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            <div className="journey-detail__rule journey-detail__rule--footer" aria-hidden />
            <footer className="journey-detail__footer">
              <ul className="journey-card__tags" aria-label="Skills and tools">
                {entry.tags.map((tag) => (
                  <li key={tag}>
                    <span className="chip">{tag}</span>
                  </li>
                ))}
              </ul>
              <div className="journey-detail__actions">
                <RippleAnchor
                  className="btn s"
                  rippleLight
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on LinkedIn
                  <IconArrow />
                </RippleAnchor>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </div>
  );
}
