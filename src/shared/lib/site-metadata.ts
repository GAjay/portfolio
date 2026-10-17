import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";
import { absoluteUrl, getSiteUrl } from "./site-url";

const siteUrl = getSiteUrl();
const homeUrl = absoluteUrl("/");

export function buildRootMetadata(): Metadata {
  const title = `${siteConfig.name} · ${siteConfig.seo.title}`;
  const description = siteConfig.seo.description;

  return {
    metadataBase: new URL(homeUrl),
    title: {
      default: title,
      template: `%s · ${siteConfig.name}`,
    },
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteUrl }],
    creator: siteConfig.name,
    keywords: [...siteConfig.seo.keywords],
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: homeUrl,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: "/icons/icon-512.png",
          width: 512,
          height: 512,
          alt: `${siteConfig.name} — full-stack AI engineer portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/icons/icon-512.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: homeUrl,
    },
    category: "technology",
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: siteConfig.name,
    },
  };
}

const personKnowsAbout = [
  "Full-stack engineering",
  "Artificial intelligence",
  "Large language models",
  "AI product integration",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Web accessibility",
  "Design systems",
  "GraphQL",
  "Payment gateways",
  "Stripe",
  "Razorpay",
  "Technical mentorship",
];

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: siteConfig.name,
    url: siteUrl,
    image: siteConfig.heroPortrait.startsWith("http")
      ? siteConfig.heroPortrait
      : `${getSiteUrl()}${siteConfig.heroPortrait}`,
    email: `mailto:${siteConfig.email}`,
    jobTitle: siteConfig.role.split("·")[0]?.trim() ?? "Full-Stack AI Engineer",
    description: siteConfig.aeo.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressCountry: "IN",
    },
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.youtube,
      siteConfig.social.medium,
      siteConfig.social.instagram,
      siteConfig.topmateUrl,
      siteConfig.social.buyMeACoffee,
    ],
    knowsAbout: personKnowsAbout,
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: `${siteConfig.name} — ${siteConfig.seo.title}`,
    description: siteConfig.seo.description,
    inLanguage: "en-IN",
    publisher: { "@id": `${siteUrl}/#person` },
    about: { "@id": `${siteUrl}/#person` },
  };
}

export function buildProfilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profile`,
    url: siteUrl,
    name: siteConfig.name,
    description: siteConfig.aeo.summary,
    mainEntity: { "@id": `${siteUrl}/#person` },
    isPartOf: { "@id": `${siteUrl}/#website` },
    inLanguage: "en-IN",
  };
}

