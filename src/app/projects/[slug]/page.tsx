import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioProjects } from "@/content/projects";
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

  return (
    <article className="py-14 sm:py-20">
      <Link
        href="/projects"
        className="text-sm font-medium text-(--muted) transition-colors hover:text-(--foreground)"
      >
        ← Back to Projects
      </Link>

      <header className="mt-6 border-b border-(--border) pb-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div className="max-w-2xl">
            <h1 className="text-[clamp(1.85rem,3.5vw,2.75rem)] font-semibold tracking-tight text-(--foreground)">
              {project.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-(--muted)">
              {project.summary}
            </p>
          </div>

          {hasLive && (
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-(--foreground) px-5 py-2.5 text-sm font-medium text-(--background) transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
              >
                Visit Landing Page ↗
              </a>
            </div>
          )}
        </div>
      </header>

      {project.coverImage && (
        <div className="relative mt-8 aspect-16/10 max-w-xl overflow-hidden rounded-lg border border-(--border) bg-(--surface)">
          <Image
            src={project.coverImage}
            alt={`Cover image for ${project.title}`}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 576px"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-10 max-w-2xl space-y-8">
        <section>
          <h2 className="text-base font-semibold tracking-tight text-(--foreground)">
            Overview
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-(--muted)">
            {project.overview}
          </p>
        </section>

        {project.features.length > 0 && (
          <section>
            <h2 className="text-base font-semibold tracking-tight text-(--foreground)">
              Features
            </h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-(--muted)">
              {project.features.map((feat) => (
                <li key={feat}>{feat}</li>
              ))}
            </ul>
          </section>
        )}

        {project.highlights.length > 0 && (
          <section>
            <h2 className="text-base font-semibold tracking-tight text-(--foreground)">
              Highlights
            </h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-(--muted)">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {project.technologies.length > 0 && (
          <section>
            <h2 className="text-base font-semibold tracking-tight text-(--foreground)">
              Tech Stack
            </h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-(--muted)">
              {project.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
