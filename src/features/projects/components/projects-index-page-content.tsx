"use client";

import Link from "next/link";
import { SiteHeader } from "@/features/header";
import { projectCaseStudies } from "../data/case-studies";
import { ProjectScreenshot } from "./project-screenshot";
import { IconNorthEast } from "@/shared/components/portfolio-icons";
import { SiteFooterNav } from "@/shared/components/site-footer-nav";
import {
  PortfolioH1,
  PortfolioH2,
  PortfolioLead,
  PortfolioMuted,
} from "@/shared/components/portfolio-typography";
import { siteConfig } from "@/shared/config/site";

export function ProjectsIndexPageContent() {
  return (
    <div className="portfolio-page">
      <SiteHeader />
      <div className="wrap">
        <main id="main-content" className="projects-page" tabIndex={-1}>
          <header className="projects-page__hero">
            <Link href="/" className="projects-page__back">
              ← Back to portfolio
            </Link>
            <span className="tagp">Projects</span>
            <PortfolioH1 className="projects-page__title">
              Case studies &amp; shipped work
            </PortfolioH1>
            <PortfolioLead className="projects-page__lead">
              {siteConfig.projects.description} Open a case study for context,
              stack, and highlights—or jump straight to the live product.
            </PortfolioLead>
          </header>

          <ul className="projects-index-list">
            {projectCaseStudies.map((study) => (
              <li key={study.slug}>
                <Link
                  href={`/projects/${study.slug}`}
                  className="projects-index-card card"
                >
                  <div className="projects-index-card__thumb">
                    <ProjectScreenshot
                      slug={study.slug}
                      name={study.name}
                      variant={study.preview}
                      className="project-shot--index"
                      sizes="200px"
                    />
                  </div>
                  <div className="projects-index-card__body">
                    <div className="projects-index-card__cats">
                      {study.categories.map((cat) => (
                        <span key={cat} className="chip proj__cat">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <PortfolioH2 className="projects-index-card__title">
                      {study.name}
                    </PortfolioH2>
                    <PortfolioMuted className="projects-index-card__desc">
                      {study.description}
                    </PortfolioMuted>
                    <div className="tags projects-index-card__tags">
                      {study.tags.map((tag) => (
                        <span key={tag} className="chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="projects-index-card__arrow" aria-hidden>
                    <IconNorthEast />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </main>

        <footer className="projects-page__footer">
          <SiteFooterNav />
          <a
            className="projects-page__github"
            href={siteConfig.github.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repositories
          </a>
        </footer>
      </div>
    </div>
  );
}
