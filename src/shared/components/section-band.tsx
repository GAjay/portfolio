import type { ReactNode } from "react";

type SectionBandProps = {
  /** Muted band (`--soft`); default uses page canvas (`--bg`). */
  alt?: boolean;
  children: ReactNode;
};

export function SectionBand({ alt = false, children }: SectionBandProps) {
  return (
    <div className={alt ? "portfolio-band portfolio-band--alt" : "portfolio-band"}>
      <div className="wrap">{children}</div>
    </div>
  );
}
