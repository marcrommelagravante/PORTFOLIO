"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RAIL_GROUPS, type RailGroup } from "./SideRail";

export type NavItem = {
  label: string;
  href: string;
};

export function MobileNavigation({
  groups = RAIL_GROUPS,
  items,
}: {
  groups?: RailGroup[];
  items?: NavItem[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-(--border) text-(--foreground) transition-colors hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
      >
        {open ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {open && (
        <nav
          aria-label="Mobile navigation"
          className="absolute top-16 right-0 left-0 z-40 border-b border-(--border) bg-(--background) px-6 py-5 shadow-lg"
        >
          {items ? (
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-1 text-sm font-medium text-(--foreground) hover:text-(--muted)"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col divide-y divide-(--border)/60">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="py-3 first:pt-0 last:pb-0"
                >
                  <p className="mb-1.5 font-mono text-[10px] font-semibold tracking-wider text-(--muted) uppercase">
                    {group.title}
                  </p>
                  <ul className="flex flex-col gap-1">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm font-medium text-(--foreground) transition-colors hover:bg-(--surface)/60 hover:text-(--muted)"
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </nav>
      )}
    </div>
  );
}
