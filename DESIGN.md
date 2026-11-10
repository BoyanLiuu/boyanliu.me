---
name: boyanliu.me
description: Shawn Liu's portfolio, a warm workshop of ink, paper and one oxblood stamp.
colors:
  oxblood: "#7b1e2b"
  lamplight-amber: "#f5a524"
  paper: "#ffffff"
  ink: "#171310"
  muted-ink: "#6f6c69"
  rule: "#e6e3dd"
  wash: "#f4f3f0"
  night: "#171310"
  night-ink: "#ffffff"
  night-muted: "#a8a29b"
  night-rule: "#3a342e"
  dark-paper: "#171310"
  dark-ink: "#f2eee8"
  dark-muted: "#a39d96"
  dark-rule: "#34302b"
  dark-wash: "#24201c"
  dark-night: "#0c0a08"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.4rem, 1.4rem + 4.2vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 4.2vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title-sm:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "DM Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "DM Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "DM Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "DM Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: "1.25rem"
    letterSpacing: "0.01em"
  hand:
    fontFamily: "Caveat, Comic Sans MS, cursive"
    fontSize: "1.45rem"
    fontWeight: 600
    lineHeight: 1.25
  mono:
    fontFamily: "ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "0.6rem"
  card: "1rem"
  sheet: "2.5rem"
  full: "9999px"
spacing:
  gutter-sm: "1.25rem"
  gutter: "2rem"
  card-sm: "1.5rem"
  card: "2.5rem"
  card-lg: "3rem"
  section: "4rem"
  section-lg: "6rem"
  container: "72rem"
components:
  button-primary:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.paper}"
    typography: "{typography.small}"
    rounded: "{rounded.full}"
    height: "2.75rem"
    padding: "0 2rem"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    height: "3rem"
    padding: "0 2.5rem"
  button-ink-hover:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.paper}"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    rounded: "{rounded.full}"
    height: "2.75rem"
    padding: "0 1.25rem"
  button-outline-hover:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
  nav-segmented:
    backgroundColor: "{colors.wash}"
    rounded: "{rounded.full}"
    padding: "0.25rem"
  nav-item:
    textColor: "{colors.muted-ink}"
    typography: "{typography.small}"
    rounded: "{rounded.full}"
    padding: "0.5rem 1rem"
  nav-item-active:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  card-case-study:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "3rem"
  chip-stack:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.full}"
    size: "3.1rem"
  badge-role:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.muted-ink}"
    typography: "{typography.small}"
    rounded: "{rounded.full}"
    padding: "0.5rem 1rem"
  input-search:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.title-sm}"
    rounded: "{rounded.card}"
    padding: "1rem 1.25rem"
---

# Design System: boyanliu.me

## Overview

**Creative North Star: "The Warm Workshop"**

The site is a craftsperson's bench. Warm off-black ink sits on white paper and a pale workbench grey, and a single oxblood stamp of colour marks what matters: the end of the headline, the primary button, an outcome, a full stop. When the lights go down (dark mode, the footer, the mobile menu), the bench is lit by lamplight amber. Everything is made by hand and meant to be handled: pill controls that slide an arrow in, tool badges that tilt when touched, a photo card dropped onto the desk, case-study cards stacking like sheets of work.

The density is unhurried. Headlines are big, confident grotesques set tight; body copy is a friendly geometric sans at a comfortable measure; whitespace is generous and sections breathe. The mood is playful and crafted rather than corporate: small, physical surprises (a GitHub tile that says hello, two hands reaching across the footer) are part of the identity, but each lives in its own place and never competes with the work.

This system explicitly rejects three looks. The first is **the old Swiss grid** it replaced: pure black and white, red squares, uppercase labels, numbered sections, heavy rules. The second is **the generic SaaS template**: gradient heroes, icon-card grids, stat strips, glassy blobs. The third is **the dark "developer" cliché**: neon on black, monospace everywhere, code-rain decoration.

