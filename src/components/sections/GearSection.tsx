import React from "react";
import {
  toolkitItems,
  toolkitPageHeader,
  type ToolkitItem,
} from "@/content/gear";
import { GearCard } from "@/components/gear/GearCard";

const GRID_SPAN_BY_CLASS: Record<string, string> = {
  "toolkit-monitor":
    "sm:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:row-span-2",
  "toolkit-system-unit": "lg:col-start-2 lg:row-start-1",
  "toolkit-keyboard": "lg:col-start-2 lg:row-start-2",
  "toolkit-headset": "lg:col-start-1 lg:row-start-3",
  "toolkit-mouse": "lg:col-start-2 lg:row-start-3",
};

function getGridPlacementClass(item: ToolkitItem): string {
  if (item.layoutClass && GRID_SPAN_BY_CLASS[item.layoutClass]) {
    return GRID_SPAN_BY_CLASS[item.layoutClass];
  }
  return "";
}

export function GearSection({
  headingLevel = "h2",
  isStandalone = false,
}: {
  headingLevel?: "h1" | "h2";
  isStandalone?: boolean;
}) {
  const HeadingTag = headingLevel;
  const cardHeadingLevel = headingLevel === "h1" ? "h2" : "h3";

  return (
    <section
      id="gear"
      aria-labelledby="gear-heading"
      className={`py-8 sm:py-10 ${
        isStandalone ? "" : "border-b border-(--border)"
      }`}
    >
      <header className="animate-gallery-enter max-w-2xl">
        <HeadingTag
          id="gear-heading"
          className="text-3xl font-semibold tracking-tight text-(--foreground) sm:text-4xl"
        >
          {toolkitPageHeader.heading}
        </HeadingTag>
        <p className="mt-3 text-base leading-relaxed text-(--muted)">
          {toolkitPageHeader.description}
        </p>
      </header>

      <div
        aria-label="The Toolkit equipment showcase"
        className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-[1.3fr_1fr] lg:grid-rows-[255px_255px_255px]"
      >
        {toolkitItems.map((item, index) => (
          <GearCard
            key={item.id}
            item={item}
            index={index}
            headingLevel={cardHeadingLevel}
            className={getGridPlacementClass(item)}
          />
        ))}
      </div>
    </section>
  );
}
