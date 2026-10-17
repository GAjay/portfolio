export type ExperienceTimelineItem = {
  id: string;
  title: string;
  date: string;
  status: "default" | "active" | "complete";
  description: string;
};

export const experienceItems: ExperienceTimelineItem[] = [
  {
    id: "exp-1",
    title: "Senior Frontend Engineer · Lumen Labs",
    date: "2023 — Present",
    status: "active",
    description:
      "Led migration to Next.js App Router, improved Core Web Vitals, and mentored a team of four.",
  },
  {
    id: "exp-2",
    title: "Full-Stack Developer · Northwind Digital",
    date: "2020 — 2023",
    status: "complete",
    description:
      "Built B2B dashboards, GraphQL APIs, and CI pipelines on AWS for logistics clients.",
  },
  {
    id: "exp-3",
    title: "Software Engineer · Freelance",
    date: "2018 — 2020",
    status: "complete",
    description:
      "Delivered marketing sites and e-commerce integrations for agencies and small businesses.",
  },
];
