import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export function createPageMetadata(options?: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const siteTitle = `${siteConfig.fullName} — Portfolio`;
  const fullTitle = options?.title
    ? `${options.title} · ${siteConfig.fullName}`
    : siteTitle;
  const description =
    options?.description || siteConfig.shortIntroduction;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  return {
    title: fullTitle,
    description,
    ...(baseUrl && options?.path
      ? {
          alternates: {
            canonical: `${baseUrl.replace(/\/$/, "")}${options.path}`,
          },
        }
      : {}),
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
    },
  };
}
