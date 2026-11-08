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
const DESKTOP_ITEM_HEIGHT = 420;
const DESKTOP_STEP_SIZE = 280;

const MOBILE_ITEM_WIDTH = 300;
const MOBILE_ITEM_HEIGHT = 300;
const MOBILE_STEP_SIZE = 190;

const AUTOPLAY_INTERVAL = 4000;

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
  onSelect,
}: {
  item: InterestGalleryItem;
  index: number;
  count: number;
  stepSize: number;
  trackX: MotionValue<number>;
  isActive: boolean;
  onSelect: () => void;
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
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      title="Click to shuffle"
      style={{
        x: offset,
        zIndex,
      }}
      className="coverflow-li cursor-pointer"
    >
      <motion.img
        draggable={false}
        src={item.image}
        alt={item.alt || `Photo ${index + 1}`}
        className={`coverflow-item cursor-pointer${item.isPlaceholder ? " coverflow-placeholder" : ""}`}
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
  const [isHovered, setIsHovered] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const stepRef = useRef(0);
  const trackX = useMotionValue(0);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

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
      setResetKey((k) => k + 1);
      animateToStep(stepRef.current + delta);
    },
    [animateToStep, isSingle]
  );

  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (
      isSingle ||
      isHovered ||
      !isTabVisible ||
      prefersReducedMotion
    ) {
      return;
    }

    const timer = setInterval(() => {
      animateToStep(stepRef.current + 1);
    }, AUTOPLAY_INTERVAL);

    return () => {
      clearInterval(timer);
    };
  }, [
    isSingle,
    isHovered,
    isTabVisible,
    prefersReducedMotion,
    resetKey,
    animateToStep,
  ]);

  if (count === 0) {
    return null;
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (isSingle) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepBy(-1);
    } else if (
      event.key === "ArrowRight" ||
      event.key === " " ||
      event.key === "Enter"
    ) {
      event.preventDefault();
      stepBy(1);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (isSingle || event.touches.length !== 1) return;
    touchStartRef.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current || event.changedTouches.length !== 1) {
      touchStartRef.current = null;
      return;
    }
    const dx = event.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = event.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) {
        stepBy(1);
      } else {
        stepBy(-1);
      }
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
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setIsHovered(true);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") setIsHovered(false);
        }}
        className="animate-gallery-enter mt-8 select-none focus-visible:outline-none sm:mt-10"
      >
        <div
          onClick={() => stepBy(1)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="coverflow-mask cursor-pointer"
        >
          <ul className="coverflow-carousel cursor-pointer">
            {interestGallery.map((item, index) => (
              <CoverflowItem
                key={item.id}
                item={item}
                index={index}
                count={count}
                stepSize={stepSize}
                trackX={trackX}
                isActive={index === active}
                onSelect={() => stepBy(1)}
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

            <button
              type="button"
              onClick={() => stepBy(1)}
              aria-label="Shuffle to next photo"
              className="text-xs text-(--muted) transition-colors hover:text-(--foreground) cursor-pointer select-none focus-visible:outline-none focus-visible:underline"
            >
              Click to shuffle
            </button>
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
          cursor: pointer;
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
          cursor: pointer;
        }

        .coverflow-li {
          position: absolute;
          top: 0;
          left: 0;
          width: ${DESKTOP_ITEM_WIDTH}px;
          height: ${DESKTOP_ITEM_HEIGHT}px;
          display: flex;
          align-items: center;
          justify-content: center;
          list-style: none;
          cursor: pointer;
        }

        .coverflow-item {
          width: auto;
          height: auto;
          max-width: ${DESKTOP_ITEM_WIDTH}px;
          max-height: ${DESKTOP_ITEM_HEIGHT}px;
          object-fit: contain;
          border-radius: 14px;
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.28);
          will-change: transform, opacity;
          display: block;
          user-select: none;
          cursor: pointer;
        }

        .coverflow-placeholder {
          width: ${DESKTOP_ITEM_WIDTH}px;
          height: 340px;
          object-fit: cover;
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
            max-width: ${MOBILE_ITEM_WIDTH}px;
            max-height: ${MOBILE_ITEM_HEIGHT}px;
            border-radius: 10px;
          }
          .coverflow-placeholder {
            width: ${MOBILE_ITEM_WIDTH}px;
            height: 215px;
          }
        }
      `}
    </style>
  );
}
