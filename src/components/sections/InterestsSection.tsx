"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  interestGallery,
  interestPageHeader,
  type InterestGalleryItem,
} from "@/content/interests";

const GRID_SPAN_BY_CLASS: Record<string, string> = {
  "gallery-gaming": "lg:col-start-1 lg:row-start-1",
  "gallery-gym": "lg:col-start-2 lg:row-start-1",
  "gallery-volleyball": "lg:col-start-3 lg:row-start-1 lg:row-span-2",
  "gallery-other": "lg:col-start-1 lg:col-span-2 lg:row-start-2",
};

function getGridPlacementClass(item: InterestGalleryItem): string {
  if (item.className && GRID_SPAN_BY_CLASS[item.className]) {
    return GRID_SPAN_BY_CLASS[item.className];
  }
  return "";
}

export function InterestsSection({
  headingLevel = "h2",
  isStandalone = false,
}: {
  headingLevel?: "h1" | "h2";
  isStandalone?: boolean;
}) {
  const HeadingTag = headingLevel;
  const count = interestGallery.length;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const cardButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveIndexRef = useRef<number | null>(null);

  const closeLightbox = useCallback(() => {
    const returnIndex = lastActiveIndexRef.current;
    setActiveIndex(null);
    if (returnIndex !== null) {
      window.requestAnimationFrame(() => {
        cardButtonRefs.current[returnIndex]?.focus();
      });
    }
  }, []);

  const stepBy = useCallback(
    (delta: number) => {
      if (count <= 1) return;
      setActiveIndex((prev) => {
        if (prev === null) return null;
        const next = (((prev + delta) % count) + count) % count;
        lastActiveIndexRef.current = next;
        return next;
      });
    },
    [count]
  );

  const openLightbox = (index: number) => {
    lastActiveIndexRef.current = index;
    setActiveIndex(index);
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        stepBy(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        stepBy(1);
      } else if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, closeLightbox, stepBy]);

  const markImageFailed = (id: string) => {
    setFailedImages((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  };

  const activeItem =
    activeIndex !== null ? interestGallery[activeIndex] ?? null : null;

  return (
    <section
      id="outside-the-ide"
      aria-labelledby="outside-the-ide-heading"
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
        aria-label="Personal interests photo gallery"
        className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-[1fr_1fr_0.95fr] lg:grid-rows-[250px_260px]"
      >
        {interestGallery.map((item, index) => {
          const placementClass = getGridPlacementClass(item);
          const hasImage = Boolean(item.image?.trim()) && !failedImages[item.id];
          const isTallCard = item.className === "gallery-volleyball";

          return (
            <article
              key={item.id}
              id={`interest-${item.id}`}
              style={{ animationDelay: `${(index + 1) * 65}ms` }}
              className={`animate-gallery-enter relative min-h-60 sm:min-h-64 lg:min-h-0 ${placementClass}`}
            >
              <button
                ref={(el) => {
                  cardButtonRefs.current[index] = el;
                }}
                type="button"
                onClick={() => openLightbox(index)}
                aria-label={`${item.title} — ${item.caption}. Open image preview`}
                className="group relative flex h-full w-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-(--border) bg-(--surface) p-5 text-left transition-[border-color,box-shadow] duration-200 hover:border-(--foreground)/35 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--foreground)"
              >
                {hasImage ? (
                  <>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      priority={index < 2}
                      sizes={
                        isTallCard
                          ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                          : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
                      }
                      style={{
                        objectPosition: item.objectPosition ?? "center",
                      }}
                      onError={() => markImageFailed(item.id)}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
                    />
                    {/* Contrast overlay strictly inside the photograph card */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/72 via-black/18 to-black/28 transition-opacity duration-300 group-hover:from-black/78"
                    />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-(--surface) p-6 text-center">
                    <span className="font-mono text-xs tracking-wider text-(--muted) uppercase">
                      [{item.title} photo placeholder]
                    </span>
                  </div>
                )}

                {/* Top row: Category label (left) and arrow affordance (right) */}
                <div className="relative z-10 flex w-full items-start justify-between gap-3">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] font-medium tracking-wide ${
                      hasImage
                        ? "border-white/20 bg-black/45 text-white backdrop-blur-xs"
                        : "border-(--border) bg-(--background)/85 text-(--foreground)"
                    }`}
                  >
                    {item.title}
                  </span>

                  <span
                    aria-hidden="true"
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 ${
                      hasImage
                        ? "border-white/20 bg-black/45 text-white backdrop-blur-xs"
                        : "border-(--border) bg-(--background)/85 text-(--foreground)"
                    }`}
                  >
                    ↗
                  </span>
                </div>

                {/* Bottom row: Short caption */}
                <div className="relative z-10 mt-auto pt-12">
                  <p
                    className={`text-base font-medium tracking-tight sm:text-lg ${
                      hasImage
                        ? "text-white drop-shadow-xs"
                        : "text-(--foreground)"
                    }`}
                  >
                    {item.caption}
                  </p>
                </div>
              </button>
            </article>
          );
        })}
      </div>

      {/* Accessible Lightbox Modal */}
      {activeItem && activeIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="interest-lightbox-title"
          aria-describedby="interest-lightbox-caption"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs sm:p-6"
        >
          <div className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-(--border) bg-(--background) shadow-2xl">
            <div className="flex items-center justify-between border-b border-(--border) px-5 py-3.5">
              <div className="flex items-center gap-3">
                <h2
                  id="interest-lightbox-title"
                  className="font-mono text-xs font-semibold tracking-wider text-(--foreground) uppercase"
                >
                  {activeItem.title}
                </h2>
                <span className="font-mono text-xs text-(--muted)">
                  {activeIndex + 1} / {count}
                </span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeLightbox}
                aria-label="Close preview"
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-(--border) bg-(--surface)/60 text-sm text-(--foreground) transition-colors hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-16/10 w-full bg-(--surface)">
              {Boolean(activeItem.image?.trim()) &&
              !failedImages[activeItem.id] ? (
                <Image
                  src={activeItem.image}
                  alt={activeItem.alt}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  style={{
                    objectPosition: activeItem.objectPosition ?? "center",
                  }}
                  onError={() => markImageFailed(activeItem.id)}
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center p-6 text-center">
                  <span className="font-mono text-xs tracking-wider text-(--muted) uppercase">
                    [{activeItem.title} photo placeholder]
                  </span>
                </div>
              )}

              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => stepBy(-1)}
                    aria-label="Previous interest photo"
                    className="absolute top-1/2 left-3 z-10 inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-(--border) bg-(--background)/90 text-sm text-(--foreground) shadow-sm transition-colors hover:bg-(--background) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => stepBy(1)}
                    aria-label="Next interest photo"
                    className="absolute top-1/2 right-3 z-10 inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-(--border) bg-(--background)/90 text-sm text-(--foreground) shadow-sm transition-colors hover:bg-(--background) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
                  >
                    →
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-(--border) px-5 py-4">
              <p
                id="interest-lightbox-caption"
                className="text-sm font-medium text-(--foreground) sm:text-base"
              >
                {activeItem.caption}
              </p>
              <span className="shrink-0 font-mono text-xs text-(--muted)">
                Use ← → or Esc
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
