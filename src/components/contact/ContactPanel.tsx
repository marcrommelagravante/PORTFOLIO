"use client";

import React, { useEffect, useRef } from "react";
import { useContactPanel } from "./ContactPanelProvider";
import { ContactForm } from "./ContactForm";

export function ContactPanel() {
  const { isOpen, close, triggerRef } = useContactPanel();
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  // Handle scroll lock and focus restoration on close
  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      document.body.style.overflow = "hidden";
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      document.body.style.overflow = "";
      triggerRef.current?.focus({ preventScroll: true });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, triggerRef]);

  // Handle Escape key and focus trap
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, close]);

  return (
    <div
      className="contact-panel-root"
      inert={!isOpen || undefined}
      aria-hidden={!isOpen}
    >
      {/* Scrim: sits at z-30 beneath SideRail (z-40) and the drawer (z-35) */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-(--background)/60 backdrop-blur-xs transition-opacity duration-350 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Clip stage: starts at the right edge of the sidebar on desktop so the drawer emerges from behind the rail */}
      <div className="pointer-events-none fixed inset-0 z-35 overflow-hidden lg:left-[calc(1.5rem+var(--sidebar-width,14rem))] lg:transition-[left] lg:duration-200 lg:ease-out">
        {/* Slide-out drawer panel */}
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-panel-title"
          className={`absolute inset-x-0 top-16 bottom-0 flex w-full flex-col overflow-y-auto rounded-t-3xl border-t border-(--border) bg-(--background) p-6 shadow-[12px_24px_48px_-24px_rgba(0,0,0,0.35)] will-change-[translate,transform,opacity] transition-[translate,transform,opacity] duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none sm:p-8 lg:inset-x-auto lg:top-6 lg:bottom-6 lg:left-3 lg:my-auto lg:max-h-195 lg:w-[440px] lg:max-w-[calc(100vw-var(--sidebar-width,14rem)-3.75rem)] lg:rounded-3xl lg:border ${
            isOpen
              ? "pointer-events-auto translate-x-0 translate-y-0 opacity-100 lg:translate-x-0"
              : "pointer-events-none translate-x-0 translate-y-full opacity-0 lg:translate-y-0 lg:-translate-x-[105%] lg:opacity-100"
          }`}
        >
          <ContactForm isOpen={isOpen} onClose={close} />
        </div>
      </div>
    </div>
  );
}

