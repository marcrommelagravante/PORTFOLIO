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
          className="group rounded-lg border border-[var(--border)] bg-[var(--surface)]/40 p-6 transition-colors hover:border-[var(--muted)]"
        >
          <p className="font-mono text-xs text-[var(--muted)]">
            Tools & Setup
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-[var(--foreground)] group-hover:underline">
            Gear →
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Hardware, peripherals, and software tools used in daily development.
          </p>
        </Link>

        <Link
          href="/outside-the-ide"
          className="group rounded-lg border border-[var(--border)] bg-[var(--surface)]/40 p-6 transition-colors hover:border-[var(--muted)]"
        >
          <p className="font-mono text-xs text-[var(--muted)]">
            Beyond Code
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-[var(--foreground)] group-hover:underline">
            Outside the IDE →
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Personal interests including gaming, gym training, and volleyball.
          </p>
        </Link>
      </section>
    </div>
  );
}
