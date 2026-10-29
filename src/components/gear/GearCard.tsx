import React from "react";
import Image from "next/image";
import type { GearItem } from "@/content/gear";
import { isValidExternalUrl } from "@/lib/validation";

export function GearCard({ item }: { item: GearItem }) {
  const hasUrl = isValidExternalUrl(item.productUrl);

  return (
    <article className="flex flex-col justify-between rounded-lg border border-[var(--border)] bg-[var(--surface)]/40 p-5">
      <div>
        <div className="mb-4 flex items-center justify-between gap-2">
          <span className="font-mono text-xs text-[var(--muted)]">
            {item.category}
          </span>
          {item.isPlaceholder && (
            <span className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-[11px] text-[var(--muted)]">
              Placeholder
            </span>
          )}
        </div>

        {item.image ? (
          <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded border border-[var(--border)] bg-[var(--surface)]">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="mb-4 flex aspect-[16/9] items-center justify-center rounded border border-dashed border-[var(--border)] bg-[var(--surface)]/60 font-mono text-xs text-[var(--muted)]">
            [GEAR PHOTO PLACEHOLDER]
          </div>
        )}

        <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
          {item.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          {item.usage}
        </p>
      </div>

      {hasUrl && (
        <div className="mt-4 border-t border-[var(--border)] pt-3">
          <a
            href={item.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--foreground)] underline-offset-4 hover:underline"
          >
            Product link ↗
          </a>
        </div>
      )}
    </article>
  );
}
