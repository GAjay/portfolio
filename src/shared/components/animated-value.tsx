"use client";

import {
  type ElementType,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ParsedValue = {
  end: number;
  prefix: string;
  suffix: string;
  format: (n: number) => string;
};

function parseAnimatedValue(raw: string): ParsedValue | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  if (/^\d{1,2}$/.test(trimmed) && trimmed.length <= 2) {
    const end = Number.parseInt(trimmed, 10);
    const width = trimmed.length;
    return {
      end,
      prefix: "",
      suffix: "",
      format: (n) => String(Math.round(n)).padStart(width, "0"),
    };
  }

  const kMatch = trimmed.match(/^(\d+(?:\.\d+)?)K(\+?)$/i);
  if (kMatch) {
    const end = Number.parseFloat(kMatch[1]);
    return {
      end,
      prefix: "",
      suffix: `K${kMatch[2] ?? ""}`,
      format: (n) => String(Math.round(n)),
    };
  }

  const plusMatch = trimmed.match(/^(\d+(?:\.\d+)?)(\+?)$/);
  if (plusMatch) {
    const end = Number.parseFloat(plusMatch[1]);
    return {
      end,
      prefix: "",
      suffix: plusMatch[2] ?? "",
      format: (n) => String(Math.round(n)),
    };
  }

  if (/^\d+$/.test(trimmed)) {
    const end = Number.parseInt(trimmed, 10);
    return {
      end,
      prefix: "",
      suffix: "",
      format: (n) => String(Math.round(n)),
    };
  }

  return null;
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

type AnimatedValueProps = {
  value: string;
  className?: string;
  /** Count-up length in ms */
  duration?: number;
  as?: ElementType;
  /** Start as soon as mounted (hero / above-the-fold) */
  immediate?: boolean;
};

export function AnimatedValue({
  value,
  className,
  duration = 1400,
  as: Tag = "span",
  immediate = false,
}: AnimatedValueProps) {
  const ref = useRef<HTMLElement>(null);
  const started = useRef(false);
  const parsed = useMemo(() => parseAnimatedValue(value), [value]);
  const [display, setDisplay] = useState(() =>
    parsed ? `${parsed.prefix}${parsed.format(0)}${parsed.suffix}` : value,
  );
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !parsed) {
      setDisplay(value);
      setActive(true);
      return;
    }

    const run = () => {
      if (started.current) return;
      started.current = true;
      setActive(true);
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const current = parsed.end * easeOutCubic(t);
        setDisplay(
          `${parsed.prefix}${parsed.format(current)}${parsed.suffix}`,
        );
        if (t < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      };

      requestAnimationFrame(tick);
    };

    const inView = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.92 && rect.bottom > 8;
    };

    if (immediate || inView()) {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(el);
    const retry = requestAnimationFrame(() => {
      if (!started.current && inView()) run();
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(retry);
    };
  }, [duration, immediate, parsed, value]);

  const classes = [
    "animated-value",
    active ? "animated-value--on" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref as never} className={classes}>
      {display}
    </Tag>
  );
}
