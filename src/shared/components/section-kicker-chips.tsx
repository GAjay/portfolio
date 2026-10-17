import { Badge } from "asriui/badge";

type SectionKickerChipsProps = {
  /** Visible label for assistive tech (e.g. "YouTube, 6 subscribers"). */
  label: string;
  chips: string[];
};

export function SectionKickerChips({ label, chips }: SectionKickerChipsProps) {
  const items = chips.map((text) => text.trim()).filter(Boolean);
  if (items.length === 0) return null;

  return (
    <div className="sec-kicker-chips" aria-label={label}>
      {items.map((text) => (
        <Badge
          key={text}
          variant="secondary"
          className="chip sec-kicker-chips__chip"
        >
          {text}
        </Badge>
      ))}
    </div>
  );
}

/** Split synced stats like "30 followers · 10 articles" into separate chips. */
export function statParts(stat: string): string[] {
  return stat.split("·").map((part) => part.trim()).filter(Boolean);
}
