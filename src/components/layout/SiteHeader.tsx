import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MobileNavigation } from "./MobileNavigation";
import { PageLoader } from "@/components/motion/PageLoader";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-(--border) bg-(--background)/95 backdrop-blur-xs lg:hidden">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6 sm:px-8">
        <Link
          href="/#home"
          aria-label={`${siteConfig.fullName} home`}
          className="text-base font-bold tracking-tight text-(--foreground) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--foreground)"
        >
          <PageLoader initials={siteConfig.initials} />
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
