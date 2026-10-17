"use client";

import { useEffect, useState } from "react";
import { scrollToSectionId } from "@/shared/lib/scroll-section";

const SHOW_AFTER_PX = 420;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
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
      onClick={() => {
        if (window.location.pathname === "/") {
          scrollToSectionId("home");
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    >
      <svg className="scroll-top__icon" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 5v14M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}
