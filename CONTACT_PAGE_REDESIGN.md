# Contact Page Redesign: "Side-Rail Message Panel + Channel Grid"

> **Purpose:** Implementation brief for redesigning `/contact` and adding a site-wide "Send message" form. Read `PORTFOLIO_UI_UX.md` and `contact-page-spec.md` first. Every rule in them still applies: solid background, token-only colors, centralized content in `src/content/`, and the existing link security and accessibility standards.
>
> **Visual reference (two boards):** https://claude.ai/artifact/AAmhPPHJLY43mQufLeXwC9
> - Board 1: contact page (rail button, hero button, six channel cards)
> - Board 2: Send message panel open, sliding out of the side rail
>
> **Constraint: everything must be free.** Form delivery uses **Web3Forms' free plan**. No paid services, no custom domain, no backend to host.

---

## 1. Goals

1. A visitor can message the owner in one click from **any page**, with no account and no mail app required.
2. The message goes straight to the owner's inbox.
3. The contact page keeps direct channels: Email, LinkedIn, Discord, Facebook (Messenger), GitHub, plus a Resume download.
4. Zero ongoing cost.

---

## 2. What changes

| Area | Before | After |
| :--- | :--- | :--- |
| Side rail | Nav only | Adds a primary **Send message** button at the top, under the "MRA." logo |
| `/contact` page | 2x2 grid of 4 cards, all "Coming soon" | Hero with a **Send message** button, plus a grid of **6 cards** |
| Cards | Email, LinkedIn, Discord, Facebook | Email, LinkedIn, Discord, Facebook (as Messenger), **GitHub**, **Resume** |
| Form | None | **Slide-out panel** from the side rail, opened from three triggers |
| Mobile | n/a | Send message button added to the **mobile header** |

No topic chips and no subject field. The form has exactly three inputs.

---

## 3. Side rail changes (`SideRail`)

- Add a **Send message** button between the logo row and the nav groups.
  - Style: full width, `min-h-[46px]`, `rounded-xl`, `bg-(--foreground) text-(--background)`, `text-sm font-medium`, with a small pen icon (16px) and the label.
  - It is a `<button type="button">`, not a link. It opens the panel.
- **Collapsed rail:** show an icon-only version (44x44 minimum) with `aria-label="Send message"` and a tooltip that matches your existing collapsed-item pattern.
- **Mobile header:** add a compact "Send message" button (icon plus label, or icon only with `aria-label`) next to the hamburger. The rail becomes a drawer on small screens, so without this the entry point would be hidden.
- Hover and focus: reuse the existing inversion pattern (`hover:bg-(--surface) hover:text-(--foreground)` with the standard focus ring). Do not add new animation.

---

## 4. Contact page (`/contact`)

Keep `ContactSection.tsx`, `ContactCard.tsx` and `ContactIcons.tsx`. Extend them. The page lives inside the usual main well (`sidebar-content-offset lg:pl-64`).

### Hero
- Eyebrow: `font-mono text-xs uppercase tracking-wider text-(--muted)`, text `Contact`.
- Heading: `Let’s Work Together` (use the curly apostrophe `’`). Style: `text-4xl sm:text-[44px] font-semibold tracking-tight leading-[1.08]`.
- Intro, max `560px`, `text-base leading-relaxed text-(--muted)`: *"Have a project, an idea or a question? Send a message and it lands straight in my inbox, or pick any channel below."* Treat this copy as a draft and keep it in `site.ts`.
- **Send message button** (`rounded-full`, `min-h-[52px]`, `px-7`, `bg-(--foreground) text-(--background)`, label `Send message ->` with a real arrow glyph). It opens the same panel as the rail button.

### Card grid
- `grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]`. Desktop gives 3 columns, tablet 2, phone 1. Six cards fill a 3x2 grid exactly.
- Card order: **Email, LinkedIn, Discord, Facebook, GitHub, Resume**.
- Card anatomy (extends the current `ContactCard`):
  - `min-h-[150px] rounded-2xl border border-(--border) p-[22px]`, `flex flex-col gap-[18px]`.
  - Top row: 44x44 icon box (`rounded-xl bg-(--surface)`, 20px stroke icon) on the left; a mono tag on the right (`font-mono text-[11px] text-(--muted)`): `↗` for external links, `Copy` for Discord, `PDF` for Resume.
  - Title `text-base font-semibold tracking-tight`; hint `mt-1 text-[13.5px] leading-snug text-(--muted)`.
  - **Keep the existing hover/focus inversion** to `--foreground`, including text and icon box flipping, and the existing focus-visible outline.

