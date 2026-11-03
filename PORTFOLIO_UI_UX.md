# Portfolio UI/UX Design System & Architectural Overview

> **Document Purpose:** This document is a comprehensive, production-accurate breakdown of the portfolio's visual identity, UI architecture, layout system, motion design, and user experience. It serves as the single source of truth for AI agents, designers, and developers working on or extending this portfolio.

---

## 1. Executive Summary & Aesthetic Identity

The portfolio is designed around **warm editorial minimalism**—combining the typographic discipline of high-end print design with tactile, fluid digital interactions. It rejects generic developer portfolio tropes (such as noisy particle meshes, neon gradients, cyberpunk glows, floating SVGs, or busy background grids) in favor of:

1. **A Solid, Calm Canvas:** A strict "Plain Background" rule across all pages in both light and dark modes. No canvas stars, orbital arcs, grid lines, or grain.
2. **Tactile & Fluid Micro-Interactions:** Editorial project ledger with live sticky preview, 3D draggable interest photo stacks, magnetic buttons, and responsive collapsible sidebars.
3. **Typography-First Hierarchy:** Dual-font system featuring **Geist Sans** for clean, readable editorial copy and **Geist Mono** for technical eyebrows, specs, metadata, and status tags.
4. **Natural Monochrome Contrast:** Light mode evokes warm parchment/off-white with rich charcoal text; dark mode evokes deep, warm near-black stone with soft off-white text.

---

## 2. Design Tokens & Color Palette

The site uses **Tailwind CSS v4** with CSS variables declared on `:root` and `.dark`. All borders, surfaces, texts, and backgrounds strictly reference these semantic tokens.

### Theme Palette

| Token | Light Theme | Dark Theme | Purpose & Usage |
| :--- | :--- | :--- | :--- |
| `--background` | `#F3F1EA` (Warm Parchment) | `#171715` (Deep Charcoal) | Canvas background; strictly solid and plain. |
| `--surface` | `#E5E2D9` (Soft Stone) | `#22221F` (Elevated Charcoal) | Card containers, sidebar background, image frame placeholders. |
| `--foreground` | `#33332F` (Rich Charcoal) | `#EFECE4` (Warm Soft White) | Primary headings, active navigation text, high-contrast buttons. |
| `--muted` | `#6F6D66` (Muted Olive Grey) | `#A09D94` (Muted Warm Grey) | Secondary descriptions, captions, specs, category labels. |
| `--border` | `#D0CEC5` (Subtle Stone Border) | `#32312C` (Subtle Dark Border) | Divider lines, card borders, navigation separators. |

### Color Principles
- **No Harsh Pure Blacks or Whites:** Backgrounds are slightly warm (`#F3F1EA` / `#171715`), preventing eye strain and clinical dryness.
- **Card Hover Inversion:** Contact cards invert completely on hover: background switches to `--foreground`, text switches to `--background`.
- **Photo Overlays:** Dimming gradients (`bg-linear-to-t from-black/84 via-black/34 to-black/20`) are strictly confined **inside** photography cards (such as Toolkit and Outside-the-IDE) to ensure readable captions without tinting the page background.

---

## 3. Typography & Hierarchy

Powered by `next/font/google` using **Geist Sans** and **Geist Mono**.

```text
Geist Sans  --> Body text, primary headings, buttons, project titles
Geist Mono  --> Section eyebrows (UPPERCASE), category tags, hardware specs,
                GitHub activity timestamps, monogram branding, code tags
```

### Type Scale Standards
- **Display Hero Headings:** Fluid clamp: `text-[clamp(2.25rem,4vw,3.5rem)] font-semibold tracking-tight leading-[1.1]`.
- **Page Titles & Major Headers:** `text-3xl font-semibold tracking-tight sm:text-4xl`.
- **Section Headers:** `text-2xl font-semibold tracking-tight sm:text-3xl`.
- **Card Headers:** `text-lg font-semibold tracking-tight sm:text-xl`.
- **Body & Paragraphs:** `text-base leading-relaxed text-(--foreground)/90` or `text-(--muted)`.
- **Eyebrows & Metadata:** `font-mono text-xs uppercase tracking-wider text-(--muted)`.
- **Micro Tags & Badges:** `font-mono text-[10px]` or `text-[11px]`.

