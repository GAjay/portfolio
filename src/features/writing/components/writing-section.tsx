import { PortfolioH3, PortfolioMuted } from "@/shared/components/portfolio-typography";
import { RefSection } from "@/shared/components/ref-section";
import { siteConfig } from "@/shared/config/site";
import { articles } from "../data/articles";

export function WritingSection() {
  return (
    <RefSection
      id="writing"
      revealOrder={1}
      kicker="Writing"
      title="Technical essays & series"
      description="Architecture, React, AI in production, and platform engineering — published on Medium."
      action={{ label: "Read on Medium →", href: siteConfig.social.medium }}
    >
      <ul className="article-list">
        {articles.map((post) => (
          <li key={post.href}>
            <a href={post.href} className="article-card" target="_blank" rel="noopener noreferrer">
              <div>
                <PortfolioH3 className="article-card__title">{post.title}</PortfolioH3>
                <PortfolioMuted className="article-card__meta">{post.meta}</PortfolioMuted>
              </div>
              <span className="article-card__arrow" aria-hidden>→</span>
            </a>
          </li>
        ))}
      </ul>
    </RefSection>
  );
}