| Card | Title / hint | Behavior | Config key |
| :--- | :--- | :--- | :--- |
| Email | Email / Opens your mail app | `mailto:` (the component already prefixes it) | `contactEmail` |
| LinkedIn | LinkedIn / Connect and message me | New tab, `rel="noopener noreferrer"` | `linkedinUrl` |
| Discord | Discord / `[handle]` | **Copy handle** (see below), no navigation | `discordHandle` (new) |
| Facebook | Facebook / Message me on Messenger | New tab; use the `https://m.me/<username>` format | `facebookUrl` |
| GitHub | GitHub / Code, commits and projects | New tab | `githubUrl` |
| Resume | Resume / Download my CV as a PDF | Downloads the file (see below) | `resumeUrl` (new) |

### Discord: copy handle
Discord profile links are unreliable (they only work for logged-in users), so this card is an action, not a link.
- Render it as a `<button type="button">` styled like the other cards.
- On click: `navigator.clipboard.writeText(handle)`. Fall back to a hidden-textarea `execCommand("copy")` if the Clipboard API is unavailable.
- The mono tag changes from `Copy` to `Copied` for about 2 seconds, then reverts. Announce it with a visually hidden `aria-live="polite"` region.
- `aria-label`: `Discord — Copy my username. (copies to clipboard)`.

### Resume: download
- Put the file at `public/resume.pdf` (or whatever name the owner uses) and set `resumeUrl: "/resume.pdf"` in `site.ts`.
- Render as `<a href={resumeUrl} download>` (same-origin, so `download` works). Do not use `target="_blank"` for it.
- `aria-label`: `Resume — Download my CV as a PDF. (downloads file)`.
- The owner must supply the PDF. Never commit a placeholder PDF with fake content.

### Cards with no URL
The current spec renders a dimmed "Coming soon" card when a URL is missing. **Change this:** if a channel has no configured value, **do not render the card**. Placeholder cards on a live contact page look unfinished. The grid then reflows with fewer cards. *(Open question 1 below.)*

---

## 5. The Send message panel

### Shape and position
- Slides out from the **right edge of the side rail**, over the page content. In the mockup it is `440px` wide, inset `24px` from the top and bottom, `rounded-3xl`, with `border border-(--border) bg-(--background) shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]`, `p-8`.
- Position: `fixed`, `left` = rail width + gap (rail is `w-64` plus its outer margin; read the real value from the rail component or CSS variable instead of hardcoding).
- Behind it, a **scrim** over the page content only (not over the rail): `bg-(--background)/60`. The page stays visible but dimmed. This overlay is an allowed exception to the "no page gradients" rule, since it is a modal layer, not a background decoration.
- If the rail is collapsed, the panel anchors to the collapsed rail's right edge.

### Header
- Eyebrow `Send a message` (`font-mono text-xs uppercase tracking-wider text-(--muted)`).
- Title `Let’s talk` (`text-[28px] font-semibold tracking-tight leading-tight`).
- Close button: 44x44, `rounded-full border border-(--border)`, X icon, `aria-label="Close panel"`.

### Form fields (Web3Forms, section 6)
| Field | Control | Rules |
| :--- | :--- | :--- |
| Name | `<input type="text" name="name" autocomplete="name">` | Required, 1–80 chars |
| Email | `<input type="email" name="email" autocomplete="email">` | Required, valid email |
| Message | `<textarea name="message" rows={7}>` | Required, 10–2000 chars |

- Labels: visible `<label for>` in `font-mono text-[11px] uppercase tracking-wider text-(--muted)`. Never use placeholder-only labels.
- Inputs: `h-12 rounded-[10px] border border-(--border) bg-(--background) px-3.5 text-[15px]`; textarea `p-3.5 leading-relaxed`, vertical resize only.
- Placeholders: `Your name`, `you@example.com`, `Hi Marc, I’d like to build…` (copy lives in `site.ts`).
- **Submit button:** full width, `min-h-[52px] rounded-full`, `bg-(--foreground) text-(--background)`, label `Send message ->`. Below it, centered, `text-[13px] text-(--muted)`: *"Goes straight to my inbox."*

