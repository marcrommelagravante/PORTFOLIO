"use client";

import React, { useState, useRef, useEffect } from "react";

export type ContactCardProps = {
  label: string;
  description: string;
  icon: React.ReactNode;
  tag?: string;
  href?: string;
  download?: boolean;
  external?: boolean;
  copyValue?: string;
  ariaLabel?: string;
};

export function ContactCard({
  label,
  description,
  icon,
  tag = "↗",
  href,
  download = false,
  external = false,
  copyValue,
  ariaLabel,
}: ContactCardProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Do not render if neither href nor copyValue is configured
  if (!href && !copyValue) {
    return null;
  }

  const handleCopy = async () => {
    if (!copyValue) return;

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(copyValue);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = copyValue;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Ignore copy error
    }
  };

  const sharedClasses =
    "group flex min-h-37.5 flex-col justify-between rounded-2xl border border-(--border) bg-(--surface)/40 p-5.5 text-left transition-colors duration-200 hover:border-(--foreground) hover:bg-(--foreground) hover:text-(--background) focus-visible:border-(--foreground) focus-visible:bg-(--foreground) focus-visible:text-(--background) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground) cursor-pointer";

  const currentTag = copied ? "Copied" : href ? tag : copyValue ? "Copy" : tag;

  const cardContent = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--surface) text-(--foreground) transition-colors duration-200 group-hover:bg-(--background) group-hover:text-(--foreground) group-focus-visible:bg-(--background) group-focus-visible:text-(--foreground)">
          {icon}
        </div>
        <span className="font-mono text-[11px] text-(--muted) transition-colors duration-200 group-hover:text-(--background)/80 group-focus-visible:text-(--background)/80">
          {currentTag}
        </span>
      </div>

      <div className="mt-4 flex flex-col">
        <h2 className="text-base font-semibold tracking-tight text-(--foreground) transition-colors duration-200 group-hover:text-(--background) group-focus-visible:text-(--background)">
          {label}
        </h2>
        <p className="mt-1 text-[13.5px] leading-snug text-(--muted) transition-colors duration-200 group-hover:text-(--background)/80 group-focus-visible:text-(--background)/80">
          {description}
        </p>
      </div>

      {copyValue && (
        <span className="sr-only" aria-live="polite">
          {copied ? `${label} username copied to clipboard` : ""}
        </span>
      )}
    </>
  );

  if (!href && copyValue) {
    const defaultAriaLabel = `Discord — Copy my username. (copies to clipboard)`;
    return (
      <button
        type="button"
        onClick={handleCopy}
        aria-label={ariaLabel || defaultAriaLabel}
        className={sharedClasses}
      >
        {cardContent}
      </button>
    );
  }

  const defaultActionHint = download
    ? "downloads file"
    : external
      ? "opens in new tab"
      : "opens mail app";
  const defaultAriaLabel = `${label} — ${description} (${defaultActionHint})`;

  return (
    <a
      href={href}
      onClick={copyValue ? handleCopy : undefined}
      download={download ? true : undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel || defaultAriaLabel}
      className={sharedClasses}
    >
      {cardContent}
    </a>
  );
}
