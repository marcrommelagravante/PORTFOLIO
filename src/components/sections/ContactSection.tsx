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
  LinkedInIcon,
} from "@/components/contact/ContactIcons";
import { isValidExternalUrl } from "@/lib/validation";

export function ContactSection({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const HeadingTag = headingLevel;
  const email = siteConfig.contactEmail?.trim();
  const cards: ContactCardProps[] = [
    {
      label: "Email",
      description: "Send me an email anytime.",
      href: email ? `mailto:${email}` : undefined,
      icon: <EmailIcon />,
      external: false,
    },
    {
      label: "LinkedIn",
      description: "Connect and let's discuss opportunities.",
      href: isValidExternalUrl(siteConfig.linkedinUrl)
        ? siteConfig.linkedinUrl
        : undefined,
      icon: <LinkedInIcon />,
      external: true,
    },
    {
      label: "Discord",
      description: "Chat with me directly.",
      href: isValidExternalUrl(siteConfig.discordUrl)
        ? siteConfig.discordUrl
        : undefined,
      icon: <DiscordIcon />,
      external: true,
    },
    {
      label: "Facebook",
      description: "Say hi or follow along.",
      href: isValidExternalUrl(siteConfig.facebookUrl)
        ? siteConfig.facebookUrl
        : undefined,
      icon: <FacebookIcon />,
      external: true,
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-3xl py-16 sm:py-24"
    >
      <header className="text-center">
        <HeadingTag
          id="contact-heading"
          className="text-[clamp(2.25rem,5vw,3.75rem)] font-semibold tracking-tight text-(--foreground)"
        >
          Let&apos;s Work Together
        </HeadingTag>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-(--muted) sm:text-base">
          Have a project in mind or want to discuss an opportunity? Feel free
          to reach out through any of the platforms below.
        </p>
      </header>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {cards.map((card) => (
          <ContactCard key={card.label} {...card} />
        ))}
      </div>
    </section>
  );
}

