import React from "react";
import { getGitHubContributions } from "@/lib/github";

const LEVEL_CLASSES: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-(--border)/45 dark:bg-(--surface)",
  1: "bg-(--muted)/35",
  2: "bg-(--muted)/65",
  3: "bg-(--foreground)/80",
  4: "bg-(--foreground)",
};

const LEVEL_LABELS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "No contributions",
  1: "Low activity",
  2: "Moderate activity",
  3: "High activity",
  4: "Peak activity",
};

export async function GitHubContributions() {
  const data = await getGitHubContributions();

  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="py-10 sm:py-12"
    >
      <div className="flex items-baseline justify-between border-b border-(--border) pb-3.5">
        <h2
          id="github-heading"
          className="font-display text-3xl leading-[1.08] font-semibold tracking-[-0.02em] text-(--foreground) sm:text-[40px]"
        >
          GitHub
        </h2>

        <a
          href={data.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 font-mono text-xs text-(--muted) transition-colors hover:text-(--foreground)"
        >
          <span>
            {data.totalContributions?.toLocaleString() ?? 0} contributions in the last year
          </span>
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            ↗
          </span>
        </a>
      </div>

      {data.available && data.weeks ? (
        <div
          role="region"
          aria-label={`GitHub contribution calendar for ${data.username}`}
          className="mt-4 overflow-x-auto pb-1"
        >
          {/* 53 Columns x 7 Rows Grid */}
          <div
            style={{
              gridTemplateColumns: `repeat(${data.weeks.length}, minmax(0, 1fr))`,
            }}
            className="grid w-full min-w-160 gap-[3px]"
          >
            {data.weeks.map((week, colIdx) => (
              <div key={colIdx} className="grid grid-rows-7 gap-[3px]">
                {week.map((day, rowIdx) =>
                  day ? (
                    <span
                      key={day.date}
                      title={`${day.date}: ${day.count} contribution${
                        day.count === 1 ? "" : "s"
                      } (${LEVEL_LABELS[day.level]})`}
                      aria-label={`${day.date}: ${day.count} contributions`}
                      className={`block aspect-square w-full rounded-[2px] transition-opacity hover:opacity-80 ${
                        LEVEL_CLASSES[day.level]
                      }`}
                    />
                  ) : (
                    <span
                      key={`pad-${colIdx}-${rowIdx}`}
                      aria-hidden="true"
                      className="block aspect-square w-full opacity-0 pointer-events-none"
                    />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-4 text-xs text-(--muted)">
          Activity temporarily unavailable.{" "}
          <a
            href={data.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-(--foreground) underline underline-offset-4"
          >
            View on GitHub ↗
          </a>
        </div>
      )}
    </section>
  );
}
