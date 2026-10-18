import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudyPageContent } from "@/features/projects/components/project-case-study-page-content";
import {
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
} from "@/features/projects/data/case-studies";
import { siteConfig } from "@/shared/config/site";
import { absoluteUrl } from "@/shared/lib/site-url";

type ProjectCaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) {
    return { title: "Project not found" };
  }

  const description = study.summary;
  const path = `/projects/${study.slug}`;

  return {
    title: study.name,
    description,
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      title: `${study.name} · ${siteConfig.name}`,
      description,
      url: absoluteUrl(path),
      type: "article",
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectCaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  return <ProjectCaseStudyPageContent study={study} />;
}
