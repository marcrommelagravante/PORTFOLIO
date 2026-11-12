"use client";

import React, { useRef, useState } from "react";
import {
  projectsSectionCopy,
  type PortfolioProject,
} from "@/content/projects";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { ProjectPreview } from "@/components/projects/ProjectPreview";

// Threshold for future inline collapse ("+ N more") if portfolioProjects exceeds 4 items.
const COLLAPSE_AFTER = 4;

export function ProjectsLedger({
  projects,
  headingLevel = "h2",
}: {
  projects: PortfolioProject[];
  headingLevel?: "h1" | "h2";
}) {
  const HeadingTag = headingLevel;
  const total = projects.length;
  const [activeSlug, setActiveSlug] = useState<string>(
    projects[0]?.slug ?? ""
  );
  const listRef = useRef<HTMLUListElement>(null);

  if (total === 0) {
    return null;
  }

  const activeIndex = Math.max(
    0,
    projects.findIndex((p) => p.slug === activeSlug)
  );
  const activeProject = projects[activeIndex] ?? projects[0];

  const handleListKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const listEl = listRef.current;
    if (!listEl) return;

    const rows = Array.from(
      listEl.querySelectorAll<HTMLElement>("[data-project-row]")
    );
    const currentIndex = rows.indexOf(
      document.activeElement as HTMLElement
    );
    if (currentIndex === -1) return;

    e.preventDefault();
    const nextIndex =
      e.key === "ArrowDown"
        ? Math.min(rows.length - 1, currentIndex + 1)
        : Math.max(0, currentIndex - 1);
    rows[nextIndex]?.focus();
  };

  return (
    <div>
      {/* Section Header */}
      <header className="animate-gallery-enter mb-3.5 max-w-2xl">
        <HeadingTag
          id="projects-heading"
          className="font-display text-3xl leading-[1.08] font-semibold tracking-[-0.02em] text-(--foreground) sm:text-[40px]"
        >
          {projectsSectionCopy.title}
        </HeadingTag>
      </header>

      {/* Two-column Ledger + Sticky Preview */}
      <div className="flex flex-col items-start gap-14 lg:flex-row">
        <div
          data-collapse-after={COLLAPSE_AFTER}
          className="w-full lg:flex-1 lg:basis-115"
        >
          {/* Project Rows */}
          <ul
            ref={listRef}
            onKeyDown={handleListKeyDown}
            className="border-b border-(--border)"
          >
            {projects.map((project) => (
              <li
                key={project.slug}
                className="border-t border-(--border)"
              >
                <ProjectRow
                  project={project}
                  isActive={project.slug === activeProject.slug}
                  onActivate={setActiveSlug}
                />
              </li>
            ))}
          </ul>
        </div>

        <ProjectPreview
          project={activeProject}
          index={activeIndex}
          total={total}
        />
      </div>
    </div>
  );
}

