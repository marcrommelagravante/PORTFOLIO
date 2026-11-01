import React from "react";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsPreview } from "@/components/home/SkillsPreview";
import { GitHubContributions } from "@/components/home/GitHubContributions";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <SkillsPreview />
      <GitHubContributions />
      <ContactSection />
    </div>
  );
}
