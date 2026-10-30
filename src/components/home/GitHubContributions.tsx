import React from "react";
import { getGitHubContributions } from "@/lib/github";

const LEVEL_CLASSES: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-(--surface) border-(--border)",
  1: "bg-(--muted)/25 border-(--border)",
  2: "bg-(--muted)/50 border-(--border)",
  3: "bg-(--foreground)/70 border-(--border)",
  4: "bg-(--foreground) border-(--foreground)",
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
      aria-labelledby="github-heading"
      className="border-b border-(--border) py-14 sm:py-16"
    >
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs text-(--muted)">
            Open source & activity
          </p>
          <h2
            id="github-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-(--foreground) sm:text-3xl"
          >
            GitHub Contributions
          </h2>
        </div>

        <a
          href={data.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-(--muted) transition-colors hover:text-(--foreground)"
        >
          @{data.username} ↗
        </a>
      </div>

      {data.available && data.weeks ? (
        <div className="rounded-lg border border-(--border) bg-(--surface)/40 p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-(--muted)">
            <span>
              {data.totalContributions ?? 0} contributions in the last year
            </span>
            <div
              aria-label="Contribution intensity legend"
              className="flex items-center gap-1.5"
            >
              <span>Less</span>
              {([0, 1, 2, 3, 4] as const).map((lvl) => (
                <span
                  key={lvl}
                  title={LEVEL_LABELS[lvl]}
                  className={`inline-block h-3 w-3 rounded-xs border ${LEVEL_CLASSES[lvl]}`}
                />
              ))}
              <span>More</span>
            </div>
          </div>

          <div
            role="region"
            aria-label={`GitHub contribution calendar for ${data.username}`}
            className="overflow-x-auto pb-2"
          >
            <div className="grid w-full min-w-170 grid-cols-53 gap-1.5">
              {data.weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5">
                  {week.map((day) => (
                    <span
                      key={day.date}
                      title={`${day.date}: ${day.count} contribution${
                        day.count === 1 ? "" : "s"
                      } (${LEVEL_LABELS[day.level]})`}
                      aria-label={`${day.date}: ${day.count} contributions`}
                      className={`aspect-square w-full rounded-xs border ${
                        LEVEL_CLASSES[day.level]
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-(--border) bg-(--surface)/40 p-6">
          <p className="text-sm leading-relaxed text-(--muted)">
            Live contribution heatmap is currently unconfigured or unavailable (
            {data.reason ?? "No token configured"}). Per template rules, no fake
            contribution squares or fabricated counts are shown.
          </p>
          <p className="mt-3 text-xs text-(--muted)">
            View verified public activity directly on GitHub:{" "}
            <a
              href={data.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-(--foreground) underline underline-offset-4"
            >
              {data.profileUrl}
            </a>
          </p>
        </div>
      )}
    </section>
  );
}
