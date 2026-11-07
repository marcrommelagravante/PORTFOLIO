# The Stack --- Portfolio Page Specification

> **Purpose:** Detailed implementation specification and architecture brief for the portfolio's dedicated **Stack** page and homepage section, implementing the **"Curated Ledger"** redesign described in `STACK_PAGE_REDESIGN.md`.

---

## 1. Page Goal

Provide a calm, focused, and curated showcase of the core programming languages, frameworks, AI platforms, databases, and developer tools used across production applications.

- **Standalone Route:** `/stack`
- **Homepage Section Anchor:** `/#skills`
- **Eyebrow:** `Technical toolkit`
- **Title:** `Stack`
- **Layout Style:** Editorial hairline ledger rows (25 curated technologies across 6 categories).
- **Detail Placement:** Full technical minutiae (ORM libraries, minor build dependencies, model variants, hardware components) are intentionally moved out of the main stack view and preserved in each project's own "Built with" case study table.

---

## 2. Visual Direction & Design Tokens

Follow the portfolio's bespoke exaggerated minimalism and editorial aesthetic:

- **Plain Solid Background:** Strictly plain background without decorative grids, orbital rings, floating dots, or noisy patterns.
- **Theme Support:**
  - **Light Mode:** Warm off-white background (`var(--background)`), dark charcoal text (`var(--foreground)`), muted secondary typography (`var(--muted)`), subtle hairline borders (`var(--border)`).
  - **Dark Mode:** Deep charcoal/near-black background, warm off-white text, low-contrast borders.
- **Typography Pairings:**
  - **Headings & Body:** Geist Sans (`font-sans`) with tight tracking for section titles and category names.
  - **Metadata & Pills:** Geist Mono (`font-mono`) for the eyebrow, derived counts, and technology pills.
- **Ledger Rows:** Subtle hairline dividers (`border-t border-(--border)` and `border-b border-(--border)` on the last row); no boxed cards or drop shadows.
- **Static Technology Pills:** Non-clickable, non-focusable monospace chips (`rounded-lg border border-(--border) bg-(--background) px-3.5 py-2 font-mono text-[12.5px] text-(--foreground)`) with no hover state or pointer cursor.

---

## 3. Page Structure & Components

```text
TECHNICAL TOOLKIT
Stack

───────────────────────────────────────────────────────────────────
Frontend  05          [React] [Next.js] [TypeScript] [Tailwind CSS]
Fast, accessible       [JavaScript]
interfaces people
enjoy using
───────────────────────────────────────────────────────────────────
Backend & APIs  04    [Node.js] [Python] [FastAPI] [REST APIs]
Reliable servers and
APIs behind the
interface
───────────────────────────────────────────────────────────────────
AI & LLMs  04         [Gemini API] [Groq + LLaMA 3.3] [RAG pipelines]
AI features grounded   [Embeddings]
in real data
───────────────────────────────────────────────────────────────────
Databases  03         [PostgreSQL] [Firebase Firestore] [pgvector]
Storage from realtime
sync to vector search
───────────────────────────────────────────────────────────────────
AR, 3D & Embedded 05  [Unity] [C#] [AR Foundation] [Blender] [Arduino]
Interactive 3D and
hardware simulation
───────────────────────────────────────────────────────────────────
Auth & Cloud  04      [Vercel] [Google OAuth 2.0] [JWT] [GitHub Actions]
Secure sign-in and
automatic deploys
───────────────────────────────────────────────────────────────────
```

### 3.1 Header Block
- **Eyebrow:** `font-mono text-xs font-medium uppercase tracking-wider text-(--muted)`, text `Technical toolkit`.
- **Title:** `Stack`, style `text-4xl sm:text-[44px] font-semibold tracking-tight leading-[1.08] text-(--foreground)`.
- **Heading Level:** `h1` on `/stack`, `h2` on homepage section.
- **Spacing:** `mb-11` under the title directly into the first ledger hairline.
- **No description paragraph and no tabs.**

