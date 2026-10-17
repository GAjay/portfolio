"use client";

import { Separator } from "asriui/separator";
import { Timeline } from "asriui/timeline";
import { PortfolioH2 } from "@/shared/components/portfolio-typography";
import { experienceItems } from "../data/experience";

export function ExperienceSection() {
  return (
    <section id="experience" style={{ paddingBlock: "3rem" }}>
      <PortfolioH2 style={{ marginBottom: "1rem" }}>Experience</PortfolioH2>
      <Separator style={{ marginBottom: "1.5rem" }} />
      <Timeline items={experienceItems} />
    </section>
  );
}
