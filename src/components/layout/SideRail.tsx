"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { PageLoader } from "@/components/motion/PageLoader";
import { SendMessageButton } from "@/components/contact/SendMessageButton";
import { TransitionLink } from "@/components/transition/TransitionLink";

export type RailItemId =
  | "home"
  | "projects"
  | "gear"
  | "outside-the-ide"
  | "contact";

export type RailItem = {
  id: RailItemId;
  label: string;
  href: string;
  icon: React.ReactNode;
};

export type RailGroup = {
  id: string;
  title: string;
  items: RailItem[];
};

const SIDEBAR_STORAGE_KEY = "portfolio-sidebar-collapsed";

function HomeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4.5 w-4.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4.5 w-4.5 shrink-0"
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
      className="h-4.5 w-4.5 shrink-0"
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

function MonitorIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4.5 w-4.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4.5 w-4.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4.5 w-4.5 shrink-0"
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

function SidebarToggleIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4.5 w-4.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
      {collapsed ? (
        <path d="m13 9 3 3-3 3" />
      ) : (
        <path d="m16 9-3 3 3 3" />
      )}
    </svg>
  );
}

export const RAIL_GROUPS: RailGroup[] = [
  {
    id: "general",
    title: "General",
    items: [
      { id: "home", label: "Home", href: "/", icon: <HomeIcon /> },
    ],
  },
  {
    id: "portfolio",
    title: "Portfolio",
    items: [
      {
        id: "projects",
        label: "Projects",
        href: "/projects",
        icon: <FolderIcon />,
      },
    ],
  },
  {
    id: "workspace",
    title: "My Workspace",
    items: [
      { id: "gear", label: "The Toolkit", href: "/gear", icon: <MonitorIcon /> },
    ],
  },
  {
    id: "beyond",
    title: "Beyond Development",
    items: [
      {
        id: "outside-the-ide",
        label: "More About Me",
        href: "/outside-the-ide",
        icon: <UserIcon />,
      },
    ],
  },
  {
    id: "connect",
    title: "Let’s Work Together",
    items: [
      { id: "contact", label: "Contact", href: "/contact", icon: <MailIcon /> },
    ],
  },
];

export const RAIL_ITEMS: RailItem[] = RAIL_GROUPS.flatMap(
  (group) => group.items
);

function getPathnameRailId(pathname: string): RailItemId {
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/gear")) return "gear";
  if (pathname.startsWith("/outside-the-ide")) return "outside-the-ide";
  if (pathname.startsWith("/contact")) return "contact";
  return "home";
}

export function SideRail() {
  const pathname = usePathname();
  const activeId = getPathnameRailId(pathname);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
      const collapsed = stored === "true";
      setIsCollapsed(collapsed);
      document.documentElement.dataset.sidebarCollapsed = collapsed
        ? "true"
        : "false";
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
      } catch {
        // Ignore storage errors
      }
      document.documentElement.dataset.sidebarCollapsed = next
        ? "true"
        : "false";
      return next;
    });
  };

  return (
    <aside
      aria-label="Editorial side navigation"
      className={`fixed top-6 bottom-6 left-6 z-40 my-auto hidden max-h-195 flex-col justify-between rounded-3xl border border-(--border) bg-(--surface)/55 py-5 backdrop-blur-xs transition-[width] duration-200 ease-out lg:flex ${isCollapsed ? "w-16" : "w-56"
        }`}
    >
      {/* Header */}
      <div
        className={` flex items-center border-b border-(--border)/80 pb-4 ${isCollapsed ? "justify-center px-2" : "justify-between px-5"
          }`}
      >
        {!isCollapsed && (
          <TransitionLink
            href="/"
            aria-label={`${siteConfig.fullName} home`}
            className="inline-block text-lg font-bold tracking-tight text-(--foreground) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--foreground)"
          >
            <PageLoader initials={siteConfig.initials} />
          </TransitionLink>
        )}

        <button
          type="button"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!isCollapsed}
          className="group relative inline-flex h-8 w-8 items-center justify-center rounded-lg text-(--muted) transition-colors hover:bg-(--foreground)/8 hover:text-(--foreground) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
        >
          <SidebarToggleIcon collapsed={isCollapsed} />
          {isCollapsed && (
            <span
              role="tooltip"
              className="pointer-events-none absolute top-1/2 left-full z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-(--border) bg-(--surface) px-2.5 py-1 text-xs font-medium text-(--foreground) opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              Expand sidebar
            </span>
          )}
        </button>
      </div>

      {/* Send Message Button */}
      <div className={`pt-3 pb-1 ${isCollapsed ? "px-2" : "px-3"}`}>
        <SendMessageButton
          variant={isCollapsed ? "rail-collapsed" : "rail"}
        />
      </div>

      {/* Grouped Navigation */}
      <nav
        aria-label="Main navigation"
        className="my-auto flex flex-col py-2"
      >
        {RAIL_GROUPS.map((group, groupIndex) => (
          <div
            key={group.id}
            className={
              groupIndex > 0
                ? `border-t border-(--border)/60 ${isCollapsed ? "mt-2 pt-2" : "mt-2.5 pt-2.5"
                }`
                : ""
            }
          >
            <p
              className={
                isCollapsed
                  ? "sr-only"
                  : "mb-1 px-5 font-mono text-[10px] font-semibold tracking-wider text-(--muted) uppercase"
              }
            >
              {group.title}
            </p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id} className="relative px-2.5">
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute top-1.5 bottom-1.5 left-0 w-1 rounded-r-full bg-(--foreground)"
                      />
                    )}
                    <TransitionLink
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      aria-label={isCollapsed ? item.label : undefined}
                      className={`group relative flex items-center rounded-xl text-sm transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--foreground) ${isCollapsed
                          ? "justify-center p-2.5"
                          : "gap-3 px-3 py-2"
                        } ${isActive
                          ? "bg-(--foreground)/8 font-semibold text-(--foreground)"
                          : "font-normal text-(--muted) hover:bg-(--foreground)/5 hover:text-(--foreground)"
                        }`}
                    >
                      {item.icon}
                      {!isCollapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                      {isCollapsed && (
                        <span
                          role="tooltip"
                          className="pointer-events-none absolute top-1/2 left-full z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-(--border) bg-(--surface) px-2.5 py-1 text-xs font-medium text-(--foreground) opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                        >
                          {item.label}
                        </span>
                      )}
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer Theme Toggle */}
      <div
        className={`flex justify-center border-t border-(--border)/80 pt-4 ${isCollapsed ? "px-2" : "px-5"
          }`}
      >
        <ThemeToggle variant={isCollapsed ? "rail-collapsed" : "rail"} />
      </div>
    </aside>
  );
}
