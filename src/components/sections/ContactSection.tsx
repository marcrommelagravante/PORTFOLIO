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
      className="py-10 sm:py-12"
    >
      <header>
        <HeadingTag
          id="contact-heading"
          className="text-2xl font-semibold tracking-tight text-(--foreground) sm:text-3xl"
        >
          Let&apos;s Work Together
        </HeadingTag>
      </header>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {cards.map((card) => (
          <ContactCard key={card.label} {...card} />
        ))}
      </div>
    </section>
  );
}

