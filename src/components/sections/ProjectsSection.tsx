import React from "react";
import { portfolioProjects } from "@/content/projects";
import { ProjectsLedger } from "@/components/projects/ProjectsLedger";

export function ProjectsSection({
  headingLevel = "h2",
  isStandalone = false,
}: {
  headingLevel?: "h1" | "h2";
  isStandalone?: boolean;
}) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className={`py-10 sm:py-12 ${
        isStandalone ? "" : "border-b border-(--border)"
      }`}
    >
      <ProjectsLedger
        projects={portfolioProjects}
        headingLevel={headingLevel}
      />
    </section>
  );
}