---

## 4. Navigation & Layout Architecture

The layout employs a responsive split architecture: a **floating, collapsible side rail** on desktop, paired with a **sticky top header and mobile drawer** on mobile/tablet viewports.

```text
DESKTOP VIEWPORT (≥ 1024px)
+---------------------------------------------------------------------------------+
|  +--------------+  +---------------------------------------------------------+  |
|  | [MRA.]  [<]  |  |                                                         |  |
|  |              |  |   MAIN CONTENT WELL (max-w-4xl, centered)               |  |
|  | GENERAL      |  |                                                         |  |
|  | • Home       |  |   [ Hero Section ]                                      |  |
|  | • About Me   |  |   [ About Me Section ]                                  |  |
|  |              |  |   [ Projects Ledger + Preview ]                         |  |
|  | PORTFOLIO    |  |   [ Tech Stack Grid ]                                   |  |
|  | • Projects   |  |   [ GitHub Monochrome Heatmap ]                         |  |
|  |              |  |   [ Let's Connect Cards ]                               |  |
|  | MY WORKSPACE |  |                                                         |  |
|  | • The Toolkit|  +---------------------------------------------------------+  |
|  |              |  |   GLOBAL FOOTER                                         |  |
|  | BEYOND DEV   |  +---------------------------------------------------------+  |
|  | • Beyond IDE |                                                               |
|  |              |                                                               |
|  | LET'S CONNECT|                                                               |
|  | • Contact    |                                                               |
|  |              |                                                               |
|  | [Theme (O)]  |                                                               |
|  +--------------+                                                               |
+---------------------------------------------------------------------------------+
```

### 1. Desktop Floating Side Rail (`SideRail.tsx`)
- **Positioning:** Floating glassmorphic card pinned at `fixed top-6 bottom-6 left-6 z-40 my-auto rounded-3xl border border-(--border) bg-(--surface)/55 backdrop-blur-xs`.
- **Collapsible States:**
  - **Expanded (`w-56`):** Displays branding monogram, toggle button, group headings, item icons, and textual labels.
  - **Collapsed (`w-16`):** Shrinks to an icon-only dock. Displays floating tooltip pills (`role="tooltip"`) on hover and focus.
  - State is saved in `localStorage["portfolio-sidebar-collapsed"]` and set on `document.documentElement[data-sidebar-collapsed="true"]` with inline zero-FOUC hydration scripts.
- **Scroll Spy:** Automatically detects the visible section on the homepage (`#home`, `#about`, `#projects`, `#skills`, `#github`, `#contact`) and activates the corresponding rail item.
- **Active State Indicator:** A vertical pill bar `w-1 rounded-r-full bg-(--foreground)` at the left border edge, paired with `bg-(--foreground)/8` and bold text.
- **In-Sidebar Theme Toggle:** Bottom dock control switches between Light and Dark themes with Sun/Moon SVGs.

### 2. Grouped Navigation Taxonomy
Navigation is strictly organized into 5 thematic groups across both desktop and mobile:

| Group Title | Item Label | Route / Anchor | Icon |
| :--- | :--- | :--- | :--- |
| **GENERAL** | Home | `/#home` | Minimalist House outline |
| | About Me | `/#about` (or `/about`) | User circle avatar outline |
| **PORTFOLIO** | Projects | `/#projects` (or `/projects`) | Folder tab outline |
| **MY WORKSPACE** | The Toolkit | `/gear` | Computer display monitor |
| **BEYOND DEVELOPMENT** | Beyond the IDE | `/outside-the-ide` | Warm coffee mug outline |
| **LET'S CONNECT** | Contact | `/#contact` (or `/contact`) | Envelope mail outline |

### 3. Mobile / Tablet Header (`SiteHeader.tsx` & `MobileNavigation.tsx`)
- On screens `< 1024px`, the desktop sidebar is hidden.
- A slim sticky bar (`h-16 border-b border-(--border) bg-(--background)/95 backdrop-blur-xs`) houses:
  - Left: Monogram brand logo (`PageLoader`).
  - Right: Quick theme toggle + Hamburger icon button.
