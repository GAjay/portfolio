import generated from "./journey.generated.json";

export type JourneyEntry = {
  id: string;
  period: string;
  role: string;
  company: string;
  logoId?: string;
  summary: string;
  /** Long-form paragraphs (Apple-style role narrative). */
  overview: string[];
  /** Role accomplishments (curated from LinkedIn experience; edit seed). */
  highlights: string[];
  tags: string[];
};

/** Curated from LinkedIn profile; regenerated via `npm run sync:data`. */
export const journeyEntries: JourneyEntry[] = generated as JourneyEntry[];
