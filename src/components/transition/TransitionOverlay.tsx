"use client";

import React from "react";
import type { TransitionState } from "./TransitionProvider";

type TransitionOverlayProps = {
  state: TransitionState;
  title: string;
  announcement: string;
  isFullViewport?: boolean;
  overlayRef: React.RefObject<HTMLDivElement | null>;
  veilRef: React.RefObject<HTMLDivElement | null>;
  lineRef: React.RefObject<HTMLDivElement | null>;
  titleRef: React.RefObject<HTMLParagraphElement | null>;
  loaderTrackRef: React.RefObject<HTMLDivElement | null>;
  loaderBarRef: React.RefObject<HTMLDivElement | null>;
};

export function TransitionOverlay({
  state,
  title,
  announcement,
  isFullViewport = false,
  overlayRef,
  veilRef,
  lineRef,
  titleRef,
  loaderTrackRef,
  loaderBarRef,
}: TransitionOverlayProps) {
  const isActive = state !== "idle";

  return (
    <>
      <div
        ref={overlayRef}
        aria-hidden="true"
        data-transition-overlay=""
        data-transition-state={state}
        className={`fixed right-0 bottom-0 left-0 overflow-hidden select-none ${
          isFullViewport
            ? "top-0 z-50"
            : "transition-overlay-offset top-16 z-35 lg:top-0"
        } ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Solid canvas veil */}
        <div
          ref={veilRef}
          data-transition-veil=""
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

        {/* Editorial destination title + initial/refresh loading line */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p
            ref={titleRef}
            className={`font-display text-(--foreground) uppercase ${
              isFullViewport
                ? "text-6xl font-normal tracking-[0.06em] sm:text-7xl md:text-8xl lg:text-9xl"
                : "text-4xl font-semibold tracking-[-0.02em] sm:text-5xl md:text-6xl lg:text-7xl"
            }`}
            style={{
              opacity: 0,
              transform: "translateY(12px)",
              willChange: isActive ? "transform, opacity" : undefined,
            }}
          >
            {title}
          </p>

          <div
            ref={loaderTrackRef}
            data-loader-track=""
            className={`relative mt-7 h-0.5 w-52 overflow-hidden bg-(--foreground)/15 sm:mt-8 sm:w-64 md:w-72 lg:w-80 ${
              isFullViewport ? "block" : "hidden"
            }`}
            style={{
              opacity: 0,
              willChange: isActive ? "opacity" : undefined,
            }}
          >
            <div
              ref={loaderBarRef}
              className="absolute inset-0 origin-left bg-(--foreground)/75"
              style={{
                transform: "scaleX(0)",
                willChange: isActive ? "transform" : undefined,
              }}
            />
          </div>
        </div>
      </div>

      {/* Screen-reader route announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
    </>
  );
}

