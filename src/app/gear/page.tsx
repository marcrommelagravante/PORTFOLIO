import React from "react";
import type { Metadata } from "next";
import { GearSection } from "@/components/sections/GearSection";
import { toolkitPageHeader } from "@/content/gear";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: toolkitPageHeader.heading,
  description: toolkitPageHeader.description,
  path: "/gear",
});

export default function GearPage() {
  return <GearSection headingLevel="h1" isStandalone />;
}
