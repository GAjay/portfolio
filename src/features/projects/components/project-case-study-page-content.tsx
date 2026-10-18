"use client";

import Link from "next/link";
import { SiteHeader } from "@/features/header";
import type { ProjectCaseStudy } from "../data/case-studies";
import { ProjectScreenshot } from "./project-screenshot";
import { RefButtonPrimary } from "@/shared/components/ref-button";
import { SiteFooterNav } from "@/shared/components/site-footer-nav";
import {
  PortfolioH1,
  PortfolioH3,
  PortfolioLead,
  PortfolioBody,
  PortfolioMuted,
} from "@/shared/components/portfolio-typography";

type ProjectCaseStudyPageContentProps = {
  study: ProjectCaseStudy;
};

export function ProjectCaseStudyPageContent({
  study,
}: ProjectCaseStudyPageContentProps) {
  return (
    <div className="portfolio-page">
      <SiteHeader />
      <div className="wrap">
        <main id="main-content" className="projects-page project-detail" tabIndex={-1}>
          <header className="projects-page__hero project-detail__hero">
            <Link href="/projects" className="projects-page__back">
              ← All projects
            </Link>
            <div className="project-detail__cats">
              {study.categories.map((cat) => (
                <span key={cat} className="chip proj__cat">
                  {cat}
                </span>
              ))}
            </div>
            <PortfolioH1 className="projects-page__title">{study.name}</PortfolioH1>
            <PortfolioLead className="projects-page__lead">{study.summary}</PortfolioLead>
            <div className="project-detail__actions">
              <RefButtonPrimary
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {study.liveCta}
              </RefButtonPrimary>
              {study.repoUrl ? (
                <a
                  className="ref-btn ref-btn--secondary"
                  href={study.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View source
                </a>
              ) : null}
            </div>
          </header>

          <div className="project-detail__preview card">
            <ProjectScreenshot
              slug={study.slug}
              name={study.name}
              variant={study.preview}
              className="project-shot--detail"
              sizes="(max-width: 720px) 100vw, 960px"
              priority
            />
          </div>

          <section className="project-detail__section" aria-labelledby="project-role">
            <PortfolioH3 id="project-role">Role</PortfolioH3>
            <PortfolioBody>{study.role}</PortfolioBody>
          </section>

          <section
            className="project-detail__section"
            aria-labelledby="project-highlights"
          >
            <PortfolioH3 id="project-highlights">Highlights</PortfolioH3>
            <ul className="project-detail__list">
              {study.highlights.map((item) => (
                <li key={item}>
                  <PortfolioBody>{item}</PortfolioBody>
                </li>
              ))}
            </ul>
          </section>

          <section className="project-detail__section" aria-labelledby="project-stack">
            <PortfolioH3 id="project-stack">Stack</PortfolioH3>
            <div className="tags">
              {study.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
            <PortfolioMuted className="project-detail__note">
              {study.description}
            </PortfolioMuted>
          </section>
        </main>

        <footer className="projects-page__footer">
          <SiteFooterNav />
          <Link href="/projects" className="projects-page__github">
            More projects
          </Link>
        </footer>
      </div>
    </div>
  );
}
