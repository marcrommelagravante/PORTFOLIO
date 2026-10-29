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

  const hasLive = isValidExternalUrl(project.liveUrl);
  const hasGithub = isValidExternalUrl(project.githubUrl);

  return (
    <article className="py-14 sm:py-20">
      <Link
        href="/projects"
        className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
      >
        ← Back to Projects
      </Link>

      <header className="mt-6 border-b border-[var(--border)] pb-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div className="max-w-2xl">
            <h1 className="text-[clamp(1.85rem,3.5vw,2.75rem)] font-semibold tracking-tight text-[var(--foreground)]">
              {project.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
              {project.summary}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            {hasLive && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
              >
                Visit Landing Page ↗
              </a>
            )}
            {hasGithub && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)]/50 px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface)]"
              >
                Source Code ↗
              </a>
            )}
          </div>
        </div>
      </header>

      {project.coverImage && (
        <div className="relative mt-10 aspect-[16/10] w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <Image
            src={project.coverImage}
            alt={`Cover image for ${project.title}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1088px"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-12 grid gap-10 md:grid-cols-[1.5fr_0.5fr]">
        <div className="space-y-8">
          <section>
            <h2 className="text-base font-semibold tracking-tight text-[var(--foreground)]">
              Overview
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              {project.overview}
            </p>
          </section>

          {project.features.length > 0 && (
            <section>
              <h2 className="text-base font-semibold tracking-tight text-[var(--foreground)]">
                Features
              </h2>
              <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                {project.features.map((feat) => (
                  <li key={feat}>{feat}</li>
                ))}
              </ul>
            </section>
          )}

          {project.highlights.length > 0 && (
            <section>
              <h2 className="text-base font-semibold tracking-tight text-[var(--foreground)]">
                Highlights
              </h2>
              <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="h-fit space-y-6 rounded-lg border border-[var(--border)] bg-[var(--surface)]/40 p-5">
          <div>
            <h2 className="font-mono text-xs font-medium text-[var(--muted)]">
              Tech Stack
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded border border-[var(--border)] bg-[var(--background)] px-2.5 py-1 font-mono text-xs text-[var(--foreground)]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {hasLive && (
            <div className="border-t border-[var(--border)] pt-5">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-md bg-[var(--foreground)] px-4 py-2.5 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90"
              >
                Visit Landing Page ↗
              </a>
            </div>
          )}
        </aside>
      </div>

      <ProjectGallery screenshots={project.screenshots} title={project.title} />
    </article>
  );
}
