# Projects Section Redesign: "Ledger + Live Preview"

> **Purpose:** Implementation brief for replacing the homepage Apple Coverflow carousel (`ProjectCoverflow.tsx`) with a grouped project ledger and a sticky preview panel. Read `PORTFOLIO_UI_UX.md` first. Every rule in it still applies, especially the solid-background rule, token-only colors and centralized content.
>
> **Visual reference:** https://claude.ai/artifact/Jmhj9o9RoMquJeHw5KUhLj (static mockup; the hover swap is not wired up there).

---

## 1. Concept

A calm, typographic **ledger of projects** on the left, with a **live preview panel** on the right. The list is what you scan. The panel is the visual moment: hovering or focusing a row swaps the panel to that project's cover, summary, tech and link.

This keeps the editorial feel of the site (mono eyebrows, hairline dividers, no decoration) and drops the heavy 3D, blur and autoplay motion of the Coverflow.

**Scope:** only **4 personal projects**. No client projects, no multiple groups. The design must look complete with 4 rows and still scale if more are added later (see section 6).

---

## 2. Layout

Inside the existing main well (`max-w-4xl`, under `sidebar-content-offset lg:pl-64`). Do not change the shell.

```text
DESKTOP (>= 1024px)
+---------------------------------------------------------------+
| SELECTED WORK · 04                                            |
| Projects                         short hint text (right)      |
|                                                               |
| Personal projects                 04  |  +------------------+ |
| ------------------------------------  |  | dark device card | |
| [thumb] Project 01 ...        SaaS    |  | (cover preview)  | |
| ------------------------------------  |  +------------------+ |
| [thumb] Project 02 ...        Web app |  01 / 04 · tag        |
| ------------------------------------  |  Title (28px)         |
| [thumb] Project 03 ...        Unity   |  Summary              |
| ------------------------------------  |  [tech] [tech] [tech] |
| [thumb] Project 04 ...        ...     |  View Project ->      |
| ------------------------------------  |  (sticky)             |
+---------------------------------------------------------------+

MOBILE / TABLET (< 1024px)
Header, then ledger only. Rows are plain links to /projects/[slug].
The preview panel is hidden (no hover on touch).
```

- Two-column flex: list `flex-1 basis-[460px]`, preview `flex-1 basis-[380px]`, `gap-14`, `items-start`.
- Preview panel is `sticky top-12` and only rendered at `lg:` and up.
- Section header row: left is the eyebrow plus the "Projects" title; right is an optional one-line hint (`max-w-[340px] text-(--muted)`), hidden below `sm`.

---

## 3. Components to build

| Component | Responsibility |
| :--- | :--- |
| `ProjectsLedger.tsx` | Client component. Holds `activeSlug` state, renders the header, group header, rows and preview panel. Replaces `ProjectCoverflow` on the homepage. |
| `ProjectRow.tsx` | One row (a real `<a>`/`<Link>` to `/projects/[slug]`). Emits hover and focus events upward. |
| `ProjectPreview.tsx` | Right-hand panel: device card, meta, title, summary, tech pills, CTA. |
| `ProjectThumb.tsx` | Small 76x52 thumbnail with a graceful fallback (see section 5). |

Delete the Coverflow-only code (`animate-coverflow-text`, the `.coverflow-slide` reduced-motion exception in `globals.css`) **only after** confirming nothing else uses it. Keep `ProjectGallery.tsx` unchanged, since the case study pages still use it.

---

## 4. Visual spec

All colors come from tokens. Do not use hex values or default Tailwind grays in components.

### Section header
- Eyebrow: `font-mono text-xs uppercase tracking-wider text-(--muted)`. Text: `Selected work · 04` (count derived from data).
- Title: `text-3xl font-semibold tracking-tight sm:text-4xl`.
- Gap between header and list: `mb-12`.

### Group header
- Row: `flex items-baseline justify-between pb-3.5`.
- Left label "Personal projects": `text-sm text-(--muted)`.
- Right count: `font-mono text-xs text-(--muted)`, zero-padded (`04`).
- A `border-t border-(--border)` hairline sits under the header and between every row.

### Row
- Layout: `flex items-center gap-4 py-[18px]`, thumbnail, text block (`flex-1 min-w-0`), then the right tag.
- Thumbnail: `h-[52px] w-[76px] shrink-0 rounded-lg bg-(--surface)`, `overflow-hidden`, image `object-cover`.
- Title: `text-base font-semibold tracking-tight`. An optional status chip sits inline after it: `font-mono text-[10px] rounded-full border border-(--border) px-2 py-0.5 text-(--muted)` (text: `Beta` or `Soon`).
- Description: `mt-0.5 text-[13.5px] leading-snug text-(--muted)`, `line-clamp-2`.
- Right tag: `shrink-0 font-mono text-[11px] text-(--muted)` (e.g. `SaaS`, `Unity`). Hide below `sm` if it crowds the title.
- **Active row (desktop only):**
  - Background `bg-(--foreground)/7`, `rounded-[14px]`, with `px-4 -mx-4` so the highlight bleeds past the hairlines.
  - Left indicator: `absolute left-0 inset-y-[22px] w-[3px] rounded-r-full bg-(--foreground)`. This is the same pill language as the `SideRail` active state, so reuse its styling.
  - Transition: `transition-colors duration-200`, easing `cubic-bezier(0.22, 1, 0.36, 1)`.
- Inactive hover: a subtle `bg-(--foreground)/4` is fine, but the row highlight and preview swap are driven by `activeSlug`, not by CSS `:hover`.

