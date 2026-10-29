import React from "react";
import type { Metadata } from "next";
import { personalInterests } from "@/content/interests";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Outside the IDE",
  description: "Interests and activities beyond software development.",
  path: "/outside-the-ide",
});

export default function OutsideTheIdePage() {
  return (
    <div className="py-14 sm:py-20">
      <header className="border-b border-[var(--border)] pb-10">
        <p className="font-mono text-xs text-[var(--muted)]">
          Personal Interests
        </p>
        <h1 className="mt-3 text-[clamp(2rem,3.5vw,3rem)] font-semibold tracking-tight text-[var(--foreground)]">
          Outside the IDE
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
          Activities and interests beyond coding. Edit these cards in{" "}
          <code className="rounded bg-[var(--surface)] px-1.5 py-0.5 font-mono text-xs">
            src/content/interests.ts
          </code>
          .
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {personalInterests.map((interest) => (
          <article
            key={interest.id}
            className="flex flex-col justify-between rounded-lg border border-[var(--border)] bg-[var(--surface)]/40 p-6"
          >
            <div>
              <div className="mb-4 flex aspect-[16/10] items-center justify-center rounded border border-dashed border-[var(--border)] bg-[var(--surface)]/60 font-mono text-xs text-[var(--muted)]">
                [{interest.title.toUpperCase()} IMAGE PLACEHOLDER]
              </div>

              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
                  {interest.title}
                </h2>
                {interest.isPlaceholder && (
                  <span className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-[11px] text-[var(--muted)]">
                    Placeholder
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {interest.summary}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
