"use client";

import React from "react";
import type { PortfolioProject } from "@/content/projects";
import { ProjectThumb } from "@/components/projects/ProjectThumb";
import { TransitionLink } from "@/components/transition/TransitionLink";

const STATUS_LABELS: Record<NonNullable<PortfolioProject["status"]>, string> = {
  beta: "Beta",
  soon: "Soon",
};

export function ProjectRow({
  project,
  isActive,
  onActivate,
}: {
  project: PortfolioProject;
  isActive: boolean;
  onActivate: (slug: string) => void;
}) {
  const isSoon = project.status === "soon";

  const handlePointerEnter = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === "mouse") {
      onActivate(project.slug);
    }
  };

  const handleFocus = () => {
    onActivate(project.slug);
  };

  const sharedClassName = `group relative flex items-center gap-4 py-4.5 transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground) lg:-mx-4 lg:rounded-[14px] lg:px-4 ${
    isActive
      ? "lg:bg-(--foreground)/7"
      : "lg:hover:bg-(--foreground)/4"
  }`;

  const innerContent = (
    <>
      {isActive && (
        <span
          aria-hidden="true"
          className="absolute inset-y-5.5 left-0 hidden w-0.75 rounded-r-full bg-(--foreground) lg:block"
        />
      )}

      <ProjectThumb project={project} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-base font-semibold tracking-tight text-(--foreground)">
            {project.title}
          </span>
          {project.status && (
            <span className="shrink-0 rounded-full border border-(--border) px-2 py-0.5 font-mono text-[10px] text-(--muted)">
              {STATUS_LABELS[project.status]}
            </span>
          )}
        </div>
        <p className="mt-0.5 line-clamp-2 text-[13.5px] leading-snug text-(--muted)">
          {project.summary}
        </p>
      </div>

      <span className="hidden shrink-0 font-mono text-[11px] text-(--muted) sm:inline-block">
        {project.tag}
      </span>
    </>
  );

  if (isSoon) {
    return (
      <div
        tabIndex={0}
        role="group"
        aria-label={`${project.title} (${STATUS_LABELS.soon})`}
        data-project-row
        onPointerEnter={handlePointerEnter}
        onFocus={handleFocus}
        className={`${sharedClassName} cursor-default`}
      >
        {innerContent}
      </div>
    );
  }

  return (
    <TransitionLink
      href={`/projects/${project.slug}`}
      data-project-row
      onPointerEnter={handlePointerEnter}
      onFocus={handleFocus}
      className={sharedClassName}
    >
      {innerContent}
    </TransitionLink>
  );
}

