"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTheme } from "./ThemeProvider";

export type ThemeToggleProps = {
  variant?: "mobile-header" | "rail" | "rail-collapsed";
  className?: string;
};

type Particle = {
  id: number;
  delay: number;
  duration: number;
};

const PARTICLE_COUNT = 3;
const PARTICLE_TTL_MS = 950;
const NOISE_SVG_DATA_URI = `url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const VARIANT_METRICS = {
  "mobile-header": {
    trackClass: "h-9 w-[66px]",
    thumbClass: "h-7 w-7",
    iconClass: "h-3.5 w-3.5",
    trackIconPadClass: "px-[10px]",
    travel: 30,
    particleScale: 4.5,
  },
  rail: {
    trackClass: "h-11 w-[74px]",
    thumbClass: "h-9 w-9",
    iconClass: "h-4 w-4",
    trackIconPadClass: "px-[13px]",
    travel: 30,
    particleScale: 5.5,
  },
  "rail-collapsed": {
    trackClass: "h-11 w-11",
    thumbClass: "h-9 w-9",
    iconClass: "h-4 w-4",
    trackIconPadClass: "px-[13px]",
    travel: 0,
    particleScale: 5.5,
  },
} as const;

function SunIcon({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function ThemeToggle({
  variant = "mobile-header",
  className = "",
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const burstIdRef = useRef(0);

  const metrics = VARIANT_METRICS[variant];
  const isDark = mounted && theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";
  const isCollapsed = variant === "rail-collapsed";

  useEffect(() => {
    setMounted(true);
    return () => {
      if (particleTimerRef.current) {
        clearTimeout(particleTimerRef.current);
      }
    };
  }, []);

  const triggerParticles = () => {
    if (prefersReducedMotion) return;

    if (particleTimerRef.current) {
      clearTimeout(particleTimerRef.current);
    }

    const burstBase = burstIdRef.current * PARTICLE_COUNT;
    burstIdRef.current += 1;

    setParticles(
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: burstBase + i,
        delay: i * 0.09,
        duration: 0.55 + i * 0.1,
      }))
    );

    particleTimerRef.current = setTimeout(() => {
      setParticles([]);
      particleTimerRef.current = null;
    }, PARTICLE_TTL_MS);
  };

  const handleToggle = () => {
    if (document.documentElement.hasAttribute("data-theme-sweeping")) return;
    triggerParticles();
    toggleTheme();
  };

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={`inline-flex shrink-0 rounded-full border border-(--border) bg-(--surface) ${metrics.trackClass} ${className}`}
      />
    );
  }

  const trackStyle: React.CSSProperties = {
    background: isDark
      ? "linear-gradient(180deg, #131312 0%, var(--background) 100%)"
      : "linear-gradient(180deg, var(--watermark) 0%, var(--surface) 100%)",
    boxShadow: isDark
      ? "inset 0 2px 5px rgba(0, 0, 0, 0.65), inset 0 -1px 2px rgba(241, 238, 231, 0.07), 0 1px 0 rgba(241, 238, 231, 0.04)"
      : "inset 0 2px 4px rgba(23, 23, 21, 0.14), inset 0 -1px 2px rgba(255, 253, 248, 0.85), 0 1px 0 rgba(255, 253, 248, 0.65)",
  };

  const thumbStyle: React.CSSProperties = {
    background: isDark
      ? "linear-gradient(145deg, #343330 0%, #262523 55%, #1E1E1C 100%)"
      : "linear-gradient(145deg, #FCFBF7 0%, #F4F1EA 55%, #EAE5DA 100%)",
    border: isDark
      ? "1px solid rgba(241, 238, 231, 0.14)"
      : "1px solid rgba(23, 23, 21, 0.14)",
    boxShadow: isDark
      ? "inset 0 1px 1px rgba(241, 238, 231, 0.14), inset 0 -1px 2px rgba(0, 0, 0, 0.5), 0 3px 8px rgba(0, 0, 0, 0.55), 0 1px 2px rgba(0, 0, 0, 0.4)"
      : "inset 0 1px 1px rgba(255, 255, 255, 0.9), inset 0 -1px 2px rgba(23, 23, 21, 0.08), 0 2px 6px rgba(23, 23, 21, 0.16), 0 1px 2px rgba(23, 23, 21, 0.1)",
  };

  return (
    <motion.button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={label}
      onClick={handleToggle}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
      style={trackStyle}
      className={`group relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-(--border) p-[3px] transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground) ${metrics.trackClass} ${className}`}
    >
      {variant !== "mobile-header" ? (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 flex items-center justify-between overflow-hidden rounded-full text-(--muted)/70 transition-opacity duration-200 ${metrics.trackIconPadClass} ${
            isCollapsed ? "opacity-0" : "opacity-100 delay-75"
          }`}
        >
          <SunIcon className={metrics.iconClass} />
          <MoonIcon className={metrics.iconClass} />
        </span>
      ) : (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 flex items-center justify-between text-(--muted)/70 ${metrics.trackIconPadClass}`}
        >
          <SunIcon className={metrics.iconClass} />
          <MoonIcon className={metrics.iconClass} />
        </span>
      )}

      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ x: isCollapsed ? 0 : isDark ? metrics.travel : 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 320, damping: 22 }
        }
        style={thumbStyle}
        className={`relative z-10 flex items-center justify-center overflow-hidden rounded-full text-(--foreground) ${metrics.thumbClass}`}
      >
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <motion.span
              className="absolute h-2.5 w-2.5 rounded-full"
              style={{
                background: isDark
                  ? "radial-gradient(circle, rgba(241, 238, 231, 0.3) 0%, rgba(241, 238, 231, 0) 70%)"
                  : "radial-gradient(circle, rgba(23, 23, 21, 0.22) 0%, rgba(23, 23, 21, 0) 70%)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: metrics.particleScale, opacity: [0, 1, 0] }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "easeOut",
              }}
            >
              <span
                className="absolute inset-0 rounded-full opacity-35 mix-blend-overlay"
                style={{ backgroundImage: NOISE_SVG_DATA_URI }}
              />
            </motion.span>
          </motion.span>
        ))}

        <span className="relative z-10">
          {isDark ? (
            <MoonIcon className={metrics.iconClass} />
          ) : (
            <SunIcon className={metrics.iconClass} />
          )}
        </span>
      </motion.span>

      {isCollapsed && (
        <span
          role="tooltip"
          className="pointer-events-none absolute top-1/2 left-full z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-(--border) bg-(--surface) px-2.5 py-1 text-xs font-medium text-(--foreground) opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {label}
        </span>
      )}
    </motion.button>
  );
}
