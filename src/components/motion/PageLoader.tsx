"use client";

import React from "react";

/**
 * Restrained non-blocking monogram entrance accent.
 * Never delays access to page content or blocks rendering.
 */
export function PageLoader({ initials }: { initials: string }) {
  return (
    <span className="inline-block font-serif text-sm tracking-widest uppercase transition-opacity duration-300">
      {initials}
    </span>
  );
}
