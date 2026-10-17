import {
  SectionKickerChips,
  statParts,
} from "@/shared/components/section-kicker-chips";

type ContentPlatformKickerChipsProps = {
  platformLabel: string;
  stat: string;
};

export function ContentPlatformKickerChips({
  platformLabel,
  stat,
}: ContentPlatformKickerChipsProps) {
  const chips = [platformLabel, ...statParts(stat)];

  return (
    <SectionKickerChips
      label={chips.join(", ")}
      chips={chips}
    />
  );
}
