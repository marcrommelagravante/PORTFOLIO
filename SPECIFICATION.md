# Personal Portfolio Website — Template Specification

> **Document purpose:** This is a reusable **template and implementation brief**, not a finished portfolio. Build the site with clearly marked placeholder content first. Do not invent the owner's biography, skills, projects, résumé details, contact information, or personal photo. Make it easy to replace all sample content later.
>
> **Status:** Initial design and requirements specification  
> **Owner name placeholder:** `[FULL NAME]`  
> **GitHub profile:** `https://github.com/marcrommelagravante`  
> **Preferred stack:** Next.js + TypeScript + Tailwind CSS  
> **Deployment target:** Vercel

---

## Folder Structure

```text
src/
  app/
    page.tsx
    about/
      page.tsx
    projects/
      page.tsx
      [slug]/
        page.tsx
    gear/
      page.tsx
    outside-the-ide/
      page.tsx
    contact/
      page.tsx
    api/
      contact/
        route.ts
    layout.tsx
    globals.css
  components/
    layout/
      SiteHeader.tsx
      SiteFooter.tsx
      MobileNavigation.tsx
    home/
      Hero.tsx
      SelectedProjects.tsx
      SkillsPreview.tsx
      GitHubContributions.tsx
    projects/
      ProjectCard.tsx
      ProjectGallery.tsx
    gear/
      GearCard.tsx
    theme/
      ThemeProvider.tsx
      ThemeToggle.tsx
    motion/
      MagneticButton.tsx
      CustomCursor.tsx
      PageLoader.tsx
    contact/
      ContactForm.tsx
  content/
    site.ts
    projects.ts
    skills.ts
    gear.ts
    interests.ts
  lib/
    github.ts
    metadata.ts
    validation.ts
public/
  images/
    profile-placeholder.svg
    projects/
      project-placeholder-1.svg
      project-placeholder-2.svg
  files/
    README.md
```
