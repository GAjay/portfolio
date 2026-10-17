"use client";

import type { CSSProperties } from "react";
import { IconNorthEast } from "@/shared/components/portfolio-icons";
import { RippleAnchor } from "@/shared/components/ripple";
import { useAutoplayCarousel } from "@/shared/hooks/use-autoplay-carousel";
import { PortfolioBody, PortfolioH3 } from "@/shared/components/portfolio-typography";
import { siteConfig } from "@/shared/config/site";
import type { Project } from "../data/projects";
import { ProjectPreview } from "./project-preview";

const VISIBLE_SLOTS = 2;

type ProjectsCarouselProps = {
  projects: Project[];
};

function ProjectCard({ project }: { project: Project }) {
  const external =
    project.href.startsWith("http") && !project.href.startsWith("#");
  const href = external ? project.href : siteConfig.github.url;

  return (
    <RippleAnchor
      className="card proj proj-carousel__card"
      href={href}
      hoverRipple
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <div className="proj__thumb">
        <div className="proj__cats" aria-hidden>
          {project.categories.map((cat) => (
            <span key={cat} className="chip proj__cat">
              {cat}
            </span>
          ))}
        </div>
        <ProjectPreview variant={project.preview} />
      </div>
      <div className="b">
        <PortfolioH3>{project.name}</PortfolioH3>
        <PortfolioBody>{project.description}</PortfolioBody>
        <div className="row">
          <div className="tags">
            {project.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
          <span className="go" aria-hidden>
            <IconNorthEast />
          </span>
        </div>
      </div>
    </RippleAnchor>
  );
}

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const { trackRef, pauseHandlers } = useAutoplayCarousel(
    VISIBLE_SLOTS,
    5500,
    projects.length,
  );

  return (
    <div
      className="proj-carousel"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      {...pauseHandlers}
    >
      <div
        ref={trackRef}
        className="proj-carousel__track"
        style={{ "--visible-slots": VISIBLE_SLOTS } as CSSProperties}
      >
        {projects.map((project) => (
          <div key={project.id} className="proj-carousel__slide">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
