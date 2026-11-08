"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  interestGallery,
  interestPageHeader,
  type InterestGalleryItem,
} from "@/content/interests";

const DESKTOP_ITEM_WIDTH = 480;
const DESKTOP_ITEM_HEIGHT = 340;
const DESKTOP_STEP_SIZE = 280;

const MOBILE_ITEM_WIDTH = 300;
const MOBILE_ITEM_HEIGHT = 215;
const MOBILE_STEP_SIZE = 190;

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function wrapOffset(raw: number, totalWidth: number): number {
  if (totalWidth <= 0) return 0;
  const half = totalWidth / 2;
  return ((((raw + half) % totalWidth) + totalWidth) % totalWidth) - half;
}

function CoverflowItem({
  item,
  index,
  count,
  stepSize,
  trackX,
  isActive,
  onSelectOffset,
}: {
  item: InterestGalleryItem;
  index: number;
  count: number;
  stepSize: number;
  trackX: MotionValue<number>;
  isActive: boolean;
  onSelectOffset: (offsetPx: number) => void;
}) {
  const totalWidth = count * stepSize;

  const offset = useTransform(trackX, (currentTrackX) =>
    wrapOffset(index * stepSize + currentTrackX, totalWidth)
  );

  const rotateY = useTransform(offset, [-280, 0, 280], [22, 0, -22]);
  const scale = useTransform(offset, [-280, 0, 280], [0.72, 1, 0.72]);
  const x = useTransform(
    offset,
    [-900, -280, 280, 900],
    ["60%", "0%", "0%", "-60%"]
  );
  const zIndex = useTransform(offset, (value) =>
    Math.max(0, Math.round(1000 - Math.abs(value)))
  );

  return (
    <motion.li
      role={isActive ? "group" : undefined}
      aria-roledescription={isActive ? "slide" : undefined}
      aria-label={isActive ? `Photo ${index + 1} of ${count}` : undefined}
      aria-hidden={!isActive ? "true" : undefined}
      onClick={() => onSelectOffset(offset.get())}
      style={{
        x: offset,
        zIndex,
      }}
      className="coverflow-li"
    >
      <motion.img
        draggable={false}
        src={item.image}
        alt={item.alt || `Photo ${index + 1}`}
        className="coverflow-item"
        style={{
          transformPerspective: 600,
          x,
          rotateY,
          scale,
          objectPosition: item.objectPosition ?? "center",
        }}
      />
    </motion.li>
  );
}

