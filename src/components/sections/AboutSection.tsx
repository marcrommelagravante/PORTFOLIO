import React from "react";
import { siteConfig } from "@/content/site";
import { skillCategories } from "@/content/skills";

export function AboutSection({
  headingLevel = "h2",
  showStack = false,
  isStandalone = false,
}: {
  headingLevel?: "h1" | "h2";
  showStack?: boolean;
  isStandalone?: boolean;
}) {
  const HeadingTag = headingLevel;
  const hasResume = Boolean(siteConfig.resumeUrl?.trim());

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className={`py-14 sm:py-20 ${
        isStandalone ? "" : "border-b border-(--border)"
      }`}
    >
      <header className="border-b border-(--border) pb-8">
        <p className="font-mono text-xs text-(--muted)">
          Professional Biography
        </p>
        <HeadingTag
          id="about-heading"
          className="mt-2 text-2xl font-semibold tracking-tight text-(--foreground) sm:text-3xl"
        >
          About
        </HeadingTag>
      </header>

      <div className="mt-10 grid gap-10 md:grid-cols-[1.45fr_0.55fr] md:gap-12">
        <div className="space-y-5">
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
        </div>

        <aside className="space-y-8 rounded-lg border border-(--border) bg-(--surface)/40 p-6">
          <div>
            <h3 className="font-mono text-xs font-medium text-(--muted)">
              Current Study / Role
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-(--foreground)">
              {siteConfig.about.currentStudyOrRole}
            </p>
          </div>

          <div className="border-t border-(--border) pt-6">
            <h3 className="font-mono text-xs font-medium text-(--muted)">
              Focus Areas
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-(--foreground)">
              {siteConfig.about.developmentInterests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {showStack && (
        <div
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
        </div>
      )}
    </section>
  );
}

