import React from "react";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { SelectedProjects } from "@/components/home/SelectedProjects";
import { SkillsPreview } from "@/components/home/SkillsPreview";
import { GitHubContributions } from "@/components/home/GitHubContributions";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <SelectedProjects />
      <SkillsPreview />
      <GitHubContributions />

      <section
        aria-label="More sections"
        className="grid gap-6 py-14 sm:grid-cols-2 sm:py-16"
      >
        <Link
          href="/gear"
          className="group rounded-lg border border-(--border) bg-(--surface)/40 p-6 transition-colors hover:border-(--muted)"
        >
          <p className="font-mono text-xs text-(--muted)">
            Tools & Setup
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-(--foreground) group-hover:underline">
            Gear →
          </h2>
          <p className="mt-2 text-sm text-(--muted)">
            Hardware, peripherals, and software tools used in daily development.
          </p>
        </Link>

        <Link
          href="/outside-the-ide"
          className="group rounded-lg border border-(--border) bg-(--surface)/40 p-6 transition-colors hover:border-(--muted)"
        >
          <p className="font-mono text-xs text-(--muted)">
            Beyond Code
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-(--foreground) group-hover:underline">
            Outside the IDE →
          </h2>
          <p className="mt-2 text-sm text-(--muted)">
            Personal interests including gaming, gym training, and volleyball.
          </p>
        </Link>
      </section>
    </div>
  );
}
