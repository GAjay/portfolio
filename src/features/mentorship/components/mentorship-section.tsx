"use client";

import { RefSection } from "@/shared/components/ref-section";
import { IconArrow } from "@/shared/components/portfolio-icons";
import { RippleAnchor } from "@/shared/components/ripple";
import { siteConfig } from "@/shared/config/site";
import { mentorshipSessions } from "../data/sessions";
import { MentorshipSessionsCarousel } from "./mentorship-sessions-carousel";

export function MentorshipSection() {
  return (
    <RefSection
      id="mentor"
      revealOrder={10}
      split
      kicker={siteConfig.mentorship.kicker}
      title={siteConfig.mentorship.title}
      description={siteConfig.mentorship.description}
      actions={
        <RippleAnchor
          className="btn s"
          href={siteConfig.topmateUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book on Topmate
          <IconArrow />
        </RippleAnchor>
      }
    >
      <MentorshipSessionsCarousel sessions={mentorshipSessions} />
    </RefSection>
  );
}
