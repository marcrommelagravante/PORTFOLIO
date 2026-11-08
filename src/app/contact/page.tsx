import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { ContactSection } from "@/components/sections/ContactSection";
import { BackToHome } from "@/components/layout/BackToHome";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: `Get in touch with ${siteConfig.fullName}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pt-8 sm:pt-10">
      <div className="mb-4 sm:mb-6">
        <BackToHome />
      </div>
      <ContactSection headingLevel="h1" isStandalone />
    </div>
  );
}
