# Stack Page Redesign: "Curated Ledger"

> **Purpose:** Implementation brief for simplifying the `/stack` page and the homepage Stack section. Read `PORTFOLIO_UI_UX.md`, `the-stack-page-spec.md` and `TECH_STACK.md` first. Every rule in `PORTFOLIO_UI_UX.md` still applies: solid background, token-only colors, centralized content in `src/content/`.
>
> **Visual reference:** https://claude.ai/artifact/AxEtFDrHqVqzVK7kjw2nuP

---

## 1. Why this change

The current page lists **76 technologies in 7 categories** with boxed cards, a long intro paragraph and a two-mode switcher. A visitor (a client or a recruiter) skims it for a few seconds, and the skills that matter get lost among details like Uvicorn, Alembic and `tsvector`.

The redesign is a **short, curated list of 25 technologies in 6 categories**, shown as a calm ledger of rows. Full technical detail is not lost: it stays in each project's own "Built with" table on its case study page.

**Scope:** `StackSection.tsx`, `src/content/skills.ts`, and the `/stack` route plus homepage embed. Nothing else changes.

---

## 2. What changes

| Area | Before | After |
| :--- | :--- | :--- |
| Intro paragraph | 3-line description under the title | **Removed** |
| View switcher | `All Tech (76)` / `By Project (4)` tabs | **Removed** |
| Layout | Boxed cards (`bg-(--surface)/30`, rounded) | **Ledger rows** separated by hairlines |
| Categories | 7 | **6** (Mobile & AR and Hardware merged) |
| Technologies | 76 (versions, ORMs, UI libs, hardware parts) | **25**, names only |
| Pills | Version and detail text, hover elevation | **Plain names**, no hover effect |
| Per-category text | Long descriptive line | **One short outcome line** |

No dots, legends, counts in the header or project markers. Just names.

---

## 3. Page layout

Inside the existing main well (`sidebar-content-offset lg:pl-64`, `max-w-4xl` column). Do not change the shell.

```text
TECHNICAL TOOLKIT
Stack

-----------------------------------------------------------------
Frontend  05          [React] [Next.js] [TypeScript] [Tailwind CSS]
Fast, accessible       [JavaScript]
interfaces people
enjoy using
-----------------------------------------------------------------
Backend & APIs  04    [Node.js] [Python] [FastAPI] [REST APIs]
Reliable servers ...
-----------------------------------------------------------------
...(4 more rows)
-----------------------------------------------------------------
```

### Header
- Eyebrow: `font-mono text-xs font-medium uppercase tracking-wider text-(--muted)`, text `Technical toolkit`.
- Title: `Stack`. Style `text-4xl sm:text-[44px] font-semibold tracking-tight leading-[1.08]`. It is an `h1` on `/stack` and an `h2` on the homepage section (keep the existing `headingLevel` prop).
- Space below the header: `mb-11`.
- **No description paragraph and no tabs.**

### Category row
- Row: `flex flex-wrap gap-8 border-t border-(--border) py-7`. The **last row also gets a `border-b border-(--border)`** to close the list.
- Left column: `basis-60 shrink-0 max-w-full` (about 240px):
  - Category name `text-base font-semibold tracking-tight`, with the item count beside it in `font-mono text-xs text-(--muted)`, zero-padded (`05`). Baseline-aligned, `gap-2.5`.
  - Outcome line below: `mt-1.5 text-[13.5px] leading-normal text-(--muted)`.
- Right column: `flex min-w-0 flex-1 basis-[360px] flex-wrap content-start gap-2.5`.
- Category headings are `h2` on `/stack` and `h3` on the homepage section (one level below the section title).

### Pill (technology name)
- `inline-flex items-center rounded-lg border border-(--border) bg-(--background) px-3.5 py-2 font-mono text-[12.5px] text-(--foreground)`.
- It is a plain `<span>` or `<li>`, **not** a link or button, so it has **no hover effect and no pointer cursor**.
- Render each category's pills as a `<ul>` of `<li>` for screen readers, with `list-none` and `aria-label="{Category} technologies"` on the list.

### Responsive
- Desktop: left column and pills side by side.
- Below about 640px the row wraps: category block on top, pills below, no overlap.
- The page must never scroll horizontally.

---

## 4. Content (the 25 technologies)

Copy these names exactly. Keep them in `src/content/skills.ts`, not in components.

| # | Category | Outcome line | Technologies |
| :--- | :--- | :--- | :--- |
| 1 | **Frontend** | Fast, accessible interfaces people enjoy using | React, Next.js, TypeScript, Tailwind CSS, JavaScript |
| 2 | **Backend & APIs** | Reliable servers and APIs behind the interface | Node.js, Python, FastAPI, REST APIs |
| 3 | **AI & LLMs** | AI features grounded in real data | Gemini API, Groq + LLaMA 3.3, RAG pipelines, Embeddings |
| 4 | **Databases** | Storage from realtime sync to vector search | PostgreSQL, Firebase Firestore, pgvector |
| 5 | **AR, 3D & Embedded** | Interactive 3D and hardware simulation | Unity, C#, AR Foundation, Blender, Arduino |
| 6 | **Auth & Cloud** | Secure sign-in and automatic deploys | Vercel, Google OAuth 2.0, JWT, GitHub Actions |

