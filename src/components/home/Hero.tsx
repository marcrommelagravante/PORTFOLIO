import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { MagneticButton } from "@/components/motion/MagneticButton";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="border-b border-(--border) py-14 sm:py-20"
    >
      <div className="grid items-center gap-10 md:grid-cols-[1fr_280px] md:gap-12 lg:grid-cols-[1fr_310px]">
        <div>
          <p className="font-mono text-xs text-(--muted)">
            {siteConfig.roleEyebrow}
          </p>

          <h1
            id="hero-heading"
            className="mt-4 text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.1] font-semibold tracking-tight text-(--foreground)"
          >
            Hi, I&apos;m {siteConfig.firstName}.
            <br />I build useful things for the web.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-(--muted)">
            {siteConfig.shortIntroduction}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <Link
                href="#selected-work"
                className="inline-flex items-center justify-center rounded-md bg-(--foreground) px-5 py-2.5 text-sm font-medium text-(--background) transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
              >
                Explore my work
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-md border border-(--border) bg-(--surface)/50 px-5 py-2.5 text-sm font-medium text-(--foreground) transition-colors hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
              >
                About me
              </Link>
            </MagneticButton>
          </div>
        </div>

        <div className="mx-auto w-full max-w-70 md:max-w-none">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-lg border border-(--border) bg-(--surface)">
            {siteConfig.profilePhoto ? (
              <Image
                src={siteConfig.profilePhoto}
                alt={siteConfig.profilePhotoAlt}
                fill
                priority
                sizes="(max-width: 768px) 280px, 360px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <span className="font-mono text-2xl font-semibold text-(--foreground)">
                  {siteConfig.initials}
                </span>
                <span className="mt-2 font-mono text-xs text-(--muted)">
                  [PROFILE PHOTO]
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
