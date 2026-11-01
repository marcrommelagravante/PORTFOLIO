# Beyond the IDE --- Gallery Page Specification

> **Purpose:** Build the dedicated Beyond the IDE page as a visual
> gallery of interests outside software development. This is a
> template-first brief using temporary images and editable placeholder
> captions.
>
> **Critical visual requirement:** The page background must be plain and
> solid. Remove all decorative background patterns from the previous
> concept.

## 1. Page Goal

Create a personal, photography-first gallery page. It should feel calm,
editorial, minimal, and visually engaging. The gallery---not long
descriptions, articles, or timelines---must be the main focus.

Page route: `/outside-the-ide` (or retain the existing route).

Suggested heading: **Life beyond the screen.**

Suggested introduction: "Not everything happens in front of a code
editor. Here's a little glimpse of the things I enjoy outside
development."

Both lines must be editable.

## 2. Template-First Content

Use temporary, category-appropriate images until the owner supplies real
photographs. Clearly mark them in the content data, not necessarily as
visible labels in the final UI.

Initial gallery categories: 1. Gaming 2. Gym 3. Volleyball 4. Other
Interests

Use editable placeholder captions, for example: - Gaming: "Game. Chill.
Repeat." - Gym: "Train harder." - Volleyball: "Play with passion." -
Other Interests: "More beyond the usual."

These are sample captions only. Do not invent personal stories,
achievements, teams, rankings, fitness records, or other personal
details. Do not imply temporary images depict the owner.

## 3. Visual Direction

-   Minimal editorial gallery.
-   Reuse the existing portfolio typography, spacing, borders, and color
    tokens.
-   Warm off-white in light mode; charcoal/near-black in dark mode.
-   Charcoal text, muted secondary labels, subtle card borders.
-   High-quality photography with careful crops.
-   Short captions and restrained labels.
-   Keep the layout spacious but make the gallery visible near the top
    of the page.

### Plain background --- strict requirement

Use one solid background color from the existing theme tokens: - Light
mode: warm off-white (current starting token `#F3F1EA`). - Dark mode:
existing charcoal/near-black background token.

**Do not add any of the following to the page background:** - Orbital
lines, circular outlines, curves, or waves. - Stars, sparkles, dots, or
grid patterns. - Grain, noise, paper textures, or decorative overlays. -
Gradients, background photographs, or abstract illustrations. - Animated
background shapes or SVG decorations. - Pseudo-elements, masks, or
repeating gradients that simulate patterns.

The only prominent imagery should be inside the gallery cards. A subtle
image overlay/gradient is permitted **inside a photo card only** to make
its caption readable.

## 4. Preserve the Existing Sidebar and Footer

Do not redesign the site's navigation as part of this task. Reuse the
existing sidebar and highlight Beyond the IDE as the active page.

Preserve the grouped navigation: - **GENERAL:** Home, About Me -
**PORTFOLIO:** Projects - **MY WORKSPACE:** The Toolkit - **BEYOND
DEVELOPMENT:** Beyond the IDE - **LET'S CONNECT:** Contact

Keep the existing icons, section labels, spacing, borders, theme
controls, responsive behavior, and footer. Do not duplicate the sidebar
in the page content.

## 5. Page Header

At the top of the main content: - Small eyebrow: `BEYOND THE IDE` - Main
heading: `Life beyond the screen.` - Short supporting sentence as
specified above. - Optional small category index on the right:
`GAMING · GYM · VOLLEYBALL`.

If category labels are interactive, they must scroll to the matching
gallery item. Do not style nonfunctional text as clickable controls.

## 6. Gallery Layout

Use an asymmetrical editorial grid rather than four identical cards.

Suggested desktop arrangement:

``` text
+----------------------+----------------------+------------------+
|                      |                      |                  |
|       GAMING         |         GYM          |                  |
|                      |                      |    VOLLEYBALL    |
+----------------------+----------------------+                  |
|                                             |                  |
|              OTHER INTERESTS                |                  |
|                                             |                  |
+---------------------------------------------+------------------+
```

