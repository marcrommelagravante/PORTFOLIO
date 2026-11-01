import React from "react";
import { portfolioProjects } from "@/content/projects";
import { ProjectCoverflow } from "@/components/projects/ProjectCoverflow";

export function ProjectsSection({
  headingLevel = "h2",
  isStandalone = false,
}: {
  headingLevel?: "h1" | "h2";
  isStandalone?: boolean;
}) {
  const HeadingTag = headingLevel;
  const coverflowProjects = portfolioProjects.map(
    ({ slug, title, summary, coverImage }) => ({
      slug,
      title,
      summary,
      coverImage,
    })
  );

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className={`py-14 sm:py-20 ${
        isStandalone ? "" : "border-b border-(--border)"
      }`}
    >
      <header className="border-b border-(--border) pb-8">
        <p className="font-mono text-xs text-(--muted)">Selected Archive</p>
        <HeadingTag
          id="projects-heading"
          className="mt-2 text-2xl font-semibold tracking-tight text-(--foreground) sm:text-3xl"
        >
          Projects
        </HeadingTag>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-(--muted)">
          A manually curated collection of software builds and case studies.
          Entries marked as template placeholders are for layout verification
          until replaced with final project details.
        </p>
      </header>

      <ProjectCoverflow projects={coverflowProjects} />
    </section>
  );
}