### Preview panel
- **Device card:** `rounded-[22px] border p-[18px] shadow-[0_30px_60px_-28px_rgba(0,0,0,0.55)]`. Use the **dark theme surface tokens in both themes** so it reads as a screen: `bg-[#22221F] border-[#32312C]` is the dark `--surface`/`--border` pair. Define dedicated tokens (e.g. `--device-bg`, `--device-border`, `--device-fg`, `--device-muted`) in `globals.css` rather than hardcoding hex in the component.
- **Cover image:** inside the device card, 16:10, `rounded-[10px] object-cover`. Fallback is the dashed placeholder from the mockup (mono `PROJECT 0N` plus "Cover screenshot goes here") until real screenshots exist.
- **Meta block** (`pt-7 px-1.5`):
  - Eyebrow: `font-mono text-xs uppercase tracking-wider text-(--muted)`, format `01 / 04 · {tag}`.
  - Title: `text-[28px] leading-tight font-semibold tracking-tight`.
  - Summary: `mt-3 text-[15px] leading-relaxed text-(--muted)`.
  - Tech pills: `rounded-sm border border-(--border) px-2.5 py-1 font-mono text-xs`, the same style as the Tech Stack section.
  - CTA: `View Project ->` as a text link with `border-b border-(--foreground) pb-0.5`. Use a real arrow glyph, not `->`.
- **Content change animation:** when `activeSlug` changes, fade and rise the meta block (`opacity 0->1`, `translateY(6px)->0`, 250ms, same easing). The device card cover crossfades (200ms). No autoplay, no blur, no 3D.

---

## 5. Data model changes (`src/content/projects.ts`)

Extend the existing `PortfolioProject` type with optional fields. Do not hardcode any project text in `.tsx` files.

```ts
export type PortfolioProject = {
  // existing: slug, title, summary, tech, features, highlights, urls, gallery...
  tag: string;                       // right-hand row label, e.g. "SaaS", "Unity"
  status?: "beta" | "soon";          // optional chip next to the title
  thumbnail?: string;                // 76x52 source; falls back to cover/gallery[0]
  cover?: string;                    // 16:10 image for the preview device card
};
```

- Order in the ledger = array order in `portfolioProjects`.
- Counts and `01 / 04` indices are **derived** from the array length, never typed in.
- Thumbnail fallback chain: `thumbnail` -> `cover` -> `gallery[0]` -> a CSS-only placeholder (tonal `bg-(--surface)` block with a simple dashed inner frame).
- Projects with `status: "soon"` render at normal contrast in the row but link to a "coming soon" state, or are non-interactive if no case study exists yet. Confirm this behavior with the owner.

---

## 6. Behavior

### State
- `activeSlug` defaults to the **first** project.
- Desktop only (`lg:` and up):
  - `onPointerEnter` (mouse only) and `onFocus` on a row set `activeSlug`.
  - `activeSlug` does **not** reset on mouse leave, so the panel never goes empty or flickers.
- Click or Enter on a row navigates to `/projects/[slug]` as a normal link.
- Below `lg`, skip preview logic entirely. Rows are plain links.

### Fits 4 projects, scales later
- With 4 projects, **show all rows**: no fade, no "+ more" button.
- Keep a constant `COLLAPSE_AFTER = 4`. If `portfolioProjects.length > COLLAPSE_AFTER`:
  - Render the first `COLLAPSE_AFTER` rows, then fade the last visible row with `mask-image: linear-gradient(to bottom, #000, transparent)`.
  - Show a centered pill below it: `rounded-full border border-(--border) bg-(--surface)/50 px-[22px] py-[11px] font-mono text-xs`, text `+ N more`. Clicking it expands inline (no navigation).
- Do not build the collapse UI now unless trivial; just leave the constant and a short comment.

### Rules carried over from the main doc
1. **Solid background only.** No gradients on the page, except the photo-internal dimming overlays and the mask fade above.
2. **Tokens only** (`bg-(--surface)`, `text-(--muted)`, `border-(--border)`). The only allowed new tokens are the `--device-*` set.
3. **Accessibility:**
   - Rows are real links with the standard focus ring: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)`.
   - The preview panel is `aria-live="polite"` and `aria-atomic="true"`, so screen readers hear the change when focus moves between rows.
   - Decorative thumbnails get `alt=""`; the preview cover gets a descriptive `alt`.
   - Arrow Up/Down while a row is focused moves focus to the previous/next row.
4. **Reduced motion:** with `prefers-reduced-motion: reduce`, drop the fade-rise and crossfade and swap instantly. The existing global rule already covers durations; just make sure no JS-driven animation bypasses it.
5. **Contrast:** `--muted` on `--background` must stay at or above 4.5:1 for the small mono text. Do not go lighter for the 11px tags.

---

## 7. Acceptance checklist

- [ ] Homepage `#projects` section renders the ledger plus preview; Coverflow is no longer used there.
- [ ] Anchor `#projects` and the `SideRail` scroll spy still work.
- [ ] Exactly 4 rows from `portfolioProjects`; no hardcoded copy in `.tsx`.
- [ ] Hover and keyboard focus on a row update the preview (desktop); no hover logic on mobile.
- [ ] Active row shows the highlight and the left indicator pill.
- [ ] Light and dark themes both look correct; the device card stays dark in both.
- [ ] Missing thumbnail or cover shows the placeholder, with no broken images.
- [ ] Reduced-motion users get instant swaps.
- [ ] `/projects/[slug]` pages and `ProjectGallery` are untouched.
- [ ] No new hex colors in components; `--device-*` tokens live in `globals.css`.

---

## 8. Open questions for the owner

1. What do "Soon" projects link to, if there is no case study yet?
2. Is a one-line hint on the right of the header wanted, or should the header be left-aligned only?
3. Should the right-hand `tag` come from a fixed set (SaaS, Web app, Unity, ...) or stay free text?
