"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/shared/config/site";

const MIN_MS = 720;
const MAX_MS = 2400;
const FADE_MS = 420;

type SplashPhase = "show" | "hide" | "done";

export function AppSplash() {
  const [phase, setPhase] = useState<SplashPhase>("show");
  const finishedRef = useRef(false);

  useEffect(() => {
    let reduced = false;
    try {
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      /* ignore */
    }

    if (reduced) {
      setPhase("done");
      return;
    }

    const started = performance.now();

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;

      const elapsed = performance.now() - started;
      const wait = Math.max(0, MIN_MS - elapsed);
      window.setTimeout(() => {
        setPhase("hide");
        window.setTimeout(() => setPhase("done"), FADE_MS);
      }, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const cap = window.setTimeout(finish, MAX_MS);
    return () => {
      window.clearTimeout(cap);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`app-splash${phase === "hide" ? " app-splash--hide" : ""}`}
      role="presentation"
      aria-hidden="true"
    >
      <div className="app-splash__inner">
        <div className="app-splash__logo" aria-hidden>
          <span className="app-splash__mark">{siteConfig.initials}</span>
        </div>
        <p className="app-splash__name">{siteConfig.name}</p>
        <p className="app-splash__role">{siteConfig.role}</p>
        <div className="app-splash__progress" aria-hidden>
          <span className="app-splash__progress-bar" />
        </div>
      </div>
    </div>
  );
}