### 3.2 Category Rows
- **Row Container:** `flex flex-wrap gap-8 border-t border-(--border) py-7` (last row includes `border-b border-(--border)`).
- **Left Column (`basis-60 shrink-0 max-w-full`):**
  - Name and count: `flex items-baseline gap-2.5`.
  - Category Heading: `text-base font-semibold tracking-tight text-(--foreground)` (`h2` on `/stack`, `h3` on homepage).
  - Item count: `font-mono text-xs text-(--muted)`, zero-padded (`05`), derived dynamically from `items.length`.
  - Outcome line: `mt-1.5 text-[13.5px] leading-normal text-(--muted)`.
- **Right Column (`flex min-w-0 flex-1 basis-[360px] flex-wrap content-start gap-2.5`):**
  - Semantic `<ul className="list-none ...">` with `aria-label="{Category} technologies"`.
  - Each item: `<li>` styled as `inline-flex items-center rounded-lg border border-(--border) bg-(--background) px-3.5 py-2 font-mono text-[12.5px] text-(--foreground)`.

---

## 4. Curated Content (25 Technologies across 6 Categories)

1. **Frontend** (`outcome: "Fast, accessible interfaces people enjoy using"`):
   - `React`, `Next.js`, `TypeScript`, `Tailwind CSS`, `JavaScript`
2. **Backend & APIs** (`outcome: "Reliable servers and APIs behind the interface"`):
   - `Node.js`, `Python`, `FastAPI`, `REST APIs`
3. **AI & LLMs** (`outcome: "AI features grounded in real data"`):
   - `Gemini API`, `Groq + LLaMA 3.3`, `RAG pipelines`, `Embeddings`
4. **Databases** (`outcome: "Storage from realtime sync to vector search"`):
   - `PostgreSQL`, `Firebase Firestore`, `pgvector`
5. **AR, 3D & Embedded** (`outcome: "Interactive 3D and hardware simulation"`):
   - `Unity`, `C#`, `AR Foundation`, `Blender`, `Arduino`
6. **Auth & Cloud** (`outcome: "Secure sign-in and automatic deploys"`):
   - `Vercel`, `Google OAuth 2.0`, `JWT`, `GitHub Actions`

---

## 5. Centralized Data Architecture

Defined in [`src/content/skills.ts`](src/content/skills.ts):

```typescript
export type SkillCategory = {
  id: string;      // "frontend", "backend", "ai", "databases", "ar-3d-embedded", "auth-cloud"
  label: string;   // "Frontend"
  outcome: string; // one short line, shown under the label
  items: string[]; // plain names, no versions
};

export const stackPageHeader = {
  eyebrow: "Technical toolkit",
  title: "Stack",
  description: "Curated technical toolkit and core technologies.",
};

export const skillCategories: SkillCategory[] = [ ... ];
```

---

## 6. Component Implementation

- **Section Component:** [`src/components/sections/StackSection.tsx`](src/components/sections/StackSection.tsx)
  - Pure React Server Component (no client state or hooks).
  - Dynamically calculates heading tags and maps over `skillCategories`.
- **Homepage Integration:** [`src/components/home/SkillsPreview.tsx`](src/components/home/SkillsPreview.tsx)
  - Renders `<StackSection headingLevel="h2" />`.
- **Standalone Route:** [`src/app/stack/page.tsx`](src/app/stack/page.tsx)
  - Renders `<StackSection headingLevel="h1" isStandalone />`.

---

## 7. Accessibility & Responsive Verification

- **Semantic HTML:** Proper `h1`/`h2`/`h3` hierarchy, `ul`/`li` list structure with accessible labels.
- **Keyboard & Screen Readers:** Pills are non-interactive informational chips without false tab stops.
- **Mobile Friendly:** Below 640px, the row wraps naturally with category meta on top and pills below.
- **No Overflow:** Zero horizontal scroll on any viewport width.
