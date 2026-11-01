# The Toolkit --- Portfolio Page Specification

> **Purpose:** Template-first implementation brief for the portfolio's
> dedicated The Toolkit page. It showcases the owner's real computer
> setup and tools.
>
> **Important update:** Remove the top-right category tabs and the
> top-left `MY SETUP · GEAR · TOOLS` breadcrumb. Neither should appear
> in the design.

## 1. Page Goal

Create a curated, photography-first showcase of the equipment used for
development, productivity, and everyday computing.

Prioritize these five items: 1. Monitor 2. System Unit / Desktop PC 3.
Keyboard 4. Mouse 5. Headset

This is a template. Use temporary images and editable placeholder
details until the owner provides actual product photos, models, and
specifications. Do not invent device models, brands, prices, or
technical specifications.

Suggested heading: **The Toolkit**

Suggested description: "The tools behind the work. A look at the
hardware and everyday equipment I use to build, create, and stay
productive."

Keep the heading and description editable.

## 2. Strictly Remove These Elements

### Top-left breadcrumb

Do not show: - `MY SETUP` - `GEAR` - `TOOLS` - Breadcrumb separators,
dots, or replacement breadcrumb text.

The page must begin directly with the main heading **The Toolkit**,
followed by its short description.

### Top-right category selector

Do not show: - Hardware / Software / Accessories tabs. - Segmented
controls or category filter pills. - Decorative tab selectors. - Any
nonfunctional filter UI.

All five primary devices should be displayed directly in the gallery. If
software or more accessories are added later, place them in a separate
content section below the main gallery---not in top-right tabs.

## 3. Visual Direction

-   Minimal editorial setup showcase.
-   Warm, restrained, premium appearance.
-   Reuse the existing portfolio typography, spacing, borders, and theme
    tokens.
-   Warm off-white background in light mode.
-   Charcoal/near-black background in dark mode.
-   Muted secondary text and subtle borders.
-   Product photography is the main visual element.
-   Use clean crops, concise descriptions, and generous but purposeful
    spacing.
-   Avoid clutter and excessive labels.

Keep the page background solid and plain. Do not add decorative
patterns, textures, grids, stars, orbital lines, abstract illustrations,
or animated background shapes. Image overlays are allowed only inside
product cards when needed for text contrast.

## 4. Preserve Existing Site Navigation

Do not redesign the global sidebar or footer.

Preserve the existing grouped sidebar: - **GENERAL:** Home, About Me -
**PORTFOLIO:** Projects - **MY WORKSPACE:** The Toolkit - **BEYOND
DEVELOPMENT:** Beyond the IDE - **LET'S CONNECT:** Contact

Highlight **The Toolkit** as the active page. Preserve existing icons,
group labels, spacing, borders, theme controls, responsive behavior, and
footer. Do not duplicate navigation inside the page.

## 5. Page Header

At the top of the main content: - Main heading: `The Toolkit` -
Supporting sentence:
`The tools behind the work. A look at the hardware and everyday equipment I use to build, create, and stay productive.`

No breadcrumb or eyebrow above the heading. No category tabs or filters
on the right. Keep the header clean and let the gallery follow
naturally.

## 6. Main Gallery Layout

Show all five devices using an editorial collage with varied card sizes.
Do not use five identical small product cards.

Suggested desktop composition:

``` text
+--------------------------------------+--------------------------+
|                                      |                          |
|                MONITOR               |       SYSTEM UNIT        |
|                                      |                          |
|                                      +--------------------------+
|                                      |                          |
|                                      |         KEYBOARD         |
+--------------------------------------+--------------------------+
|                                      |                          |
|               HEADSET                |          MOUSE           |
|                                      |                          |
+--------------------------------------+--------------------------+
```

This is a composition guide, not a rigid pixel specification. Adjust
proportions to the viewport and image assets. Give the monitor and
system unit strong visual presence; keep all five items easy to
discover.

Responsive behavior: - **Desktop:** Use the editorial collage/grid. -
**Tablet:** Use two columns where practical; allow spanning cards to
return to normal flow if needed. - **Mobile:** Stack all cards in one
column with consistent spacing. Do not force desktop spans or allow
horizontal scrolling. - Preserve image focal points as cards resize.

## 7. Gear Card Content

Each card can contain: - Category label. - Product photograph. - Exact
model name, once supplied. - Optional short specification line. - One
concise sentence explaining how the owner uses it.

Do not overload cards with long specifications.

### Monitor

-   Name: `[MONITOR MODEL]`
-   Optional specs: `[SCREEN SIZE · RESOLUTION · REFRESH RATE]`
-   Description:
    `[HOW I USE IT — Explain how it supports development, coursework, or everyday use.]`
-   Use a clear photo showing the monitor and, where possible, its
    stand.

### System Unit

-   Name: `[SYSTEM UNIT NAME OR PC BUILD]`
-   Optional specs: `[CPU · GPU · RAM · STORAGE]`
-   Description:
    `[HOW I USE IT — Explain what the PC is used for, such as development, multitasking, or creative tools.]`
