import { RefSection } from "@/shared/components/ref-section";
import { CompaniesCarousel } from "./companies-carousel";

export function CompaniesSection() {
  return (
    <RefSection
      revealOrder={2}
      kicker="Companies"
      title="Companies and brands I've worked with"
      description="Employers and client brands across banking, fintech, commerce, and CMS delivery."
    >
      <CompaniesCarousel />
    </RefSection>
  );
}
