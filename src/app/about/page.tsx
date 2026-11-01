import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { AboutSection } from "@/components/sections/AboutSection";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description: `Professional biography and focus areas of ${siteConfig.fullName}.`,
  path: "/about",
});

export default function AboutPage() {
  return <AboutSection headingLevel="h1" showStack isStandalone />;
}
