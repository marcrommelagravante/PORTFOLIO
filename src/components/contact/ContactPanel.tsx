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

      // Double RAF ensures the initial off-screen transform is committed before sliding out
      let frame2 = 0;
      const frame1 = requestAnimationFrame(() => {
        frame2 = requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });

      return () => {
        cancelAnimationFrame(frame1);
        cancelAnimationFrame(frame2);
      };
    } else if (isRendered) {
      setIsVisible(false);
      document.body.style.overflow = "";

      const timer = setTimeout(() => {
        setIsRendered(false);
        // Return focus to trigger button
        if (triggerRef.current) {
          triggerRef.current.focus({ preventScroll: true });
        }
      }, 320);

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
      {/* Scrim: sits at z-30 beneath SideRail (z-40) and the drawer (z-35) */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-(--background)/60 backdrop-blur-xs transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Clip stage: starts at the right edge of the sidebar on desktop so the drawer emerges from behind the rail */}
      <div className="pointer-events-none fixed inset-0 z-35 [clip-path:inset(0)] lg:left-[calc(1.5rem+var(--sidebar-width,14rem))] lg:transition-[left] lg:duration-200 lg:ease-out">
        {/* Slide-out drawer panel */}
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-panel-title"
          className={`pointer-events-auto absolute inset-x-0 top-16 bottom-0 flex w-full flex-col overflow-y-auto rounded-t-3xl border-t border-(--border) bg-(--background) p-6 shadow-[12px_24px_48px_-24px_rgba(0,0,0,0.35)] transition-[translate,transform,opacity] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:p-8 lg:inset-x-auto lg:top-6 lg:bottom-6 lg:left-3 lg:my-auto lg:max-h-195 lg:w-[440px] lg:max-w-[calc(100vw-var(--sidebar-width,14rem)-3.75rem)] lg:rounded-3xl lg:border ${
            isVisible
              ? "translate-y-0 opacity-100 lg:translate-x-0"
              : "pointer-events-none translate-y-full opacity-0 lg:translate-y-0 lg:-translate-x-[105%] lg:opacity-100"
          }`}
        >
          <ContactForm onClose={close} />
        </div>
      </div>
    </div>
  );
}

