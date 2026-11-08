import React from "react";
import { portfolioProjects } from "@/content/projects";
import { ProjectsLedger } from "@/components/projects/ProjectsLedger";

export function ProjectsSection({
  headingLevel = "h2",
  isStandalone = false,
  className = "",
}: {
  headingLevel?: "h1" | "h2";
  isStandalone?: boolean;
  className?: string;
}) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className={`pb-8 sm:pb-10 ${isStandalone ? "pt-0" : "pt-8 sm:pt-10"} ${className}`}
    >
      <ProjectsLedger
        projects={portfolioProjects}
        headingLevel={headingLevel}
      />
    </section>
  );
}
