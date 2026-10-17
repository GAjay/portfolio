import { assetPath } from "@/shared/config/base-path";

/** Injects CSS variables for background URLs that cannot use Next `basePath` in plain CSS. */
export function PortfolioAssetStyles() {
  const geo = assetPath("/assets/bg/portfolio-geometry.svg");
  const geoDark = assetPath("/assets/bg/portfolio-geometry-dark.svg");

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `:root {
  --portfolio-bg-geo: url("${geo}");
  --portfolio-bg-geo-dark: url("${geoDark}");
}`,
      }}
    />
  );
}
