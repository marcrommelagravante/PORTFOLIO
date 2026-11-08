import React from "react";
import { toolkitItems, toolkitPageHeader } from "@/content/gear";
import { GearCard } from "@/components/gear/GearCard";

export function GearSection({
  headingLevel = "h2",
  isStandalone = false,
  className = "",
}: {
  headingLevel?: "h1" | "h2";
  isStandalone?: boolean;
  className?: string;
}) {
  const HeadingTag = headingLevel;
  const cardHeadingLevel = headingLevel === "h1" ? "h2" : "h3";

  return (
    <section
      id="gear"
      aria-labelledby="gear-heading"
      className={`pb-12 sm:pb-16 ${isStandalone ? "pt-0" : "pt-8 sm:pt-10"} ${className}`}
    >
      <header className="animate-gallery-enter mb-8 max-w-2xl sm:mb-10">
        <HeadingTag
          id="gear-heading"
          className="font-display text-3xl leading-[1.08] font-semibold tracking-[-0.02em] text-(--foreground) sm:text-[42px]"
        >
          {toolkitPageHeader.heading}
        </HeadingTag>
      </header>

      <div
        aria-label="My Gear equipment showcase"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6"
      >
        {toolkitItems.map((item, index) => (
          <GearCard
            key={item.id}
            item={item}
            index={index}
            headingLevel={cardHeadingLevel}
          />
        ))}
      </div>
    </section>
  );
}
