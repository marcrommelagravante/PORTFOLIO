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
      <header className="border-b border-[var(--border)] pb-10">
        <p className="text-xs font-medium tracking-[0.16em] uppercase text-[var(--muted)]">
          Professional Biography
        </p>
        <h1 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] font-normal text-[var(--foreground)]">
          About
        </h1>
      </header>

      <div className="mt-10 grid gap-12 md:grid-cols-[1.4fr_0.6fr]">
        <section aria-labelledby="bio-heading" className="space-y-5">
          <h2 id="bio-heading" className="sr-only">
            Biography
          </h2>
          {siteConfig.about.professionalBio.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-base leading-relaxed text-[var(--foreground)]/90"
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
                className="inline-flex items-center justify-center rounded-md bg-[var(--foreground)] px-5 py-2.5 text-xs font-medium tracking-[0.14em] uppercase text-[var(--background)] transition-opacity hover:opacity-90"
              >
                Download résumé
              </a>
            </div>
          )}
        </section>

        <aside className="space-y-8 rounded-lg border border-[var(--border)] bg-[var(--surface)]/40 p-6">
          <div>
            <h2 className="text-xs font-medium tracking-[0.16em] uppercase text-[var(--muted)]">
              Current Study / Role
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">
              {siteConfig.about.currentStudyOrRole}
            </p>
          </div>

          <div className="border-t border-[var(--border)] pt-6">
            <h2 className="text-xs font-medium tracking-[0.16em] uppercase text-[var(--muted)]">
              Focus Areas
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-[var(--foreground)]">
              {siteConfig.about.developmentInterests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section
        aria-labelledby="about-skills-heading"
        className="mt-16 border-t border-[var(--border)] pt-12"
      >
        <h2
          id="about-skills-heading"
          className="font-serif text-2xl font-normal text-[var(--foreground)]"
        >
          Selected Skills Summary
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((group) => (
            <div
              key={group.id}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)]/30 p-5"
            >
              <h3 className="text-xs font-medium tracking-[0.14em] uppercase text-[var(--muted)]">
                {group.label}
              </h3>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-[var(--foreground)]">
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
