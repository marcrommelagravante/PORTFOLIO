# Portfolio Hero Design Specification

## 1. Design direction

Create a refined editorial-style portfolio homepage for **Marc Rommel Agravante**. The direction is minimal, monochrome, typography-led, and intentionally art-directed—not a generic portfolio template.

The composition combines:
- A fixed, rounded left sidebar.
- A spacious hero with large editorial typography.
- A large black-and-white portrait on the right.
- Oversized, low-contrast **MROA** initials behind the portrait and hero content.
- A restrained warm-neutral palette.
- Small functional details instead of decorative effects.

Keep the page background plain. Do not add gradients, noisy textures, stars, decorative curves, floating particles, or unnecessary shapes.

## 2. Layout

### Desktop
Use a two-part layout:
1. A fixed or sticky left sidebar, approximately 210–240px wide on a wide desktop.
2. A main hero filling the remaining viewport, with text on the left and portrait on the right.

Maintain generous whitespace. The headline must not collide with the portrait, and the portrait must not obscure important words.

## 3. Sidebar

### Brand
Display **MROA** in the upper-left brand area using the display serif or a compatible serif face. Include a compact sidebar-collapse icon on the right of the brand row.

### Navigation groups
- **GENERAL:** Home, About Me
- **PORTFOLIO:** Projects
- **MY WORKSPACE:** The Toolkit
- **BEYOND DEVELOPMENT:** Beyond the IDE
- **LET'S CONNECT:** Contact

Use simple, consistent outline icons. Keep icon size, label alignment, and spacing consistent.

### Styling
- Warm off-white surface with a subtle neutral border.
- Rounded corners and minimal or no shadow.
- Small uppercase monospace group labels.
- Subtle active-page state using a neutral fill or slim indicator.
- Light and dark theme controls at the bottom.
- No bright accent colors.

## 4. Hero content

### Eyebrow
Place a short horizontal rule before:

**COMPUTER ENGINEERING STUDENT**

Use a small uppercase monospace style with modest letter spacing.

### Headline
Use this copy and line structure where the viewport allows:

> Hi, I'm Marc.  
> I build *useful* things  
> for the web.

Emphasize **useful** with italic styling in the same serif family. The headline is the primary visual anchor: large, high-contrast, tightly composed, and readable.

### Supporting paragraph
Use:

> Computer Engineering student and developer passionate about building performant, accessible web applications and developer tools.

Set this in a clean sans-serif with comfortable line-height and a restrained text width.

### About link
Below the paragraph, include one understated link:

**MORE ABOUT ME →**

This is the only prominent hero action. Do not add the previous pair of filled buttons. Use a text-link treatment with a fine underline or subtle line detail. Link it to the About Me page.

## 5. Portrait and background initials

### Portrait
- Use the user's supplied portrait.
- Prepare it as a high-quality black-and-white image.
- Position it on the right side of the hero.
- Make it large enough to balance the headline.
- Use a clean cutout or carefully masked image treatment.
- Keep the face unobstructed.
- Avoid outlines and decorative strokes around the person.

### Backing shape
A restrained, soft neutral shape may sit behind the portrait for separation. Keep it simple and low contrast; it must not become a focal point.

### Oversized initials
Place **MROA** behind the portrait as oversized background typography:
- Use the editorial serif direction.
- Use a very light warm-gray tone with low opacity.
- Position it far enough left that the complete four-letter sequence can be read.
- Layer it behind the portrait and foreground text.
- Ensure it does not reduce headline readability.
- Treat it as a typographic watermark, not a logo graphic.

### Developer badge
Keep the small pill-shaped badge near the upper-right area:

**</> DEVELOPER ·**

- Position it slightly lower than the top edge, matching the latest approved reference.
- Use a light neutral border and background.
- Keep the label compact and legible.
- Keep it secondary to the headline and portrait.

Do not add the scroll-down label or mouse icon.

## 6. Typography

The screenshot suggests an editorial serif + neutral sans-serif + technical monospace combination. The exact font files cannot be identified reliably from an image, so use this recommended pairing to reproduce the look:

