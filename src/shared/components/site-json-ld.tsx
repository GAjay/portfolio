import {
  buildPersonJsonLd,
  buildProfilePageJsonLd,
  buildWebSiteJsonLd,
} from "@/shared/lib/site-metadata";

function jsonLdScript(data: Record<string, unknown>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Structured data for search engines and answer engines (Person + WebSite + ProfilePage). */
export function SiteJsonLd({ includeProfilePage = false }: { includeProfilePage?: boolean }) {
  return (
    <>
      {jsonLdScript(buildPersonJsonLd())}
      {jsonLdScript(buildWebSiteJsonLd())}
      {includeProfilePage ? jsonLdScript(buildProfilePageJsonLd()) : null}
    </>
  );
}
