import { AboutQuoteSection } from "@/features/about";
import { ContactSection } from "@/features/contact";
import {
  InstagramContentSection,
  MediumContentSection,
  YoutubeContentSection,
} from "@/features/content";
import { SiteHeader } from "@/features/header";
import { HeroSection } from "@/features/hero";
import { JourneySection } from "@/features/journey";
import { RecommendationsSection } from "@/features/recommendations";
import { MentorshipSection } from "@/features/mentorship";
import { OpenSourceSection } from "@/features/open-source";
import { ProjectsSection } from "@/features/projects";
import { CompaniesBandSection } from "@/features/companies";
import { TechStackStripSection } from "@/features/tech-stack";
import { SectionBand } from "@/shared/components/section-band";

export default function HomePage() {
  return (
    <div className="portfolio-page">
      <SiteHeader />
      <main id="main-content" className="portfolio-main" tabIndex={-1}>
        <div className="wrap">
          <div id="home" className="hero-anchor viewport-band">
            <HeroSection />
          </div>
        </div>
        <AboutQuoteSection />
        <TechStackStripSection />
        <SectionBand alt>
          <JourneySection />
        </SectionBand>
        <CompaniesBandSection />
        <SectionBand>
          <ProjectsSection />
        </SectionBand>
        <SectionBand alt>
          <InstagramContentSection />
        </SectionBand>
        <SectionBand>
          <YoutubeContentSection />
        </SectionBand>
        <SectionBand alt>
          <MediumContentSection />
        </SectionBand>
        <SectionBand>
          <OpenSourceSection />
        </SectionBand>
        <SectionBand alt>
          <MentorshipSection />
        </SectionBand>
        <SectionBand>
          <RecommendationsSection />
        </SectionBand>
        <SectionBand alt>
          <ContactSection />
        </SectionBand>
      </main>
    </div>
  );
}
