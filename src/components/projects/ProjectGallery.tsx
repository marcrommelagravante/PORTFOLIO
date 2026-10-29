import React from "react";
import Image from "next/image";

export function ProjectGallery({
  screenshots,
  title,
}: {
  screenshots?: string[];
  title: string;
}) {
  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  return (
    <section aria-label="Project screenshots" className="mt-10 space-y-6">
      <h2 className="text-xs font-medium tracking-[0.16em] uppercase text-[var(--muted)]">
        Screenshots & Visuals
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {screenshots.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]"
          >
            <Image
              src={src}
              alt={`${title} screenshot ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
