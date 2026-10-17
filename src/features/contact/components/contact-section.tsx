"use client";

import Image from "next/image";
import {
  PortfolioH2,
  PortfolioLead,
  PortfolioMuted,
  PortfolioSmall,
} from "@/shared/components/portfolio-typography";
import { ContactMailForm } from "./contact-mail-form";
import { useScrollReveal } from "@/shared/hooks/use-scroll-reveal";
import { SiteFooterNav } from "@/shared/components/site-footer-nav";
import { assetPath } from "@/shared/config/base-path";
import { resumeHref, siteConfig, socialLinks } from "@/shared/config/site";
import { socialLinkIcons } from "@/shared/lib/social-link-icons";

export function ContactSection() {
  const { ref, className: revealClass } = useScrollReveal<HTMLDivElement>({
    cascade: "up",
  });
  const { contact } = siteConfig;

  return (
    <div
      ref={ref}
      className={`contact-footer ${revealClass}`}
      id="contact"
    >
      <section className="sec contact-sec" aria-labelledby="contact-heading">
        <div className="contact-shell">
          <div className="contact-profile">
            <div className="contact-photo">
              <Image
                src={assetPath(siteConfig.heroPortrait)}
                alt=""
                width={80}
                height={80}
                sizes="80px"
                className="contact-photo__img"
                aria-hidden
              />
            </div>
            <PortfolioH2 id="contact-heading">{contact.title}</PortfolioH2>
            <PortfolioLead className="contact-lead">{contact.description}</PortfolioLead>
            <nav className="contact-social" aria-label="Social profiles">
              {socialLinks.map((link) => {
                const Icon = socialLinkIcons[link.id];
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className="contact-social__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    <Icon className="contact-social__svg" />
                  </a>
                );
              })}
            </nav>
          </div>

          <ContactMailForm />

          <aside className="card contact-details" aria-label="Contact details">
            <div className="contact-details__row">
              <span className="contact-details__icon" aria-hidden>
                <svg className="i" viewBox="0 0 24 24">
                  <path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </span>
              <span>
                <PortfolioSmall>Based in</PortfolioSmall>
                {siteConfig.location}
              </span>
            </div>
            <div className="contact-details__row">
              <span className="contact-details__icon" aria-hidden>
                <svg className="i" viewBox="0 0 24 24">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M9 7V5h6v2" />
                </svg>
              </span>
              <span>
                <PortfolioSmall>Open to</PortfolioSmall>
                {siteConfig.availability}
              </span>
            </div>
            <div className="contact-details__row">
              <span className="contact-details__icon" aria-hidden>
                <svg className="i" viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
              <span>
                <PortfolioSmall>Email</PortfolioSmall>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </span>
            </div>
            <div className="contact-details__row">
              <span className="contact-details__icon" aria-hidden>
                <svg className="i" viewBox="0 0 24 24">
                  <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                </svg>
              </span>
              <span>
                <PortfolioSmall>Resume</PortfolioSmall>
                <a href={resumeHref()} download={siteConfig.resumeDownloadName}>
                  {siteConfig.resumeLabel}
                </a>
              </span>
            </div>
          </aside>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <PortfolioMuted className="site-footer__line">
            <span>© {contact.copyrightYear} {siteConfig.name}</span>
            <span className="site-footer__dot" aria-hidden>·</span>
            <span>{siteConfig.role}</span>
          </PortfolioMuted>
          <SiteFooterNav />
        </div>
      </footer>
    </div>
  );
}
