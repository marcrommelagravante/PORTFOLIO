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
      <header className="border-b border-(--border) pb-10">
        <p className="font-mono text-xs text-(--muted)">
          Selected Archive
        </p>
        <h1 className="mt-3 text-[clamp(2rem,3.5vw,3rem)] font-semibold tracking-tight text-(--foreground)">
          Projects
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-(--muted)">
          A manually curated collection of software builds and case studies.
          Entries marked as template placeholders are for layout verification
          until replaced with final project details.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-3.5">
        {portfolioProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
