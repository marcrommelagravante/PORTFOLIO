# Personal Portfolio Website — Template

A minimal, editorial personal portfolio template built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Folder Structure

```text
src/
  app/
    page.tsx                  # Homepage summary
    about/page.tsx            # Professional biography & skills
    projects/page.tsx         # Curated projects index
    projects/[slug]/page.tsx  # Project detail case study
    gear/page.tsx             # Hardware & software tools
    outside-the-ide/page.tsx  # Personal interests (Gaming, Gym, Volleyball)
    contact/page.tsx          # Contact page (platform cards)
    layout.tsx                # Root layout, fonts, theme initialization
    globals.css               # Design tokens (light/dark palette)
  components/
    layout/                   # SiteHeader, SiteFooter, MobileNavigation
    home/                     # Hero, SelectedProjects, SkillsPreview, GitHubContributions
    projects/                 # ProjectCard, ProjectGallery
    gear/                     # GearCard
    theme/                    # ThemeProvider, ThemeToggle
    motion/                   # MagneticButton, CustomCursor, PageLoader
    contact/                  # ContactCard, ContactIcons
  content/
    site.ts                   # Central identity, bio, and profile links
    projects.ts               # Curated project data
    skills.ts                 # Editable skill groups
    gear.ts                   # Editable gear items
    interests.ts              # Outside the IDE interests
  lib/
    github.ts                 # GitHub contributions fetcher with safe fallback
    metadata.ts               # Page metadata helper
    validation.ts             # External URL validation
public/
  images/
    profile-placeholder.svg
    projects/
      project-placeholder.svg
  files/
    README.md
```

## Replacing Placeholder Content

All personal data is centralized in `src/content/`:
1. **`src/content/site.ts`** — Replace `[FULL NAME]`, `[FIRST NAME]`, `[INITIALS]`, biography paragraphs, and optional links (`contactEmail`, `linkedinUrl`, `discordUrl`, `facebookUrl`, `resumeUrl`).
2. **`src/content/projects.ts`** — Replace sample placeholder projects with your real curated projects.
3. **`src/content/skills.ts`** — Replace bracketed skill category placeholders.
4. **`src/content/gear.ts`** — Replace `[GEAR ITEM]` and `[HOW I USE IT]` entries.
5. **`src/content/interests.ts`** — Update the descriptions for Gaming, Gym, and Volleyball.
6. **`public/images/` & `public/files/`** — Add your real portrait, project screenshots, and PDF résumé.
