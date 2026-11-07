import React from "react";
import { StackSection } from "@/components/sections/StackSection";

export function SkillsPreview({
  headingLevel = "h2",
  isStandalone = false,
}: {
  headingLevel?: "h1" | "h2";
  isStandalone?: boolean;
}) {
  return (
    <StackSection headingLevel={headingLevel} isStandalone={isStandalone} />
  );
}
