import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioProjects } from "@/content/projects";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { BackToHome } from "@/components/layout/BackToHome";
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

function FormattedText({ text }: { text: string }) {
  // Support inline **bold**, `code`, and *italic* markdown markers cleanly
  const parts = text.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-(--foreground)">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="rounded bg-(--surface) px-1.5 py-0.5 font-mono text-[13px] font-medium text-(--foreground) border border-(--border)/60"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={i} className="italic text-(--foreground)">
              {part.slice(1, -1)}
            </em>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
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
  const galleryImages = Array.from(
    new Set(
      [project.coverImage, ...(project.screenshots ?? [])].filter(
        (src): src is string => Boolean(src)
      )
    )
  );

  const overviewParagraphs = Array.isArray(project.overview)
    ? project.overview
    : [project.overview];

  return (
    <article className="py-10 sm:py-16">
      <div className="flex flex-wrap items-center gap-3">
        <BackToHome />
        <span className="text-(--border)" aria-hidden="true">
          /
        </span>
        <Link
          href="/projects"
          className="text-xs font-medium text-(--muted) transition-colors hover:text-(--foreground) sm:text-sm"
        >
          All Projects
        </Link>
      </div>

      <header className="mt-6 border-b border-(--border) pb-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl leading-[1.08] font-semibold tracking-[-0.02em] text-(--foreground) sm:text-[40px]">
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

      <ProjectGallery
        images={galleryImages}
        title={project.title}
        aspectRatio={project.galleryAspectRatio}
      />

      <div className="mt-12 max-w-3xl space-y-10">
        <section>
          <h2 className="font-display text-2xl leading-[1.15] font-semibold tracking-[-0.015em] text-(--foreground)">
            Overview
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-(--muted)">
            {overviewParagraphs.map((para, i) => (
              <p key={i}>
                <FormattedText text={para} />
              </p>
            ))}
          </div>
        </section>

        {project.features.length > 0 && (
          <section>
            <h2 className="font-display text-2xl leading-[1.15] font-semibold tracking-[-0.015em] text-(--foreground)">
              Features
            </h2>
            <ul className="mt-4 space-y-3.5 text-[15px] leading-relaxed text-(--muted)">
              {project.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--foreground)/70"
                    aria-hidden="true"
                  />
                  <span>
                    <FormattedText text={feat} />
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.highlights.length > 0 && (
          <section>
            <h2 className="font-display text-2xl leading-[1.15] font-semibold tracking-[-0.015em] text-(--foreground)">
              Highlights
            </h2>
            <ul className="mt-4 space-y-3.5 text-[15px] leading-relaxed text-(--muted)">
              {project.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--foreground)/70"
                    aria-hidden="true"
                  />
                  <span>
                    <FormattedText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.techStackTable && project.techStackTable.length > 0 ? (
          <section>
            <h2 className="font-display text-2xl leading-[1.15] font-semibold tracking-[-0.015em] text-(--foreground)">
              Built with
            </h2>
            <div className="mt-5 overflow-hidden rounded-xl border border-(--border) bg-(--surface)/20">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-(--border) bg-(--surface)/60">
                      <th
                        scope="col"
                        className="w-44 py-3.5 pr-4 pl-5 font-semibold text-(--foreground) sm:w-56 sm:pr-6 sm:pl-6"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pr-5 pl-4 font-semibold text-(--foreground) sm:pr-6 sm:pl-6"
                      >
                        Technologies
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-(--border)">
                    {project.techStackTable.map((row) => (
                      <tr
                        key={row.category}
                        className="transition-colors hover:bg-(--foreground)/[0.02]"
                      >
                        <td className="py-4 pr-4 pl-5 text-sm font-semibold text-(--foreground) align-top sm:pr-6 sm:pl-6">
                          {row.category}
                        </td>
                        <td className="py-4 pr-5 pl-4 text-sm leading-relaxed text-(--muted) align-top sm:pr-6 sm:pl-6">
                          <FormattedText text={row.technologies} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : (
          project.technologies.length > 0 && (
            <section>
              <h2 className="font-display text-2xl leading-[1.15] font-semibold tracking-[-0.015em] text-(--foreground)">
                Tech Stack
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-sm border border-(--border) px-2.5 py-1 font-mono text-xs text-(--foreground)"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </section>
          )
        )}
      </div>
    </article>
  );
}
