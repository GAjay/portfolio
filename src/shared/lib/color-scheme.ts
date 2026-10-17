export type ColorScheme = "light" | "dark";
export type ColorSchemePreference = ColorScheme | "system";

export const COLOR_SCHEME_STORAGE_KEY = "portfolio-color-scheme";

export function getSystemColorScheme(): ColorScheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function readColorSchemePreference(): ColorSchemePreference {
  if (typeof window === "undefined") return "system";
  try {
    const stored = localStorage.getItem(COLOR_SCHEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
  } catch {
    /* private mode / blocked storage */
  }
  return "system";
}

export function resolveColorScheme(preference: ColorSchemePreference): ColorScheme {
  return preference === "system" ? getSystemColorScheme() : preference;
}

export function applyColorScheme(scheme: ColorScheme): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", scheme);
}

export function applyColorSchemePreference(preference: ColorSchemePreference): ColorScheme {
  const resolved = resolveColorScheme(preference);
  applyColorScheme(resolved);
  return resolved;
}

export function setColorSchemePreference(preference: ColorSchemePreference): ColorScheme {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, preference);
    } catch {
      /* ignore */
    }
  }
  return applyColorSchemePreference(preference);
}

/** Resolved theme on `document.documentElement` (falls back to system). */
export function readResolvedColorScheme(): ColorScheme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "dark" || attr === "light") return attr;
  return getSystemColorScheme();
}

export function subscribeSystemColorScheme(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = () => {
    if (readColorSchemePreference() === "system") onChange();
  };
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}
