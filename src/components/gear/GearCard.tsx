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
  const isHeroCard = item.layoutClass === "toolkit-monitor";

  return (
    <article
      id={`toolkit-${item.id}`}
      style={{ animationDelay: `${(index + 1) * 65}ms` }}
      className={`animate-gallery-enter group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-2xl border border-(--border) bg-(--surface) p-5 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-(--foreground)/35 hover:shadow-md lg:min-h-0 ${
        isHeroCard ? "sm:min-h-72" : "sm:min-h-64"
      } ${className}`}
    >
      {hasImage ? (
        <>
          <Image
            src={item.image}
            alt={item.alt}
            fill
            priority={index < 2}
            sizes={
              isHeroCard
                ? "(max-width: 1024px) 100vw, 540px"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
            }
            style={{
              objectPosition: item.objectPosition ?? "center",
            }}
            onError={() => setImageFailed(true)}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          {/* Contrast overlay strictly inside the product card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/84 via-black/34 to-black/20 transition-opacity duration-300 group-hover:from-black/88"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className=" pointer-events-none absolute inset-0 flex items-center justify-center bg-(--surface) p-6 text-center"
        >
          <span className="font-mono text-xs tracking-wider text-(--muted) uppercase">
            [{item.category} photo placeholder]
          </span>
        </div>
      )}

      {/* Top row: Category label */}
      <div className="relative z-10 flex w-full items-start justify-between">
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] font-medium tracking-wide ${
            hasImage
              ? "border-white/20 bg-black/45 text-white backdrop-blur-xs"
              : "border-(--border) bg-(--background)/85 text-(--foreground)"
          }`}
        >
          {item.category}
        </span>
      </div>

      {/* Bottom row: Model name, optional short specs, and concise usage description */}
      <div className="relative z-10 mt-auto pt-14">
        <ItemHeading
          className={`text-lg font-semibold tracking-tight sm:text-xl ${
            hasImage ? "text-white drop-shadow-xs" : "text-(--foreground)"
          }`}
        >
          {item.name}
        </ItemHeading>

        {item.specs && (
          <p
            className={`mt-1 font-mono text-[11px] tracking-wide ${
              hasImage ? "text-white/75" : "text-(--muted)"
            }`}
          >
            {item.specs}
          </p>
        )}

        <p
          className={`mt-1.5 text-sm leading-relaxed ${
            hasImage ? "text-white/88" : "text-(--muted)"
          }`}
        >
          {item.description}
        </p>
      </div>
    </article>
  );
}
