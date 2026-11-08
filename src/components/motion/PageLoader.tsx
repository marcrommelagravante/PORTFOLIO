"use client";

import React from "react";

/**
 * Restrained non-blocking monogram entrance accent.
 * Never delays access to page content or blocks rendering.
 */
export function PageLoader({ initials }: { initials: string }) {
  return (
    <span className="font-display inline-block text-xl font-bold tracking-tight transition-opacity duration-300">
      {initials}
    </span>
  );
}
