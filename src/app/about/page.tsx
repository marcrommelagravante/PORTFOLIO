import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { skillCategories } from "@/content/skills";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description: `Professional biography and focus areas of ${siteConfig.fullName}.`,
  path: "/about",
});

export default function AboutPage() {
  const hasResume = Boolean(siteConfig.resumeUrl?.trim());

  return (
    <div className="py-14 sm:py-20">
      <header className="border-b border-(--border) pb-10">
        <p className="font-mono text-xs text-(--muted)">
          Professional Biography
        </p>
        <h1 className="mt-3 text-[clamp(2rem,3.5vw,3rem)] font-semibold tracking-tight text-(--foreground)">
          About
        </h1>
      </header>

      <div className="mt-10 grid gap-12 md:grid-cols-[1.5fr_0.5fr]">
        <section aria-labelledby="bio-heading" className="space-y-5">
          <h2 id="bio-heading" className="sr-only">
            Biography
          </h2>
          {siteConfig.about.professionalBio.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-base leading-relaxed text-(--foreground)/90"
            >
              {paragraph}
            </p>
          ))}

          {hasResume && (
            <div className="pt-4">
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-(--foreground) px-5 py-2.5 text-sm font-medium text-(--background) transition-opacity hover:opacity-90"
              >
                Download résumé
              </a>
            </div>
          )}
        </section>

        <aside className="space-y-8 rounded-lg border border-(--border) bg-(--surface)/40 p-6">
          <div>
            <h2 className="font-mono text-xs font-medium text-(--muted)">
              Current Study / Role
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-(--foreground)">
              {siteConfig.about.currentStudyOrRole}
            </p>
          </div>

          <div className="border-t border-(--border) pt-6">
            <h2 className="font-mono text-xs font-medium text-(--muted)">
              Focus Areas
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-(--foreground)">
              {siteConfig.about.developmentInterests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section
        aria-labelledby="about-stack-heading"
        className="mt-16 border-t border-(--border) pt-12"
      >
        <h2
          id="about-stack-heading"
          className="text-2xl font-semibold tracking-tight text-(--foreground)"
        >
          Stack
        </h2>
        <div className="mt-6 flex flex-col gap-3.5">
          {skillCategories.map((group) => (
            <div
              key={group.id}
              className="flex flex-col gap-2.5 rounded-lg border border-(--border) bg-(--surface)/40 p-3.5 sm:flex-row sm:items-center sm:gap-5 sm:p-4"
            >
              <h3 className="shrink-0 font-mono text-xs font-medium text-(--muted) sm:w-36">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-(--border) bg-(--background) px-2.5 py-1 font-mono text-xs text-(--foreground)"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
