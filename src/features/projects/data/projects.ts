import type { ProjectPreviewVariant } from "./case-studies";
import { projectCaseStudies } from "./case-studies";

export type Project = {
  id: string;
  name: string;
  categories: string[];
  description: string;
  tags: string[];
  href: string;
  preview: ProjectPreviewVariant;
  caseStudySlug: string;
};

export const featuredProjects: Project[] = projectCaseStudies.map((study) => ({
  id: study.id,
  name: study.name,
  categories: study.categories,
  description: study.description,
  tags: study.tags,
  href: study.liveUrl,
  preview: study.preview,
  caseStudySlug: study.slug,
}));
