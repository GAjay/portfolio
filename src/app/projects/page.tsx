import type { Metadata } from "next";
import { ProjectsIndexPageContent } from "@/features/projects/components/projects-index-page-content";
import { siteConfig } from "@/shared/config/site";
import { absoluteUrl } from "@/shared/lib/site-url";

const description =
  "Case studies for enterprise web apps, SaaS product work, and open-source tools—including live demos and GitHub links.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: {
    canonical: absoluteUrl("/projects"),
  },
  openGraph: {
    title: `Projects · ${siteConfig.name}`,
    description,
    url: absoluteUrl("/projects"),
    type: "website",
  },
};

export default function ProjectsPage() {
  return <ProjectsIndexPageContent />;
}
