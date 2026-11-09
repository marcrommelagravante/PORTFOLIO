"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import {
  ContactCard,
  type ContactCardProps,
} from "@/components/contact/ContactCard";
import {
  DiscordIcon,
  EmailIcon,
  FacebookIcon,
  GitHubIcon,
  LinkedInIcon,
  ResumeIcon,
} from "@/components/contact/ContactIcons";
import { SendMessageButton } from "@/components/contact/SendMessageButton";
import { isValidExternalUrl } from "@/lib/validation";

export function ContactSection({
  headingLevel = "h1",
  isStandalone = false,
  className = "",
}: {
  headingLevel?: "h1" | "h2";
  isStandalone?: boolean;
  className?: string;
}) {
  const HeadingTag = headingLevel;

  const email = siteConfig.contactEmail?.trim();
  const discordUrl = siteConfig.discordUrl?.trim();
  const discordHandle = siteConfig.discordHandle?.trim();
  const resumeUrl = siteConfig.resumeUrl?.trim();

  // Six cards in strict order: Email, LinkedIn, Discord, Facebook, GitHub, Resume
  // Unconfigured cards are filtered out so they do not render on a live page
  const potentialCards: (ContactCardProps | null)[] = [
    email
      ? {
          label: "Email",
          description: "Opens your mail app",
          href: `mailto:${email}`,
          icon: <EmailIcon />,
          tag: "↗",
          external: false,
          ariaLabel: "Email — Opens your mail app. (opens mail app)",
        }
      : null,
    isValidExternalUrl(siteConfig.linkedinUrl)
      ? {
          label: "LinkedIn",
          description: "Connect and message me",
          href: siteConfig.linkedinUrl,
          icon: <LinkedInIcon />,
          tag: "↗",
          external: true,
          ariaLabel: "LinkedIn — Connect and message me. (opens in new tab)",
        }
      : null,
    isValidExternalUrl(discordUrl)
      ? {
          label: "Discord",
          description: discordHandle
            ? `@${discordHandle.replace(/^@/, "")}`
            : "Direct message on Discord",
          href: discordUrl,
          icon: <DiscordIcon />,
          tag: "↗",
          external: true,
          copyValue: discordHandle,
          ariaLabel: "Discord — Open profile and message me. (opens in new tab)",
        }
      : discordHandle
        ? {
            label: "Discord",
            description: `@${discordHandle.replace(/^@/, "")}`,
            icon: <DiscordIcon />,
            tag: "Copy",
            copyValue: discordHandle,
            ariaLabel: "Discord — Copy my username. (copies to clipboard)",
          }
        : null,
    isValidExternalUrl(siteConfig.facebookUrl)
      ? {
          label: "Facebook",
          description: "Message me on Messenger",
          href: siteConfig.facebookUrl,
          icon: <FacebookIcon />,
          tag: "↗",
          external: true,
          ariaLabel: "Facebook — Message me on Messenger. (opens in new tab)",
        }
      : null,
    isValidExternalUrl(siteConfig.githubUrl)
      ? {
          label: "GitHub",
          description: "Code, commits and projects",
          href: siteConfig.githubUrl,
          icon: <GitHubIcon />,
          tag: "↗",
          external: true,
          ariaLabel: "GitHub — Code, commits and projects. (opens in new tab)",
        }
      : null,
    resumeUrl
      ? {
          label: "Resume",
          description: "Download my CV as a PDF",
          href: resumeUrl,
          download: true,
          icon: <ResumeIcon />,
          tag: "PDF",
          ariaLabel: "Resume — Download my CV as a PDF. (downloads file)",
        }
      : null,
  ];

  const cards = potentialCards.filter(
    (card): card is ContactCardProps => card !== null
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={`pb-10 sm:pb-16 ${isStandalone ? "pt-0" : "pt-10 sm:pt-16"} ${className}`}
    >
      {/* Hero */}
      <header className="flex flex-col items-start">
        <HeadingTag
          id="contact-heading"
          className="font-display text-3xl leading-[1.08] font-semibold tracking-[-0.02em] text-(--foreground) sm:text-[40px]"
        >
          {siteConfig.contactPage.title}
        </HeadingTag>

        <div className="mt-8">
          <SendMessageButton variant="hero" />
        </div>
      </header>

      {/* Channel Grid */}
      {cards.length > 0 && (
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <ContactCard key={card.label} {...card} />
          ))}
        </div>
      )}
    </section>
  );
}
