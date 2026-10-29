import React from "react";
import type { Metadata } from "next";
import { gearItems } from "@/content/gear";
import { GearCard } from "@/components/gear/GearCard";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Gear",
  description: "Hardware, peripherals, and software tools used daily.",
  path: "/gear",
});

export default function GearPage() {
  return (
    <div className="py-14 sm:py-20">
      <header className="border-b border-[var(--border)] pb-10">
        <p className="text-xs font-medium tracking-[0.16em] uppercase text-[var(--muted)]">
          Hardware & Software
        </p>
        <h1 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] font-normal text-[var(--foreground)]">
          Gear
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          Tools, hardware, and environment setup used for software engineering
          and study. Replace the placeholder cards in{" "}
          <code className="rounded bg-[var(--surface)] px-1.5 py-0.5 text-xs">
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
    </div>
  );
}
