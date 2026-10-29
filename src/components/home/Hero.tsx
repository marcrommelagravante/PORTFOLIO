import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { MagneticButton } from "@/components/motion/MagneticButton";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="border-b border-[var(--border)] py-14 sm:py-20"
    >
      <div className="grid items-center gap-10 md:grid-cols-[1.35fr_0.65fr] md:gap-12">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] uppercase text-[var(--muted)]">
            {siteConfig.roleEyebrow}
          </p>

          <h1
            id="hero-heading"
            className="mt-4 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.12] font-normal tracking-tight text-[var(--foreground)]"
          >
            Hi, I&apos;m {siteConfig.firstName}.
            <br />I build useful things for the web.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)]">
            {siteConfig.shortIntroduction}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <Link
                href="#selected-work"
                className="inline-flex items-center justify-center rounded-md bg-[var(--foreground)] px-5 py-2.5 text-xs font-medium tracking-[0.14em] uppercase text-[var(--background)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
              >
                Explore my work
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)]/50 px-5 py-2.5 text-xs font-medium tracking-[0.14em] uppercase text-[var(--foreground)] transition-colors hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
              >
                About me
              </Link>
            </MagneticButton>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[280px] md:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
            {siteConfig.profilePhoto ? (
              <Image
                src={siteConfig.profilePhoto}
                alt={siteConfig.profilePhotoAlt}
                fill
                priority
                sizes="(max-width: 768px) 280px, 320px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <span className="font-serif text-3xl text-[var(--foreground)]">
                  {siteConfig.initials}
                </span>
                <span className="mt-2 text-xs tracking-widest uppercase text-[var(--muted)]">
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