-   Use a clear photo of the actual PC case. Do not invent component
    specifications.

### Keyboard

-   Name: `[KEYBOARD MODEL]`
-   Optional specs: `[LAYOUT · SWITCH TYPE · CONNECTION]`
-   Description:
    `[HOW I USE IT — Explain typing comfort, layout, or workflow benefits.]`
-   Show the keyboard clearly, preferably from a top-down or
    three-quarter angle.

### Mouse

-   Name: `[MOUSE MODEL]`
-   Optional specs: `[SENSOR · CONNECTION · BUTTONS]`
-   Description:
    `[HOW I USE IT — Explain comfort, precision, or everyday navigation benefits.]`
-   Keep the mouse as the main subject with a clean crop.

### Headset

-   Name: `[HEADSET MODEL]`
-   Optional specs: `[CONNECTION · MICROPHONE · AUDIO FEATURES]`
-   Description:
    `[HOW I USE IT — Explain how it is used for calls, focus, entertainment, or everyday audio.]`
-   A wide horizontal card can work well. Avoid awkwardly cropping the
    earcups or headband.

## 8. Temporary Images and Placeholder Content

Use category-matched temporary images: - Monitor: computer
monitor/product photography. - System Unit: desktop PC case/product
photography. - Keyboard: keyboard product photography. - Mouse: computer
mouse product photography. - Headset: headset product photography.

Avoid watermarks, text overlays, and prominent logos. Do not imply
temporary images depict the owner's actual equipment. Mark placeholder
status in the content data, not necessarily as visible text in the final
design.

If an image is unavailable, show a neutral placeholder that preserves
the card dimensions. Make it easy to replace temporary images with
optimized local assets later.

Do not add purchase links, affiliate links, or prices unless explicitly
requested.

## 9. Optional Supporting Callout

An optional small callout may appear after the gallery:

Label: `BUILT FOR MORE`

Copy: `A setup that helps me focus, create, and enjoy what I do.`

Keep it secondary. Do not style it as a button or add an arrow unless it
performs a real action. Omit it if it makes the page feel crowded.

## 10. Future Software and Accessories

The first version focuses on the five physical devices. The structure
may support future sections such as: - Software I Use - Everyday Tools -
Additional Gear

Do not add these as top-right tabs. Add them as separate sections below
the main equipment gallery only when the owner supplies the content. Do
not invent the owner's software list.

## 11. Motion and Interaction

Use restrained motion: - Gentle heading fade-in. - Slight staggered
entrance for cards. - Subtle image zoom on hover. - Small card lift or
border change on hover. - Small arrow movement only when a card has a
real action.

Rules: - Do not delay access to content. - Avoid continuous looping
animation and exaggerated parallax. - Prevent layout shifts. - Provide
keyboard focus styling for interactive elements. - Do not rely on hover
to reveal essential content on touch devices. - Respect
`prefers-reduced-motion`. - Prefer lightweight CSS transitions over a
large animation dependency.

Cards are informational by default. Do not make them clickable unless
they open a real detail view or destination.

## 12. Light and Dark Themes

Reuse the existing portfolio theme system.

Light mode: - Solid warm off-white background. - Dark charcoal text. -
Muted secondary labels. - Subtle borders.

Dark mode: - Solid charcoal/near-black background. - Warm off-white
text. - Muted secondary labels with sufficient contrast. - Subtle
visible borders.

No decorative background patterns in either theme.

## 13. Suggested Typed Content Data

Keep gear content in one centralized typed data file rather than
hardcoding it into the page component.

``` ts
export type ToolkitItem = {
  id: string;
  category: "Monitor" | "System Unit" | "Keyboard" | "Mouse" | "Headset";
  name: string;
  image: string;
  alt: string;
  specs?: string;
  description: string;
  layoutClass?: string;
  objectPosition?: string;
  isPlaceholder: boolean;
};

export const toolkitItems: ToolkitItem[] = [
  {
    id: "monitor",
    category: "Monitor",
    name: "[MONITOR MODEL]",
    image: "/images/toolkit/monitor-placeholder.jpg",
    alt: "Temporary image representing a computer monitor",
    specs: "[SCREEN SIZE · RESOLUTION · REFRESH RATE]",
    description: "[SHORT DESCRIPTION OF HOW IT IS USED]",
    layoutClass: "toolkit-monitor",
    isPlaceholder: true,
  },
  {
    id: "system-unit",
    category: "System Unit",
    name: "[SYSTEM UNIT / PC BUILD]",
    image: "/images/toolkit/system-unit-placeholder.jpg",
    alt: "Temporary image representing a desktop PC",
    specs: "[CPU · GPU · RAM · STORAGE]",
    description: "[SHORT DESCRIPTION OF HOW IT IS USED]",
    layoutClass: "toolkit-system-unit",
    isPlaceholder: true,
  },
  {
    id: "keyboard",
    category: "Keyboard",
    name: "[KEYBOARD MODEL]",
    image: "/images/toolkit/keyboard-placeholder.jpg",
    alt: "Temporary image representing a computer keyboard",
    specs: "[LAYOUT · SWITCH TYPE · CONNECTION]",
    description: "[SHORT DESCRIPTION OF HOW IT IS USED]",
    layoutClass: "toolkit-keyboard",
    isPlaceholder: true,
  },
  {
    id: "mouse",
    category: "Mouse",
    name: "[MOUSE MODEL]",
    image: "/images/toolkit/mouse-placeholder.jpg",
    alt: "Temporary image representing a computer mouse",
    specs: "[SENSOR · CONNECTION · BUTTONS]",
    description: "[SHORT DESCRIPTION OF HOW IT IS USED]",
    layoutClass: "toolkit-mouse",
    isPlaceholder: true,
  },
  {
    id: "headset",
    category: "Headset",
    name: "[HEADSET MODEL]",
    image: "/images/toolkit/headset-placeholder.jpg",
    alt: "Temporary image representing a computer headset",
    specs: "[CONNECTION · MICROPHONE · AUDIO FEATURES]",
    description: "[SHORT DESCRIPTION OF HOW IT IS USED]",
    layoutClass: "toolkit-headset",
    isPlaceholder: true,
  },
];
```

