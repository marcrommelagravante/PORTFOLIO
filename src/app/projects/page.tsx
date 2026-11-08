import React from "react";
import type { Metadata } from "next";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { BackToHome } from "@/components/layout/BackToHome";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description: "Manually curated software and engineering projects.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="pt-8 sm:pt-10">
      <div className="mb-4 sm:mb-6">
        <BackToHome />
      </div>
      <ProjectsSection headingLevel="h1" isStandalone />
    </div>
  );
}
