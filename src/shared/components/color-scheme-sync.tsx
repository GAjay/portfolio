"use client";

import { useEffect } from "react";
import {
  applyColorSchemePreference,
  readColorSchemePreference,
  subscribeSystemColorScheme,
} from "@/shared/lib/color-scheme";

export function ColorSchemeSync() {
  useEffect(() => {
    applyColorSchemePreference(readColorSchemePreference());

    return subscribeSystemColorScheme(() => {
      applyColorSchemePreference("system");
    });
  }, []);

  return null;
}