- Clicking the hamburger opens an animated accordion drawer displaying the exact 5 grouped categories.

### 4. Main Content Container
- Responsive left offset: `sidebar-content-offset lg:pl-64` (smoothly animates to `6rem` when collapsed).
- Centered readable column: `mx-auto w-full max-w-4xl px-6 sm:px-8`.
- Section scroll offsets: `scroll-margin-top: 5rem` (mobile) / `1.5rem` (desktop).

---

## 5. Detailed Page-by-Page Visual & UX Breakdown

### 5.1 Homepage (`/`)

The homepage serves as a comprehensive, scrollable editorial index of the creator's identity, work, stack, and activity.

#### 1. Hero Section (`Hero.tsx`)
- **Left Column:**
  - Role eyebrow: `[STUDY/ROLE] · [PROFESSIONAL FOCUS]` in `font-mono text-xs text-(--muted)`.
  - Headline: "Hi, I'm [First Name]. I build useful things for the web."
  - Short intro paragraph with high line-height.
  - Two magnetic action buttons:
    - Primary: Filled `bg-(--foreground)` with `text-(--background)` ("Explore my work" -> `#projects`).
    - Secondary: Outlined border `border-(--border) bg-(--surface)/50` ("About me" -> `#about`).
- **Right Column:**
  - Circular framed portrait (`aspect-square rounded-full border border-(--border) bg-(--surface)`).
  - Floating badge attached to the top-right of the avatar: `// Developer` in a pill container with blur.
  - Graceful fallback: If no photo is supplied, displays clean monograms and placeholder text.

#### 2. About Me Section (`AboutSection.tsx`)
- Editorial narrative paragraphs explaining educational background, engineering philosophy, and problem-solving focus.
- Optional primary button: "Download résumé".
- Seamlessly re-used in both the homepage anchor (`#about`) and the standalone `/about` route.

#### 3. Featured Projects: Ledger + Live Preview (`ProjectsLedger.tsx`)
A calm, typographic ledger of projects paired with a live sticky preview panel on desktop:
- **Left Column (Ledger):**
  - Group header (`Personal projects` + zero-padded count) over hairline-divided project rows (`ProjectRow.tsx`).
  - Each row renders a 76×52 thumbnail (`ProjectThumb.tsx`), title, optional status chip (`Beta` / `Soon`), two-line clamped summary, and right-aligned monospace category tag.
  - Active row on desktop features a `bg-(--foreground)/7` pill highlight (`-mx-4 px-4 rounded-[14px]`) and a `3px` left indicator pill matching `SideRail`.
- **Right Column (Sticky Live Preview — `ProjectPreview.tsx`, `lg:` and up):**
  - Dark device card (`bg-(--device-bg) border-(--device-border)`) in both light and dark themes so the 16:10 cover reads as a physical screen.
  - Meta block beneath the card (`01 / 04 · {tag}`, 28px title, summary, technology pills, and `View Project →` CTA) fades and rises cleanly (`animate-fade-rise`) when `activeSlug` changes.
- **Interactivity & Accessibility:**
  - Mouse hover (`pointerType === "mouse"`) or keyboard focus updates `activeSlug`; `ArrowUp` / `ArrowDown` moves focus between rows.
  - Below `lg`, the preview panel is omitted and rows act as direct links to `/projects/[slug]`.

#### 4. Tech Stack (`SkillsPreview.tsx`)
- Categorized cards for **Frontend**, **Backend & Hosting**, **AI**, and **Mobile**.
- Layout: Horizontal split row on tablet/desktop with category label on left (`font-mono text-xs text-(--muted) sm:w-36`) and pill tags on right (`rounded border border-(--border) bg-(--background) px-2.5 py-1 font-mono text-xs text-(--foreground)`).

#### 5. GitHub Activity Heatmap (`GitHubContributions.tsx`)
- Live, verified GitHub contribution graph fetched server-side from GitHub GraphQL API.
- **Tonal Monochromatic Intensity Levels:** Replaces default third-party greens with the portfolio's native palette:
  - Level 0: `bg-(--surface) border-(--border)`
  - Level 1: `bg-(--muted)/25 border-(--border)`
  - Level 2: `bg-(--muted)/50 border-(--border)`
  - Level 3: `bg-(--foreground)/70 border-(--border)`
  - Level 4: `bg-(--foreground) border-(--foreground)`
