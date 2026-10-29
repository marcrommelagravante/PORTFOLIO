import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: `Get in touch with ${siteConfig.fullName}.`,
  path: "/contact",
});

export default function ContactPage() {
  const isConfigured = Boolean(
    process.env.CONTACT_PROVIDER_API_KEY?.trim() &&
      process.env.CONTACT_TO_EMAIL?.trim()
  );
  const hasEmail = Boolean(siteConfig.contactEmail?.trim());

  return (
    <div className="py-14 sm:py-20">
      <header className="border-b border-[var(--border)] pb-10">
        <p className="text-xs font-medium tracking-[0.16em] uppercase text-[var(--muted)]">
          Get in Touch
        </p>
        <h1 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] font-normal text-[var(--foreground)]">
          Contact
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          Have a question, project idea, or opportunity to discuss? Send a
          message below or connect via GitHub.
        </p>
      </header>

      <div className="mt-10 grid gap-12 md:grid-cols-[1.35fr_0.65fr]">
        <ContactForm isConfigured={isConfigured} />

        <aside className="space-y-6 rounded-lg border border-[var(--border)] bg-[var(--surface)]/40 p-6 h-fit">
          <div>
            <h2 className="text-xs font-medium tracking-[0.16em] uppercase text-[var(--muted)]">
              Direct Profiles
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li>
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)] underline underline-offset-4"
                >
                  GitHub (@{siteConfig.githubUsername}) ↗
                </a>
              </li>
              {hasEmail ? (
                <li>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="text-[var(--foreground)] underline underline-offset-4"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </li>
              ) : (
                <li className="text-xs text-[var(--muted)]">
                  Direct email: <code>[CONTACT EMAIL]</code> (configure in{" "}
                  <code>src/content/site.ts</code>)
                </li>
              )}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
