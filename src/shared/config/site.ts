import profile from "./profile.generated.json";
import { withBasePath } from "./base-path";
import { NAV_SECTION_LABELS, NAV_TAB_ORDER } from "@/shared/lib/nav-scroll-sections";

export const siteConfig = {
  initials: "AK",
  name: "Ajay Kumar Maheshwari",
  role: "Full-Stack AI Engineer · Writer · Mentor",
  tagline: "Full-Stack AI Engineer · Writer · Mentor",
  greeting: "Hey, I'm Ajay",
  headline: "Building real-world products with code and AI that ships.",
  bio:
    "I'm a full-stack engineer with 11+ years building web platforms, APIs, and design systems. I integrate AI into real workflows—not demos—and write and mentor on Medium, YouTube, and Topmate.",
  about: {
    body:
      "is a full-stack AI engineer, writer, and mentor with 11+ years shipping production web apps, services, and design systems. He builds end to end—from React and Node to data and intelligent features—shares practical lessons on Medium and YouTube, and mentors developers through lead roles, community content, and 1:1 sessions (including on Topmate).",
  },
  seo: {
    title: "Full-Stack AI Engineer · Portfolio",
    description:
      "Ajay Kumar Maheshwari is a full-stack AI engineer in Delhi, India—11+ years shipping React, Next.js, Node.js, and production AI features for enterprise and product teams. Portfolio, writing, open source, and mentorship.",
    keywords: [
      "full-stack AI engineer",
      "AI engineer India",
      "LLM integration",
      "generative AI in production",
      "React developer",
      "Next.js",
      "Node.js",
      "TypeScript",
      "design systems",
      "Stripe",
      "Razorpay",
      "payment gateways",
      "web accessibility",
      "technical mentor",
      "Ajay Kumar Maheshwari",
    ],
  },
  aeo: {
    summary:
      "Ajay Kumar Maheshwari is a full-stack AI engineer, writer, and mentor based in Delhi, India, with 11+ years building web platforms and shipping practical AI in production.",
  },
  email: "ajay.maheshwari095@gmail.com",
  location: "Delhi, India",
  availability: "Open to remote opportunities",
  avatarUrl: profile.avatarUrl,
  /** Hero + contact portrait (local asset). */
  /** Paths under `public/` — Next `Image` adds `basePath`; use `assetPath()` for `<img>`. */
  heroPortrait: "/assets/hero/portrait.png",
  aboutPortrait: "/assets/about/portrait.png",
  github: {
    handle: profile.handle,
    url: profile.githubUrl,
    repos: profile.publicRepos,
    stars: profile.totalStars,
  },
  topmateUrl: "https://topmate.io/ajay_maheshwari",
  /** Replace `public/resume/ajay-kumar-maheshwari-resume.pdf` with your latest CV. */
  resumePath: "/resume/ajay-kumar-maheshwari-resume.pdf",
  resumeDownloadName: "Ajay-Kumar-Maheshwari-Resume.pdf",
  resumeLabel: "Download resume",
  social: {
    github: "https://github.com/GAjay",
    linkedin: "https://www.linkedin.com/in/ajaymaheshwari24/",
    instagram: "https://www.instagram.com/theplainscript/",
    youtube: "https://www.youtube.com/@theplainscript",
    medium: "https://theplainscript.medium.com/",
    buyMeACoffee: "https://buymeacoffee.com/theplainscript",
  },
  stats: [
    { label: "Years experience", value: "11+" },
    { label: "Projects delivered", value: "40+" },
    { label: "Developers mentored", value: "300+" },
    {
      label: "Developers reached",
      value: profile.metrics?.audienceReachLabel ?? "—",
    },
  ],
  chart: {
    label: "Readers",
    delta: "",
    value: profile.metrics?.audienceReachLabel ?? "—",
  },
  journey: {
    kicker: "Experience",
    title: "Where I've led and shipped.",
    description:
      "Enterprise and product roles—full-stack delivery, platform UI, and AI-assisted features. Pick a role for narrative, contributions, and links.",
    highlights: [
      { value: "11+", label: "Years in web" },
      { value: "4", label: "Major roles" },
      { value: "Lead", label: "IC & architecture" },
    ],
  },
  testimonials: {
    kicker: "Testimonials",
    title: "What peers and mentees say",
    description:
      "Feedback from colleagues on LinkedIn and from developers I've coached in teams, sessions, and community—on communication, code quality, and growing on real projects.",
  },
  projects: {
    kicker: "Featured projects",
    title: "Real products. Real impact.",
    description:
      "Web apps, design systems, platform UI, and AI-backed experiences—where performance, accessibility, and maintainability mattered as much as the launch date.",
  },
  openSource: {
    kicker: "Open source",
    title: "GitHub repositories",
    description:
      "Libraries, demos, and experiments—including AI observability and UI tooling—useful starting points for teams and patterns from production work.",
  },
  mentorship: {
    kicker: "Mentorship",
    title: "Book a 1:1 session on Topmate",
    description:
      "Book focused 1:1 time on Topmate for React, full-stack architecture, AI in real products, career growth, interviews, and code reviews—grounded in 11+ years shipping in production.",
  },
  contentPlatforms: {
    instagram: {
      kicker: "Instagram",
      title: "Reels, carousels, and visual notes.",
      description:
        "Short-form posts on engineering craft, AI in real products, and lessons from shipping—bite-sized ideas you can apply on your next PR or design review.",
      cta: "Follow on Instagram",
    },
    youtube: {
      kicker: "YouTube",
      title: "Tutorials and walkthroughs on video.",
      description:
        "Practical videos on full-stack development and AI on the job—from project builds to concepts you can ship. Clarity over hype.",
      cta: "Subscribe on YouTube",
    },
    medium: {
      kicker: "Medium",
      title: "In-depth articles for developers.",
      description:
        "Long-form series on architecture, TypeScript, multi-tenant UI, and AI in production—patterns engineers can reuse in their own codebase.",
      cta: "Read on Medium",
    },
  },
  contact: {
    index: "10",
    title: "Let's build something amazing together.",
    description:
      "Open to full-stack and AI engineering roles, consulting, and interesting products. Reach out for collaboration or a tech chat.",
    copyrightYear: 2026,
  },
} as const;