-   Gaming: medium-wide card in the upper left.
-   Gym: medium-wide card in the upper middle.
-   Volleyball: tall card on the right, spanning both rows.
-   Other Interests: wide card below Gaming and Gym.

Adjust proportions to the available content width while keeping the
composition balanced.

### Responsive behavior

-   Desktop: use the asymmetrical grid.
-   Tablet: use two columns; allow the tall card to return to normal
    flow if necessary.
-   Mobile: stack cards in one column with consistent gaps.
-   Do not force a spanning/tall card on mobile.
-   Avoid horizontal scrolling.
-   Preserve image focal points as cards resize.

## 7. Gallery Cards

Each card should support: - Full-bleed photograph. - Category label near
the top-left, optionally with a small icon. - Optional arrow affordance
near the top-right. - Short caption near the bottom-left. - Subtle image
overlay inside the card when needed for contrast.

Use `object-fit: cover`, stable aspect ratios, and per-image
`object-position` where needed. Reserve image dimensions to prevent
layout shift.

### Temporary image guidance

-   Gaming: tasteful gaming setup, controller, or gaming environment.
-   Gym: gym equipment, weights, or training environment.
-   Volleyball: volleyball court, net, or ball in play.
-   Other Interests: a neutral image representing another hobby or
    interest.

Avoid watermarks, text overlays, and prominent logos. Prefer optimized
local assets for production. Use meaningful alt text. If an image is
missing, show a neutral placeholder that preserves the card's
dimensions.

### Click behavior

The first version may be a static gallery. Do not make cards look
clickable unless they perform a real action.

If a card opens a lightbox, implement keyboard access, focus management,
close behavior, and accessible previous/next controls where applicable.
Do not add a partial or nonfunctional lightbox.

## 8. Animation and Interaction

Add subtle motion to make the page feel polished: - Heading and
introduction fade in gently. - Gallery cards fade in with a small
stagger. - Images scale slightly on hover. - Card border or elevation
changes subtly on hover. - Arrow affordance may move a few pixels.

Rules: - Use short, restrained transitions. - Do not delay access to
content. - Avoid continuous looping animations and exaggerated
parallax. - Do not cause layout shifts. - Provide keyboard focus styling
equivalent to hover. - Do not rely on hover to reveal essential content
on touch devices. - Respect `prefers-reduced-motion`. - Prefer CSS
transitions and transforms over adding a large animation dependency.

Optional: a small `SCROLL TO EXPLORE` hint may appear if more gallery
content exists below the fold. It must not overlap cards or the footer
and should not appear when unnecessary.

## 9. Light and Dark Themes

Reuse the site's existing theme system.

Light mode: - Plain warm off-white background. - Dark charcoal text. -
Muted labels and subtle borders.

Dark mode: - Plain charcoal/near-black background. - Warm off-white
text. - Muted labels and visible but restrained borders.

Adjust photo overlays as needed for readable captions. No decorative
background patterns in either theme.

## 10. Suggested Typed Content Data

Keep gallery content in a central typed data file rather than hardcoding
it into the page component.

``` ts
export type InterestGalleryItem = {
  id: string;
  title: string;
  image: string;
  alt: string;
  caption: string;
  className?: string;
  objectPosition?: string;
  isPlaceholder: boolean;
};

export const interestGallery: InterestGalleryItem[] = [
  {
    id: "gaming",
    title: "Gaming",
    image: "/images/interests/gaming-placeholder.jpg",
    alt: "Temporary image representing gaming",
    caption: "Game. Chill. Repeat.",
    className: "gallery-gaming",
    isPlaceholder: true,
  },
  {
    id: "gym",
    title: "Gym",
    image: "/images/interests/gym-placeholder.jpg",
    alt: "Temporary image representing gym training",
    caption: "Train harder.",
    className: "gallery-gym",
    isPlaceholder: true,
  },
  {
    id: "volleyball",
    title: "Volleyball",
    image: "/images/interests/volleyball-placeholder.jpg",
    alt: "Temporary image representing volleyball",
    caption: "Play with passion.",
    className: "gallery-volleyball",
    isPlaceholder: true,
  },
  {
    id: "other-interests",
    title: "Other Interests",
    image: "/images/interests/other-interests-placeholder.jpg",
    alt: "Temporary image representing other interests",
    caption: "More beyond the usual.",
    className: "gallery-other",
    isPlaceholder: true,
  },
];
```

