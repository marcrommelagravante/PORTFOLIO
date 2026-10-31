"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type CoverflowProjectItem = {
  slug: string;
  title: string;
  summary: string;
  coverImage?: string;
};

const AUTOPLAY_INTERVAL_MS = 3500;
const SWIPE_THRESHOLD_PX = 40;

export function ProjectCoverflow({
  projects,
}: {
  projects: CoverflowProjectItem[];
}) {
  const count = projects.length;
  const isSingle = count <= 1;

  // Unbounded index so cards always enter/exit from the side of motion
  const [virtualIndex, setVirtualIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);

  const pointerStartX = useRef<number | null>(null);
  const pointerStartY = useRef<number | null>(null);
  const didSwipeRef = useRef(false);

  const stepBy = useCallback(
    (delta: number, isManual: boolean) => {
      if (isSingle) return;
      if (isManual) {
        setInteracted(true);
      }
      setVirtualIndex((prev) => prev + delta);
    },
    [isSingle]
  );

  // Autoplay every 3.5s; resets timer cleanly whenever virtualIndex changes
  useEffect(() => {
    if (isSingle) {
      return;
    }
    const timer = window.setTimeout(() => {
      setVirtualIndex((prev) => prev + 1);
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearTimeout(timer);
  }, [isSingle, virtualIndex]);

  if (count === 0) {
    return null;
  }

  const activeIndex = ((virtualIndex % count) + count) % count;
  const activeProject = projects[activeIndex];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (isSingle) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      stepBy(-1, true);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      stepBy(1, true);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isSingle) return;
    pointerStartX.current = e.clientX;
    pointerStartY.current = e.clientY;
    didSwipeRef.current = false;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isSingle || pointerStartX.current === null || pointerStartY.current === null) {
      return;
    }
    const dx = e.clientX - pointerStartX.current;
    const dy = e.clientY - pointerStartY.current;
    pointerStartX.current = null;
    pointerStartY.current = null;

    if (Math.abs(dx) >= SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy)) {
      didSwipeRef.current = true;
      stepBy(dx < 0 ? 1 : -1, true);
    }
  };

  const slots = isSingle
    ? [virtualIndex]
    : [
        virtualIndex - 3,
        virtualIndex - 2,
        virtualIndex - 1,
        virtualIndex,
        virtualIndex + 1,
        virtualIndex + 2,
        virtualIndex + 3,
      ];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured projects showcase"
      onKeyDown={handleKeyDown}
      className="group/carousel relative mt-10 select-none sm:mt-14"
    >
      {/* Live region announces project changes only after user interaction */}
      <div className="sr-only" aria-live={interacted ? "polite" : "off"} aria-atomic="true">
        {`Showing project ${activeIndex + 1} of ${count}: ${activeProject.title}`}
      </div>

      {/* Coverflow Stage */}
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerStartX.current = null;
          pointerStartY.current = null;
        }}
        className="relative mx-auto w-full overflow-hidden py-4 touch-pan-y [--step-1:22%] [--step-2:38%] sm:[--step-1:50%] sm:[--step-2:84%]"
      >
        {/* Sizing spacer matching the center 16:10 card */}
        <div
          aria-hidden="true"
          className="invisible mx-auto aspect-16/10 w-[80%] sm:w-[50%]"
        />

        {slots.map((slotKey) => {
          const offset = slotKey - virtualIndex;
          const projIndex = ((slotKey % count) + count) % count;
          const project = projects[projIndex];
          const absOffset = Math.abs(offset);

          let transform = "translate3d(-50%, 0, 0) scale(1)";
          let zIndex = 30;
          let opacityClass = "opacity-100";
          let filterClass = "blur-0";

          if (offset === -1) {
            transform = "translate3d(calc(-50% - var(--step-1)), 0, 0) scale(0.78)";
            zIndex = 20;
            opacityClass = "opacity-60 hover:opacity-80";
          } else if (offset === 1) {
            transform = "translate3d(calc(-50% + var(--step-1)), 0, 0) scale(0.78)";
            zIndex = 20;
            opacityClass = "opacity-60 hover:opacity-80";
          } else if (offset === -2) {
            transform = "translate3d(calc(-50% - var(--step-2)), 0, 0) scale(0.62)";
            zIndex = 10;
            opacityClass = "opacity-0 sm:opacity-25";
            filterClass = "blur-[4px]";
          } else if (offset === 2) {
            transform = "translate3d(calc(-50% + var(--step-2)), 0, 0) scale(0.62)";
            zIndex = 10;
            opacityClass = "opacity-0 sm:opacity-25";
            filterClass = "blur-[4px]";
          } else if (offset <= -3) {
            transform = "translate3d(calc(-50% - var(--step-2) * 1.15), 0, 0) scale(0.5)";
            zIndex = 5;
            opacityClass = "opacity-0";
            filterClass = "blur-[6px]";
          } else if (offset >= 3) {
            transform = "translate3d(calc(-50% + var(--step-2) * 1.15), 0, 0) scale(0.5)";
            zIndex = 5;
            opacityClass = "opacity-0";
            filterClass = "blur-[6px]";
          }

          const cardVisual = (
            <div
              className={`relative h-full w-full overflow-hidden rounded-xl border bg-(--surface) transition-shadow duration-500 ${
                offset === 0
                  ? "border-(--border) shadow-2xl"
                  : "border-(--border)/60 shadow-lg"
              }`}
            >
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  priority={offset === 0}
                  draggable={false}
                  sizes="(max-width: 640px) 80vw, 576px"
                  className="object-cover select-none"
                />
              ) : (
                <div className="flex h-full items-center justify-center font-mono text-xs text-(--muted)">
                  [PROJECT PREVIEW]
                </div>
              )}
            </div>
          );

          return (
            <div
              key={slotKey}
              role={absOffset <= 1 ? "group" : undefined}
              aria-roledescription={absOffset <= 1 ? "slide" : undefined}
              aria-label={
                absOffset <= 1 ? `${projIndex + 1} of ${count}: ${project.title}` : undefined
              }
              aria-hidden={absOffset > 1 ? "true" : undefined}
              style={{ transform, zIndex }}
              className={`coverflow-slide absolute top-4 bottom-4 left-1/2 aspect-16/10 w-[80%] transition-all duration-500 ease-out sm:w-[50%] ${opacityClass} ${filterClass} ${
                absOffset > 1 ? "pointer-events-none" : ""
              }`}
            >
              {offset === 0 ? (
                <Link
                  href={`/projects/${project.slug}`}
                  onClick={(e) => {
                    if (didSwipeRef.current) {
                      e.preventDefault();
                      didSwipeRef.current = false;
                    }
                  }}
                  aria-label={`Open ${project.title}`}
                  className="block h-full w-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--foreground)"
                >
                  {cardVisual}
                </Link>
              ) : absOffset === 1 ? (
                <button
                  type="button"
                  onClick={() => stepBy(offset, true)}
                  aria-label={`Preview ${project.title}`}
                  className="block h-full w-full cursor-pointer rounded-xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--foreground)"
                >
                  {cardVisual}
                </button>
              ) : (
                cardVisual
              )}
            </div>
          );
        })}

        {/* Keyboard-focus-only prev/next controls */}
        {!isSingle && (
          <div className="pointer-events-none absolute inset-x-2 top-1/2 z-40 flex -translate-y-1/2 justify-between opacity-0 transition-opacity focus-within:pointer-events-auto focus-within:opacity-100">
            <button
              type="button"
              onClick={() => stepBy(-1, true)}
              aria-label="Previous project"
              className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--border) bg-(--background)/90 text-sm text-(--foreground) shadow-sm backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => stepBy(1, true)}
              aria-label="Next project"
              className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--border) bg-(--background)/90 text-sm text-(--foreground) shadow-sm backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Centered Active Project Details underneath the Coverflow */}
      <div
        key={activeProject.slug}
        className="animate-coverflow-text mx-auto mt-8 max-w-2xl text-center sm:mt-10"
      >
        <h2 className="text-[clamp(1.5rem,2.8vw,2.25rem)] font-semibold tracking-tight text-(--foreground)">
          {activeProject.title}
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-(--muted) sm:text-base">
          {activeProject.summary}
        </p>

        <div className="mt-6">
          <Link
            href={`/projects/${activeProject.slug}`}
            className="group/link inline-flex items-center gap-1.5 border-b border-(--foreground) pb-0.5 text-sm font-medium text-(--foreground) transition-colors hover:border-(--muted) hover:text-(--muted) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--foreground)"
          >
            <span>View Project</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-200 ease-out group-hover/link:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
