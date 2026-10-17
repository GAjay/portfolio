import Link from "next/link";
import type { ContentItem } from "@/features/content/data/content";

type MediumChannel = {
  name: string;
  handle: string;
  stat: string;
  viewAll: string;
  items: ContentItem[];
};

type MediumPlatformCardProps = {
  channel: MediumChannel;
};

export function MediumPlatformCard({ channel }: MediumPlatformCardProps) {
  return (
    <div className="card plat plat--medium">
      <div className="medium-box__head">
        <span className="medium-box__mark" aria-hidden>M</span>
        <div className="medium-box__identity">
          <span className="medium-box__name">{channel.name}</span>
          <span className="medium-box__handle">@{channel.handle}</span>
        </div>
        <a
          className="medium-box__follow"
          href={channel.viewAll}
          target="_blank"
          rel="noopener noreferrer"
        >
          Profile
        </a>
      </div>

      <p className="medium-box__stat">
        {channel.stat.includes(" · ") ? (
          channel.stat.split(" · ").map((line) => <strong key={line}>{line}</strong>)
        ) : (
          <strong>{channel.stat}</strong>
        )}
      </p>

      <ul className="medium-box__posts">
        {channel.items.map((item) => (
          <li key={item.href ?? item.title}>
            <a
              href={item.href ?? channel.viewAll}
              className="medium-box__post"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="medium-box__post-title">{item.title}</span>
              <time className="medium-box__post-meta">{item.meta}</time>
            </a>
          </li>
        ))}
      </ul>

      <Link href="/blog" className="medium-box__all">
        View all articles
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
