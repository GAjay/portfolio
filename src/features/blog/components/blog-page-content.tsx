"use client";

import Link from "next/link";
import { SiteHeader } from "@/features/header";
import { articles } from "@/features/writing/data/articles";
import { IconArrow } from "@/shared/components/portfolio-icons";
import { RippleAnchor } from "@/shared/components/ripple";
import { SiteFooterNav } from "@/shared/components/site-footer-nav";
import {
  PortfolioH1,
  PortfolioH2,
  PortfolioLead,
  PortfolioMuted,
} from "@/shared/components/portfolio-typography";
import { siteConfig } from "@/shared/config/site";

export function BlogPageContent() {
  return (
    <div className="portfolio-page">
      <SiteHeader />
      <div className="wrap">
        <main id="main-content" className="blog-page" tabIndex={-1}>
          <header className="blog-page__hero">
            <Link href="/" className="blog-page__back">
              ← Back to portfolio
            </Link>
            <span className="tagp">Blog</span>
            <PortfolioH1 className="blog-page__title">
              Technical essays &amp; series
            </PortfolioH1>
            <PortfolioLead className="blog-page__lead">
              Architecture, React, and platform engineering — published on Medium as
              theplainscript.
            </PortfolioLead>
            <RippleAnchor
              className="btn o s"
              href={siteConfig.social.medium}
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow on Medium
              <IconArrow />
            </RippleAnchor>
          </header>

          <ul className="article-list">
            {articles.map((post) => (
              <li key={post.href}>
                <a
                  href={post.href}
                  className="article-card card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="article-card__body">
                    <PortfolioH2 className="article-card__title">{post.title}</PortfolioH2>
                    <PortfolioMuted className="article-card__meta">{post.meta}</PortfolioMuted>
                  </div>
                  <span className="article-card__arrow" aria-hidden>→</span>
                </a>
              </li>
            ))}
          </ul>
        </main>

        <footer className="blog-page__footer">
          <SiteFooterNav />
          <a
            className="blog-page__medium"
            href={siteConfig.social.medium}
            target="_blank"
            rel="noopener noreferrer"
          >
            Medium
          </a>
        </footer>
      </div>
    </div>
  );
}
