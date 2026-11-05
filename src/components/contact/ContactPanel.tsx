"use client";

import React, { useEffect, useRef, useState } from "react";
import { useContactPanel } from "./ContactPanelProvider";
import { ContactForm } from "./ContactForm";

export function ContactPanel() {
  const { isOpen, close, triggerRef } = useContactPanel();
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle open/close transitions and scroll lock
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = "hidden";

      // Trigger enter animation on next tick
      const frame = requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => cancelAnimationFrame(frame);
    } else if (isRendered) {
      setIsVisible(false);
      document.body.style.overflow = "";

      const timer = setTimeout(() => {
        setIsRendered(false);
        // Return focus to trigger button
        if (triggerRef.current) {
          triggerRef.current.focus();
        }
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered, triggerRef]);

  // Handle Escape key and focus trap
  useEffect(() => {
    if (!isRendered) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRendered, close]);

  if (!isRendered) return null;

  return (
    <div className="contact-panel-root">
      {/* Scrim: covers page content right of the rail on desktop, full screen on mobile */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-y-0 right-0 left-0 z-40 bg-(--background)/60 backdrop-blur-xs transition-opacity duration-200 motion-reduce:transition-none lg:left-[calc(1.5rem+var(--sidebar-width,14rem)+0.5rem)] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Slide-out modal panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-panel-title"
        className={`fixed inset-0 z-50 flex w-full flex-col overflow-y-auto border-(--border) bg-(--background) p-6 transition-[transform,opacity,left] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:p-8 lg:top-6 lg:bottom-6 lg:left-[calc(1.5rem+var(--sidebar-width,14rem)+1rem)] lg:w-[440px] lg:max-w-[calc(100vw-var(--sidebar-width,14rem)-3rem)] lg:rounded-3xl lg:border lg:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)] ${
          isVisible
            ? "opacity-100 translate-x-0"
            : "pointer-events-none opacity-0 -translate-x-3"
        }`}
      >
        <ContactForm onClose={close} />
      </div>
    </div>
  );
}