export const socialLinks = [
  { id: "linkedin", href: siteConfig.social.linkedin, label: "LinkedIn" },
  { id: "github", href: siteConfig.social.github, label: "GitHub" },
  { id: "instagram", href: siteConfig.social.instagram, label: "Instagram" },
  { id: "youtube", href: siteConfig.social.youtube, label: "YouTube" },
  { id: "medium", href: siteConfig.social.medium, label: "Medium" },
  {
    id: "buyMeACoffee",
    href: siteConfig.social.buyMeACoffee,
    label: "Buy me a coffee",
  },
  { id: "topmate", href: siteConfig.topmateUrl, label: "Topmate" },
] as const;

export type SocialLinkId = (typeof socialLinks)[number]["id"];

export type NavSectionId =
  | "home"
  | "projects"
  | "journey"
  | "content"
  | "code"
  | "mentor";

export type NavLink =
  | { id: NavSectionId; label: string; href?: undefined }
  | { id: "blog"; label: string; href: "/blog" };

export const navLinks: NavLink[] = [
  ...NAV_TAB_ORDER.map((id) => ({
    id,
    label: NAV_SECTION_LABELS[id],
  })),
  { id: "blog", label: "Blog", href: "/blog" },
];

export function navHref(link: NavLink): string {
  if (link.href) return withBasePath(link.href);
  return withBasePath(`/#${link.id}`);
}

export function resumeHref(): string {
  return withBasePath(siteConfig.resumePath);
}