**Removed from the master list** (all remain visible in each project's own "Built with" table): version numbers (Next.js 15 vs 16, Tailwind v4, Unity 6000.3.2f1), Next.js Server Actions and Route Handlers, SQLAlchemy, Drizzle ORM and Drizzle Kit, Pydantic, Zod, Uvicorn, Alembic, Modular Monolith, Radix UI, Motion, GSAP, Lenis, Lucide, next-themes, specific Gemini model names, `gemini-embedding-001`, URP, UGUI, TextMeshPro, ARCore and ARKit as separate items, the hardware parts (L298N, SG90, HC-SR04, 16x2 LCD), CSRF, the rate limiter, Firebase Hosting, Render, `@vercel/blob`, `unpdf`, `mammoth`, Firebase Auth, Auth.js and RBAC.

### Data shape (`src/content/skills.ts`)

```ts
export type SkillCategory = {
  id: string;           // "frontend", "backend", "ai", "databases", "ar-3d-embedded", "auth-cloud"
  label: string;        // "Frontend"
  outcome: string;      // one short line, shown under the label
  items: string[];      // plain names, no versions
};

export const stackPageHeader = {
  eyebrow: "Technical toolkit",
  title: "Stack",
};

export const skillCategories: SkillCategory[] = [ /* the six rows above, in order */ ];
```

- Counts (`05`) are **derived from `items.length`**, never typed in.
- `description` on `SkillCategory` and `stackPageHeader.description` are no longer used. Remove them if nothing else reads them.
- **Do not delete `projectTechStacks` or `techStackTable` in `projects.ts`.** The project case study pages still use them. Only the `/stack` page stops rendering the "By Project" view.

---

## 5. Component changes

- `StackSection.tsx`: remove tab state (`viewMode`, `activeProjectSlug`), the `role="tablist"` switcher and the "By Project" rendering. It becomes a simple mapping over `skillCategories`. It can probably become a Server Component (no `"use client"`) once the state is gone.
- Keep the `headingLevel` prop (`"h1"` or `"h2"`), and derive the category heading level from it.
- `src/app/stack/page.tsx` and `SkillsPreview.tsx` keep working with the same props. Keep `createPageMetadata({ title: "Stack", path: "/stack" })`. Update the metadata description in `site.ts` or the page to a short one-liner, since the old long paragraph was reused there.
- Homepage anchor `/#skills` must keep working, and the side rail scroll spy must still pick it up.

---

## 6. Design rules carried over

1. **Solid background only.** No grids, dots, gradients or decoration.
2. **Tokens only:** `--background`, `--foreground`, `--muted`, `--border`. No hex values or default Tailwind grays. (For reference, the mockup's colors map to these tokens: `#F3F1EA` = background, `#33332F` = foreground, `#605E58` = muted, `#D0CEC5` = border.)
3. **Typography:** Geist Sans for names and outcome lines; Geist Mono for the eyebrow, counts and pills.
4. **Contrast:** `--muted` on `--background` stays at or above 4.5:1 for the small outcome text and counts.
5. **Motion:** none needed. If a reveal is used, reuse the site's existing scroll reveal and honor `prefers-reduced-motion`.
6. **No artificial loading states.** The data is static; the page renders immediately.

---

## 7. Acceptance checklist

- [ ] `/stack` shows the eyebrow and title only in the header, with no description and no tabs.
- [ ] Six category rows in the order above, each with a derived two-digit count and one outcome line.
- [ ] Exactly 25 technology pills, names only, matching the table in section 4.
- [ ] Rows are separated by hairlines, with a closing line under the last row; no boxed cards.
- [ ] Pills have no hover effect and are not focusable.
- [ ] Heading levels are correct: `h1` plus `h2` categories on `/stack`; `h2` plus `h3` categories on the homepage.
- [ ] Layout works from phone width up with no horizontal scroll; the category block stacks above its pills on small screens.
- [ ] Light and dark themes both look correct.
- [ ] Project case study pages and their "Built with" tables are untouched.
- [ ] No new hex colors, no hardcoded copy in `.tsx` files.
- [ ] `/#skills` anchor and side rail scroll spy still work.

---

## 8. Open questions for the owner

1. **"By Project" view:** it is removed from `/stack` in this design. Is that final, or should project stacks have another home (for example, only on each case study page, which already has the table)?
2. Should the six outcome lines stay as written, or does the owner want different wording? They are drafts, kept in `skills.ts`.
3. Are there skills that belong in the 25 but are missing, or ones that should go, depending on the work being targeted (freelance clients vs. employers)?
4. Should the homepage Stack section show all six rows, or a shorter preview with a link to `/stack`?
