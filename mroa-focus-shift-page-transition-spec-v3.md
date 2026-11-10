# MROA Portfolio: Page Transition Specification (v3, consolidated)

> **This file replaces** `mroa-focus-shift-page-transition-spec.md` (original), `...-v2.md` and `mroa-focus-shift-slow-motion-addendum.md`. Use this one file.
>
> **Read first:** `PORTFOLIO_UI_UX.md`. The solid-background rule, token-only colors and centralized-content rules still apply.
>
> **Reference mockup (interactive, uses the exact timing below):** https://claude.ai/artifact/3nVhTo3yevVSq1iNd4ZbrU. The "Speed ×4 (default)" setting is the target feel.

**Status:** a prototype for the owner's review. Implement on **Home and About Me first**. Do not roll it out to other routes until the owner approves the prototype.

---

## 1. Concept: MROA Focus Shift

Moving between pages should feel like turning pages of a carefully designed editorial publication: quiet, deliberate and refined. The signature is a **thin horizontal line that sweeps down the screen**. The first sweep erases the old page; the destination title appears; a second sweep reveals the new page.

Decisions the owner has made:
- **About Me is its own page** (`/about`).
- **Speed is ×4** (about 2.6 seconds in total), controlled by one constant. The owner has confirmed this as final.
- **The line moves down the screen** (not a line drawn left to right).
- **The transition applies to every internal page**, after the prototype is approved.

---

## 2. Visual rules

- Tokens only: veil `--background`, line `--foreground` at about 45% opacity, title `--foreground`. No accent colors, gradients, textures or new motifs.
- **Title typography:** Bodoni Moda (already loaded through `next/font` for the hero), uppercase, `text-4xl` to `text-7xl` depending on viewport, tight tracking.
- **No blur.** Animate only `transform` and `opacity`.
- The side rail stays still. Only the main content area is covered; on mobile the sticky header stays visible and the transition covers the area below it.

---

## 3. The four stages (×4 timing)

Times are from the moment a link is activated. All values come from one timing object (section 6).

| Stage | What happens | Start (ms) | Duration (ms) | Easing |
| :--- | :--- | :--- | :--- | :--- |
| 1. Exit | Current content: `opacity 1 -> 0`, `translateY 0 -> -12px` | 0 | 520 | ease-in `cubic-bezier(0.4, 0, 1, 1)` |
| 2. First sweep | The **veil** (a solid `--background` layer) grows from the top edge down (`scaleY 0 -> 1`, `transform-origin: top`), covering and hiding the old page. A 1px **divider line** travels down in sync along the veil's leading edge (`translateY 0 -> content height`) | 120 | 800 | `cubic-bezier(0.65, 0, 0.35, 1)` |
| (swap) | Veil is fully opaque. Call `router.push`, reset scroll, mount the new content in its hidden state | about 920 | n/a | n/a |
| 3. Title | Destination title: `opacity 0 -> 1`, `translateY 12px -> 0` | about 920 | 600 | `cubic-bezier(0.22, 1, 0.36, 1)` |
| 4. Second sweep | Veil shrinks toward the bottom edge (`scaleY 1 -> 0`, `transform-origin: bottom`), revealing the new page from the top down. A divider line travels down again along the leading edge. The title fades out (360ms) | about 1,520 | 800 | `cubic-bezier(0.65, 0, 0.35, 1)` |
| 4b. Content enter | Major groups: `opacity 0 -> 1`, `translateY 12px -> 0`, 720ms each, staggered 160ms apart (start about 80ms after the second sweep begins) | about 1,600 | 720 + stagger | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Done | Last group finishes | about 2,640 | n/a | n/a |

- **Interaction is released when the veil has fully lifted (about 2,320 ms)**, not when the last group finishes. Clicks during the group reveal are allowed.
- Stagger **major content groups only** (at most 4). Never animate individual lines, icons or small elements.
- The title stays until the minimum title time has passed **and** the new route is actually ready (`usePathname()` equals the target). On a slow network the title simply holds longer.
- Because both sides of the line share the page background color, the sweep reads as a hairline passing over the page, **not as a block wipe**. Keep the veil the exact `--background` color in both themes.

---

## 4. Routes and titles

One shared route map in `src/content/site.ts`; no title text is hardcoded in components.

| Route | Title |
| :--- | :--- |
| `/` | HOME |
| `/about` | ABOUT ME |
| `/projects` (if an index page exists) | PROJECTS |
| `/projects/[slug]` | The project's own title, uppercase (from `projects.ts`) |
| `/gear` | THE TOOLKIT |
| `/stack` | STACK |
| `/outside-the-ide` | BEYOND THE IDE |
| `/contact` | CONTACT |

The `/stack` and project-page titles are proposals; the owner may change the wording in `site.ts`.

---

## 5. Interaction and routing requirements

### Which clicks are animated
- **Internal route changes only.**
- Do not intercept: Ctrl/Cmd/Shift/Alt-click, middle-click, `download` links, `target="_blank"`, `mailto:`/`tel:`, external origins or `rel="external"`.
- **No animation** when the destination is the current route, when only the hash changes (for example `/#projects` on the homepage), or when only the query string changes. Hash links to a section on the same page are normal scrolls.
- **No transition on first load or hard refresh.** Nothing is hidden behind a veil.

### One entry point
- Every internal link uses a shared **`TransitionLink`** (a thin wrapper around `next/link`): side rail, mobile header, hero links, project cards, contact page links.
- Any programmatic navigation uses the same `navigate(href)` from `usePageTransition`.

