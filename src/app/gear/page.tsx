import React from "react";
import type { Metadata } from "next";
import { GearSection } from "@/components/sections/GearSection";
import { BackToHome } from "@/components/layout/BackToHome";
import { toolkitPageHeader } from "@/content/gear";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: toolkitPageHeader.heading,
  description: toolkitPageHeader.description,
  path: "/gear",
});

export default function GearPage() {
  return (
    <div className="pt-8 sm:pt-10">
      <div className="mb-4 sm:mb-6">
        <BackToHome />
      </div>
      <GearSection headingLevel="h1" isStandalone />
    </div>
  );
}
