/** Shared easing — calm ease-out, no overshoot. */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function scrollDurationForDistance(px: number): number {
  return Math.min(880, Math.max(480, Math.abs(px) * 0.42));
}

let activeFrame = 0;

export function cancelSmoothScroll() {
  if (activeFrame) {
    cancelAnimationFrame(activeFrame);
    activeFrame = 0;
  }
}

export type SmoothScrollResult = {
  durationMs: number;
  cancel: () => void;
};

export function smoothScrollToY(
  targetY: number,
  onComplete?: () => void,
): SmoothScrollResult {
  cancelSmoothScroll();

  const startY = window.scrollY;
  const delta = targetY - startY;

  if (Math.abs(delta) < 1) {
    window.scrollTo(0, targetY);
    onComplete?.();
    return { durationMs: 0, cancel: cancelSmoothScroll };
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    window.scrollTo(0, targetY);
    onComplete?.();
    return { durationMs: 0, cancel: cancelSmoothScroll };
  }

  const durationMs = scrollDurationForDistance(delta);
  const start = performance.now();

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / durationMs);
    const y = startY + delta * easeOutCubic(t);
    window.scrollTo(0, y);
    if (t < 1) {
      activeFrame = requestAnimationFrame(tick);
    } else {
      activeFrame = 0;
      onComplete?.();
    }
  };

  activeFrame = requestAnimationFrame(tick);

  return { durationMs, cancel: cancelSmoothScroll };
}
