import { RefSection } from "@/shared/components/ref-section";
import { siteConfig } from "@/shared/config/site";
import { openSourceRepos } from "../data/repos";
import { ReposCarousel } from "./repos-carousel";

export function OpenSourceSection() {
  return (
    <RefSection
      id="code"
      revealOrder={9}
      split
      kicker={siteConfig.openSource.kicker}
      title={siteConfig.openSource.title}
      description={siteConfig.openSource.description}
      action={{
        label: "View all repositories",
        href: `${siteConfig.social.github}?tab=repositories`,
      }}
    >
      <ReposCarousel repos={openSourceRepos} />
    </RefSection>
  );
}
