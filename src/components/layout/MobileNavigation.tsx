"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { RAIL_GROUPS, getPathnameRailId } from "./SideRail";
import { TransitionLink } from "@/components/transition/TransitionLink";

const NAV_ITEMS = RAIL_GROUPS.flatMap((group) =>
  group.items.map((item) => ({
    ...item,
    title: group.title,
  }))
);

export function MobileNavigation() {
  const pathname = usePathname();
  const activeId = getPathnameRailId(pathname);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className={`relative z-20 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-(--border) text-(--foreground) transition-colors hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground) ${
          open ? "bg-(--surface)" : "bg-(--background)"
        }`}
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

      <nav
        id={menuId}
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={!open}
        className="pointer-events-none absolute top-0 right-0 z-10 w-56"
      >
        <ul className="relative m-0 list-none p-0">
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeId === item.id;
            const translateY = open ? 44 + index * 64 : 0;
            const delay = open
              ? index * 30
              : (NAV_ITEMS.length - 1 - index) * 30;

            return (
              <li
                key={item.id}
                className={`absolute top-0 right-0 w-full origin-top-right will-change-transform transition-[transform,opacity] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${
                  open ? "duration-300" : "[transition-duration:300ms,350ms]"
                }`}
                style={{
                  transform: `translateY(${translateY}px) scale(${open ? 1 : 0.92})`,
                  opacity: open ? 1 : 0,
                  zIndex: NAV_ITEMS.length - index,
                  transitionDelay: `${delay}ms`,
                }}
              >
                <TransitionLink
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex h-14 w-full items-center gap-3 rounded-full border p-1.5 pr-4 shadow-md shadow-black/8 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground) dark:shadow-black/40 ${
                    open ? "pointer-events-auto" : "pointer-events-none"
                  } ${
                    isActive
                      ? "border-(--foreground) bg-(--foreground) text-(--background)"
                      : "border-(--border) bg-(--surface) text-(--foreground) hover:border-(--foreground)/30 hover:bg-(--background)"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105 group-hover:[&_svg]:stroke-[2.2] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
                      isActive
                        ? "bg-(--background)/15 text-(--background)"
                        : "bg-(--foreground)/6 text-(--foreground)"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span className="flex min-w-0 flex-1 flex-col text-left">
                    <span
                      className={`truncate font-mono text-[10px] leading-tight font-semibold tracking-wider uppercase ${
                        isActive ? "text-(--background)/75" : "text-(--muted)"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="truncate text-sm leading-tight font-medium">
                      {item.label}
                    </span>
                  </span>
                </TransitionLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
