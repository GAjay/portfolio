"use client";

import { useState } from "react";
import { RefSection } from "@/shared/components/ref-section";
import { siteConfig } from "@/shared/config/site";
import { journeyEntries } from "../data/journey";
import {
  JourneyExperienceDetail,
  JourneyExperienceNav,
} from "./journey-experience";

export function JourneySection() {
  const { highlights, ...copy } = siteConfig.journey;
  const [activeId, setActiveId] = useState(journeyEntries[0]?.id ?? "");
  const active =
    journeyEntries.find((entry) => entry.id === activeId) ?? journeyEntries[0];
  const isCurrent = active?.id === journeyEntries[0]?.id;

  return (
    <RefSection
      id="journey"
      revealOrder={2}
      kicker={copy.kicker}
      title={copy.title}
      description={copy.description}
      action={{ label: "View on LinkedIn", href: siteConfig.social.linkedin }}
      actions={
        <ul className="journey-highlights" aria-label="Career highlights">
          {highlights.map((item) => (
            <li key={item.label}>
              <span className="journey-highlights__value">{item.value}</span>
              <span className="journey-highlights__label">{item.label}</span>
            </li>
          ))}
        </ul>
      }
      introExtra={
        active ? (
          <JourneyExperienceNav
            entries={journeyEntries}
            activeId={active.id}
            onSelect={setActiveId}
          />
        ) : null
      }
    >
      {active ? (
        <JourneyExperienceDetail entry={active} isCurrent={isCurrent} />
      ) : null}
    </RefSection>
  );
}