**Key Characteristics:**
- One accent per theme: Oxblood on paper, Lamplight Amber in the dark.
- Bricolage Grotesque headlines; DM Sans for everything you read; Caveat only on the photo's caption.
- Depth from paper layers (paper, wash, night) and a rounded page sheet over a dark footer, not from shadows.
- Every control is a pill or a circle; every container is softly rounded.
- Motion is physical and eased (`cubic-bezier(0.22, 1, 0.36, 1)`): things rise, drop, tilt, slide and settle.

## Colors

A warm, near-monochrome palette of ink and paper with one deep accent that turns to lamplight in the dark.

### Primary
- **Oxblood** (`oxblood`): the single light-mode accent. Used for the cycling phrase in the hero headline, the filled Résumé pill, the round full-stop mark after page titles, case-study outcomes, the prose link colour, focus rings, the caret and native controls, the availability dot and the footer card behind the reaching hands.
- **Lamplight Amber** (`lamplight-amber`): the accent whenever the surface is dark. It replaces Oxblood in dark mode, and it is always the accent on the night surfaces (footer and mobile menu), whatever the theme.

### Neutral
- **Ink** (`ink`): warm off-black for all primary text, the ink pill ("Read case study") and the photo-card border shadows' base. In dark mode it becomes **Bone** (`dark-ink`).
- **Paper** (`paper`): the page and the inside of controls, chips and the photo card. In dark mode it becomes **Charred Paper** (`dark-paper`).
- **Workbench Grey** (`wash`): the case-study card surface, the segmented nav track, code and callout backgrounds, hover fills. In dark mode, **Soot** (`dark-wash`).
- **Pencil** (`muted-ink`): secondary text such as summaries, meta lines, labels and inactive nav items. In dark mode, **Ash** (`dark-muted`).
- **Hairline** (`rule`): every divider and every 1px border on cards, pills and chips. In dark mode, `dark-rule`.
- **Night** (`night`, `night-ink`, `night-muted`, `night-rule`): the footer and mobile-menu surface. It stays dark in both themes and deepens to `dark-night` in dark mode.

### Named Rules
**The One Stamp Rule.** A screen carries one accent and uses it sparingly: Oxblood on paper, Lamplight Amber on dark. Never introduce a second accent hue for UI. The only exceptions are the third-party palettes embedded in content: GitHub's greens in the activity tile, and brand colours on the stack logos.

**The Night Stays Night Rule.** The footer and the mobile menu are always dark, and their accent is always Lamplight Amber, even in light mode.

**The Contrast Gate Rule.** An accent must clear 4.5:1 against its surface. The build fails when `content/site.json` sets an accent that doesn't.

## Typography

**Display Font:** Bricolage Grotesque (with Helvetica Neue, Helvetica, Arial)
**Body Font:** DM Sans (with Helvetica Neue, Helvetica, Arial)
**Handwritten Font:** Caveat (polaroid caption only)
**Mono Font:** ui-monospace (code blocks and version numbers)

**Character:** A characterful, slightly quirky grotesque does the talking, set tight and big; a clean, round sans carries every sentence. Together they read like a confident, friendly maker rather than a corporate brand.

### Hierarchy
- **Display** (600, `clamp(2.4rem, 1.4rem + 4.2vw, 4.5rem)`, 1.08, -0.03em): the hero headline and page titles ("Work.", "Writing."). It is tuned so every cycling hero phrase fits one line on a 390px phone.
- **Headline** (700, `clamp(2.25rem, 4.2vw, 3.25rem)`, 1.08): section titles such as "Selected work", "Experience" and "Bookmarks".
- **Title** (700, 2rem, 1.1): case-study card titles and prose `h2`.
- **Title small** (700, 1.375rem, 1.25): list-row titles (experience companies, posts, bookmarks, changelog entries) and prose `h3`.
- **Lead** (400, 1.2rem, 1.55): the hero bio and page intros, kept to about 34rem.
- **Body** (400, 1.0625rem, 1.6): summaries and prose, measure 62–68ch.
- **Small** (400, 0.9rem): nav, controls, captions.
- **Label** (500, 0.8125rem, +0.01em, sentence case): meta lines (year · role, dates, stacks).

### Named Rules
**The Grotesque Speaks Rule.** Bricolage Grotesque is for headings, titles and the mobile-menu links. Everything a visitor reads in sentences is DM Sans.

