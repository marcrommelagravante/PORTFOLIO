import React from "react";
import type { Metadata } from "next";
import { portfolioProjects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description: "Manually curated software and engineering projects.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="py-14 sm:py-20">
      <header className="border-b border-[var(--border)] pb-10">
        <p className="text-xs font-medium tracking-[0.16em] uppercase text-[var(--muted)]">
          Selected Archive
        </p>
        <h1 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] font-normal text-[var(--foreground)]">
          Projects
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          A manually curated collection of software builds and case studies.
          Entries marked as template placeholders are for layout verification
          until replaced with final project details.
        </p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {portfolioProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
