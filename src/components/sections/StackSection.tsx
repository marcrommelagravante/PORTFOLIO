import React from "react";
import { skillCategories, stackPageHeader } from "@/content/skills";

export function StackSection({
  headingLevel = "h2",
  isStandalone = false,
}: {
  headingLevel?: "h1" | "h2";
  isStandalone?: boolean;
}) {
  const HeadingTag = headingLevel;
  const CategoryHeadingTag = headingLevel === "h1" ? "h2" : "h3";

  return (
    <section
      id="skills"
      aria-labelledby="stack-heading"
      className={`py-10 sm:py-12 ${isStandalone ? "" : ""}`}
    >
      {/* Header */}
      <header className="mb-11">
        <p className="font-mono text-xs font-medium uppercase tracking-wider text-(--muted)">
          {stackPageHeader.eyebrow}
        </p>
        <HeadingTag
          id="stack-heading"
          className="mt-2 text-4xl sm:text-[44px] font-semibold tracking-tight leading-[1.08] text-(--foreground)"
        >
          {stackPageHeader.title}
        </HeadingTag>
      </header>

      {/* Curated Ledger Rows */}
      <div className="flex flex-col">
        {skillCategories.map((group, index) => {
          const isLast = index === skillCategories.length - 1;
          const countString = String(group.items.length).padStart(2, "0");

          return (
            <div
              key={group.id}
              className={`flex flex-wrap gap-8 border-t border-(--border) py-7 ${
                isLast ? "border-b border-(--border)" : ""
              }`}
            >
              {/* Left Column: Category & Outcome */}
              <div className="basis-60 shrink-0 max-w-full">
                <div className="flex items-baseline gap-2.5">
                  <CategoryHeadingTag className="text-base font-semibold tracking-tight text-(--foreground)">
                    {group.label}
                  </CategoryHeadingTag>
                  <span className="font-mono text-xs text-(--muted)">
                    {countString}
                  </span>
                </div>
                <p className="mt-1.5 text-[13.5px] leading-normal text-(--muted)">
                  {group.outcome}
                </p>
              </div>

              {/* Right Column: Technology Pills */}
              <ul
                className="flex min-w-0 flex-1 basis-[360px] flex-wrap content-start gap-2.5 list-none p-0 m-0"
                aria-label={`${group.label} technologies`}
              >
                {group.items.map((tech) => (
                  <li
                    key={tech}
                    className="inline-flex items-center rounded-lg border border-(--border) bg-(--background) px-3.5 py-2 font-mono text-[12.5px] text-(--foreground)"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
