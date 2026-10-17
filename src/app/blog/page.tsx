import type { Metadata } from "next";
import { BlogPageContent } from "@/features/blog";
import { siteConfig } from "@/shared/config/site";
import { absoluteUrl } from "@/shared/lib/site-url";

const description = siteConfig.seo.description;

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: {
    canonical: absoluteUrl("/blog"),
  },
  openGraph: {
    title: `Blog · ${siteConfig.name}`,
    description,
    url: absoluteUrl("/blog"),
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogPageContent />;
}
