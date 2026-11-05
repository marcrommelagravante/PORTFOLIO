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

  // Support ?message=1 on /contact to auto-open
  useEffect(() => {
    if (typeof window !== "undefined" && pathname === "/contact") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("message") === "1") {
        setIsOpen(true);
      }
    }
  }, [pathname]);

  return (
    <ContactPanelContext.Provider
      value={{
        isOpen,
        open,
        close,
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