### State machine
`idle -> exiting -> covered -> entering -> idle`
- While not `idle`, **ignore further clicks**. Never queue them.
- On `covered`, call `router.push(href)`. Move to `entering` when the target path is active **and** the minimum title time has passed.
- Return to `idle` as soon as the veil has lifted (see section 3).

### Never get stuck
- **2-second failsafe** starting at `router.push` (measured from the push, not from the click): if the route is not ready, force the veil and title out and return to `idle`. At ×4 the normal sequence still finishes inside this window.
- If navigation throws or is cancelled, immediately clear the veil, divider and title.
- The overlay is `pointer-events: none` at all times except while it covers the page; it must never leave an invisible layer that swallows clicks.

### Back and forward
- The URL has already changed by the time Next.js knows, so no exit animation is possible. For back/forward: **no veil, line or title**, only a quick 200 ms opacity fade of the new content.

### Side rail and panels
- The side rail never animates.
- If the **Send message panel** is open when a link is activated, close it instantly and then run the transition.

### Router and library
- Inspect whether the project uses the App Router or the Pages Router (expected: App Router). Do not assume both.
- App Router: a provider in the root layout using `useRouter` and `usePathname` from `next/navigation`; rely on `next/link` prefetching so the destination is usually ready before the title finishes.
- Do not manipulate browser history manually.
- Use the **`motion`** package (`motion/react`), not `framer-motion`, and the installed version.

---

## 6. One timing object, one speed constant

```ts
// e.g. src/lib/transition-timing.ts
export const TRANSITION_SPEED = 4; // owner's final choice. 1 = fast, 2 = medium, 4 = current

const base = {
  exit: 130,
  lineDelay: 30,
  line: 200,       // first sweep
  title: 150,
  uncover: 200,    // second sweep
  titleOut: 90,
  group: 180,
  groupDelay: 20,
  groupStagger: 40,
} as const;

export const T = Object.fromEntries(
  Object.entries(base).map(([k, v]) => [k, Math.round(v * TRANSITION_SPEED)])
) as Record<keyof typeof base, number>;
```

- Only durations and delays are multiplied. **Distances (12px) and easing curves are not.**
- Changing `TRANSITION_SPEED` alone must change the pacing; no other code edits needed.

---

## 7. Accessibility and performance

- **`prefers-reduced-motion: reduce`:** no veil, line or title. A 150 ms opacity fade of the content, navigating immediately. Never the full sequence.
- **Focus and scroll:** after each route change, reset scroll to the top and move focus to the new page's `h1` (`tabIndex={-1}`, `preventScroll`).
- **Screen readers:** the overlay (veil, line and title) is `aria-hidden="true"`. Announce the new page through a visually hidden `aria-live="polite"` region ("Navigated to Contact"). Never rely on animation alone to communicate the destination.
- Preserve keyboard navigation; no focus trap in the overlay.
- Contrast: line and title stay legible in light and dark themes.
- Only `opacity` and `transform` are animated. Add `will-change` to the veil, line and title only while the transition runs. No layout shift, and no content left permanently hidden.
- Test on a mid-range phone and with CPU throttling. At ×4 the sequence is long, so also check that repeated navigation does not feel blocked: clicks must work again as soon as the veil has lifted.

---

## 8. Prototype scope

Implement on **Home and About Me only**. Do not redesign navigation or page layouts, and do not add colors or unrelated animations. Keep the code modular for rollout.

### Test cases
1. Home -> About Me.
2. About Me -> Home.
3. Home -> Contact (second pair, once the first works).
4. Browser back and forward (fast fade only).
5. Rapid clicks on different links (no duplicates, no stuck overlay).
6. Clicking the current route (no animation).
7. In-page hash link such as `/#projects` (normal scroll).
8. External link and a new-tab click (normal behavior).
9. Keyboard-only navigation; focus lands on the new `h1`.
10. Reduced motion enabled.
11. Light and dark themes.
12. Narrow mobile viewport with the header visible.
13. Hard refresh on `/about` (no transition, nothing hidden).
14. Send message panel open while navigating.
15. Throttled slow network: the title holds, the failsafe clears at 2 seconds.
16. `TRANSITION_SPEED` set to 1 and 2: pacing changes with no other edits.

### Acceptance criteria
- Total sequence about 2.6 seconds at `TRANSITION_SPEED = 4`; clicks work again at about 2.3 seconds.
- Destination title matches the page; the line sweeps down twice (cover, then reveal).
- No blank flash, no full-page reload, and the overlay never gets stuck.
- The side rail never moves; focus and scroll handled after each change.
- Works in both themes; reduced-motion users get the fade-only alternative.
- No layout shift and no permanently hidden content.

---

## 9. Explicitly avoid

- Pixel curtains, grids, mosaic tiles or visible block wipes.
- Glitch, noise, scan lines or distortion.
- Spinning logos or 3D transitions.
- Animated backgrounds, gradients or decorative shapes.
- Any blur, bounce, elastic motion or dramatic zoom.
- A long branded loading screen.
- Separate or inconsistent transitions per route.

---

## 10. Guidance for the agent

Before coding:
1. Inspect the router type, side rail and mobile header, theme system, typography setup and the real route list.
2. Confirm `motion` is installed and use that version.
3. Implement the prototype on Home and About Me only.
4. Test against section 8.
5. Keep everything modular for later rollout.

### Deliverable
- A working Home <-> About Me transition prototype.
- Reusable `TransitionProvider`, overlay, `TransitionLink`, `usePageTransition` and the timing object (names may follow project conventions).
- A short summary of changed files and how it works.
- Known limitations and follow-up work before rolling out to every route.

**Do not roll out to every route until the owner approves the prototype.**
