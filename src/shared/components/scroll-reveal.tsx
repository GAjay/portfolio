"use client";

import type { ElementType, ReactNode } from "react";
import {
  type ScrollCascade,
  useScrollReveal,
} from "@/shared/hooks/use-scroll-reveal";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  cascade?: ScrollCascade;
};

export function ScrollReveal({
  children,
  className,
  as: Tag = "div",
  cascade = "up",
}: ScrollRevealProps) {
  const { ref, className: revealClass } = useScrollReveal({ cascade });

  const merged = [revealClass, "scroll-reveal--block", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref as never} className={merged}>
      {children}
    </Tag>
  );
}
