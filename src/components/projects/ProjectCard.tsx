import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { PortfolioProject } from "@/content/projects";

export function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="group flex items-center gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)]/40 p-3.5 transition-colors hover:border-[var(--muted)] sm:gap-5 sm:p-4">
      <Link
        href={`/projects/${project.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative aspect-[16/10] w-28 shrink-0 overflow-hidden rounded border border-[var(--border)] bg-[var(--surface)] sm:w-36"
      >
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={`Thumbnail for ${project.title}`}
            fill
            sizes="(max-width: 640px) 112px, 144px"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-[10px] text-[var(--muted)]">
            [PREVIEW]
          </div>
        )}
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="truncate text-base font-semibold tracking-tight text-[var(--foreground)] sm:text-lg">
            <Link
              href={`/projects/${project.slug}`}
              className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]"
            >
              {project.title}
            </Link>
          </h3>

          <Link
            href={`/projects/${project.slug}`}
            aria-label={`Open ${project.title}`}
            className="shrink-0 font-mono text-xs text-[var(--muted)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--foreground)]"
          >
            →
          </Link>
        </div>

        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
          {project.summary}
        </p>
      </div>
    </article>
  );
}
