import Link from "next/link";
import { navHref, navLinks } from "@/shared/config/site";

type SiteFooterNavProps = {
  className?: string;
};

export function SiteFooterNav({ className }: SiteFooterNavProps) {
  const merged = ["site-footer-nav", className].filter(Boolean).join(" ");

  return (
    <nav className={merged} aria-label="Site">
      {navLinks.map((item) => {
        const href = navHref(item);
        if (item.href === "/blog") {
          return (
            <Link key={item.id} href="/blog">
              {item.label}
            </Link>
          );
        }
        return (
          <a key={item.id} href={href}>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
