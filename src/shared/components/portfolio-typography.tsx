import { Typography } from "asriui/typography";
import type { ComponentPropsWithoutRef } from "react";

type PortfolioTextProps = ComponentPropsWithoutRef<typeof Typography>;

function cx(...parts: (string | undefined)[]) {
  return parts.filter(Boolean).join(" ") || undefined;
}

export function PortfolioH1({ className, ...props }: PortfolioTextProps) {
  return <Typography variant="h1" as="h1" className={className} {...props} />;
}

/** Section titles (`.sec h2` styles apply via element). */
export function PortfolioH2({ className, ...props }: PortfolioTextProps) {
  return <Typography variant="h2" as="h2" className={className} {...props} />;
}

export function PortfolioH3({ className, ...props }: PortfolioTextProps) {
  return <Typography variant="h3" as="h3" className={className} {...props} />;
}

/** Hero / page leads (`.l`, `.blog-page__lead`, `.contact-lead`). */
export function PortfolioLead({ className, ...props }: PortfolioTextProps) {
  return <Typography variant="lead" as="p" className={cx("portfolio-typo-lead", className)} {...props} />;
}

/** Section descriptions (`.sec .d`). */
export function PortfolioSectionDesc({ className, ...props }: PortfolioTextProps) {
  return <Typography variant="muted" as="p" className={cx("d", className)} {...props} />;
}

export function PortfolioBody({ className, ...props }: PortfolioTextProps) {
  return <Typography variant="p" as="p" className={className} {...props} />;
}

export function PortfolioMuted({ className, ...props }: PortfolioTextProps) {
  return <Typography variant="muted" as="p" className={className} {...props} />;
}

export function PortfolioSmall({
  className,
  as = "small",
  ...props
}: PortfolioTextProps) {
  return <Typography variant="small" as={as} className={className} {...props} />;
}
