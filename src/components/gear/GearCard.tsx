import React from "react";
import Image from "next/image";
import type { GearItem } from "@/content/gear";
import { isValidExternalUrl } from "@/lib/validation";

export function GearCard({ item }: { item: GearItem }) {
  const hasUrl = isValidExternalUrl(item.productUrl);

  return (
    <article className="flex flex-col justify-between rounded-lg border border-(--border) bg-(--surface)/40 p-5">
      <div>
        <div className="mb-4 flex items-center justify-between gap-2">
          <span className="font-mono text-xs text-(--muted)">
            {item.category}
          </span>
          {item.isPlaceholder && (
            <span className="rounded border border-(--border) px-2 py-0.5 font-mono text-[11px] text-(--muted)">
              Placeholder
            </span>
          )}
        </div>

        {item.image ? (
          <div className="relative mb-4 aspect-16/10 w-full overflow-hidden rounded border border-(--border) bg-(--surface)">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="mb-4 flex aspect-video items-center justify-center rounded border border-dashed border-(--border) bg-(--surface)/60 font-mono text-xs text-(--muted)">
            [GEAR PHOTO PLACEHOLDER]
          </div>
        )}

        <h3 className="text-lg font-semibold tracking-tight text-(--foreground)">
          {item.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-(--muted)">
          {item.usage}
        </p>
      </div>

      {hasUrl && (
        <div className="mt-4 border-t border-(--border) pt-3">
          <a
            href={item.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-(--foreground) underline-offset-4 hover:underline"
          >
            Product link ↗
          </a>
        </div>
      )}
    </article>
  );
}
