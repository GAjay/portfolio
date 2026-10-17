"use client";

import { AsriUIProvider } from "asriui/config";
import { ToastProvider } from "asriui/toast";
import { readResolvedColorScheme } from "@/shared/lib/color-scheme";
import { useEffect, useState } from "react";

type ThemeSyncProviderProps = {
  children: React.ReactNode;
};

function readDocumentTheme(): "light" | "dark" {
  return readResolvedColorScheme();
}

export function ThemeSyncProvider({ children }: ThemeSyncProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(readDocumentTheme());

    const observer = new MutationObserver(() => {
      setTheme(readDocumentTheme());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <AsriUIProvider
      config={{
        theme,
        fontFamily: 'var(--font-inter-tight), "Inter Tight", ui-sans-serif, system-ui, sans-serif',
        motion: { preset: "apple", enabled: true },
      }}
    >
      <ToastProvider>{children}</ToastProvider>
    </AsriUIProvider>
  );
}