export function InterestsSection({
  headingLevel = "h2",
  isStandalone = false,
  className = "",
}: {
  headingLevel?: "h1" | "h2";
  isStandalone?: boolean;
  className?: string;
}) {
  const HeadingTag = headingLevel;
  const count = interestGallery.length;
  const isSingle = count <= 1;

  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [stepSize, setStepSize] = useState(DESKTOP_STEP_SIZE);
  const [isDragging, setIsDragging] = useState(false);

  const stepRef = useRef(0);
  const trackX = useMotionValue(0);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);

  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startTrackX: number;
    lastX: number;
    lastTime: number;
    velocityX: number;
    didDrag: boolean;
  } | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 640px)");
    const updateSize = () => {
      const nextStep = mql.matches ? MOBILE_STEP_SIZE : DESKTOP_STEP_SIZE;
      setStepSize(nextStep);
      animationRef.current?.stop();
      trackX.set(-stepRef.current * nextStep);
    };
    updateSize();
    mql.addEventListener("change", updateSize);
    return () => mql.removeEventListener("change", updateSize);
  }, [trackX]);

  const animateToStep = useCallback(
    (nextStep: number) => {
      stepRef.current = nextStep;
      setActive(mod(nextStep, count));
      animationRef.current?.stop();
      animationRef.current = animate(trackX, -nextStep * stepSize, {
        type: "spring",
        stiffness: 260,
        damping: 32,
        mass: 0.9,
      });
    },
    [count, stepSize, trackX]
  );

  const stepBy = useCallback(
    (delta: number) => {
      if (isSingle || delta === 0) return;
      setInteracted(true);
      animateToStep(stepRef.current + delta);
    },
    [animateToStep, isSingle]
  );

  if (count === 0) {
    return null;
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (isSingle) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepBy(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      stepBy(1);
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isSingle || event.button !== 0) return;
    animationRef.current?.stop();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startTrackX: trackX.get(),
      lastX: event.clientX,
      lastTime: performance.now(),
      velocityX: 0,
      didDrag: false,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = dragStateRef.current;
    if (!state || state.pointerId !== event.pointerId) return;

    const dx = event.clientX - state.startX;
    if (Math.abs(dx) > 4) {
      state.didDrag = true;
    }

    const now = performance.now();
    const dt = now - state.lastTime;
    if (dt > 0) {
      state.velocityX = ((event.clientX - state.lastX) / dt) * 1000;
      state.lastX = event.clientX;
      state.lastTime = now;
    }

    const nextTrack = state.startTrackX + dx;
    trackX.set(nextTrack);

    const nearestStep = Math.round(-nextTrack / stepSize);
    setActive(mod(nearestStep, count));
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = dragStateRef.current;
    if (!state || state.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current = null;
    setIsDragging(false);

    if (state.didDrag) {
      setInteracted(true);
      const projected = trackX.get() + state.velocityX * 0.12;
      const nearestStep = Math.round(-projected / stepSize);
      animateToStep(nearestStep);
    }
  };

  const cancelDrag = () => {
    if (!dragStateRef.current) return;
    dragStateRef.current = null;
    setIsDragging(false);
    const nearestStep = Math.round(-trackX.get() / stepSize);
    animateToStep(nearestStep);
  };

  const handleSelectOffset = (offsetPx: number) => {
    if (dragStateRef.current?.didDrag) return;
    const deltaSteps = Math.round(offsetPx / stepSize);
    if (deltaSteps !== 0) {
      stepBy(deltaSteps);
    }
  };

  return (
    <section
      id="outside-the-ide"
      aria-labelledby="outside-the-ide-heading"
      onKeyDown={handleKeyDown}
      className={`pb-8 sm:pb-10 ${isStandalone ? "pt-0" : "pt-8 sm:pt-10"} ${className}`}
    >
      <header className="animate-gallery-enter max-w-2xl">
        <HeadingTag
          id="outside-the-ide-heading"
          className="font-display text-3xl leading-[1.08] font-semibold tracking-[-0.02em] text-(--foreground) sm:text-[40px]"
        >
          {interestPageHeader.heading}
        </HeadingTag>
      </header>

      <div
        className="sr-only"
        aria-live={interacted ? "polite" : "off"}
        aria-atomic="true"
      >
        {`Showing photo ${active + 1} of ${count}`}
      </div>

      {/* Coverflow Stage */}
      <div
        aria-roledescription="carousel"
        aria-label="Personal interests photo coverflow"
        tabIndex={0}
        className="animate-gallery-enter mt-8 select-none focus-visible:outline-none sm:mt-10"
      >
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={cancelDrag}
          className={`coverflow-mask ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          <ul className="coverflow-carousel">
            {interestGallery.map((item, index) => (
              <CoverflowItem
                key={item.id}
                item={item}
                index={index}
                count={count}
                stepSize={stepSize}
                trackX={trackX}
                isActive={index === active}
                onSelectOffset={handleSelectOffset}
              />
            ))}
          </ul>
        </div>

        {/* Controls & Interaction Hint Below */}
        {!isSingle && (
          <div className="mt-6 flex flex-col items-center justify-center gap-2.5">
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => stepBy(-1)}
                aria-label="Previous photo"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-(--border) bg-(--background)/90 text-sm text-(--foreground) shadow-xs transition-colors hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
              >
                ←
              </button>
              <span className="font-mono text-xs text-(--muted) tabular-nums">
                {active + 1} / {count}
              </span>
              <button
                type="button"
                onClick={() => stepBy(1)}
                aria-label="Next photo"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-(--border) bg-(--background)/90 text-sm text-(--foreground) shadow-xs transition-colors hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
              >
                →
              </button>
            </div>

            <p className="text-xs text-(--muted) select-none">
              Drag or swipe to explore
            </p>
          </div>
        )}
      </div>

      <Stylesheet />
    </section>
  );
}

/**
 * ==============   Styles   ================
 */
function Stylesheet() {
  return (
    <style>
      {`
        .coverflow-mask {
          mask-image: linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          overflow: hidden;
          padding: 28px 0;
          touch-action: pan-y;
        }

        .coverflow-carousel {
          position: relative;
          width: ${DESKTOP_ITEM_WIDTH}px;
          height: ${DESKTOP_ITEM_HEIGHT}px;
          display: flex;
          align-items: center;
          justify-content: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .coverflow-li {
          position: absolute;
          top: 0;
          left: 0;
          width: ${DESKTOP_ITEM_WIDTH}px;
          height: ${DESKTOP_ITEM_HEIGHT}px;
          list-style: none;
        }

        .coverflow-item {
          width: ${DESKTOP_ITEM_WIDTH}px;
          height: ${DESKTOP_ITEM_HEIGHT}px;
          object-fit: cover;
          border-radius: 14px;
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.28);
          will-change: transform, opacity;
          display: block;
          user-select: none;
        }

        @media (max-width: 640px) {
          .coverflow-carousel {
            width: ${MOBILE_ITEM_WIDTH}px;
            height: ${MOBILE_ITEM_HEIGHT}px;
          }
          .coverflow-li {
            width: ${MOBILE_ITEM_WIDTH}px;
            height: ${MOBILE_ITEM_HEIGHT}px;
          }
          .coverflow-item {
            width: ${MOBILE_ITEM_WIDTH}px;
            height: ${MOBILE_ITEM_HEIGHT}px;
            border-radius: 10px;
          }
        }
      `}
    </style>
  );
}
