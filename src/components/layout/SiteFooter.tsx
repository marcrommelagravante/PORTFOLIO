import React from "react";
import { siteConfig } from "@/content/site";
import { isValidExternalUrl } from "@/lib/validation";

export function SiteFooter() {
  const hasLinkedin = isValidExternalUrl(siteConfig.linkedinUrl);
  const hasResume = Boolean(siteConfig.resumeUrl?.trim());
  const hasEmail = Boolean(siteConfig.contactEmail?.trim());

  return (
    <footer className="border-t border-(--border) bg-(--background)">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 text-sm text-(--muted) sm:flex-row sm:items-center sm:px-8">
        <p>{siteConfig.locationFooterLine}</p>

        <ul className="flex flex-wrap items-center gap-6">
          <li>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-(--foreground) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--foreground)"
            >
              GitHub
            </a>
          </li>

          {hasLinkedin && (
            <li>
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium transition-colors hover:text-(--foreground)"
              >
                LinkedIn
              </a>
            </li>
          )}

          {hasEmail && (
            <li>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="font-medium transition-colors hover:text-(--foreground)"
              >
                Email
              </a>
            </li>
          )}

          {hasResume && (
            <li>
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium transition-colors hover:text-(--foreground)"
              >
                Résumé
              </a>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
}
