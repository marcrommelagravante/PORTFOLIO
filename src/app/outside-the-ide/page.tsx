import React from "react";
import type { Metadata } from "next";
import { InterestsSection } from "@/components/sections/InterestsSection";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Outside the IDE",
  description: "Personal interests and activities outside software engineering.",
  path: "/outside-the-ide",
});

export default function OutsideTheIdePage() {
  return <InterestsSection headingLevel="h1" isStandalone />;
}
