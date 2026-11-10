"use client";

import React from "react";
import { TransitionLink } from "@/components/transition/TransitionLink";

export type BackToHomeProps = {
  className?: string;
  label?: string;
};

export function BackToHome({
  className = "",
  label = "Home",
}: BackToHomeProps) {
  return (
    <TransitionLink
      href="/"
      className={`group inline-flex items-center gap-2 text-sm font-medium text-(--muted) transition-colors hover:text-(--foreground) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground) ${className}`}
    >
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:-translate-x-1"
      >
        ←
      </span>
      <span>{label}</span>
    </TransitionLink>
  );
}
