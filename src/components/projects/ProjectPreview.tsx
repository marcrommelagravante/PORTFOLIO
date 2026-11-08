"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  projectsSectionCopy,
  type PortfolioProject,
} from "@/content/projects";

function padTwo(n: number): string {
  return String(n).padStart(2, "0");
}

function CoverFrame({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}) {
  const [failed, setFailed] = useState(false);
  const src = project.coverImage ?? project.screenshots?.[0];

  if (!src || failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-[10px] border border-dashed border-(--device-border) p-6 text-center">
        <span className="font-mono text-xs tracking-wider text-(--device-fg) uppercase">
          {`Project ${padTwo(index + 1)}`}
        </span>
        <span className="text-xs text-(--device-muted)">
          {projectsSectionCopy.coverPlaceholderLabel}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`Preview of ${project.title}`}
      fill
      priority={index === 0}
      sizes="(min-width: 1024px) 380px, 100vw"
      onError={() => setFailed(true)}
      className="rounded-[10px] object-contain bg-[#121210]"
    />
  );
}

export function ProjectPreview({
  project,
  index,
  total,
}: {
  project: PortfolioProject;
  index: number;
  total: number;
}) {
  const isSoon = project.status === "soon";

  return (
    <aside
      aria-label="Selected project preview"
      aria-live="polite"
      aria-atomic="true"
      className="sticky top-12 hidden flex-1 basis-[380px] lg:block"
    >
      {/* Dark device card in both themes */}
      <div className="rounded-[22px] border border-(--device-border) bg-(--device-bg) p-[18px] shadow-[0_30px_60px_-28px_rgba(0,0,0,0.55)]">
        <div
          key={project.slug}
          className="animate-crossfade relative aspect-16/10 w-full overflow-hidden rounded-[10px]"
        >
          <CoverFrame project={project} index={index} />
        </div>
      </div>

      {/* Meta block */}
      <div key={project.slug} className="animate-fade-rise px-1.5 pt-7">
        <p className="font-mono text-[11px] font-medium tracking-[0.18em] text-(--muted) uppercase">
          {`${padTwo(index + 1)} / ${padTwo(total)} · ${project.tag}`}
        </p>

        <h3 className="font-display mt-2 text-[28px] leading-[1.12] font-semibold tracking-[-0.015em] text-(--foreground)">
          {project.title}
        </h3>

        <p className="mt-3 text-[15px] leading-relaxed text-(--muted)">
          {project.summary}
        </p>

        {project.technologies.length > 0 && (
          <ul
            aria-label="Technologies used"
            className="mt-5 flex flex-wrap gap-2"
          >
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-sm border border-(--border) px-2.5 py-1 font-mono text-xs text-(--foreground)"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        {!isSoon && (
          <div className="mt-6">
            <Link
              href={`/projects/${project.slug}`}
              className="group/link inline-flex items-center gap-1.5 border-b border-(--foreground) pb-0.5 text-sm font-medium text-(--foreground) transition-colors hover:border-(--muted) hover:text-(--muted) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--foreground)"
            >
              <span>{projectsSectionCopy.ctaLabel}</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}

