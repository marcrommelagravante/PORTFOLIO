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
      className={`py-14 sm:py-20 ${
        isStandalone ? "" : "border-b border-(--border)"
      }`}
    >
      <header className="border-b border-(--border) pb-8">
        <p className="font-mono text-xs text-(--muted)">Hardware & Software</p>
        <HeadingTag
          id="gear-heading"
          className="mt-2 text-2xl font-semibold tracking-tight text-(--foreground) sm:text-3xl"
        >
          Gear
        </HeadingTag>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-(--muted)">
          Tools, hardware, and environment setup used for software engineering
          and study. Replace the placeholder cards in{" "}
          <code className="rounded bg-(--surface) px-1.5 py-0.5 font-mono text-xs">
            src/content/gear.ts
          </code>{" "}
          with your actual items.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gearItems.map((item) => (
          <GearCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

