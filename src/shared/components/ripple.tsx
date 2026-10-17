"use client";

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  RefObject,
} from "react";
import { useCallback, useRef } from "react";

function spawnRipple(
  host: HTMLElement,
  clientX: number,
  clientY: number,
  lightOnDark = false,
) {
  const rect = host.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.2;
  const x = clientX - rect.left - size / 2;
  const y = clientY - rect.top - size / 2;

  const wave = document.createElement("span");
  wave.className = lightOnDark ? "ripple-wave ripple-wave--light" : "ripple-wave";
  wave.style.width = `${size}px`;
  wave.style.height = `${size}px`;
  wave.style.left = `${x}px`;
  wave.style.top = `${y}px`;
  host.appendChild(wave);
  wave.addEventListener(
    "animationend",
    () => {
      wave.remove();
    },
    { once: true },
  );
}

type RippleOptions = {
  hoverRipple?: boolean;
};

function useRipple(lightOnDark = false, options?: RippleOptions) {
  const ref = useRef<HTMLElement>(null);
  const hoverRipple = options?.hoverRipple ?? false;

  const rippleAt = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const host = ref.current;
      if (!host) return;
      spawnRipple(host, event.clientX, event.clientY, lightOnDark);
    },
    [lightOnDark],
  );

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (event.button !== 0) return;
      rippleAt(event);
    },
    [rippleAt],
  );

  const onPointerEnter = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!hoverRipple) return;
      rippleAt(event);
    },
    [hoverRipple, rippleAt],
  );

  return { ref, onPointerDown, onPointerEnter };
}

type RippleAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  rippleLight?: boolean;
};

export function RippleAnchor({
  className,
  rippleLight,
  hoverRipple,
  onPointerDown,
  onPointerEnter,
  ...rest
}: RippleAnchorProps & { hoverRipple?: boolean }) {
  const { ref, onPointerDown: rippleDown, onPointerEnter: rippleEnter } = useRipple(
    rippleLight,
    { hoverRipple },
  );

  return (
    <a
      ref={ref as RefObject<HTMLAnchorElement>}
      className={className ? `ripple-host ${className}` : "ripple-host"}
      onPointerDown={(e) => {
        rippleDown(e);
        onPointerDown?.(e);
      }}
      onPointerEnter={(e) => {
        rippleEnter(e);
        onPointerEnter?.(e);
      }}
      {...rest}
    />
  );
}

type RippleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  rippleLight?: boolean;
};

export function RippleButton({ className, rippleLight, onPointerDown, ...rest }: RippleButtonProps) {
  const { ref, onPointerDown: rippleDown } = useRipple(rippleLight);

  return (
    <button
      ref={ref as RefObject<HTMLButtonElement>}
      type="button"
      className={className ? `ripple-host ${className}` : "ripple-host"}
      onPointerDown={(e) => {
        rippleDown(e);
        onPointerDown?.(e);
      }}
      {...rest}
    />
  );
}

type RippleDivProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  rippleLight?: boolean;
  hoverRipple?: boolean;
};

export function RippleDiv({
  className,
  rippleLight,
  hoverRipple = true,
  onPointerDown,
  onPointerEnter,
  ...rest
}: RippleDivProps) {
  const { ref, onPointerDown: rippleDown, onPointerEnter: rippleEnter } = useRipple(
    rippleLight,
    { hoverRipple },
  );

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={className ? `ripple-host ${className}` : "ripple-host"}
      onPointerDown={(e) => {
        rippleDown(e);
        onPointerDown?.(e);
      }}
      onPointerEnter={(e) => {
        rippleEnter(e);
        onPointerEnter?.(e);
      }}
      {...rest}
    />
  );
}