- **Graceful Fallback:** If API tokens are absent or rate-limited, shows an honest template disclaimer with a direct link to the verified profile—strictly zero fabricated dummy commits or fake green squares.

#### 6. Contact Grid (`ContactSection.tsx` & `ContactCard.tsx`)
- 2-column card grid for **Email**, **LinkedIn**, **Discord**, and **Facebook**.
- **Interactive Inversion:** Hovering or keyboard-focusing on an active card completely inverts it:
  - Card background transitions smoothly to `--foreground`.
  - Icon, title, and description transition to `--background`.
- **Disabled State:** If a link is not yet configured, the card renders at 50% opacity with a `Coming soon` status pill in monospace.

---

### 5.2 The Toolkit (`/gear`)

A photography-first curated showcase of the hardware, peripheral equipment, and computing environment used for development and creation.

```text
DESKTOP TOOLKIT COLLAGE GRID (lg:grid-cols-[1.3fr_1fr] lg:grid-rows-[255px_255px_255px])
+------------------------------------------+------------------------------------+
|                                          |  SYSTEM UNIT                       |
|  MONITOR (Hero Card - Spans 2 Rows)      |  [PC Build Photo]                  |
|  [Screen Photo]                          +------------------------------------+
|                                          |  KEYBOARD                          |
|                                          |  [Mechanical Keyboard Photo]       |
+------------------------------------------+------------------------------------+
|  HEADSET                                 |  MOUSE                             |
|  [Headset Studio Photo]                  |  [Ergonomic Mouse Photo]           |
+------------------------------------------+------------------------------------+
```

#### Strict Editorial Guidelines
1. **No Top-Left Breadcrumbs:** No `MY SETUP · GEAR · TOOLS` crumbs; begins directly with the clean header.
2. **No Top-Right Filter Pills:** No tabs for "Hardware / Software / Accessories". All primary devices live in one curated collage.
3. **Curated 5-Item Collage Grid:**
   - **Monitor:** Hero item spanning 2 vertical rows on the left.
   - **System Unit / PC Build:** Top right.
   - **Keyboard:** Middle right.
   - **Headset:** Bottom left.
   - **Mouse:** Bottom right.
4. **Photography-First Card Treatment (`GearCard.tsx`):**
   - Rounded 2xl borders (`rounded-2xl border border-(--border) bg-(--surface)`).
   - High-contrast internal dark gradient overlay (`bg-linear-to-t from-black/84 via-black/34 to-black/20`) to guarantee crisp white typography over product photos.
   - Top pill badge: Glassmorphic category pill (`Monitor`, `System Unit`, etc.).
   - Bottom block: Model name in bold, technical specifications (`font-mono text-[11px] text-white/75`), and a one-sentence explanation of how it serves the workflow.
   - Subtle hover zoom: Photo gently scales up (`group-hover:scale-[1.03]`).

---

### 5.3 Beyond the IDE (`/outside-the-ide`)

A photography-driven gallery dedicated to personal life and pursuits outside programming (Gaming, Gym, Volleyball, Other Interests).

#### 3D Interactive Card Stack Deck (`InterestsSection.tsx`)
- **Physical Deck Illusion:**
  - Uses CSS 3D perspective (`perspective: 800px`) with aspect ratio `aspect-3/4` (vertical portrait card).
  - Visible background cards peek out sequentially with stacked vertical offsets (`peek: 32px`) and 3D depth retraction (`depth: 36px`).
  - Background cards have simulated lighting falloff: `brightness(1 - pos * 0.06)`.
- **Gesture Drag & Flick:**
  - Pointer capture allows direct mouse dragging or touchscreen swiping.
  - While dragging, the front card follows the pointer horizontally and rotates proportionally (`rotate(dragX * 0.04deg)`).
  - Crossing an 80px threshold flips to the next or previous card in the deck with an easing curve (`cubic-bezier(0.22, 1, 0.36, 1)`).
- **Controls & Pagination:**
  - Centered details below the deck: Active category title, quote/caption, tabular counter (`1 / 4`), and circular arrow buttons.
  - Keyboard arrow keys cycle through the deck seamlessly.
