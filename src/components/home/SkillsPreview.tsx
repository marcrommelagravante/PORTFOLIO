import React from "react";
import { skillCategories } from "@/content/skills";

export function SkillsPreview() {
  return (
    <section
      id="skills"
      aria-labelledby="stack-heading"
      className="border-b border-(--border) py-10 sm:py-12"
    >
      <div className="mb-6">
        <h2
          id="stack-heading"
          className="text-2xl font-semibold tracking-tight text-(--foreground) sm:text-3xl"
        >
          Stack
        </h2>
      </div>

      <div className="flex flex-col gap-3.5">
        {skillCategories.map((group) => (
          <div
            key={group.id}
            className="flex flex-col gap-2.5 rounded-lg border border-(--border) bg-(--surface)/40 p-3.5 sm:flex-row sm:items-center sm:gap-5 sm:p-4"
          >
            <h3 className="shrink-0 font-mono text-xs font-medium text-(--muted) sm:w-36">
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((tech) => (
                <li
                  key={tech}
                  className="rounded border border-(--border) bg-(--background) px-2.5 py-1 font-mono text-xs text-(--foreground)"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
