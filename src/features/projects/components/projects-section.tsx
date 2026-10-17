import { RefSection } from "@/shared/components/ref-section";
import { siteConfig } from "@/shared/config/site";
import { featuredProjects } from "../data/projects";
import { ProjectsCarousel } from "./projects-carousel";

export function ProjectsSection() {
  return (
    <RefSection
      id="projects"
      revealOrder={5}
      split
      kicker={siteConfig.projects.kicker}
      title={siteConfig.projects.title}
      description={siteConfig.projects.description}
      action={{
        label: "View all projects",
        href: `${siteConfig.github.url}?tab=repositories`,
      }}
    >
      <ProjectsCarousel projects={featuredProjects} />
    </RefSection>
  );
}
