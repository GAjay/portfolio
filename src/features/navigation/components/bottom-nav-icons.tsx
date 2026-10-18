import type { BottomNavTabId } from "../data/bottom-nav";

export function BottomNavIcon({ id, className }: { id: BottomNavTabId; className?: string }) {
  const cn = className ?? "bottom-nav__icon-svg";
  switch (id) {
    case "home":
      return (
        <svg className={cn} viewBox="0 0 24 24" aria-hidden>
          <path
            d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "journey":
      return (
        <svg className={cn} viewBox="0 0 24 24" aria-hidden>
          <path
            d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    case "projects":
      return (
        <svg className={cn} viewBox="0 0 24 24" aria-hidden>
          <path
            d="M4 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "content":
      return (
        <svg className={cn} viewBox="0 0 24 24" aria-hidden>
          <path
            d="M7 4h10a2 2 0 0 1 2 2v14l-4-3-4 3-4-3-4 3V6a2 2 0 0 1 2-2Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "mentor":
      return (
        <svg className={cn} viewBox="0 0 24 24" aria-hidden>
          <path
            d="M12 3a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v2h-2v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5H4v-2a3 3 0 0 1 3-3h1V7a4 4 0 0 1 4-4Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "blog":
      return (
        <svg className={cn} viewBox="0 0 24 24" aria-hidden>
          <path
            d="M6 4h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M14 4v5h5M8 13h8M8 17h5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg className={cn} viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      );
  }
}
