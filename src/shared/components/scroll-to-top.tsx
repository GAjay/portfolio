"use client";

import { useEffect, useState } from "react";
import {
  SCROLL_TOP_SHOW_AFTER_PX,
  scrollPageToTop,
} from "@/shared/lib/scroll-to-top";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_TOP_SHOW_AFTER_PX);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`scroll-top${visible ? " scroll-top--visible" : ""}`}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => scrollPageToTop(window.location.pathname)}
    >
      <svg className="scroll-top__icon" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 5v14M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}
