# Phase 1, batch 7: Avatar, Breadcrumb and Content switcher

Checked 2026-09-29.
- **Why this batch:** the prototype has no Avatar component, yet avatars appear in about 56 files. Breadcrumbs appear in 17 files, and three pages still hand-roll them. The Content switcher is imported in 5 files.
- **Sources:** the prototype (`avatars.md`, the Breadcrumb section of `navigation.md`, Part 2 of `chips-switcher-tabs.md`, and `src/components/{Breadcrumb,ContentSwitcher}`), cross-checked with the Figma Library.
- **Per-property detail:** each component's Compare tab.

| Component | MUI | Figma (dark, light) |
|---|---|---|
| Avatar | `Avatar` + a `size` wrapper | Avatar `5097:5884`, `11914:2605` |
| Avatar group | `AvatarGroup` + a `size` wrapper | Avatar group `5097:5584`, `11915:3296` |
| Breadcrumb | `Breadcrumbs` + a `Breadcrumb` wrapper (items) | Breadcrumb item `8497:1494`, `11935:2383`; Breadcrumb `8497:2231`, light instance `11935:2368` |
| Content switcher | `ToggleButtonGroup` (exclusive) + a `ContentSwitcher` wrapper | Content switcher item `8497:24186`, `11908:5278`; Content switcher `7128:23859`, light instance `11918:4241` |

Plain MUI renders each one through the theme overrides:
- **Avatar:** without a photo, it shows the Figma fallback face (Emojies Type=Angel, drawn from its paths).
- **Breadcrumb:** the ArrowRight2 chevron is the default separator.
- **Content switcher:** every ToggleButtonGroup, including the shell's own panels.

## Verified (Playwright: `avatar.spec.ts`, `breadcrumb.spec.ts`, `content-switcher.spec.ts`)
- **Avatar:**
  - Seven sizes, all round. The photo fills the circle.
  - The fallback face is on Input-background, and a broken photo falls back to it.
- **Avatar group:**
  - Overlaps of 8, 12 and 16px, with a 1px Page-background ring.
  - The "+3" counter is Page-background-hover, with Text-tertiary text at 8, 10 or 12px.
  - Each avatar sits on top of the one before, as in Figma.
- **Breadcrumb:**
  - 14px Text-tertiary links, with 16px chevrons 2px after and 4px between items.
  - Hover is Text-primary and underlined, and the chevron follows. Disabled is Text-disabled.
  - The current page is Text-secondary, with aria-current and no link. It's a nav named "Breadcrumb".
- **Content switcher:**
  - An Input-background track, 41px tall, with radius 12, padding 4 and gap 4.
  - Sections are 33px, with padding 6/12 and radius 8.
  - Selected is Secondary-500 with a Bold Neutral-800 label; hover is Input-background-hover.
  - Icons are 20px on the left and 16px on the right.
  - One section is always selected, by mouse or keyboard.

## Changed in the theme
- **New overrides:** `MuiAvatar`, `MuiAvatarGroup`, `MuiBreadcrumbs`, `MuiToggleButtonGroup` and `MuiToggleButton`.
- **New icon:** `AvatarFallbackIcon`.
- **Tokens:** none new.
- **Shell:** the Preview panels' toggle groups (Light and Dark, Top and Start, and so on) now show the Content switcher.

## Out of date, to update
**Figma**
- **Avatar:**
  - The 64px fallback has a purple frame fill behind the face.
  - In a group, the fallback face is translucent, so the avatar beneath shows through (the reference backs it with Page-background).
  - The 24px counter ring is 0.5px; the others are 1px.
- **Breadcrumb:** the Current page item has a stray 8px gap, and there's no focus state.
- **Content switcher:** no focus state.

**Prototype**
- **avatars.md:** says the first avatar is frontmost; in Figma each sits on top of the one before.
- **navigation.md:** says the Library frames are 12px; they're 14px.
- **chips-switcher-tabs.md:** says Medium in its table and Bold in its CSS for the selected section. Figma is Bold.
- **Content switcher:** uses tablist and tab roles. The reference uses toggle buttons with aria-pressed, since it changes the view of one panel.
- **Breadcrumb:** three pages still hand-roll it.
- **Avatar:**
  - No Avatar component.
  - Two-letter initials in places, which aren't in Figma.

## Not built yet
- Emojies (13 faces): only Angel, the fallback, is drawn.
