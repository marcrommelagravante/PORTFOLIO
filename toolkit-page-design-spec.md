# The Toolkit — Page Design & Implementation Specification

**Status:** Approved visual direction  
**Page name:** The Toolkit / My Gear  
**Purpose:** Showcase the actual technology and devices used for work, study, and everyday use.

---

## 1. Design direction

Create a clean, editorial-style gear page that feels like part of the existing MROA portfolio.

- Warm off-white background.
- Minimal, restrained visual language.
- Elegant serif typography for the main page heading and product names.
- Simple sans-serif typography for navigation and supporting specifications.
- Softly rounded cards with subtle borders and shadows.
- No decorative background initials, top-right “GEAR” pill, unnecessary patterns, or extra ornaments.
- Keep the existing portfolio sidebar and its navigation structure.

The page should feel curated and personal, not like an online store.

## 2. Page layout

### Sidebar

Preserve the existing sidebar as shown in the reference image:

- MROA wordmark at the top.
- General: Home, About Me.
- Portfolio: Projects.
- My Workspace: The Toolkit.
- Beyond Development: Beyond the IDE.
- Let’s Connect: Contact.
- Light/dark theme controls at the bottom.

Keep the current active-state treatment for **The Toolkit**. Do not redesign the sidebar as part of this page implementation.

### Main content

- Small eyebrow label: `MY GEAR`, preceded by a short horizontal rule.
- Main heading: `My Gear`.
- Do not add a paragraph or introductory description beneath the heading.
- Display six gear cards in a two-column desktop grid, arranged across three rows.
- Maintain consistent card dimensions, image areas, spacing, and alignment.

## 3. Gear cards and content

Use the following exact device details:

| Category | Display name | Details |
|---|---|---|
| Monitor | AOC 24G2SP | 24-inch · 144Hz · IPS |
| System Unit | Montech AIR 100 | Ryzen 5 5600X · RTX 3060 Ti · 16GB RAM |
| Keyboard | Tecware Phantom+ Elite | White |
| Mouse | Logitech G Pro X Superlight | White |
| Headset | Razer BlackShark V2 X | Black |
| Phone | POCO X6 Pro | Use the correct product image for the model |

Do not rename or substitute any of the user's devices.

### Card content

Each card should contain:

1. A small category badge near the top-left.
2. A clear, high-quality product image.
3. The product name.
4. Only essential specifications where applicable.

Do not include marketing descriptions, feature summaries, or filler sentences below product titles. Keep the cards visually balanced without large empty areas.

## 4. Product image requirements

Use accurate product imagery rather than generic device illustrations.

- **Monitor:** AOC 24G2SP monitor.
- **System Unit:** Montech AIR 100 case.
- **Keyboard:** White Tecware Phantom+ Elite.
- **Mouse:** White Logitech G Pro X Superlight.
- **Headset:** Black Razer BlackShark V2 X.
- **Phone:** POCO X6 Pro.

### System Unit image — important

The user's actual case reference is the **Montech AIR 100**. The product image should show:

- The black Montech AIR 100 chassis.
- Its mesh front panel and tempered-glass side panel.
- Cooling fans installed inside the case.
- A visible graphics card inside the case.
- Subtle white or very soft purple RGB lighting.

Do not replace the case with a different Montech model or a generic PC tower. The internal fans and GPU are visual details; do not invent additional hardware specifications.

### Peripheral colors — important

- Keyboard must be **white**, not black.
- Mouse must be **white**, not black.
- Headset remains black.

Use product photos with a consistent studio cutout / clean product-photography treatment. Keep image scale visually balanced across cards, while allowing different products to retain their natural proportions.

## 5. Typography

Use this font pairing to reproduce the approved editorial direction:

- **Bodoni Moda:** Main `My Gear` heading and product names.
- **Inter:** Sidebar labels, category badges, and specifications.
- **IBM Plex Mono:** Small eyebrow labels such as `MY GEAR`, if it matches the existing site typography.

If the portfolio already has these fonts configured, reuse the existing font setup rather than loading duplicate font files. Keep typography consistent with the rest of the portfolio.

## 6. Color and surfaces

Use the portfolio's existing neutral theme tokens. Suggested visual direction:

- Warm off-white page background.
- Slightly differentiated warm-gray card surfaces.
- Near-black primary text.
- Muted gray secondary specifications and category badges.
- Thin, low-contrast borders.
- Soft, restrained shadows.

Support both light and dark mode. In dark mode, preserve readable contrast and avoid introducing bright accent colors.

## 7. Interaction and responsive behavior

- Use subtle hover feedback only; avoid exaggerated movement or decorative effects.
- Product images may have a very slight hover scale, provided it does not cause layout shift.
- Cards must remain readable and well-spaced on tablet and mobile.
- Desktop: two-column card grid.
- Tablet: two columns when space allows, otherwise one.
- Mobile: one column, with product images and text arranged cleanly.
- Respect reduced-motion preferences.
- Do not add tabs, category filters, or right-side selectors.

## 8. Implementation constraints

- Keep the existing application framework, routing, sidebar, theme system, and shared components.
- Do not rebuild unrelated portfolio pages.
- Keep gear content in a maintainable data structure so product names, specs, and image paths can be updated easily.
- Use optimized local assets or the project's existing image pipeline.
- Provide meaningful alt text for each product image.
- Avoid layout shifts by reserving image dimensions or aspect ratios.
- Do not use the generated full-page reference screenshot as the six individual product images. Use individual product assets for the actual implementation.

## 9. Acceptance checklist

- [ ] Sidebar and navigation remain unchanged.
- [ ] Page eyebrow reads `MY GEAR`.
- [ ] Main heading reads `My Gear`.
- [ ] No introductory description appears below the heading.
- [ ] Six cards appear in the approved two-column desktop layout.
- [ ] All six device names match the user's actual gear.
- [ ] Montech AIR 100 is used for the system unit.
- [ ] System unit image visibly includes internal fans and a GPU.
- [ ] Keyboard image is white.
- [ ] Mouse image is a white Logitech G Pro X Superlight.
- [ ] Headset remains a black Razer BlackShark V2 X.
- [ ] No oversized MROA background initials or top-right GEAR pill.
- [ ] No unnecessary card descriptions or decorative background elements.
- [ ] Light/dark themes and responsive layouts work correctly.

---

## 10. Visual reference

Use the accompanying `toolkit-design-reference.png` as the visual reference for the approved page composition, card treatment, spacing, sidebar, and product presentation.

The reference is a design guide, not production-ready source code. Recreate the layout with the project's existing components and use individual, accurate product images for each card.
