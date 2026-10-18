import { companyCatalog } from "@/features/companies/data/companies";
import { siteConfig } from "@/shared/config/site";

export type ProjectPreviewVariant = "banking" | "asriui" | "saas";

export type ProjectCaseStudy = {
  id: string;
  slug: string;
  name: string;
  categories: string[];
  /** Short blurb for cards and meta description. */
  description: string;
  /** Lead paragraph on the detail page. */
  summary: string;
  role: string;
  highlights: string[];
  tags: string[];
  liveUrl: string;
  repoUrl?: string;
  liveCta: string;
  preview: ProjectPreviewVariant;
};

/** Static capture from `npm run sync:project-screenshots` → `public/assets/projects/`. */
export function projectScreenshotSrc(slug: string): string {
  return `/assets/projects/${slug}.webp`;
}

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    id: "p-lloyds",
    slug: "lloyds-bcb-deposits",
    name: "Lloyds Bank — BCB Deposits",
    categories: ["Web App", "Banking"],
    description:
      "Enterprise deposit journeys with accessibility, analytics, and secure onboarding flows.",
    summary:
      "Contributed to business banking deposit experiences where regulated UX, WCAG-minded patterns, and measurable conversion paths had to coexist with complex product rules and analytics.",
    role: "Senior front-end engineer (Publicis Sapient client team)",
    highlights: [
      "Multi-step deposit journeys with validation, eligibility messaging, and analytics hooks.",
      "Accessibility and responsive layouts aligned with enterprise design standards.",
      "Collaboration with UX, QA, and backend on GraphQL-backed flows and release cadence.",
    ],
    tags: ["React", "Next.js", "GraphQL"],
    liveUrl: "https://www.lloydsbank.com/business/",
    liveCta: "Visit Lloyds Business",
    preview: "banking",
  },
  {
    id: "p-apollo",
    slug: "apollo-digital",
    name: "Apollo — Digital Platform",
    categories: ["Web App", "Financial Services"],
    description:
      "Enterprise web and content experiences for a global asset manager—investor journeys, performance storytelling, and scalable CMS delivery.",
    summary:
      "Built and evolved investor-facing web experiences where content velocity, brand consistency, and performance mattered across markets and stakeholder audiences.",
    role: "Front-end engineer on digital platform delivery",
    highlights: [
      "Component-driven UI integrated with enterprise CMS and design language.",
      "Performance-conscious pages for data-rich storytelling and fund information.",
      "Cross-functional delivery with design, content, and platform engineering.",
    ],
    tags: ["React", "Next.js", "AEM"],
    liveUrl: companyCatalog.apollo.website ?? "https://www.apollo.com/",
    liveCta: "Visit Apollo",
    preview: "banking",
  },
  {
    id: "p-vymo",
    slug: "vymo-sales",
    name: "Vymo — Sales Engagement",
    categories: ["SaaS", "Product"],
    description:
      "Field sales dashboards and workflow automation for distributed revenue teams.",
    summary:
      "Shipped product UI for revenue teams—dashboards, workflows, and integrations that had to stay fast and usable for users in the field.",
    role: "Full-stack / product engineer",
    highlights: [
      "Dashboard and workflow surfaces for distributed sales organizations.",
      "API-backed features with attention to reliability and iterative product delivery.",
      "Patterns reusable across modules in a growing SaaS codebase.",
    ],
    tags: ["React", "Node.js", "AWS"],
    liveUrl: companyCatalog.vymo.website ?? "https://vymo.com/",
    liveCta: "Visit Vymo",
    preview: "saas",
  },
  {
    id: "p-asriui",
    slug: "asriui",
    name: "AsriUI",
    categories: ["Open Source", "UI Library"],
    description:
      "Accessible React component library with SSR, motion presets, and tree-shakable exports.",
    summary:
      "Open-source React components aimed at production apps: accessible primitives, typed APIs, SSR-friendly styling, and docs you can run locally or on GitHub Pages.",
    role: "Author & maintainer",
    highlights: [
      "Composable components with accessibility and keyboard behavior baked in.",
      "Documentation site and package layout suited to tree-shaking and adoption.",
      "Patterns drawn from years of design-system work on client products.",
    ],
    tags: ["React", "TypeScript", "TailwindCSS"],
    liveUrl: "https://gajay.github.io/asriui/",
    repoUrl: `${siteConfig.github.url}/asriui`,
    liveCta: "Open docs & demos",
    preview: "asriui",
  },
  {
    id: "p-json-formatter",
    slug: "json-formatter",
    name: "JSON Formatter",
    categories: ["Web App", "Developer Tool"],
    description:
      "Format, validate, and explore JSON in the browser—fast, client-side, and easy to share.",
    summary:
      "A zero-backend JSON workspace: paste, format, validate, and inspect structures in the browser—deployed as a static app on GitHub Pages for a fast, shareable link.",
    role: "Author",
    highlights: [
      "Client-only processing—no server round-trips for typical format/validate flows.",
      "TypeScript + Vite toolchain with a focus on load time and simple deployment.",
      "Public demo at gajay.github.io/js-formatter for recruiters and peers to try instantly.",
    ],
    tags: ["TypeScript", "Vite", "GitHub Pages"],
    liveUrl: "https://gajay.github.io/js-formatter/",
    repoUrl: `${siteConfig.github.url}/js-formatter`,
    liveCta: "Try live demo",
    preview: "saas",
  },
];

export function getCaseStudyBySlug(slug: string): ProjectCaseStudy | undefined {
  return projectCaseStudies.find((study) => study.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return projectCaseStudies.map((study) => study.slug);
}
