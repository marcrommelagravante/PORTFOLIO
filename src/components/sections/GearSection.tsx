import React from "react";
import { gearItems } from "@/content/gear";
import { GearCard } from "@/components/gear/GearCard";

export function GearSection({
  headingLevel = "h2",
  isStandalone = false,
}: {
  headingLevel?: "h1" | "h2";
  isStandalone?: boolean;
}) {
  const HeadingTag = headingLevel;

  return (
    <section
      id="gear"
      aria-labelledby="gear-heading"
      className={`py-10 sm:py-12 ${isStandalone ? "" : "border-b border-(--border)"
        }`}
    >
      <header>
        <HeadingTag
          id="gear-heading"
          className="text-2xl font-semibold tracking-tight text-(--foreground) sm:text-3xl"
        >
          Gear
        </HeadingTag>
      </header>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gearItems.map((item) => (
          <GearCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

