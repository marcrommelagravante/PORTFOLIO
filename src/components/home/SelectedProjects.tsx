import React from "react";
import Link from "next/link";
import { portfolioProjects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function SelectedProjects() {
  const featured = portfolioProjects.filter((p) => p.featured);

  return (
    <section
      id="selected-work"
      aria-labelledby="selected-work-heading"
      className="border-b border-[var(--border)] py-14 sm:py-16"
    >
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs text-[var(--muted)]">
            A few things I&apos;ve been building
          </p>
          <h2
            id="selected-work-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl"
          >
            Selected Work
          </h2>
        </div>

        <Link
          href="/projects"
          className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          View all projects →
        </Link>
      </div>

      <div className="flex flex-col gap-3.5">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
