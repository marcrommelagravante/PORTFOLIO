import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { PortfolioProject } from "@/content/projects";
import { isValidExternalUrl } from "@/lib/validation";

export function ProjectCard({ project }: { project: PortfolioProject }) {
  const hasGithub = isValidExternalUrl(project.githubUrl);
  const hasLive = isValidExternalUrl(project.liveUrl);

  return (
    <article className="group flex flex-col justify-between rounded-lg border border-[var(--border)] bg-[var(--surface)]/50 p-5 transition-colors hover:border-[var(--muted)] sm:p-6">
      <div>
        <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)]">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={`Preview placeholder for ${project.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.015]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs tracking-widest uppercase text-[var(--muted)]">
              [PROJECT SCREENSHOT]
            </div>
          )}
        </div>

        <div className="mb-2 flex flex-wrap items-center gap-2">
          {project.categoryPlaceholder && (
            <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--muted)]">
              {project.categoryPlaceholder}
            </span>
          )}
          {project.isPlaceholder && (
            <span className="rounded border border-[var(--border)] px-2 py-0.5 text-[10px] tracking-wider uppercase text-[var(--muted)]">
              Template Placeholder
            </span>
          )}
        </div>

        <h3 className="font-serif text-xl font-normal text-[var(--foreground)] sm:text-2xl">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted)]">
          {project.summary}
        </p>
      </div>

      <div className="mt-6 border-t border-[var(--border)] pt-4">
        <ul
          aria-label="Technologies used"
          className="mb-4 flex flex-wrap gap-2"
        >
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded border border-[var(--border)] bg-[var(--background)] px-2.5 py-1 text-[11px] text-[var(--muted)]"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-4 text-xs font-medium tracking-wider uppercase">
          <Link
            href={`/projects/${project.slug}`}
            className="text-[var(--foreground)] underline-offset-4 hover:underline"
          >
            Read case study →
          </Link>

          {hasGithub && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              GitHub ↗
            </a>
          )}

          {hasLive && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
