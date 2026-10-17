const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type PlatformIconProps = { id: string; className?: string };

export function PlatformIcon({ id, className }: PlatformIconProps) {
  const cn = className ?? "platform-svg";
  if (id === "youtube") {
    return (
      <svg className={cn} viewBox="0 0 24 24" aria-hidden>
        <rect x="3" y="6" width="18" height="12" rx="3" {...stroke} />
        <path d="M11 10l5 2-5 2v-4z" {...stroke} />
      </svg>
    );
  }
  if (id === "instagram") {
    return (
      <svg className={cn} viewBox="0 0 24 24" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" {...stroke} />
        <circle cx="12" cy="12" r="4" {...stroke} />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg className={cn} viewBox="0 0 24 24" aria-hidden>
      <path d="M4 6h16M4 12h10M4 18h14" {...stroke} />
      <circle cx="18" cy="18" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}
