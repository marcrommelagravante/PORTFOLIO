"use client";

import React from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import {
  resolveCanonicalPath,
  usePageTransition,
} from "./TransitionProvider";

export type TransitionLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps & {
    children?: React.ReactNode;
  };

function formatHref(href: LinkProps["href"]): string {
  if (typeof href === "string") return href;
  const pathname = href.pathname ?? "";
  const search = href.search ?? "";
  const hash = href.hash ?? "";
  return `${pathname}${search}${hash}`;
}

export const TransitionLink = React.forwardRef<
  HTMLAnchorElement,
  TransitionLinkProps
>(function TransitionLink(
  { href, onClick, target, rel, download, children, ...rest },
  ref
) {
  const pathname = usePathname();
  const { state, navigate, canAnimateTo, markPassthroughNavigation } =
    usePageTransition();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Do not intercept modified clicks, non-primary mouse buttons, downloads, new tabs, or external links
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      download !== undefined ||
      (target && target !== "_self") ||
      (rel && rel.split(/\s+/).includes("external"))
    ) {
      onClick?.(event);
      return;
    }

    const rawHref = formatHref(href);

    if (
      rawHref.startsWith("mailto:") ||
      rawHref.startsWith("tel:") ||
      rawHref.startsWith("javascript:") ||
      rawHref.startsWith("#")
    ) {
      onClick?.(event);
      return;
    }

    let url: URL;
    try {
      url = new URL(rawHref, window.location.href);
    } catch {
      onClick?.(event);
      return;
    }

    if (url.origin !== window.location.origin) {
      onClick?.(event);
      return;
    }

    // Ignore any internal navigation click while a transition is already active
    if (state !== "idle") {
      event.preventDefault();
      return;
    }

    onClick?.(event);
    if (event.defaultPrevented) return;

    const currentCanonical = resolveCanonicalPath(pathname);
    const targetCanonical = resolveCanonicalPath(url.pathname);

    // Same route: let hash or query changes run normally, ignore redundant same-route clicks
    if (currentCanonical === targetCanonical) {
      if (url.hash) {
        return;
      }
      if (url.search !== window.location.search) {
        markPassthroughNavigation();
        return;
      }
      event.preventDefault();
      return;
    }

    // Outside prototype allowlist: let next/link navigate normally without transition
    if (!canAnimateTo(url.pathname)) {
      markPassthroughNavigation();
      return;
    }

    event.preventDefault();
    navigate(rawHref);
  };

  return (
    <Link
      ref={ref}
      href={href}
      onClick={handleClick}
      target={target}
      rel={rel}
      download={download}
      {...rest}
    >
      {children}
    </Link>
  );
});

