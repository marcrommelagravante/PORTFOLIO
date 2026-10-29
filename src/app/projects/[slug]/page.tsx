import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioProjects } from "@/content/projects";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { createPageMetadata } from "@/lib/metadata";
import { isValidExternalUrl } from "@/lib/validation";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);
  if (!project) {
    return createPageMetadata({ title: "Project Not Found" });
  }
  return createPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const hasGithub = isValidExternalUrl(project.githubUrl);
  const hasLive = isValidExternalUrl(project.liveUrl);

  return (
    <article className="py-14 sm:py-20">
      <Link
        href="/projects"
        className="text-xs font-medium tracking-[0.14em] uppercase text-[var(--muted)] hover:text-[var(--foreground)]"
      >
        ← Back to Projects
      </Link>

      <header className="mt-6 border-b border-[var(--border)] pb-10">
        <div className="flex flex-wrap items-center gap-3">
          {project.status && (
            <span className="rounded border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-[11px] tracking-wider uppercase text-[var(--muted)]">
              Status: {project.status}
            </span>
          )}
          {project.isPlaceholder && (
            <span className="rounded border border-[var(--border)] px-2.5 py-0.5 text-[11px] tracking-wider uppercase text-[var(--muted)]">
              Template Placeholder Entry
            </span>
          )}
        </div>

        <h1 className="mt-4 font-serif text-[clamp(2rem,4vw,3.25rem)] font-normal text-[var(--foreground)]">
          {project.title}
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
          {project.summary}
        </p>

        {(hasGithub || hasLive) && (
          <div className="mt-6 flex flex-wrap gap-4">
            {hasLive && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-[var(--foreground)] px-4 py-2 text-xs font-medium tracking-wider uppercase text-[var(--background)]"
              >
                Live Demo ↗
              </a>
            )}
            {hasGithub && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--surface)]/50 px-4 py-2 text-xs font-medium tracking-wider uppercase text-[var(--foreground)]"
              >
                GitHub Repository ↗
              </a>
            )}
          </div>
        )}
      </header>

      {project.coverImage && (
        <div className="relative mt-10 aspect-[16/10] w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <Image
            src={project.coverImage}
            alt={`Cover image for ${project.title}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-12 grid gap-10 md:grid-cols-[1.5fr_0.5fr]">
        <div className="space-y-8">
          {project.description && (
            <section>
              <h2 className="text-xs font-medium tracking-[0.16em] uppercase text-[var(--muted)]">
                Overview
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]">
                {project.description}
              </p>
            </section>
          )}

          {project.problemContext && (
            <section>
              <h2 className="text-xs font-medium tracking-[0.16em] uppercase text-[var(--muted)]">
                Problem & Context
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]">
                {project.problemContext}
              </p>
            </section>
          )}

          {project.goalsAndFeatures && project.goalsAndFeatures.length > 0 && (
            <section>
              <h2 className="text-xs font-medium tracking-[0.16em] uppercase text-[var(--muted)]">
                Goals & Key Features
              </h2>
              <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-[var(--foreground)]">
                {project.goalsAndFeatures.map((feat) => (
                  <li key={feat}>{feat}</li>
                ))}
              </ul>
            </section>
          )}

          {project.architectureNotes && (
            <section>
              <h2 className="text-xs font-medium tracking-[0.16em] uppercase text-[var(--muted)]">
                Technical Implementation
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]">
                {project.architectureNotes}
              </p>
            </section>
          )}

          {project.challengesLearned && (
            <section>
              <h2 className="text-xs font-medium tracking-[0.16em] uppercase text-[var(--muted)]">
                Challenges & Lessons Learned
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]">
                {project.challengesLearned}
              </p>
            </section>
          )}
        </div>

        <aside className="h-fit rounded-lg border border-[var(--border)] bg-[var(--surface)]/40 p-5">
          <h2 className="text-xs font-medium tracking-[0.16em] uppercase text-[var(--muted)]">
            Technology Stack
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded border border-[var(--border)] bg-[var(--background)] px-2.5 py-1 text-xs text-[var(--foreground)]"
              >
                {tech}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <ProjectGallery screenshots={project.screenshots} title={project.title} />
    </article>
  );
}
