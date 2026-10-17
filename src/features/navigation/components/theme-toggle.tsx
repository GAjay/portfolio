"use client";

import { RippleButton } from "@/shared/components/ripple";
import {
  readResolvedColorScheme,
  setColorSchemePreference,
} from "@/shared/lib/color-scheme";
import { runThemeChangeRipple } from "@/shared/lib/theme-ripple";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(readResolvedColorScheme());

    const observer = new MutationObserver(() => {
      setTheme(readResolvedColorScheme());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";

  return (
    <RippleButton
      className="ic"
      id="th"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      rippleLight={isDark}
      onClick={(event) => {
        const next = isDark ? "light" : "dark";
        runThemeChangeRipple(event.clientX, event.clientY, next, () => {
          setColorSchemePreference(next);
          setTheme(next);
        });
      }}
    >
      <svg className="i" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </RippleButton>
  );
}
