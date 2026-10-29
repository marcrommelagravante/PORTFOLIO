"use client";

import React, { useEffect, useState } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) {
      return;
    }

    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        transform: `translate3d(${pos.x - 10}px, ${pos.y - 10}px, 0)`,
      }}
      className="pointer-events-none fixed top-0 left-0 z-50 hidden h-5 w-5 rounded-full border border-[var(--muted)] opacity-50 transition-transform duration-75 ease-out md:block"
    />
  );
}
