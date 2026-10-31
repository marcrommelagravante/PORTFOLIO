"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const AUTOPLAY_INTERVAL_MS = 3500;
const SWIPE_THRESHOLD_PX = 40;

export function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const count = images.length;
  const isSingle = count <= 1;

  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const pointerStartY = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isSingle) return;
      setActiveIndex(((index % count) + count) % count);
    },
    [count, isSingle]
  );

  const stepBy = useCallback(
    (delta: number) => {
      if (isSingle) return;
      setActiveIndex((prev) => (((prev + delta) % count) + count) % count);
    },
    [count, isSingle]
  );

  // Autoplay every 3.5s; resets timer whenever activeIndex changes
  useEffect(() => {
    if (isSingle) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, count, isSingle]);

  if (count === 0) {
    return null;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (isSingle) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      stepBy(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      stepBy(1);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isSingle) return;
    pointerStartX.current = e.clientX;
    pointerStartY.current = e.clientY;
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
      stepBy(dx < 0 ? 1 : -1);
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={`${title} image gallery`}
      onKeyDown={handleKeyDown}
      className="mt-8 select-none"
    >
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerStartX.current = null;
          pointerStartY.current = null;
        }}
        className="group relative aspect-16/10 w-full overflow-hidden rounded-lg border border-(--border) bg-(--surface) touch-pan-y"
      >
        {/* Horizontal sliding track */}
        <div
          style={{
            transform: `translate3d(-${activeIndex * 100}%, 0, 0)`,
          }}
          className="coverflow-slide flex h-full w-full transition-transform duration-500 ease-out"
        >
          {images.map((src, index) => (
            <div
              key={`${src}-${index}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`Image ${index + 1} of ${count}`}
              aria-hidden={index !== activeIndex}
              className="relative h-full w-full shrink-0"
            >
              <Image
                src={src}
                alt={`${title} screenshot ${index + 1}`}
                fill
                priority={index === 0}
                draggable={false}
                sizes="(max-width: 1200px) 100vw, 1152px"
                className="object-cover select-none"
              />
            </div>
          ))}
        </div>

        {/* Prev / Next arrow controls */}
        {!isSingle && (
          <>
            <button
              type="button"
              onClick={() => stepBy(-1)}
              aria-label="Previous image"
              className="absolute top-1/2 left-3 z-10 inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-(--border) bg-(--background)/85 text-sm text-(--foreground) shadow-sm backdrop-blur-sm transition-opacity hover:bg-(--background) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => stepBy(1)}
              aria-label="Next image"
              className="absolute top-1/2 right-3 z-10 inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-(--border) bg-(--background)/85 text-sm text-(--foreground) shadow-sm backdrop-blur-sm transition-opacity hover:bg-(--background) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
            >
              →
            </button>
          </>
        )}

        {/* Bottom dot indicators */}
        {!isSingle && (
          <div className="absolute bottom-3.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-(--border)/80 bg-(--background)/80 px-3 py-1.5 backdrop-blur-sm">
            {images.map((_, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to image ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`h-2 cursor-pointer rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground) ${
                    isActive
                      ? "w-5 bg-(--foreground)"
                      : "w-2 bg-(--muted)/50 hover:bg-(--muted)"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
