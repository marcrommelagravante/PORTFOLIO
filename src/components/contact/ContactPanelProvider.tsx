"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { usePathname } from "next/navigation";

type ContactPanelContextType = {
  isOpen: boolean;
  open: (triggerElement?: HTMLElement | null) => void;
  close: () => void;
  toggle: (triggerElement?: HTMLElement | null) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
};

const ContactPanelContext = createContext<ContactPanelContextType | null>(null);

export function ContactPanelProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  const open = useCallback((triggerElement?: HTMLElement | null) => {
    if (triggerElement) {
      triggerRef.current = triggerElement;
    } else if (
      typeof document !== "undefined" &&
      document.activeElement instanceof HTMLElement
    ) {
      triggerRef.current = document.activeElement;
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Focus restoration is handled by the panel upon closing or unmounting
  }, []);

  const toggle = useCallback((triggerElement?: HTMLElement | null) => {
    setIsOpen((prev) => {
      if (!prev) {
        if (triggerElement) {
          triggerRef.current = triggerElement;
        } else if (
          typeof document !== "undefined" &&
          document.activeElement instanceof HTMLElement
        ) {
          triggerRef.current = document.activeElement;
        }
      }
      return !prev;
    });
  }, []);

  // Auto-close on route navigation; support ?message=1 on /contact to auto-open
  useEffect(() => {
    const pathnameChanged = prevPathnameRef.current !== pathname;
    prevPathnameRef.current = pathname;

    if (typeof window !== "undefined" && pathname === "/contact") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("message") === "1") {
        setIsOpen(true);
        return;
      }
    }

    if (pathnameChanged) {
      setIsOpen(false);
    }
  }, [pathname]);

  return (
    <ContactPanelContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggle,
        triggerRef,
      }}
    >
      {children}
    </ContactPanelContext.Provider>
  );
}

export function useContactPanel() {
  const context = useContext(ContactPanelContext);
  if (!context) {
    throw new Error(
      "useContactPanel must be used within a ContactPanelProvider"
    );
  }
  return context;
}

