import Image from "next/image";
import type { Recommendation } from "../data/recommendations.types";

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

type RecommendationAvatarProps = {
  item: Pick<Recommendation, "author" | "avatarUrl" | "source">;
};

export function RecommendationAvatar({ item }: RecommendationAvatarProps) {
  const initials = initialsFromName(item.author);

  return (
    <span className={`rec-avatar rec-avatar--${item.source}`}>
      {item.avatarUrl ? (
        <Image
          src={item.avatarUrl}
          alt=""
          width={48}
          height={48}
          className="rec-avatar__img"
          sizes="48px"
          unoptimized
        />
      ) : (
        <span className="rec-avatar__initials" aria-hidden>{initials}</span>
      )}
    </span>
  );
}