### States
1. **Idle.**
2. **Submitting:** button disabled with the label `Sending…`. Fields stay but are `readOnly`. No spinner animations beyond a simple text change.
3. **Success:** replace the form body with a confirmation: title `Thanks, I got it.`, a one-line note, and two buttons: `Send another` (resets the form) and `Close`. Do **not** promise a reply time unless the owner provides one for `site.ts`.
4. **Error:** keep the user's input, show an inline message above the button (`role="alert"`) such as *"Couldn’t send that. Please try again, or use one of the channels on the Contact page."* Re-enable the button.
5. **Validation errors:** per-field message under the control, `aria-invalid="true"` and `aria-describedby`. Validate on submit, then on blur once a field has been touched.

### Motion
- Open: panel `translateX(-12px) opacity-0 -> 0 opacity-100`, 250ms, `cubic-bezier(0.22, 1, 0.36, 1)`; scrim fades 200ms.
- Close: reverse, 200ms.
- With `prefers-reduced-motion: reduce`, show and hide instantly.

### Accessibility and behavior
- Use a proper dialog: `role="dialog"` with `aria-modal="true"` and `aria-labelledby` pointing to the title (a native `<dialog>` is fine if its styling and animation can be controlled; otherwise a div with a focus trap).
- On open: focus moves to the **Name** field (or the panel heading if the success state is showing). Trap focus inside the panel.
- `Esc` closes. Clicking the scrim closes. On close, focus returns to the button that opened it.
- Lock page scroll while open (`overflow-hidden` on `body`), and restore it on close.
- **Mobile (< 1024px):** the panel becomes a full-width bottom sheet or full-screen sheet with the same contents (owner's mockup only shows desktop; use full-screen for simplicity). The close button stays reachable at the top.
- Status messages use `aria-live="polite"`; errors use `role="alert"`.

### State architecture
- Create `ContactPanelProvider` (context) with `{ isOpen, open(), close() }`, mounted once in the root layout, and render `<ContactPanel />` once next to the layout shell.
- Three triggers call the same `open()`: the rail button, the mobile header button, and the contact page hero button. Optionally support `?message=1` on `/contact` to auto-open the panel (useful for linking from elsewhere).
- Suggested files:
  - `src/components/contact/ContactPanelProvider.tsx`
  - `src/components/contact/ContactPanel.tsx`
  - `src/components/contact/ContactForm.tsx`
  - `src/components/contact/SendMessageButton.tsx` (shared trigger styles)

---

## 6. Web3Forms integration (free)

**Why:** The free plan allows 250 submissions per month, with spam protection, no card and no backend. If this is ever outgrown, swap the submit handler for a Resend route later; the UI does not change.

### Setup (owner does this once)
1. Create a free Web3Forms access key at web3forms.com using the owner's real inbox email.
2. Add it as an env var: `NEXT_PUBLIC_WEB3FORMS_KEY=<key>` in `.env.local`, and in the hosting provider's environment settings for production.
3. Do **not** commit the key. Add `.env.local` to `.gitignore` if it is not there already. (The key is designed to be exposed in client code, but keep it configurable.)

### Submit handler
- `POST https://api.web3forms.com/submit` with `Content-Type: application/json` and `Accept: application/json`.
- Body fields: `access_key`, `name`, `email`, `message`, plus:
  - `subject`: a fixed string such as `New message from portfolio`, set from `site.ts`.
  - `from_name`: `Portfolio contact form`.
  - `botcheck`: the honeypot (below).
- Treat the response as success only when `response.ok` and `data.success === true`. Anything else (network error, `success: false`) is the error state.
- The visitor's email should arrive as the reply-to so the owner can answer with **Reply** in their inbox. **Verify this in the Web3Forms docs before relying on it.**

### Spam protection
- **Honeypot (required):** a hidden checkbox named `botcheck`, visually hidden with `className="hidden"` plus `tabIndex={-1}` and `aria-hidden="true"`, `autocomplete="off"`. If it is checked, do not submit. Humans never see it.
- **Client-side limits:** validation from section 5, trimmed whitespace, and a disabled button during submission to block double-posts.
- **Optional:** Web3Forms supports hCaptcha on the free plan. Leave it **off** by default; enable only if spam becomes an issue. If you add it, it must not break keyboard access.
- Never log or store message contents in the client or any analytics.

---

## 7. Content and config (`src/content/site.ts`)

All new copy and links go here. Components never hardcode them.

```ts
// additions to SiteConfig
contactEmail: string;              // existing
linkedinUrl?: string;              // existing
facebookUrl?: string;              // existing, recommend https://m.me/<username>
githubUrl?: string;                // new (or reuse if it already exists)
discordHandle?: string;            // new, replaces discordUrl for this card
resumeUrl?: string;                // new, e.g. "/resume.pdf"

contactForm: {
  eyebrow: string;                 // "Send a message"
  title: string;                   // "Let’s talk"
  submitLabel: string;             // "Send message"
  helperText: string;              // "Goes straight to my inbox."
  successTitle: string;            // "Thanks, I got it."
  successBody: string;             // one short line
  errorMessage: string;
  subject: string;                 // email subject sent to the owner
  placeholders: { name: string; email: string; message: string };
};
```

- `discordUrl` can stay for backward compatibility but the card uses `discordHandle`. Remove it only if nothing else reads it.
- Replace the footer placeholder `[LOCATION OR SHORT FOOTER LINE]` while in `site.ts`, and match the sidebar group "Let’s Connect" with the page title wording.
- `isValidExternalUrl` still guards every external link, including GitHub and LinkedIn. `resumeUrl` is same-origin and does not go through it.
- Add `aria-label`s to the two new cards in the existing pattern.

---

## 8. Design rules carried over

1. **Solid background only.** No gradients or decoration on the page. The scrim and the panel shadow are the only layered effects, and both belong to the modal layer.
2. **Tokens only.** Use `bg-(--background)`, `bg-(--surface)`, `text-(--foreground)`, `text-(--muted)`, `border-(--border)`. No hex values or default Tailwind grays.
3. **Typography:** Geist Sans for copy, Geist Mono for eyebrows, labels, tags and the Discord handle.
4. **Motion:** restrained, same easing as the rest of the site, full `prefers-reduced-motion` fallback.
5. **Touch targets:** every button, input and card is at least 44px tall.
6. **Contrast:** `--muted` on `--background` and on card surfaces must stay at or above 4.5:1 for small text.
7. **Focus rings:** keep `focus-visible:outline-2` with offset on every interactive element, including the new button, form controls and close button.

---

## 9. Acceptance checklist

- [ ] Side rail shows a **Send message** button under the logo; icon-only (with `aria-label`) when collapsed.
- [ ] Mobile header has a Send message button.
- [ ] The hero button on `/contact` opens the **same** panel.
- [ ] The panel slides out from the rail, dims the page behind it, and closes on Esc, scrim click and the close button.
- [ ] Focus moves into the panel, stays trapped, and returns to the trigger on close; page scroll is locked while open.
- [ ] Submitting a valid form delivers an email to the owner's inbox via Web3Forms; visitor email arrives as reply-to (verified).
- [ ] Success, error, validation and submitting states all work; input is preserved on error.
- [ ] Honeypot field present and hidden; a filled honeypot blocks the submit.
- [ ] Six cards render in order: Email, LinkedIn, Discord, Facebook, GitHub, Resume; any card without a configured value is not rendered.
- [ ] Discord card copies the handle and shows `Copied`; Resume downloads the PDF.
- [ ] No hardcoded copy, links, emails or keys in `.tsx` files; the Web3Forms key comes from an env var.
- [ ] Light and dark themes both look correct (panel, scrim, inputs, cards).
- [ ] No new hex colors, no new paid dependencies.

---

## 10. Open questions for the owner

1. For a channel with no configured value: hide the card (recommended) or keep the dimmed "Coming soon" card?
2. Does the hero on `/contact` keep its own **Send message** button, or rely on the side rail button alone? (The mockup keeps it.)
3. What are the real Discord handle, Facebook username, GitHub URL and resume file name?
4. Any reply-time promise (for example "I reply within a day") to show in the success state? If not, leave it out.
5. Should project case study pages get a "Message me about this project" button that opens the same panel? (Not in this scope; the provider makes it easy to add later.)
