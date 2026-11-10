"use client";

import React from "react";
import type { TransitionState } from "./TransitionProvider";

type TransitionOverlayProps = {
  state: TransitionState;
  title: string;
  announcement: string;
  overlayRef: React.RefObject<HTMLDivElement | null>;
  veilRef: React.RefObject<HTMLDivElement | null>;
  lineRef: React.RefObject<HTMLDivElement | null>;
  titleRef: React.RefObject<HTMLParagraphElement | null>;
};

export function TransitionOverlay({
  state,
  title,
  announcement,
  overlayRef,
  veilRef,
  lineRef,
  titleRef,
}: TransitionOverlayProps) {
  const isActive = state !== "idle";

  return (
    <>
      <div
        ref={overlayRef}
        aria-hidden="true"
        data-transition-state={state}
        className={`transition-overlay-offset fixed top-16 right-0 bottom-0 left-0 z-35 overflow-hidden select-none lg:top-0 ${
          isActive ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Solid canvas veil */}
        <div
          ref={veilRef}
          className="absolute inset-0 origin-top bg-(--background)"
          style={{
            transform: "scaleY(0)",
            willChange: isActive ? "transform" : undefined,
          }}
        />

        {/* 1px horizontal sweeping hairline */}
        <div
          ref={lineRef}
          className="absolute top-0 right-0 left-0 h-px bg-(--foreground)/45"
          style={{
            opacity: 0,
            transform: "translateY(0px)",
            willChange: isActive ? "transform, opacity" : undefined,
          }}
        />

        {/* Editorial destination title */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center">
          <p
            ref={titleRef}
            className="font-display text-4xl font-semibold tracking-[-0.02em] text-(--foreground) uppercase sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              opacity: 0,
              transform: "translateY(12px)",
              willChange: isActive ? "transform, opacity" : undefined,
            }}
          >
            {title}
          </p>
        </div>
      </div>

      {/* Screen-reader route announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
    </>
  );
}

