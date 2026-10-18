"use client";

import Image from "next/image";
import { useState } from "react";
import { assetPath } from "@/shared/config/base-path";
import type { ProjectPreviewVariant } from "../data/case-studies";
import { projectScreenshotSrc } from "../data/case-studies";
import { ProjectPreview } from "./project-preview";

type ProjectScreenshotProps = {
  slug: string;
  name: string;
  variant: ProjectPreviewVariant;
  /** e.g. `proj__shot` on carousel cards */
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function ProjectScreenshot({
  slug,
  name,
  variant,
  className = "",
  sizes = "(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 640px",
  priority = false,
}: ProjectScreenshotProps) {
  const [failed, setFailed] = useState(false);
  const src = assetPath(projectScreenshotSrc(slug));

  if (failed) {
    return (
      <div className={`project-shot project-shot--fallback ${className}`.trim()}>
        <ProjectPreview variant={variant} />
      </div>
    );
  }

  return (
    <div className={`project-shot ${className}`.trim()}>
      <div className="project-shot__chrome" aria-hidden>
        <span /><span /><span />
      </div>
      <Image
        className="project-shot__img"
        src={src}
        alt={`Screenshot of ${name}`}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