**The No Shouting Rule.** Labels are sentence case. Uppercase tracking belongs to the old Swiss look. The only exception is the printable résumé page's section labels, a résumé convention.

## Layout

Content sits in one container capped at `container`, with side padding of `gutter-sm` on phones and `gutter` from 768px. Breakpoints are Tailwind's defaults (640, 768, 1024, 1280px), plus a 48rem phone breakpoint where motion and type simplify. Sections are separated by `section` (`section-lg` from 1024px), and the home page's first section starts tighter so the work peeks in soon after the hero.

The page is a **paper sheet**: the header and main content sit on Paper, which ends in a rounded bottom edge (`sheet` radius) over the Night footer.

The **header floats**: at the top of the page it is a transparent full-width bar. After 24px of scrolling it narrows to a 56rem frosted pill with a hairline border.

On desktop the **hero** is two columns: copy on the left, and on the right a 21rem photo card tilted 4° (level on phones). Case-study cards are two columns at 5:7 (copy, then a screenshot that bleeds off the right and bottom edges); on phones they stack copy over image. Inside long pages a 12-column grid places a sticky facts column (3 columns) beside the content (9 columns).

### Named Rules
**The Stack Rule.** On screens at least 1024px wide and 640px tall, case-study cards stick 6rem from the top, each one 20px lower than the last, so the next card covers the previous and leaves a strip showing. Cards after the first tilt ±1° alternately; the first stays level. Never enable this where a card is taller than the viewport.

## Elevation & Depth

Paper layers. Surfaces are flat at rest, and depth comes from tone: Paper over Workbench Grey, the rounded page sheet lifted over the Night footer, the dark menu drawn over the page. Shadows are reserved for objects that physically lift off the desk.

### Shadow Vocabulary
- **Soft** (`box-shadow: 0 1px 2px rgb(23 19 16 / 0.06), 0 8px 24px rgb(23 19 16 / 0.06)`): the scrolled header pill, the active segment of the nav, stacked case-study cards.
- **Lift** (`box-shadow: 0 2px 4px rgb(23 19 16 / 0.06), 0 18px 40px rgb(23 19 16 / 0.12)`): the photo card and the case-study screenshots.
- **Popover** (`box-shadow: 0 28px 56px -28px rgb(31 35 40 / 0.3)`): the GitHub year popup.

### Named Rules
**The Only Things That Lift Rule.** A shadow means "this object is above the page": a photo, a screenshot, a floating header, a popover. Cards, rows and buttons stay flat.

## Shapes

Everything is softly rounded and handled.
- **Controls:** pills (`full`).
- **Icon badges and avatars:** circles.
- **Cards:** gently curved (`card`, 1rem).
- **Small insets:** `sm`.
- **The page sheet's bottom corners:** `sheet`.

Borders are always hairlines (1px, Hairline). The full stop after page titles is a round Oxblood dot, never a square.

### Named Rules
**The Hairline Rule.** Borders are 1px and neutral. No thick or coloured side borders on cards, callouts or list items.

## Components

Playful and crafted: every control answers the hand with a small physical motion (lift, tilt, slide, settle). All motion uses `cubic-bezier(0.22, 1, 0.36, 1)` and switches off under `prefers-reduced-motion`.

### Buttons
- **Shape:** pill (`full`).
- **Primary (Oxblood pill):** Oxblood fill, Paper text, 2.75rem tall, 2rem side padding, weight 600. It is used for the Résumé buttons.
- **Ink pill:** Ink fill, 3rem tall, 2.5rem side padding. It is used for "Read case study".
- **Hover / Focus (signature):** the label pill shrinks by its height and a matching circle scales in on its right while the icon slides in from the left (0.5s, with the icon 0.1s behind). The ink pill turns Oxblood. Only hovering or focusing the button itself triggers it; hovering its card does not. Focus shows a 2px ring in the pill's colour, offset 3px.
- **Outline pill:** Paper with a Hairline border, 2.75rem tall. Hover darkens the border to Ink, fills Workbench Grey, and lifts the button 2px.

