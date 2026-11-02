"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import {
  interestGallery,
  interestPageHeader,
  interestStack,
} from "@/content/interests";

const DRAG_THRESHOLD_PX = 80;

export function InterestsSection({
  headingLevel = "h2",
  isStandalone = false,
}: {
  headingLevel?: "h1" | "h2";
  isStandalone?: boolean;
}) {
  const HeadingTag = headingLevel;
  const count = interestGallery.length;
  const isSingle = count <= 1;

  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const pointerStartX = useRef<number | null>(null);
  const activePointerId = useRef<number | null>(null);

  const stepBy = useCallback(
    (delta: number) => {
      if (isSingle) return;
      setInteracted(true);
      setActive((prev) => (((prev + delta) % count) + count) % count);
    },
    [count, isSingle]
  );

  if (count === 0) {
    return null;
  }

  const activeItem = interestGallery[active];
  const maxBackCards = Math.min(interestStack.visible, Math.max(count - 1, 0));
  const topStackSpace = maxBackCards * interestStack.peek;

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
    pointerStartX.current = event.clientX;
    activePointerId.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    setDragX(0);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerStartX.current === null) return;
    setDragX(event.clientX - pointerStartX.current);
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerStartX.current === null) return;
    const dx = event.clientX - pointerStartX.current;
    if (
      activePointerId.current !== null &&
      event.currentTarget.hasPointerCapture(activePointerId.current)
    ) {
      event.currentTarget.releasePointerCapture(activePointerId.current);
    }
    pointerStartX.current = null;
    activePointerId.current = null;
    setIsDragging(false);
    setDragX(0);

    if (Math.abs(dx) >= DRAG_THRESHOLD_PX) {
      stepBy(dx < 0 ? 1 : -1);
    }
  };

  const cancelDrag = () => {
    pointerStartX.current = null;
    activePointerId.current = null;
    setIsDragging(false);
    setDragX(0);
  };

  const markImageFailed = (id: string) => {
    setFailedImages((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  };

  return (
    <section
      id="outside-the-ide"
      aria-labelledby="outside-the-ide-heading"
      onKeyDown={handleKeyDown}
      className={`py-8 sm:py-10 ${
        isStandalone ? "" : "border-b border-(--border)"
      }`}
    >
      <header className="animate-gallery-enter max-w-2xl">
        <p className="font-mono text-xs font-medium tracking-wider text-(--muted) uppercase">
          {interestPageHeader.eyebrow}
        </p>
        <HeadingTag
          id="outside-the-ide-heading"
          className="mt-2.5 text-3xl font-semibold tracking-tight text-(--foreground) sm:text-4xl"
        >
          {interestPageHeader.heading}
        </HeadingTag>
        <p className="mt-3 text-base leading-relaxed text-(--muted)">
          {interestPageHeader.introduction}
        </p>
      </header>

      <div
        className="sr-only"
        aria-live={interacted ? "polite" : "off"}
        aria-atomic="true"
      >
        {`Showing interest ${active + 1} of ${count}: ${activeItem.title} — ${activeItem.caption}`}
      </div>

      {/* Stack Stage */}
      <div
        aria-roledescription="carousel"
        aria-label="Personal interests photo stack"
        className="animate-gallery-enter mt-8 select-none sm:mt-10"
      >
        <div
          style={{ paddingTop: `${topStackSpace}px` }}
          className="mx-auto w-[70%] max-w-80 sm:w-80"
        >
          <div
            style={{ perspective: "800px" }}
            className="relative aspect-3/4 w-full"
          >
            {interestGallery.map((item, index) => {
              const pos = (((index - active) % count) + count) % count;
              const isFront = pos === 0;
              const isVisible = pos <= interestStack.visible;
              const hasImage =
                Boolean(item.image?.trim()) && !failedImages[item.id];

              const yOffset = -pos * interestStack.peek;
              const zOffset = -pos * interestStack.depth;
              const transform =
                isFront && isDragging
                  ? `translate3d(${dragX}px, 0px, 0px) rotate(${dragX * 0.04}deg)`
                  : `translate3d(0px, ${yOffset}px, ${zOffset}px) rotate(0deg)`;

              return (
                <div
                  key={item.id}
                  role={isFront ? "group" : undefined}
                  aria-roledescription={isFront ? "slide" : undefined}
                  aria-label={
                    isFront
                      ? `${active + 1} of ${count}: ${item.title} — ${item.caption}`
                      : undefined
                  }
                  aria-hidden={!isFront ? "true" : undefined}
                  tabIndex={isFront ? 0 : -1}
                  onPointerDown={isFront ? handlePointerDown : undefined}
                  onPointerMove={isFront ? handlePointerMove : undefined}
                  onPointerUp={isFront ? finishDrag : undefined}
                  onPointerCancel={isFront ? cancelDrag : undefined}
                  style={{
                    transform,
                    zIndex: count - pos,
                    filter: isFront
                      ? "none"
                      : `brightness(${Math.max(1 - pos * 0.06, 0.76)})`,
                  }}
                  className={`interest-stack-card absolute inset-0 overflow-hidden rounded-2xl border border-(--border) bg-(--surface) shadow-xl ${
                    isFront && isDragging
                      ? "cursor-grabbing transition-none"
                      : "transition-[transform,opacity,filter] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  } ${
                    isFront
                      ? "cursor-grab touch-pan-y focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--foreground)"
                      : "pointer-events-none"
                  } ${isVisible ? "opacity-100" : "opacity-0"}`}
                >
                  {hasImage ? (
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      priority={index < 2}
                      draggable={false}
                      sizes="(max-width: 640px) 70vw, 320px"
                      style={{
                        objectPosition: item.objectPosition ?? "center",
                      }}
                      onError={() => markImageFailed(item.id)}
                      className="object-cover select-none"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-(--surface) p-6 text-center">
                      <span className="font-mono text-xs tracking-wider text-(--muted) uppercase">
                        [{item.title} photo placeholder]
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Card Details & Controls Below */}
        <div className="mx-auto mt-7 max-w-md text-center">
          <div key={activeItem.id} className="animate-coverflow-text">
            <h2 className="text-xl font-semibold tracking-tight text-(--foreground) sm:text-2xl">
              {activeItem.title}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-(--muted) sm:text-base">
              {activeItem.caption}
            </p>
          </div>

          {!isSingle && (
            <div className="mt-5 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => stepBy(-1)}
                aria-label="Previous interest"
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
                aria-label="Next interest"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-(--border) bg-(--background)/90 text-sm text-(--foreground) shadow-xs transition-colors hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
