"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import { useTheme } from "@/components/theme/ThemeProvider";
import { PageLoader } from "@/components/motion/PageLoader";

type RailItemId =
  | "home"
  | "about"
  | "projects"
  | "gear"
  | "outside-the-ide"
  | "contact";

type RailItem = {
  id: RailItemId;
  label: string;
  href: string;
  icon: React.ReactNode;
};

const SECTION_IDS = [
  "home",
  "about",
  "projects",
  "skills",
  "github",
  "gear",
  "outside-the-ide",
  "contact",
] as const;

const SECTION_TO_RAIL: Record<(typeof SECTION_IDS)[number], RailItemId> = {
  home: "home",
  about: "about",
  projects: "projects",
  skills: "projects",
  github: "projects",
  gear: "gear",
  "outside-the-ide": "outside-the-ide",
  contact: "contact",
};

function HomeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9v11h5v-6h4v6h5V9" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20c0-3.87 3.13-7 7-7s7 3.13 7 7" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    </svg>
  );
}

function CubeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05" />
      <path d="M12 22.08V12" />
    </svg>
  );
}

function GamepadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" y1="12" x2="10" y2="12" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <line x1="15" y1="13" x2="15.01" y2="13" />
      <line x1="18" y1="11" x2="18.01" y2="11" />
      <rect x="2" y="6" width="20" height="12" rx="4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export const RAIL_ITEMS: RailItem[] = [
  { id: "home", label: "Home", href: "/#home", icon: <HomeIcon /> },
  { id: "about", label: "About", href: "/#about", icon: <UserIcon /> },
  {
    id: "projects",
    label: "Projects",
    href: "/#projects",
    icon: <FolderIcon />,
  },
  { id: "gear", label: "Gear", href: "/#gear", icon: <CubeIcon /> },
  {
    id: "outside-the-ide",
    label: "Outside the IDE",
    href: "/#outside-the-ide",
    icon: <GamepadIcon />,
  },
  { id: "contact", label: "Contact", href: "/#contact", icon: <MailIcon /> },
];

function getPathnameRailId(pathname: string): RailItemId {
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/gear")) return "gear";
  if (pathname.startsWith("/outside-the-ide")) return "outside-the-ide";
  if (pathname.startsWith("/contact")) return "contact";
  return "home";
}

export function SideRail() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [activeId, setActiveId] = useState<RailItemId>("home");

  useEffect(() => {
    if (pathname !== "/") {
      setActiveId(getPathnameRailId(pathname));
      return;
    }

    let rafId = 0;

    const updateActiveSection = () => {
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight - scrollBottom <= 40) {
        setActiveId("contact");
        return;
      }

      const triggerLine = window.innerHeight * 0.32;
      let currentSection: (typeof SECTION_IDS)[number] = "home";

      for (const secId of SECTION_IDS) {
        const el = document.getElementById(secId);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerLine) {
          currentSection = secId;
        }
      }

      setActiveId(SECTION_TO_RAIL[currentSection]);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <aside
      aria-label="Editorial side navigation"
      className="fixed top-4 bottom-4 left-4 z-40 my-auto hidden max-h-145 w-38 flex-col justify-between rounded-2xl border border-(--border) bg-(--surface)/55 py-6 backdrop-blur-xs lg:flex"
    >
      <div className="border-b border-(--border)/80 px-4 pb-5 text-center">
        <Link
          href="/#home"
          onClick={() => setActiveId("home")}
          aria-label={`${siteConfig.fullName} home`}
          className="inline-block text-base font-semibold tracking-tight text-(--foreground) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--foreground)"
        >
          <PageLoader initials={siteConfig.initials} />
        </Link>
      </div>

      <nav aria-label="Main navigation" className="my-auto py-3">
        <ul className="flex flex-col gap-1.5">
          {RAIL_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className="relative">
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 bottom-1.5 left-0 w-[3px] rounded-r-full bg-(--foreground)"
                  />
                )}
                <Link
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActiveId(item.id)}
                  className={`flex items-center gap-2.5 px-4 py-2 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-(--foreground) ${
                    isActive
                      ? "font-semibold text-(--foreground)"
                      : "font-normal text-(--muted) hover:text-(--foreground)"
                  }`}
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-(--border)/80 px-4 pt-4">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
          }
          className="mx-auto flex items-center justify-center gap-3 rounded-lg px-3 py-1.5 text-(--muted) transition-colors hover:bg-(--background)/50 hover:text-(--foreground) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={`h-4 w-4 transition-opacity ${
              theme === "light"
                ? "text-(--foreground) opacity-100"
                : "opacity-45"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={`h-4 w-4 transition-opacity ${
              theme === "dark"
                ? "text-(--foreground) opacity-100"
                : "opacity-45"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </div>
    </aside>
  );
}

