import { companyCatalog } from "@/features/companies/data/companies";
import generatedRepos from "./projects.generated.json";

export type Project = {
  id: string;
  name: string;
  categories: string[];
  description: string;
  tags: string[];
  href: string;
  preview: "banking" | "asriui" | "saas";
};

function repoExternalUrl(repoId: string): string | undefined {
  const repo = generatedRepos.find((r) => r.id === repoId);
  const homepage = repo?.homepage?.trim();
  if (homepage) return homepage;
  const href = repo?.href?.trim();
  if (href) return href;
  return undefined;
}

export const featuredProjects: Project[] = [
  {
    id: "p-lloyds",
    name: "Lloyds Bank — BCB Deposits",
    categories: ["Web App", "Banking"],
    description:
      "Enterprise deposit journeys with accessibility, analytics, and secure onboarding flows.",
    tags: ["React", "Next.js", "GraphQL"],
    href: "https://www.lloydsbank.com/business/",
    preview: "banking",
  },
  {
    id: "p-apollo",
    name: "Apollo — Digital Platform",
    categories: ["Web App", "Financial Services"],
    description:
      "Enterprise web and content experiences for a global asset manager—investor journeys, performance storytelling, and scalable CMS delivery.",
    tags: ["React", "Next.js", "AEM"],
    href: companyCatalog.apollo.website ?? "https://www.apollo.com/",
    preview: "banking",
  },
  {
    id: "p-vymo",
    name: "Vymo — Sales Engagement",
    categories: ["SaaS", "Product"],
    description:
      "Field sales dashboards and workflow automation for distributed revenue teams.",
    tags: ["React", "Node.js", "AWS"],
    href: companyCatalog.vymo.website ?? "https://vymo.com/",
    preview: "saas",
  },
  {
    id: "p-asriui",
    name: "AsriUI",
    categories: ["Open Source", "UI Library"],
    description:
      "Accessible React component library with SSR, motion presets, and tree-shakable exports.",
    tags: ["React", "TypeScript", "TailwindCSS"],
    href: repoExternalUrl("asriui") ?? "https://gajay.github.io/asriui/",
    preview: "asriui",
  },
];
