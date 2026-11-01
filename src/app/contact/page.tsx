import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { ContactSection } from "@/components/sections/ContactSection";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: `Get in touch with ${siteConfig.fullName}.`,
  path: "/contact",
});

export default function ContactPage() {
  return <ContactSection headingLevel="h1" />;
}
