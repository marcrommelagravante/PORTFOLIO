import React from "react";
import { skillCategories } from "@/content/skills";

export function SkillsPreview() {
  return (
    <section
      aria-labelledby="skills-heading"
      className="border-b border-[var(--border)] py-14 sm:py-16"
    >
      <div className="mb-8">
        <p className="text-xs font-medium tracking-[0.16em] uppercase text-[var(--muted)]">
          Technical stack & tools
        </p>
        <h2
          id="skills-heading"
          className="mt-2 font-serif text-2xl font-normal text-[var(--foreground)] sm:text-3xl"
        >
          Skills
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((group) => (
          <div
            key={group.id}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)]/40 p-5"
          >
            <h3 className="text-xs font-medium tracking-[0.14em] uppercase text-[var(--muted)]">
              {group.label}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <li
                  key={skill}
                  className="text-sm text-[var(--foreground)]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
