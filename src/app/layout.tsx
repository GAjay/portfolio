import type { Viewport } from "next";
import { Caveat, Inter_Tight } from "next/font/google";
import { Providers } from "@/shared/components/providers";
import { ScrollToTop } from "@/shared/components/scroll-to-top";
import { SkipLink } from "@/shared/components/skip-link";
import { SiteJsonLd } from "@/shared/components/site-json-ld";
import { PortfolioIconSprite } from "@/shared/components/portfolio-icons";
import { COLOR_SCHEME_INIT_SCRIPT } from "@/shared/lib/color-scheme-init-script";
import { buildRootMetadata } from "@/shared/lib/site-metadata";
import "asriui/style.css";
import "./globals.css";
import "@/shared/styles/portfolio.css";
import "@/shared/styles/portfolio-template.css";
import "@/shared/styles/portfolio-asriui.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
  weight: ["300", "400", "500", "600", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
  weight: ["600"],
});

export const metadata = buildRootMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0e" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${interTight.variable} ${caveat.variable} h-full scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: COLOR_SCHEME_INIT_SCRIPT }} />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full antialiased">
        <SiteJsonLd includeProfilePage />
        <PortfolioIconSprite />
        <SkipLink />
        <Providers>
          {children}
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
