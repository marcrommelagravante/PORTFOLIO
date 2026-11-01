import React from "react";
import type { Metadata } from "next";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description: "Manually curated software and engineering projects.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsSection headingLevel="h1" isStandalone />;
}
