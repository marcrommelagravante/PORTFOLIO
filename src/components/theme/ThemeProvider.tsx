"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { animate } from "motion/react";
import { T } from "@/lib/transition-timing";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type DocumentWithViewTransition = Document & {
  startViewTransition?: (updateCallback: () => void) => ViewTransition;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "portfolio-theme-preference";
const EASE_SWEEP: [number, number, number, number] = [0.65, 0, 0.35, 1];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const isSweepingRef = useRef<boolean>(false);
  const cleanupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fallbackVeilRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    return () => {
      if (cleanupTimerRef.current) {
        clearTimeout(cleanupTimerRef.current);
      }
    };
  }, []);

  const applyThemeDOM = useCallback((next: Theme) => {
    const root = document.documentElement;
    if (next === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage errors in restricted environments
    }
    flushSync(() => {
      setTheme(next);
    });
  }, []);

  const cleanupSweep = useCallback(() => {
    if (cleanupTimerRef.current) {
      clearTimeout(cleanupTimerRef.current);
      cleanupTimerRef.current = null;
    }
    const root = document.documentElement;
    root.removeAttribute("data-theme-sweeping");
    root.style.removeProperty("--theme-sweep-duration");
    root.style.removeProperty("--theme-sweep-height");
    if (lineRef.current) {
      lineRef.current.style.transform = "";
    }
    isSweepingRef.current = false;
  }, []);

  const toggleTheme = useCallback(() => {
    if (typeof window === "undefined") return;
    if (isSweepingRef.current) return;

    const root = document.documentElement;
    const current: Theme = root.classList.contains("dark") ? "dark" : "light";
    const next: Theme = current === "light" ? "dark" : "light";

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      applyThemeDOM(next);
      return;
    }

    const doc = document as DocumentWithViewTransition;

    if (typeof doc.startViewTransition === "function") {
      isSweepingRef.current = true;
      root.style.setProperty("--theme-sweep-duration", `${T.uncover}ms`);
      root.style.setProperty("--theme-sweep-height", `${window.innerHeight}px`);
      root.setAttribute("data-theme-sweeping", "true");

      // Failsafe cleanup in case a browser aborts finished promise silently
      cleanupTimerRef.current = setTimeout(cleanupSweep, T.uncover + 400);

      try {
        const vt = doc.startViewTransition(() => {
          applyThemeDOM(next);
        });

        vt.finished.finally(cleanupSweep);
        return;
      } catch {
        cleanupSweep();
      }
    }

    // Fallback for browsers without View Transitions API
    const oldBg =
      getComputedStyle(root).getPropertyValue("--background").trim() ||
      (current === "dark" ? "#191918" : "#F4F1EA");
    const veilEl = fallbackVeilRef.current;
    const lineEl = lineRef.current;

    isSweepingRef.current = true;
    root.setAttribute("data-theme-sweeping", "true");

    if (veilEl) {
      veilEl.style.backgroundColor = oldBg;
      veilEl.style.transformOrigin = "bottom";
      veilEl.style.transform = "scaleY(1)";
      veilEl.style.opacity = "1";
    }
    if (lineEl) {
      lineEl.style.transform = "translateY(0px)";
    }

    applyThemeDOM(next);

    animate<number>(0, 1, {
      duration: T.uncover / 1000,
      ease: EASE_SWEEP,
      onUpdate: (v) => {
        const height = window.innerHeight;
        if (veilEl) {
          veilEl.style.transform = `scaleY(${1 - v})`;
        }
        if (lineEl) {
          lineEl.style.transform = `translateY(${v * height}px)`;
        }
      },
      onComplete: () => {
        if (veilEl) {
          veilEl.style.transform = "scaleY(0)";
          veilEl.style.opacity = "0";
        }
        cleanupSweep();
      },
    });
  }, [applyThemeDOM, cleanupSweep]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none"
      >
        <div
          ref={fallbackVeilRef}
          className="absolute inset-0 origin-bottom"
          style={{ opacity: 0, transform: "scaleY(0)" }}
        />
        <div
          ref={lineRef}
          data-theme-sweep-line=""
          className="fixed top-0 right-0 left-0 z-50 h-px bg-(--foreground)/45"
        />
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
