"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { animate } from "motion/react";
import { T } from "@/lib/transition-timing";
import {
  siteConfig,
  transitionLabels,
  transitionRoutes,
  transitionTitles,
} from "@/content/site";
import { portfolioProjects } from "@/content/projects";
import { useContactPanel } from "@/components/contact/ContactPanelProvider";
import { TransitionOverlay } from "./TransitionOverlay";

export type TransitionState = "idle" | "exiting" | "covered" | "entering";

type AnimationControl = {
  stop: () => void;
};

type TransitionContextValue = {
  state: TransitionState;
  navigate: (href: string) => void;
  canAnimateTo: (targetPathname: string) => boolean;
  markPassthroughNavigation: () => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

const EASE_EXIT: [number, number, number, number] = [0.4, 0, 1, 1];
const EASE_SWEEP: [number, number, number, number] = [0.65, 0, 0.35, 1];
const EASE_ENTER: [number, number, number, number] = [0.22, 1, 0.36, 1];
const FAILSAFE_MS = 2000;
const LOADER_FAILSAFE_MS = 5000;

export function cleanPathname(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

export function resolveCanonicalPath(pathname: string): string {
  const clean = cleanPathname(pathname);
  if (clean === "/about") return "/outside-the-ide";
  return clean;
}

export function isRouteAllowlisted(pathname: string): boolean {
  const clean = cleanPathname(pathname);
  const canonical = resolveCanonicalPath(pathname);
  if (clean.startsWith("/projects/")) return true;
  return (
    transitionRoutes.includes(clean) || transitionRoutes.includes(canonical)
  );
}

export function getTransitionTitle(pathname: string): string {
  const clean = cleanPathname(pathname);
  if (transitionTitles[clean]) {
    return transitionTitles[clean];
  }
  const canonical = resolveCanonicalPath(clean);
  if (transitionTitles[canonical]) {
    return transitionTitles[canonical];
  }
  if (clean.startsWith("/projects/")) {
    const slug = clean.slice("/projects/".length);
    const project = portfolioProjects.find((p) => p.slug === slug);
    if (project) return project.title.toUpperCase();
  }
  return (
    clean
      .split("/")
      .filter(Boolean)
      .pop()
      ?.replace(/-/g, " ")
      .toUpperCase() || "HOME"
  );
}

export function getTransitionAnnouncement(pathname: string): string {
  const clean = cleanPathname(pathname);
  if (transitionLabels[clean]) {
    return `Navigated to ${transitionLabels[clean]}`;
  }
  const canonical = resolveCanonicalPath(clean);
  if (transitionLabels[canonical]) {
    return `Navigated to ${transitionLabels[canonical]}`;
  }
  if (clean.startsWith("/projects/")) {
    const slug = clean.slice("/projects/".length);
    const project = portfolioProjects.find((p) => p.slug === slug);
    if (project) return `Navigated to ${project.title}`;
  }
  const fallback =
    clean.split("/").filter(Boolean).pop()?.replace(/-/g, " ") || "Home";
  return `Navigated to ${fallback}`;
}

function getContentGroups(mainEl: HTMLElement): HTMLElement[] {
  const direct = Array.from(mainEl.children).filter(
    (el): el is HTMLElement => el instanceof HTMLElement
  );
  if (direct.length === 1 && direct[0].children.length > 0) {
    return Array.from(direct[0].children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement
    );
  }
  return direct;
}

function clearElementMotionStyles(el: HTMLElement | null) {
  if (!el) return;
  el.style.opacity = "";
  el.style.transform = "";
  el.style.willChange = "";
}

function resetMainStyles() {
  if (typeof document === "undefined") return;
  const mainEl = document.querySelector("main");
  if (!mainEl) return;
  clearElementMotionStyles(mainEl);
  const direct = Array.from(mainEl.children).filter(
    (el): el is HTMLElement => el instanceof HTMLElement
  );
  for (const child of direct) {
    clearElementMotionStyles(child);
    for (const grandChild of Array.from(child.children)) {
      if (grandChild instanceof HTMLElement) {
        clearElementMotionStyles(grandChild);
      }
    }
  }
}

function focusMainHeading() {
  if (typeof document === "undefined") return;
  const mainEl = document.querySelector("main");
  if (!mainEl) return;
  const h1 = mainEl.querySelector("h1");
  if (h1 instanceof HTMLElement) {
    if (!h1.hasAttribute("tabindex")) {
      h1.setAttribute("tabindex", "-1");
    }
    h1.style.outline = "none";
    h1.focus({ preventScroll: true });
  }
}

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen: isContactPanelOpen, close: closeContactPanel } =
    useContactPanel();

  const [state, setState] = useState<TransitionState>("idle");
  const [title, setTitle] = useState<string>(siteConfig.initials);
  const [announcement, setAnnouncement] = useState<string>("");
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(false);

  const phaseRef = useRef<TransitionState>("idle");
  const sessionLoaderActiveRef = useRef<boolean>(false);
  const currentPathnameRef = useRef<string>(pathname);
  const targetPathnameRef = useRef<string | null>(null);
  const targetHrefRef = useRef<string | null>(null);
  const minTitleElapsedRef = useRef<boolean>(false);
  const routeReadyRef = useRef<boolean>(false);
  const pendingReducedMotionRef = useRef<boolean>(false);
  const popstateDetectedRef = useRef<boolean>(false);
  const passthroughNavRef = useRef<boolean>(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const veilRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const loaderTrackRef = useRef<HTMLDivElement | null>(null);
  const loaderBarRef = useRef<HTMLDivElement | null>(null);

  const overlayControlsRef = useRef<AnimationControl[]>([]);
  const groupControlsRef = useRef<AnimationControl[]>([]);
  const swapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const failsafeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updatePhase = useCallback((next: TransitionState) => {
    phaseRef.current = next;
    setState(next);
  }, []);

  const clearTimers = useCallback(() => {
    if (swapTimerRef.current) {
      clearTimeout(swapTimerRef.current);
      swapTimerRef.current = null;
    }
    if (titleTimerRef.current) {
      clearTimeout(titleTimerRef.current);
      titleTimerRef.current = null;
    }
    if (failsafeTimerRef.current) {
      clearTimeout(failsafeTimerRef.current);
      failsafeTimerRef.current = null;
    }
  }, []);

  const stopOverlayAnimations = useCallback(() => {
    for (const ctrl of overlayControlsRef.current) {
      ctrl.stop();
    }
    overlayControlsRef.current = [];
  }, []);

  const stopGroupAnimations = useCallback(() => {
    for (const ctrl of groupControlsRef.current) {
      ctrl.stop();
    }
    groupControlsRef.current = [];
  }, []);

  const resetOverlayDOM = useCallback(() => {
    if (veilRef.current) {
      veilRef.current.style.transformOrigin = "top";
      veilRef.current.style.transform = "scaleY(0)";
      veilRef.current.style.willChange = "";
    }
    if (lineRef.current) {
      lineRef.current.style.opacity = "0";
      lineRef.current.style.transform = "translateY(0px)";
      lineRef.current.style.willChange = "";
    }
    if (titleRef.current) {
      titleRef.current.style.opacity = "0";
      titleRef.current.style.transform = "translateY(12px)";
      titleRef.current.style.willChange = "";
    }
    if (loaderTrackRef.current) {
      loaderTrackRef.current.style.opacity = "0";
      loaderTrackRef.current.style.willChange = "";
    }
    if (loaderBarRef.current) {
      loaderBarRef.current.style.transform = "scaleX(0)";
      loaderBarRef.current.style.willChange = "";
    }
  }, []);

  const abortToIdle = useCallback(() => {
    clearTimers();
    stopOverlayAnimations();
    stopGroupAnimations();
    resetOverlayDOM();
    resetMainStyles();
    if (typeof document !== "undefined") {
      document.documentElement.removeAttribute("data-session-loading");
    }
    sessionLoaderActiveRef.current = false;
    setIsInitialLoad(false);
    targetPathnameRef.current = null;
    targetHrefRef.current = null;
    minTitleElapsedRef.current = false;
    routeReadyRef.current = false;
    pendingReducedMotionRef.current = false;
    updatePhase("idle");
  }, [
    clearTimers,
    resetOverlayDOM,
    stopGroupAnimations,
    stopOverlayAnimations,
    updatePhase,
  ]);

  const runQuickContentFade = useCallback(
    (durationMs: number, destinationPath: string) => {
      stopGroupAnimations();
      resetMainStyles();
      const mainEl = document.querySelector("main");
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (!mainEl) {
        focusMainHeading();
        setAnnouncement(getTransitionAnnouncement(destinationPath));
        return;
      }
      mainEl.style.opacity = "0";
      const ctrl = animate<number>(0, 1, {
        duration: durationMs / 1000,
        ease: "linear",
        onUpdate: (v) => {
          mainEl.style.opacity = String(v);
        },
        onComplete: () => {
          clearElementMotionStyles(mainEl);
        },
      });
      groupControlsRef.current.push(ctrl);
      focusMainHeading();
      setAnnouncement(getTransitionAnnouncement(destinationPath));
    },
    [stopGroupAnimations]
  );

  const tryProceedToEntering = useCallback(() => {
    if (phaseRef.current !== "covered") return;
    if (!minTitleElapsedRef.current || !routeReadyRef.current) return;

    // Route is ready and minimum title time has elapsed; cancel failsafe.
    if (failsafeTimerRef.current) {
      clearTimeout(failsafeTimerRef.current);
      failsafeTimerRef.current = null;
    }

    const destinationPath =
      targetPathnameRef.current || currentPathnameRef.current;
    const isLoader = sessionLoaderActiveRef.current;
    const titleOutDuration = isLoader ? T.loaderTitleOut : T.titleOut;
    const uncoverDuration = isLoader ? T.loaderUncover : T.uncover;
    updatePhase("entering");

    const veilEl = veilRef.current;
    const lineEl = lineRef.current;
    const titleEl = titleRef.current;
    const mainEl = document.querySelector("main");

    // Ensure main container is visible while its internal groups start hidden
    if (mainEl) {
      clearElementMotionStyles(mainEl);

      const groups = getContentGroups(mainEl);
      stopGroupAnimations();

      groups.forEach((groupEl, idx) => {
        groupEl.style.opacity = "0";
        groupEl.style.transform = "translateY(12px)";
        groupEl.style.willChange = "transform, opacity";

        const staggerSlot = Math.min(idx, 3);
        const delaySec = (T.groupDelay + staggerSlot * T.groupStagger) / 1000;

        const groupCtrl = animate<number>(0, 1, {
          delay: delaySec,
          duration: T.group / 1000,
          ease: EASE_ENTER,
          onUpdate: (v) => {
            groupEl.style.opacity = String(v);
            groupEl.style.transform = `translateY(${(1 - v) * 12}px)`;
          },
          onComplete: () => {
            clearElementMotionStyles(groupEl);
          },
        });
        groupControlsRef.current.push(groupCtrl);
      });
    }

    // Stage 4: Title (and loader line if active) fades out
    const loaderTrackEl = loaderTrackRef.current;
    if (titleEl) {
      const titleOutCtrl = animate<number>(1, 0, {
        duration: titleOutDuration / 1000,
        ease: EASE_ENTER,
        onUpdate: (v) => {
          titleEl.style.opacity = String(v);
          if (isLoader && loaderTrackEl) {
            loaderTrackEl.style.opacity = String(v);
          }
        },
      });
      overlayControlsRef.current.push(titleOutCtrl);
    }

    // Stage 4: Second sweep — veil shrinks toward bottom edge & divider line sweeps down
    if (veilEl) {
      veilEl.style.transformOrigin = "bottom";
      veilEl.style.transform = "scaleY(1)";
    }
    if (lineEl) {
      lineEl.style.opacity = "1";
      lineEl.style.transform = "translateY(0px)";
    }

    const uncoverCtrl = animate<number>(0, 1, {
      duration: uncoverDuration / 1000,
      ease: EASE_SWEEP,
      onUpdate: (v) => {
        const height = overlayRef.current?.clientHeight ?? window.innerHeight;
        if (veilEl) {
          veilEl.style.transform = `scaleY(${1 - v})`;
        }
        if (lineEl) {
          lineEl.style.transform = `translateY(${v * height}px)`;
        }
      },
      onComplete: () => {
        // Release interaction immediately when the veil has lifted (~2,320ms)
        resetOverlayDOM();
        const wasInitialLoad = sessionLoaderActiveRef.current;
        sessionLoaderActiveRef.current = false;
        setIsInitialLoad(false);
        targetPathnameRef.current = null;
        targetHrefRef.current = null;
        minTitleElapsedRef.current = false;
        routeReadyRef.current = false;
        updatePhase("idle");
        focusMainHeading();
        if (!wasInitialLoad) {
          setAnnouncement(getTransitionAnnouncement(destinationPath));
        }
      },
    });
    overlayControlsRef.current.push(uncoverCtrl);
  }, [resetOverlayDOM, stopGroupAnimations, updatePhase]);

  // Run loader on initial visit and page refresh
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      root.removeAttribute("data-session-loading");
      return;
    }

    sessionLoaderActiveRef.current = true;
    setIsInitialLoad(true);
    setTitle(siteConfig.initials);
    minTitleElapsedRef.current = false;
    routeReadyRef.current = true;
    updatePhase("covered");

    const veilEl = veilRef.current;
    const lineEl = lineRef.current;
    const titleEl = titleRef.current;
    const loaderTrackEl = loaderTrackRef.current;
    const loaderBarEl = loaderBarRef.current;
    const mainEl = document.querySelector("main");

    if (veilEl) {
      veilEl.style.willChange = "transform";
      veilEl.style.transformOrigin = "bottom";
      veilEl.style.transform = "scaleY(1)";
    }
    if (lineEl) {
      lineEl.style.willChange = "transform, opacity";
      lineEl.style.opacity = "0";
      lineEl.style.transform = "translateY(0px)";
    }
    if (titleEl) {
      titleEl.style.willChange = "transform, opacity";
      titleEl.style.opacity = "0";
      titleEl.style.transform = "translateY(12px)";
    }
    if (loaderTrackEl) {
      loaderTrackEl.style.willChange = "opacity";
      loaderTrackEl.style.opacity = "0";
    }
    if (loaderBarEl) {
      loaderBarEl.style.willChange = "transform";
      loaderBarEl.style.transform = "scaleX(0)";
    }

    if (mainEl) {
      clearElementMotionStyles(mainEl);
      const groups = getContentGroups(mainEl);
      for (const groupEl of groups) {
        groupEl.style.opacity = "0";
        groupEl.style.transform = "translateY(12px)";
      }
    }

    // Inline styles now hold the veil; remove pre-hydration attribute
    root.removeAttribute("data-session-loading");

    failsafeTimerRef.current = setTimeout(() => {
      if (phaseRef.current !== "idle") {
        abortToIdle();
      }
    }, LOADER_FAILSAFE_MS);

    if (titleEl) {
      const titleInCtrl = animate<number>(0, 1, {
        delay: T.loaderDelay / 1000,
        duration: T.loaderTitleIn / 1000,
        ease: EASE_ENTER,
        onUpdate: (v) => {
          titleEl.style.opacity = String(v);
          titleEl.style.transform = `translateY(${(1 - v) * 12}px)`;
          if (loaderTrackEl) {
            loaderTrackEl.style.opacity = String(v);
          }
        },
      });
      overlayControlsRef.current.push(titleInCtrl);
    }

    if (loaderBarEl) {
      const barDelaySec = (T.loaderDelay + Math.round(T.loaderTitleIn * 0.35)) / 1000;
      const barCtrl = animate<number>(0, 1, {
        delay: barDelaySec,
        duration: T.loaderBar / 1000,
        ease: EASE_SWEEP,
        onUpdate: (v) => {
          loaderBarEl.style.transform = `scaleX(${v})`;
        },
        onComplete: () => {
          titleTimerRef.current = setTimeout(() => {
            minTitleElapsedRef.current = true;
            tryProceedToEntering();
          }, T.loaderHold);
        },
      });
      overlayControlsRef.current.push(barCtrl);
    } else {
      titleTimerRef.current = setTimeout(() => {
        minTitleElapsedRef.current = true;
        tryProceedToEntering();
      }, T.loaderDelay + T.loaderTitleIn + T.loaderBar + T.loaderHold);
    }
  }, [abortToIdle, tryProceedToEntering, updatePhase]);

  // Listen for browser back/forward (popstate)
  useEffect(() => {
    const onPopState = () => {
      popstateDetectedRef.current = true;
      if (phaseRef.current !== "idle") {
        abortToIdle();
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [abortToIdle]);

  // Detect route readiness and handle popstate / reduced-motion arrival before paint
  useLayoutEffect(() => {
    const prevPath = currentPathnameRef.current;
    currentPathnameRef.current = pathname;

    if (prevPath === pathname) return;

    // 1. Reduced-motion navigation arrival
    if (pendingReducedMotionRef.current) {
      pendingReducedMotionRef.current = false;
      clearTimers();
      targetPathnameRef.current = null;
      targetHrefRef.current = null;
      runQuickContentFade(150, pathname);
      return;
    }

    // 2. Active Focus Shift transition waiting for target route
    if (
      (phaseRef.current === "covered" || phaseRef.current === "exiting") &&
      targetPathnameRef.current
    ) {
      const isTarget =
        cleanPathname(pathname) === cleanPathname(targetPathnameRef.current) ||
        resolveCanonicalPath(pathname) ===
          resolveCanonicalPath(targetPathnameRef.current);

      if (isTarget) {
        routeReadyRef.current = true;
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });

        // Hide the newly mounted page groups under the opaque veil before paint
        const mainEl = document.querySelector("main");
        if (mainEl) {
          clearElementMotionStyles(mainEl);
          const groups = getContentGroups(mainEl);
          for (const groupEl of groups) {
            groupEl.style.opacity = "0";
            groupEl.style.transform = "translateY(12px)";
          }
        }

        if (phaseRef.current === "covered") {
          tryProceedToEntering();
        }
        return;
      }
    }

    // 3. Non-animated link click (outside prototype allowlist)
    if (passthroughNavRef.current) {
      passthroughNavRef.current = false;
      return;
    }

    // 4. Browser Back / Forward navigation (fast 200ms opacity fade only, no veil/line/title)
    if (
      popstateDetectedRef.current ||
      (phaseRef.current === "idle" &&
        isRouteAllowlisted(prevPath) &&
        isRouteAllowlisted(pathname))
    ) {
      popstateDetectedRef.current = false;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      runQuickContentFade(prefersReduced ? 150 : 200, pathname);
    }
  }, [clearTimers, pathname, runQuickContentFade, tryProceedToEntering]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimers();
      stopOverlayAnimations();
      stopGroupAnimations();
    };
  }, [clearTimers, stopGroupAnimations, stopOverlayAnimations]);

  const canAnimateTo = useCallback(
    (targetPathname: string) => {
      const currentCanonical = resolveCanonicalPath(currentPathnameRef.current);
      const targetCanonical = resolveCanonicalPath(targetPathname);
      if (currentCanonical === targetCanonical) return false;
      return (
        isRouteAllowlisted(currentCanonical) &&
        isRouteAllowlisted(targetCanonical)
      );
    },
    []
  );

  const markPassthroughNavigation = useCallback(() => {
    passthroughNavRef.current = true;
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (typeof window === "undefined") return;

      // While not idle, ignore further clicks — never queue them.
      if (phaseRef.current !== "idle") return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      // External origin: let browser navigate normally
      if (url.origin !== window.location.origin) {
        window.location.href = href;
        return;
      }

      const currentClean = cleanPathname(currentPathnameRef.current);
      const targetClean = cleanPathname(url.pathname);
      const currentCanonical = resolveCanonicalPath(currentClean);
      const targetCanonical = resolveCanonicalPath(targetClean);

      // Same route (including hash-only or query-only changes): no animation
      if (currentCanonical === targetCanonical) {
        if (url.hash && url.hash !== window.location.hash) {
          const id = decodeURIComponent(url.hash.slice(1));
          const targetEl = document.getElementById(id);
          if (targetEl) {
            targetEl.scrollIntoView();
          }
          window.history.pushState(null, "", href);
        } else if (url.search !== window.location.search) {
          passthroughNavRef.current = true;
          router.push(href);
        }
        return;
      }

      // Close Send Message panel if open
      if (isContactPanelOpen) {
        closeContactPanel();
      }

      // If route pair is outside the prototype allowlist, navigate immediately without transition
      if (!canAnimateTo(targetClean)) {
        passthroughNavRef.current = true;
        router.push(href);
        return;
      }

      // Cancel any lingering group reveal from a prior transition
      stopGroupAnimations();
      resetMainStyles();

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Reduced motion: no veil, line, or title — navigate immediately with a 150ms fade
      if (prefersReducedMotion) {
        pendingReducedMotionRef.current = true;
        targetPathnameRef.current = targetClean;
        targetHrefRef.current = href;
        const mainEl = document.querySelector("main");
        if (mainEl) {
          mainEl.style.opacity = "0";
        }
        try {
          router.push(href);
          failsafeTimerRef.current = setTimeout(() => {
            if (pendingReducedMotionRef.current) {
              pendingReducedMotionRef.current = false;
              resetMainStyles();
            }
          }, FAILSAFE_MS);
        } catch {
          pendingReducedMotionRef.current = false;
          resetMainStyles();
        }
        return;
      }

      // Full 4-stage MROA Focus Shift sequence
      const nextTitle = getTransitionTitle(targetClean);
      setTitle(nextTitle);
      targetPathnameRef.current = targetClean;
      targetHrefRef.current = href;
      minTitleElapsedRef.current = false;
      routeReadyRef.current = false;
      updatePhase("exiting");

      const mainEl = document.querySelector("main");
      const veilEl = veilRef.current;
      const lineEl = lineRef.current;
      const titleEl = titleRef.current;

      if (veilEl) {
        veilEl.style.willChange = "transform";
        veilEl.style.transformOrigin = "top";
        veilEl.style.transform = "scaleY(0)";
      }
      if (lineEl) {
        lineEl.style.willChange = "transform, opacity";
        lineEl.style.opacity = "0";
        lineEl.style.transform = "translateY(0px)";
      }
      if (titleEl) {
        titleEl.style.willChange = "transform, opacity";
        titleEl.style.opacity = "0";
        titleEl.style.transform = "translateY(12px)";
      }

      // Stage 1: Exit current content (opacity 1 -> 0, translateY 0 -> -12px, 520ms at x4)
      if (mainEl) {
        mainEl.style.willChange = "transform, opacity";
        const exitCtrl = animate<number>(0, 1, {
          duration: T.exit / 1000,
          ease: EASE_EXIT,
          onUpdate: (v) => {
            mainEl.style.opacity = String(1 - v);
            mainEl.style.transform = `translateY(${-12 * v}px)`;
          },
        });
        overlayControlsRef.current.push(exitCtrl);
      }

      // Stage 2: First sweep (starts at T.lineDelay = 120ms, runs for T.line = 800ms at x4)
      const firstSweepCtrl = animate<number>(0, 1, {
        delay: T.lineDelay / 1000,
        duration: T.line / 1000,
        ease: EASE_SWEEP,
        onUpdate: (v) => {
          const height = overlayRef.current?.clientHeight ?? window.innerHeight;
          if (veilEl) {
            veilEl.style.transform = `scaleY(${v})`;
          }
          if (lineEl) {
            lineEl.style.opacity = "1";
            lineEl.style.transform = `translateY(${v * height}px)`;
          }
        },
        onComplete: () => {
          if (phaseRef.current !== "exiting") return;

          // Veil is now 100% opaque. Park divider line at top hidden for second sweep.
          if (veilEl) {
            veilEl.style.transform = "scaleY(1)";
          }
          if (lineEl) {
            lineEl.style.opacity = "0";
            lineEl.style.transform = "translateY(0px)";
          }
          if (mainEl) {
            mainEl.style.opacity = "0";
            mainEl.style.transform = "";
          }

          // Move to covered, reset scroll, push route, and start 2s failsafe
          updatePhase("covered");
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });

          try {
            router.push(href);
          } catch {
            abortToIdle();
            return;
          }

          // Check if pathname was already updated synchronously
          if (
            cleanPathname(currentPathnameRef.current) === targetClean ||
            resolveCanonicalPath(currentPathnameRef.current) === targetCanonical
          ) {
            routeReadyRef.current = true;
          }

          // 2-second failsafe measured from router.push
          failsafeTimerRef.current = setTimeout(() => {
            if (phaseRef.current !== "idle") {
              abortToIdle();
            }
          }, FAILSAFE_MS);

          // Stage 3: Destination title enters (opacity 0 -> 1, translateY 12px -> 0, 600ms at x4)
          if (titleEl) {
            const titleInCtrl = animate<number>(0, 1, {
              duration: T.title / 1000,
              ease: EASE_ENTER,
              onUpdate: (v) => {
                titleEl.style.opacity = String(v);
                titleEl.style.transform = `translateY(${(1 - v) * 12}px)`;
              },
              onComplete: () => {
                minTitleElapsedRef.current = true;
                tryProceedToEntering();
              },
            });
            overlayControlsRef.current.push(titleInCtrl);
          } else {
            titleTimerRef.current = setTimeout(() => {
              minTitleElapsedRef.current = true;
              tryProceedToEntering();
            }, T.title);
          }
        },
      });
      overlayControlsRef.current.push(firstSweepCtrl);
    },
    [
      abortToIdle,
      canAnimateTo,
      closeContactPanel,
      isContactPanelOpen,
      router,
      stopGroupAnimations,
      tryProceedToEntering,
      updatePhase,
    ]
  );

  return (
    <TransitionContext.Provider
      value={{
        state,
        navigate,
        canAnimateTo,
        markPassthroughNavigation,
      }}
    >
      {children}
      <TransitionOverlay
        state={state}
        title={title}
        announcement={announcement}
        isFullViewport={isInitialLoad}
        overlayRef={overlayRef}
        veilRef={veilRef}
        lineRef={lineRef}
        titleRef={titleRef}
        loaderTrackRef={loaderTrackRef}
        loaderBarRef={loaderBarRef}
      />
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error(
      "usePageTransition must be used within a TransitionProvider"
    );
  }
  return context;
}
