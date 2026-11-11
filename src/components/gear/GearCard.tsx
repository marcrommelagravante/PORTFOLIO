"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { ToolkitItem } from "@/content/gear";

export function GearCard({
  item,
  index = 0,
  headingLevel = "h2",
  className = "",
}: {
  item: ToolkitItem;
  index?: number;
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const ItemHeading = headingLevel;
  const hasImage = Boolean(item.image?.trim()) && !imageFailed;

  return (
    <article
      id={`toolkit-${item.id}`}
      style={{ animationDelay: `${(index + 1) * 60}ms` }}
      className={`animate-gallery-enter group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-(--border) bg-(--surface)/70 p-5 sm:p-6 shadow-xs transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-(--foreground)/30 hover:shadow-md ${className}`}
    >
      {/* Top row: Category badge */}
      <div className="relative z-10 flex w-full items-start justify-start">
        <span className="inline-flex items-center rounded-full bg-[#4e5257] px-3.5 py-1 font-sans text-[11px] font-medium tracking-wide text-white shadow-xs dark:bg-[#34373b]">
          {item.category}
        </span>
      </div>

      {/* Center product photography */}
      <div className="relative my-3 flex h-52 w-full items-center justify-center sm:my-4 sm:h-60">
        {hasImage ? (
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
            priority={index < 3}
            onError={() => setImageFailed(true)}
            className="object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center rounded-xl bg-(--surface) p-4 text-center"
          >
            <span className="font-mono text-xs tracking-wider text-(--muted) uppercase">
              [{item.category} photo]
            </span>
          </div>
        )}
      </div>

      {/* Bottom row: Centered product name and specifications */}
      <div className="relative z-10 mt-auto pt-2 text-center">
        <ItemHeading className="font-display text-xl font-normal tracking-tight text-(--foreground) sm:text-2xl">
          {item.name}
        </ItemHeading>

        {item.specs ? (
          <p className="mt-1.5 font-sans text-xs tracking-wide text-(--muted) sm:text-[13px]">
            {item.specs}
          </p>
        ) : (
          // Reserve clean spacing to maintain consistent visual alignment
          <div aria-hidden="true" className="h-5.25" />
        )}
      </div>
    </article>
  );
}
