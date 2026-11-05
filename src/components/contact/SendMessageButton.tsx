"use client";

import React from "react";
import { useContactPanel } from "./ContactPanelProvider";
import { PenIcon } from "./ContactIcons";

export type SendMessageButtonProps = {
  variant?: "hero" | "rail" | "rail-collapsed" | "mobile-header";
  className?: string;
  children?: React.ReactNode;
};

export function SendMessageButton({
  variant = "hero",
  className = "",
  children,
}: SendMessageButtonProps) {
  const { open } = useContactPanel();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    open(e.currentTarget);
  };

  if (variant === "rail-collapsed") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label="Send message"
        className={`group relative mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-(--foreground) text-(--background) transition-colors hover:bg-(--surface) hover:text-(--foreground) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground) ${className}`}
      >
        <PenIcon className="h-4 w-4 shrink-0" />
        <span
          role="tooltip"
          className="pointer-events-none absolute top-1/2 left-full z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-(--border) bg-(--surface) px-2.5 py-1 text-xs font-medium text-(--foreground) opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          Send message
        </span>
      </button>
    );
  }

  if (variant === "rail") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-(--foreground) px-4 text-sm font-medium text-(--background) transition-colors hover:bg-(--surface) hover:text-(--foreground) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground) ${className}`}
      >
        <PenIcon className="h-4 w-4 shrink-0" />
        <span>Send message</span>
      </button>
    );
  }

  if (variant === "mobile-header") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label="Send message"
        className={`inline-flex h-9 w-9 items-center justify-center rounded-md border border-(--border) text-(--foreground) transition-colors hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground) ${className}`}
      >
        <PenIcon className="h-4 w-4 shrink-0" />
      </button>
    );
  }

  // Default: hero
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-(--foreground) px-7 text-sm font-medium text-(--background) transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground) sm:text-base ${className}`}
    >
      {children || (
        <>
          <span>Send message</span>
          <span aria-hidden="true">→</span>
        </>
      )}
    </button>
  );
}

