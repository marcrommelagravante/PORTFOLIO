import React from "react";
import { skillCategories } from "@/content/skills";

export function SkillsPreview() {
  return (
    <section
      aria-labelledby="stack-heading"
      className="border-b border-[var(--border)] py-14 sm:py-16"
    >
      <div className="mb-8">
        <p className="font-mono text-xs text-[var(--muted)]">
          Technologies & tools I build with
        </p>
        <h2
          id="stack-heading"
          className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl"
        >
          Stack
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((group) => (
          <div
            key={group.id}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)]/40 p-5"
          >
            <h3 className="font-mono text-xs font-medium text-[var(--muted)]">
              {group.label}
            </h3>
            <ul className="mt-3.5 flex flex-wrap gap-2">
              {group.items.map((tech) => (
                <li
                  key={tech}
                  className="rounded border border-[var(--border)] bg-[var(--background)] px-2.5 py-1 font-mono text-xs text-[var(--foreground)]"
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
