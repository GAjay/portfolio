"use client";

import { Separator } from "asriui/separator";
import { PortfolioBody, PortfolioH2, PortfolioH3 } from "@/shared/components/portfolio-typography";
import { siteConfig } from "@/shared/config/site";

export function AboutSection() {
  return (
    <section id="about" style={{ paddingBlock: "3rem" }}>
      <PortfolioH2 style={{ marginBottom: "1rem" }}>About</PortfolioH2>
      <Separator style={{ marginBottom: "1.5rem" }} />
      <PortfolioBody style={{ marginBottom: "1rem" }}>
        I am a developer focused on clarity, performance, and inclusive design.
        Over the past six years I have helped startups and product teams ship
        customer-facing apps with React, Next.js, and Node — from MVPs to
        production systems used by thousands of users.
      </PortfolioBody>
      <PortfolioBody>
        Based in {siteConfig.location}, I enjoy mentoring, writing about web
        architecture, and contributing to open source when I can.
      </PortfolioBody>
    </section>
  );
}