- **Strict Background Rule:** The background remains 100% solid theme canvas (`#F3F1EA` / `#171715`). No textures, grids, stars, or decorative wave SVG shapes.

---

### 5.4 Project Case Study (`/projects/[slug]`)

Dedicated deep-dive page for individual portfolio projects:
- **Header:** Back navigation breadcrumb ("← Back to Projects"), large project title, summary, and primary external action link ("Visit Landing Page ↗").
- **Screenshot Carousel (`ProjectGallery.tsx`):**
  - Full-width 16:10 interactive sliding track with touch-swipe support.
  - Circular arrow controls on left and right edges.
  - Glassmorphic pill indicator at the bottom with expanding active dot pill.
- **Structured Content Blocks:**
  - **Overview:** Long-form background, user goals, and problem statement.
  - **Features:** Bulleted list of user-facing capabilities.
  - **Highlights:** Architectural wins, latency optimizations, or engineering metrics.
  - **Tech Stack:** Monospace bulleted list of libraries and APIs used.

---

## 6. Motion Design & Interaction Philosophy

Motion in this portfolio is **restrained, accessible, and purposeful**. Animations exist to orient the user and provide physical feedback, never to slow down access to content.

### 1. Motion Primitives
- **Magnetic Physics (`MagneticButton.tsx`):** Button links slightly gravitate towards the user's cursor (`* 0.16` spring offset) on mouse move, springing back smoothly on leave. Disabled on touchscreens or when `prefers-reduced-motion` is active.
- **Non-blocking Entrance Accent (`PageLoader.tsx`):** Renders the brand initials immediately; does not hijack page load or overlay a full-screen curtain.
- **Cubic-Bezier Easing:** Transitions rely on standard high-end easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Card Hover Elevation:** Subtle `-translate-y-0.5` lift, paired with border darkening/brightening and soft shadow enhancement.

### 2. Accessibility & Reduced Motion
In `globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
All gestures fall back to instant transitions, carousels preserve static switching, and magnetic listeners immediately abort.

---

## 7. Centralized Content Architecture

All data, copy, images, and links are strictly decoupled from visual UI components and housed within typed configuration modules in `src/content/`:

| File | Purpose | Key Exports & Data Types |
| :--- | :--- | :--- |
| `src/content/site.ts` | Global persona, bio, social links, SEO tags | `siteConfig: SiteConfig` (names, initials, links, bios) |
| `src/content/projects.ts` | Curated case studies and featured works | `portfolioProjects: PortfolioProject[]` (slug, tech, features, URLs) |
| `src/content/gear.ts` | The Toolkit items and hardware specs | `toolkitItems: ToolkitItem[]`, `toolkitPageHeader` |
| `src/content/interests.ts`| Beyond the IDE hobbies, captions, stack config | `interestGallery: InterestGalleryItem[]`, `interestPageHeader` |
| `src/content/skills.ts` | Technology categories and pill lists | `skillCategories: SkillCategory[]` (Frontend, Backend, AI, Mobile) |

---

## 8. Rules for Future Agents & Contributors

When adding new components, editing pages, or introducing features:

1. **Maintain the Solid Background Rule:** Never introduce decorative background gradients, orbital lines, noise/grain overlays, or particle effects. The canvas must stay `#F3F1EA` (light) and `#171715` (dark).
2. **Use Tailwind v4 Token Classes:** Always write `bg-(--background)`, `bg-(--surface)`, `text-(--foreground)`, `text-(--muted)`, and `border-(--border)`. Do not use hardcoded hex codes or default Tailwind grays (`bg-gray-100`, `text-slate-800`).
3. **Respect Sidebar Collision Boundaries:** All new page content must reside inside `<main className="mx-auto w-full max-w-4xl flex-1 px-6 sm:px-8">` under the `<div className="sidebar-content-offset lg:pl-64">` wrapper.
4. **Preserve Keyboard & Screen-Reader States:** Every interactive card, carousel, or button must provide visible focus rings (`focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)`) and ARIA live regions for slide transitions.
5. **Keep Personal Content Centralized:** Never hardcode personal names, email addresses, or projects directly inside `.tsx` components; read them from `src/content/`.

