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
          <p className="text-xs font-medium tracking-[0.16em] uppercase text-[var(--muted)]">
            A few things I&apos;ve been building
          </p>
          <h2
            id="selected-work-heading"
            className="mt-2 font-serif text-2xl font-normal text-[var(--foreground)] sm:text-3xl"
          >
            Selected Work
          </h2>
        </div>

        <Link
          href="/projects"
          className="text-xs font-medium tracking-[0.14em] uppercase text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          View all projects →
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