### Chips (stack badges)
- **Style:** 3.1rem Paper circles with a Hairline border holding a brand logo in its own colour (near-black logos follow Ink). They overlap by 0.5rem.
- **State:** hover lifts 3px and tilts -3°. Hover, tap or focus shows an Ink tooltip pill with the tool's name below the badge, counter-rotated to stay level. On load the badges pop in 70ms apart.

### Cards / Containers
- **Case-study card:** Workbench Grey, `card` corners, Hairline border, padding of `card-lg` on desktop. The screenshot inside has Lift and zooms to 106% when the card is hovered, and it settles from 110% when the card reveals.
- **Gallery card:** Paper with a Hairline border; a 700:513 screenshot over the title, then the meta line (with an Oxblood "Multi-page" pill for featured builds), then Live site and Code outline pills.
- **Callout:** Workbench Grey with a Hairline border and an Oxblood title.

### Inputs / Fields
- **Search palette:** a Paper panel with `card` corners, a Hairline border and Lift, over a Night 40% blurred scrim. The input is borderless, set at Title small size, and divided from results by a Hairline. Results highlight with Workbench Grey and `sm` corners; titles never wrap and summaries truncate.

### Navigation
- **Header:** the name with the avatar on the left; a segmented control in the centre (a Workbench Grey track, items in Pencil). The active item becomes a Paper pill with Soft shadow, and its Phosphor icon grows in beside the label. On the right: search and theme icon buttons (40px circles) and the Oxblood Résumé pill.
- **Mobile:** a "Menu" pill opens a full-screen Night sheet that unrolls from the top (clip-path). Its links are Bricolage at 2.75rem and rise in one after another; the current page is full Bone with a Lamplight dot, the rest at 60%.

### Signature components
- **Rotating headline:** the hero's accent phrase cycles every 3s, each letter blur-fading in 28ms after the last. On phones whole words fade; with reduced motion only the first phrase shows.
- **Photo card:** a polaroid on Paper with Lift, dropped in on load from 12° to its 4° tilt, captioned in Caveat ("Based in …"). It shows initials until a portrait is provided.
- **GitHub pulse tile:** a 15×7 mini contribution grid in GitHub's greens. It shimmers, draws a beating heart, and spells "hello" on hover. Hover, click or focus opens a Paper popover with the year's calendar in two rows of months.
- **Reaching hands:** an Oxblood (Lamplight in dark mode) card in the footer where two line-art hands slide together as the page reaches its end.
- **Page morph:** opening a case study from a work card (home, Work, tag pages) morphs the card's title into the page heading and, on desktop, its screenshot into Fig. 1 (480ms, `ease-out-soft`, a 2px blur mid-flight). The rest of the page crossfades in 300ms and the header pill stays still. It runs on React's `<ViewTransition>`; the browser back button, unrelated links and reduced motion switch pages instantly.
- **Experience accordion:** rows of company, title and dates with a round caret. They open one at a time to bullets, location and stack chips, with a height animation.

## Do's and Don'ts

### Do:
- **Do** keep one accent per theme (The One Stamp Rule) and route every accent use through the theme token, never a literal hex.
- **Do** give new sections at most one signature interaction, and make it physical (rise, drop, tilt, slide, settle) using `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Do** use pills for controls, circles for icon badges and `card` corners for containers, all with 1px Hairline borders.
- **Do** take UI icons from Phosphor (bold weight) and brand logos from Simple Icons.
- **Do** make every animated element readable in its final state under `prefers-reduced-motion` and without JavaScript.

### Don't:
- **Don't** bring back the old Swiss grid: pure black/white, red squares, uppercase labels, numbered sections, heavy rules.
- **Don't** use generic SaaS patterns: gradient heroes, icon-card grids, stat strips, glassy blobs.
- **Don't** use the dark "developer" cliché: neon on black, monospace as decoration, code-rain or terminal theming.
- **Don't** put a coloured or thick side border on cards, callouts or list rows (The Hairline Rule).
- **Don't** put a label above a heading. Meta lines go below titles; the hero's role badge is the one owner-chosen exception.
- **Don't** use emoji as icons. Emoji appear only in changelog entry titles.
