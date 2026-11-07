import React from "react";
import type { Metadata } from "next";
import { StackSection } from "@/components/sections/StackSection";
import { stackPageHeader } from "@/content/skills";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: stackPageHeader.title,
  description: stackPageHeader.description,
  path: "/stack",
});

export default function StackPage() {
  return <StackSection headingLevel="h1" isStandalone />;
}

