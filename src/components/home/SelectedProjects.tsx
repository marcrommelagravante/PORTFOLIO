import React from "react";
import Link from "next/link";
import { portfolioProjects } from "@/content/projects";
import { ProjectCoverflow } from "@/components/projects/ProjectCoverflow";

export function SelectedProjects() {
  const featured = portfolioProjects
    .filter((p) => p.featured)
    .map(({ slug, title, summary, coverImage }) => ({
      slug,
      title,
      summary,
      coverImage,
    }));

  return (
    <section
      id="selected-work"
      aria-labelledby="selected-work-heading"
      className="border-b border-(--border) py-14 sm:py-16"
    >
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs text-(--muted)">
            A few things I&apos;ve been building
          </p>
          <h2
            id="selected-work-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-(--foreground) sm:text-3xl"
          >
            Selected Work
          </h2>
        </div>

        <Link
          href="/projects"
          className="text-sm font-medium text-(--muted) transition-colors hover:text-(--foreground)"
        >
          View all projects →
        </Link>
      </div>

      <ProjectCoverflow projects={featured} />
    </section>
  );
}
