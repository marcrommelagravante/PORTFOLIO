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
      className={`py-10 sm:py-12 ${isStandalone ? "" : "border-b border-(--border)"
        }`}
    >
      <header>
        <HeadingTag
          id="projects-heading"
          className="text-2xl font-semibold tracking-tight text-(--foreground) sm:text-3xl"
        >
          Projects
        </HeadingTag>
      </header>

      <ProjectCoverflow projects={coverflowProjects} />
    </section>
  );
}

