"use client";

import { Badge } from "asriui/badge";
import { Separator } from "asriui/separator";
import { PortfolioH2, PortfolioH3 } from "@/shared/components/portfolio-typography";
import { skillGroups } from "../data/skills";

export function SkillsSection() {
  return (
    <section id="skills" style={{ paddingBlock: "3rem" }}>
      <PortfolioH2 style={{ marginBottom: "1rem" }}>Skills</PortfolioH2>
      <Separator style={{ marginBottom: "1.5rem" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {skillGroups.map((group) => (
          <div key={group.title}>
            <PortfolioH3 style={{ marginBottom: "0.75rem" }}>{group.title}</PortfolioH3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {group.items.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
