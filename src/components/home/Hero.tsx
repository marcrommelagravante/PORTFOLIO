import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";

export function Hero() {
  const watermarkText = siteConfig.initials.replace(/\.$/, "");

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-8 pb-14 sm:pt-10 sm:pb-20 lg:min-h-[82vh] lg:pt-12 lg:pb-24"
    >
      {/* Oversized decorative background initials */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-14 -left-1 z-0 select-none sm:top-16 sm:-left-2 lg:top-14"
      >
        <span className="font-display block text-[clamp(5.5rem,17.5vw,16.5rem)] leading-[0.82] font-normal tracking-[-0.015em] text-(--watermark) uppercase">
          {watermarkText}
        </span>
      </div>

      {/* Top row: Eyebrow & Developer Badge */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <span aria-hidden="true" className="h-px w-8 bg-(--muted)/60" />
          <p className="font-mono text-[11px] tracking-[0.18em] text-(--muted) uppercase">
            {siteConfig.roleEyebrow}
          </p>
        </div>

        <div className="inline-flex -rotate-6 items-center gap-2.5 rounded-full border border-(--border) bg-(--background)/90 px-4 py-1.5 font-mono text-[10px] font-medium tracking-[0.16em] text-(--foreground) uppercase sm:mt-2 sm:mr-2 sm:text-[11px]">
          <span aria-hidden="true" className="text-(--muted)">
            &lt;/&gt;
          </span>
          <span>DEVELOPER</span>
          <span aria-hidden="true" className="text-(--muted)">
            ·
          </span>
        </div>
      </div>

      {/* Main Hero Grid: Left Editorial Copy, Right Portrait Stage */}
      <div className="relative z-10 mt-12 grid items-end gap-12 sm:mt-20 lg:mt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
        <div className="pb-2 lg:pb-6">
          <h1
            id="hero-heading"
            className="font-display text-[clamp(2.75rem,5.2vw,4.65rem)] leading-[1.04] font-semibold tracking-[-0.02em] text-(--foreground)"
          >
            Hi, I&apos;m {siteConfig.firstName}.
            <br />I build <em className="font-semibold italic">useful</em> things
            <br />
            for the web.
          </h1>

          <p className="mt-7 max-w-[42ch] font-sans text-base leading-[1.65] text-(--muted) sm:text-[17px]">
            {siteConfig.shortIntroduction}
          </p>

          <div className="mt-10 flex items-center gap-5 sm:mt-14">
            <Link
              href="/outside-the-ide"
              className="group inline-flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--foreground)"
            >
              <span className="border-b border-(--foreground)/50 pb-1 font-mono text-xs font-semibold tracking-[0.14em] text-(--foreground) uppercase transition-colors group-hover:border-(--foreground)">
                MORE ABOUT ME
              </span>
              <span
                aria-hidden="true"
                className="font-mono text-sm text-(--foreground) transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <span
              aria-hidden="true"
              className="h-px w-24 bg-(--border) sm:w-40"
            />
          </div>
        </div>

        {/* Right Portrait Stage (empty picture slot first, ready to populate) */}
        <div className="relative mx-auto w-full max-w-[360px] sm:max-w-[420px] lg:mr-0 lg:ml-auto lg:max-w-[460px]">
          <div className="relative aspect-[460/500] w-full">
            {/* Restrained soft neutral backing shape with curved bottom silhouette */}
            <svg
              aria-hidden="true"
              viewBox="0 0 460 500"
              fill="none"
              className="pointer-events-none absolute inset-0 h-full w-full text-(--watermark)"
            >
              <path
                d="M88 228C88 192 116 166 154 166H255C280 166 295 150 305 132C315 114 332 104 360 104H396C428 104 450 126 450 158V340C450 374 430 398 394 412L220 468C175 482 120 486 68 486C30 486 14 456 30 420L88 298Z"
                fill="currentColor"
              />
            </svg>

            {siteConfig.profilePhoto ? (
              <div className="relative z-10 h-full w-full">
                <Image
                  src={siteConfig.profilePhoto}
                  alt={siteConfig.profilePhotoAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 360px, 460px"
                  className="object-contain object-bottom select-none"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