Adapt this to the existing project's conventions. Avoid duplicate
content sources.

## 11. Accessibility and Performance

-   Use semantic `main`, `section`, and heading elements.
-   Maintain a logical heading hierarchy.
-   Add useful alt text to informative images.
-   Ensure text over images has sufficient contrast.
-   Provide keyboard focus states.
-   Do not rely on hover-only content.
-   Respect reduced-motion preferences.
-   Use optimized images and Next.js image handling where appropriate.
-   Lazy-load below-the-fold images when useful.
-   Reserve image dimensions to prevent layout shift.
-   Avoid unnecessary animation or gallery dependencies.
-   Keep the page usable if an image fails to load.

## 12. Implementation Checklist

### Layout and content

-   [ ] Preserve the existing sidebar and footer.
-   [ ] Highlight Beyond the IDE as the active page.
-   [ ] Add the eyebrow, heading, and short introduction.
-   [ ] Build the asymmetrical gallery grid.
-   [ ] Add Gaming, Gym, Volleyball, and Other Interests cards.
-   [ ] Use temporary category-matched images and editable captions.
-   [ ] Centralize gallery content so images and text are easy to
    replace.

### Plain background

-   [ ] Use a solid theme background color.
-   [ ] Remove orbital/circular lines and curves.
-   [ ] Remove stars and sparkles.
-   [ ] Remove dots, grids, textures, grain, and noise.
-   [ ] Remove gradients and decorative background illustrations.
-   [ ] Check pseudo-elements, SVGs, masks, and overlays for hidden
    patterns.
-   [ ] Verify the background is plain in both themes.

### Interaction and quality

-   [ ] Add subtle entrance and hover animations.
-   [ ] Keep image overlays inside cards only.
-   [ ] Respect reduced-motion settings.
-   [ ] Test desktop, tablet, and mobile layouts.
-   [ ] Test light and dark themes.
-   [ ] Test keyboard navigation and focus visibility.
-   [ ] Test image fallbacks and loading behavior.
-   [ ] Confirm there is no horizontal overflow.

## 13. Definition of Done

The page is complete when: - It functions as a dedicated visual gallery
of interests outside development. - Photography is the primary content;
text remains concise. - All four gallery categories are present with
temporary images. - The desktop layout is asymmetrical and balanced. -
The mobile layout becomes a clean single-column gallery. - Existing site
navigation, footer, and theme behavior are preserved. - Motion is
subtle, accessible, and non-blocking. - The background is completely
plain in light and dark modes. - No decorative background patterns,
textures, gradients, or illustrations remain. - Temporary images and
captions can be replaced without rewriting the layout.

## 14. Final Instructions for the Implementing Agent

1.  Inspect the existing portfolio code before making changes.
2.  Reuse existing sidebar, footer, typography, color tokens, and theme
    logic.
3.  Implement only the Beyond the IDE page, except for small
    shared-component adjustments that are necessary.
4.  Treat this document as the source of truth for this page.
5.  Use temporary images and clearly marked editable placeholder
    content.
6.  Keep the gallery as the primary focus.
7.  Keep the page background plain and solid. Do not add decorative
    background designs.
8.  Confine any text-contrast overlay to the gallery photographs.
9.  Do not invent personal details or imply temporary images depict the
    owner.
10. Test responsive behavior, theme switching, accessibility, image
    fallbacks, and reduced motion.
11. At completion, report what was implemented and explain how to
    replace the temporary images and captions.
