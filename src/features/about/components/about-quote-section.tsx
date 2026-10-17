import Image from "next/image";
import { PortfolioBody } from "@/shared/components/portfolio-typography";
import { siteConfig, socialLinks } from "@/shared/config/site";
import { socialLinkIcons } from "@/shared/lib/social-link-icons";

export function AboutQuoteSection() {
  const { about, name, aboutPortrait, social } = siteConfig;

  return (
    <section className="about-quote" id="about" aria-labelledby="about-quote-text">
      <div className="wrap about-quote__inner">
        <div className="about-quote__portrait">
          <Image
            src={aboutPortrait}
            alt={name}
            width={621}
            height={621}
            sizes="(max-width: 720px) 72vw, 280px"
            className="about-quote__photo"
            priority={false}
          />
        </div>
        <div className="about-quote__content">
          <span className="about-quote__mark" aria-hidden="true">
            &ldquo;
          </span>
          <PortfolioBody className="about-quote__text" id="about-quote-text">
            <a
              href={social.linkedin}
              className="about-quote__name"
              target="_blank"
              rel="noopener noreferrer"
            >
              {name}
            </a>{" "}
            {about.body}
          </PortfolioBody>
          <nav className="about-quote__social" aria-label="Social profiles">
            {socialLinks.map(({ id, href, label }) => {
              const Icon = socialLinkIcons[id];
              return (
                <a
                  key={id}
                  href={href}
                  className="about-quote__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon className="about-quote__social-icon" />
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}
