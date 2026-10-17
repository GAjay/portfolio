"use client";

import { ColorSchemeSync } from "./color-scheme-sync";
import { ThemeSyncProvider } from "./theme-sync-provider";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeSyncProvider>
      <ColorSchemeSync />
      {children}
    </ThemeSyncProvider>
  );
}
