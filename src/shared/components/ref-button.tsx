import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type RefButtonPrimaryProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  arrow?: boolean;
};

export function RefButtonPrimary({
  className = "",
  children,
  arrow = true,
  ...props
}: RefButtonPrimaryProps) {
  return (
    <a className={`ref-btn ref-btn--primary ${className}`.trim()} {...props}>
      {children}
      {arrow ? <Arrow /> : null}
    </a>
  );
}

type RefButtonSecondaryProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  arrow?: boolean;
};

export function RefButtonSecondary({
  className = "",
  children,
  arrow = false,
  ...props
}: RefButtonSecondaryProps) {
  return (
    <button
      type="button"
      className={`ref-btn ref-btn--secondary ${className}`.trim()}
      {...props}
    >
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}

function Arrow() {
  return (
    <span className="ref-btn__arrow" aria-hidden>
      →
    </span>
  );
}

export function RefButtonPrimaryButton({
  className = "",
  children,
  arrow = true,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { arrow?: boolean }) {
  return (
    <button
      type="button"
      className={`ref-btn ref-btn--primary ${className}`.trim()}
      {...props}
    >
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}