| Role | Recommended font | Usage |
|---|---|---|
| Display / headline serif | **Bodoni Moda** | Main headline and oversized MROA watermark |
| Body sans-serif | **Inter** | Paragraph, navigation labels, interface text |
| Monospace | **IBM Plex Mono** | Eyebrow, sidebar group labels, technical labels |

### Typography guidance
- **Bodoni Moda:** Regular weight for the headline; italic for “useful”. Avoid heavy bold weights. The contrast between thick and thin strokes creates the editorial feel.
- **Inter:** Regular or medium weights for readable body and interface text.
- **IBM Plex Mono:** Use sparingly for metadata and uppercase labels, with modest letter spacing.
- Keep the hierarchy clear: large serif headline, medium sans-serif paragraph, small mono labels.
- Do not use more than these three font families.

Suggested CSS font stacks:

```css
:root {
  --font-display: "Bodoni Moda", "Times New Roman", serif;
  --font-sans: "Inter", Arial, sans-serif;
  --font-mono: "IBM Plex Mono", "Courier New", monospace;
}
```

Load fonts locally or from a reliable font provider. Use `font-display: swap` and avoid loading unnecessary weights.

## 7. Color palette

| Token | Suggested value | Usage |
|---|---|---|
| Warm paper | `#F4F1EA` | Main light background |
| Sidebar surface | `#F1EEE7` | Sidebar |
| Primary ink | `#171715` | Headline and primary text |
| Secondary text | `#686761` | Paragraph and supporting labels |
| Muted watermark | `#E8E4DC` | MROA background initials |
| Fine border | `#D8D4CB` | Sidebar and subtle dividers |
| Dark background | `#191918` | Dark theme background |
| Dark surface | `#222220` | Dark theme sidebar |
| Dark primary text | `#F1EEE7` | Dark theme foreground |
| Dark secondary text | `#B8B5AC` | Dark theme supporting text |

Do not introduce bright accent colors. Keep the light theme warm rather than pure white.

## 8. Motion and interaction

Use only subtle motion that supports the interface:
- Sidebar links: restrained hover color or background transition.
- About link: small arrow movement on hover.
- Portrait: optional gentle entrance animation on initial load.
- Theme switch: smooth color transition between light and dark.
- Developer badge: no continuous floating or bouncing.
- Background initials: no spinning, scrolling, or pulsing.

Respect `prefers-reduced-motion`. The page should remain polished with animations disabled.

## 9. Responsive behavior

### Tablet
Reduce headline size and spacing. Keep the portrait prominent without crowding the text. The sidebar may collapse into compact navigation.

### Mobile
- Replace the desktop sidebar with a compact header or accessible menu.
- Stack hero content vertically.
- Keep the headline first and portrait below, unless a side-by-side layout remains genuinely readable.
- Scale down the MROA watermark and prevent horizontal overflow.
- Keep the About Me link visible.
- Hide desktop-only cursor effects.
- Ensure the developer badge does not overlap the portrait or headline.

## 10. Accessibility and implementation

- Use semantic landmarks: `nav`, `main`, and `section`.
- Provide descriptive alt text for the portrait.
- Ensure sufficient contrast for body text and navigation.
- Make navigation and theme controls keyboard accessible.
- Provide visible focus states.
- Mark the MROA watermark as decorative for assistive technology.
- Optimize the portrait and provide responsive image sizes.
- Reserve image dimensions to prevent layout shift.
- Keep the page lightweight and responsive.

## 11. Approved details to preserve

- Rounded left sidebar.
- **MROA** sidebar brand.
- Large editorial serif headline.
- Italic emphasis on **useful**.
- Oversized **MROA** initials behind the portrait.
- Monochrome portrait on the right.
- **</> DEVELOPER ·** badge near the top-right, slightly lowered from the top edge.
- Single **MORE ABOUT ME →** link.
- Warm off-white and charcoal visual direction.
- Plain, minimal background with no unnecessary decoration.

The goal is a distinctive editorial portfolio hero with a strong typographic identity—not a busy landing page or a generic AI-generated template.
