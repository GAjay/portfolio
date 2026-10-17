export function PortfolioIconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="ar" viewBox="0 0 24 24">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </symbol>
      <symbol id="ne" viewBox="0 0 24 24">
        <path d="M7 17L17 7M8 7h9v9" />
      </symbol>
      <symbol id="st" viewBox="0 0 24 24">
        <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z" />
      </symbol>
      <symbol id="fk" viewBox="0 0 24 24">
        <circle cx="6" cy="5" r="2.5" />
        <circle cx="18" cy="5" r="2.5" />
        <circle cx="12" cy="19" r="2.5" />
        <path d="M6 7.5v2a3 3 0 003 3h6a3 3 0 003-3v-2M12 12.5v4" />
      </symbol>
    </svg>
  );
}

export function IconArrow() {
  return (
    <svg className="i" aria-hidden>
      <use href="#ar" />
    </svg>
  );
}

export function IconChevron({ direction = "right" }: { direction?: "left" | "right" }) {
  const d = direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6";
  return (
    <svg className="i company-carousel__chev-icon" viewBox="0 0 24 24" aria-hidden>
      <path d={d} />
    </svg>
  );
}

export function IconNorthEast() {
  return (
    <svg className="i" aria-hidden>
      <use href="#ne" />
    </svg>
  );
}

export function IconStar() {
  return (
    <svg className="i" aria-hidden>
      <use href="#st" />
    </svg>
  );
}

export function IconFork() {
  return (
    <svg className="i" aria-hidden>
      <use href="#fk" />
    </svg>
  );
}
