"use client";

type MobileNavMenuButtonProps = {
  open: boolean;
  onClick: () => void;
};

export function MobileNavMenuButton({ open, onClick }: MobileNavMenuButtonProps) {
  return (
    <button
      type="button"
      className="nav-menu-btn"
      aria-expanded={open}
      aria-controls="mobile-nav-drawer"
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onClick}
    >
      <span className="nav-menu-btn__icon" aria-hidden>
        <span className="nav-menu-btn__bar" />
        <span className="nav-menu-btn__bar" />
        <span className="nav-menu-btn__bar" />
      </span>
    </button>
  );
}
