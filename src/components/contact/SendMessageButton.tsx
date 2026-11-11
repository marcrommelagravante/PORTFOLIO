"use client";

import React from "react";
import { useContactPanel } from "./ContactPanelProvider";
import { PaperPlaneIcon, PenIcon } from "./ContactIcons";

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
  const { isOpen, toggle } = useContactPanel();

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggle(e.currentTarget);
  };

  if (variant === "rail-collapsed") {
    return (
      <button
        type="button"
        onClick={handleToggle}
        aria-label="Send message"
        aria-expanded={isOpen}
        className={`group relative mx-auto flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground) ${
          isOpen
            ? "border-(--border) bg-(--surface) text-(--foreground)"
            : "border-(--foreground) bg-(--foreground) text-(--background) hover:border-(--border) hover:bg-(--surface) hover:text-(--foreground)"
        } ${className}`}
      >
        <span className="block motion-safe:group-hover:animate-[rail-send-fly_0.6s_ease-in-out_infinite_alternate]">
          <PaperPlaneIcon
            className={`h-4.5 w-4.5 shrink-0 origin-center transition-transform duration-300 ease-in-out motion-safe:group-hover:rotate-45 motion-safe:group-hover:scale-110 ${
              isOpen ? "motion-safe:rotate-45" : ""
            }`}
          />
        </span>
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
        onClick={handleToggle}
        aria-expanded={isOpen}
        className={`group flex min-h-11.5 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border px-4 text-sm font-medium transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground) ${
          isOpen
            ? "border-(--border) bg-(--surface) text-(--foreground)"
            : "border-(--foreground) bg-(--foreground) text-(--background) hover:border-(--border) hover:bg-(--surface) hover:text-(--foreground)"
        } ${className}`}
      >
        <span className="shrink-0">
          <span className="block motion-safe:group-hover:animate-[rail-send-fly_0.6s_ease-in-out_infinite_alternate]">
            <PaperPlaneIcon className="h-4.5 w-4.5 shrink-0 origin-center transition-transform duration-300 ease-in-out motion-safe:group-hover:translate-x-13 motion-safe:group-hover:rotate-45 motion-safe:group-hover:scale-110" />
          </span>
        </span>
        <span className="block whitespace-nowrap transition-transform duration-300 ease-in-out motion-safe:group-hover:translate-x-40">
          Send message
        </span>
      </button>
    );
  }

  if (variant === "mobile-header") {
    return (
      <button
        type="button"
        onClick={handleToggle}
        aria-label="Send message"
        aria-expanded={isOpen}
        className={`inline-flex h-9 w-9 items-center justify-center rounded-md border border-(--border) text-(--foreground) transition-colors hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground) ${
          isOpen ? "bg-(--surface)" : ""
        } ${className}`}
      >
        <PenIcon className="h-4 w-4 shrink-0" />
      </button>
    );
  }

  // Default: hero
  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-expanded={isOpen}
      className={`inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-full bg-(--foreground) px-7 text-sm font-medium text-(--background) transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground) sm:text-base ${className}`}
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