Adapt field names and types to the existing project's conventions. Avoid
duplicate content sources.

## 14. Accessibility and Performance

-   Use semantic `main`, `section`, and heading elements.
-   Maintain a logical heading hierarchy.
-   Provide useful alt text for informative product images.
-   Ensure text over images has sufficient contrast.
-   Provide keyboard focus styles for interactive elements.
-   Do not rely on hover-only information.
-   Respect reduced-motion preferences.
-   Use optimized images and Next.js image handling where appropriate.
-   Reserve image dimensions/aspect ratios to prevent layout shift.
-   Lazy-load below-the-fold images when useful.
-   Avoid unnecessary gallery/animation libraries.
-   Provide an image fallback.
-   Test common desktop, tablet, and mobile widths.

## 15. Implementation Checklist

### Page structure

-   [ ] Preserve existing sidebar and footer.
-   [ ] Highlight The Toolkit as active in the sidebar.
-   [ ] Display the `The Toolkit` heading and short supporting sentence.
-   [ ] Remove the top-left `MY SETUP · GEAR · TOOLS` breadcrumb
    completely.
-   [ ] Remove top-right Hardware / Software / Accessories tabs
    completely.
-   [ ] Do not replace removed elements with similar breadcrumbs,
    filters, or selectors.

### Gallery

-   [ ] Add Monitor card.
-   [ ] Add System Unit card.
-   [ ] Add Keyboard card.
-   [ ] Add Mouse card.
-   [ ] Add Headset card.
-   [ ] Use temporary category-matched images.
-   [ ] Centralize names, specs, descriptions, and image paths.
-   [ ] Use varied card sizes in an editorial layout.
-   [ ] Make the gallery responsive.

### Visual quality

-   [ ] Reuse existing theme tokens.
-   [ ] Keep the page background plain.
-   [ ] Use subtle borders and restrained card styling.
-   [ ] Add lightweight entrance and hover transitions.
-   [ ] Respect reduced-motion preferences.
-   [ ] Keep image overlays inside product cards only.

### Testing

-   [ ] Test desktop, tablet, and mobile.
-   [ ] Test light and dark themes.
-   [ ] Test image fallbacks.
-   [ ] Check keyboard navigation and focus visibility.
-   [ ] Confirm no horizontal overflow.
-   [ ] Confirm the breadcrumb and category tabs are absent.

## 16. Definition of Done

The page is complete when: - It showcases the owner's computer setup and
tools. - Monitor, System Unit, Keyboard, Mouse, and Headset are all
represented. - Product photography is the main visual focus. - Temporary
images and placeholder details can be replaced easily. - The desktop
layout feels curated and editorial, not like a generic ecommerce
catalog. - The mobile layout is clean and readable. - Existing sidebar,
footer, and theme behavior remain intact. - Animations are subtle,
accessible, and non-blocking. - The top-left breadcrumb and top-right
category tabs are completely absent. - The background remains plain in
both themes.

## 17. Final Instructions for the Implementing Agent

1.  Inspect the existing portfolio project before editing.
2.  Reuse the current sidebar, footer, typography, color tokens, and
    theme logic.
3.  Implement only The Toolkit page, except for necessary small
    shared-component adjustments.
4.  Treat this document as the source of truth for the page.
5.  Use temporary images and editable placeholders.
6.  Prioritize the five devices: monitor, system unit, keyboard, mouse,
    and headset.
7.  Do not invent product models or hardware specifications.
8.  Remove the top-left `MY SETUP · GEAR · TOOLS` breadcrumb entirely.
9.  Remove the top-right Hardware / Software / Accessories tabs
    entirely.
10. Do not replace those elements with similar breadcrumbs, filters, or
    selectors.
11. Keep the background plain and use the existing theme tokens.
12. Test responsiveness, theme switching, image fallbacks,
    accessibility, and reduced motion.
13. At completion, report what was implemented and explain how to
    replace temporary images and placeholder details.
