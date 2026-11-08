import React from "react";
import { Hero } from "@/components/home/Hero";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsPreview } from "@/components/home/SkillsPreview";
import { GitHubContributions } from "@/components/home/GitHubContributions";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <ProjectsSection />
      <SkillsPreview />
      <GitHubContributions />
    </div>
  );
}
