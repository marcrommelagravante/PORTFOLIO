import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MobileNavigation, type NavItem } from "./MobileNavigation";
import { PageLoader } from "@/components/motion/PageLoader";

const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Gear", href: "/gear" },
  { label: "Outside the IDE", href: "/outside-the-ide" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-xs">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          aria-label={`${siteConfig.fullName} home`}
          className="text-sm font-semibold tracking-tight text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]"
        >
          <PageLoader initials={siteConfig.initials} />
        </Link>

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileNavigation items={NAV_ITEMS} />
        </div>
      </div>
    </header>
  );
}
