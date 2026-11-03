"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { PortfolioProject } from "@/content/projects";

export function ProjectThumb({ project }: { project: PortfolioProject }) {
  const [failed, setFailed] = useState(false);
  const src =
    project.thumbnail ?? project.coverImage ?? project.screenshots?.[0];

  return (
    <div
      aria-hidden="true"
      className="relative h-[52px] w-[76px] shrink-0 overflow-hidden rounded-lg bg-(--surface)"
    >
      {src && !failed ? (
        <Image
          src={src}
          alt=""
          fill
          sizes="76px"
          onError={() => setFailed(true)}
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-1.5">
          <div className="h-full w-full rounded border border-dashed border-(--border)" />
        </div>
      )}
    </div>
  );
}

