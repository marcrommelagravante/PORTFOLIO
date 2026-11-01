import React from "react";
import { personalInterests } from "@/content/interests";

export function InterestsSection({
  headingLevel = "h2",
  isStandalone = false,
}: {
  headingLevel?: "h1" | "h2";
  isStandalone?: boolean;
}) {
  const HeadingTag = headingLevel;

  return (
    <section
      id="outside-the-ide"
      aria-labelledby="outside-the-ide-heading"
      className={`py-14 sm:py-20 ${
        isStandalone ? "" : "border-b border-(--border)"
      }`}
    >
      <header className="border-b border-(--border) pb-8">
        <p className="font-mono text-xs text-(--muted)">Personal Interests</p>
        <HeadingTag
          id="outside-the-ide-heading"
          className="mt-2 text-2xl font-semibold tracking-tight text-(--foreground) sm:text-3xl"
        >
          Outside the IDE
        </HeadingTag>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-(--muted)">
          Activities and interests beyond coding. Edit these cards in{" "}
          <code className="rounded bg-(--surface) px-1.5 py-0.5 font-mono text-xs">
            src/content/interests.ts
          </code>
          .
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {personalInterests.map((interest) => (
          <article
            key={interest.id}
            className="flex flex-col justify-between rounded-lg border border-(--border) bg-(--surface)/40 p-6"
          >
            <div>
              <div className="mb-4 flex aspect-16/10 items-center justify-center rounded border border-dashed border-(--border) bg-(--surface)/60 font-mono text-xs text-(--muted)">
                [{interest.title.toUpperCase()} IMAGE PLACEHOLDER]
              </div>

              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xl font-semibold tracking-tight text-(--foreground)">
                  {interest.title}
                </h3>
                {interest.isPlaceholder && (
                  <span className="rounded border border-(--border) px-2 py-0.5 font-mono text-[11px] text-(--muted)">
                    Placeholder
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-(--muted)">
                {interest.summary}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

