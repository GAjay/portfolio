/** Matches `--bg` in portfolio-template.css */
const THEME_PAGE_BG: Record<"light" | "dark", string> = {
  light: "#fbfbfc",
  dark: "#0b0b0e",
};

export function runThemeChangeRipple(
  clientX: number,
  clientY: number,
  next: "light" | "dark",
  onApplied: () => void,
): void {
  if (typeof document === "undefined") {
    onApplied();
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    onApplied();
    return;
  }

  const current =
    document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

  const radius =
    Math.hypot(
      Math.max(clientX, window.innerWidth - clientX),
      Math.max(clientY, window.innerHeight - clientY),
    ) * 1.08;

  // New theme renders under the overlay; overlay is the previous theme shrinking away.
  onApplied();

  const overlay = document.createElement("div");
  overlay.className = "theme-ripple-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.style.backgroundColor = THEME_PAGE_BG[current];
  overlay.style.clipPath = `circle(${radius}px at ${clientX}px ${clientY}px)`;

  document.body.appendChild(overlay);

  let finished = false;
  const cleanup = () => {
    if (finished) return;
    finished = true;
    overlay.remove();
  };

  let fallbackTimer = 0;
  const finishOnce = () => {
    window.clearTimeout(fallbackTimer);
    cleanup();
  };

  fallbackTimer = window.setTimeout(finishOnce, 600);

  overlay.addEventListener(
    "transitionend",
    (event) => {
      const prop = event.propertyName;
      if (prop === "clip-path" || prop === "-webkit-clip-path") finishOnce();
    },
    { once: true },
  );

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.transition = "clip-path 520ms cubic-bezier(0.4, 0, 0.2, 1)";
      overlay.style.clipPath = `circle(0px at ${clientX}px ${clientY}px)`;
    });
  });
}
