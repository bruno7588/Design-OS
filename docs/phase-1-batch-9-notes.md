# Phase 1, batch 9: Progress bar and Empty state

Checked 2026-09-29.
- **Why this batch:** progress bars appear in about 20 prototype files and complete the Table's progress cell. Empty states pair with tables and lists that have no data.
- **Sources:** the prototype (`empty-state.md`, `gamification.md`, `table.md` and `src/components/EmptyState`), cross-checked with the Figma Library.
- **Per-property detail:** each component's Compare tab.

| Component | MUI | Figma (dark, light) |
|---|---|---|
| Progress bar | `LinearProgress` (determinate) + a `ProgressBar` wrapper (label, width) | Progress bar `7046:25097`, `12000:10067` (Gamification page) |
| Empty state | no MUI equivalent: MUI Typography and the 5Mins Button, on tokens only | Empty state `5452:37234`, `11921:5779`; Illustrations Empty state `9120:8372` |

**Progress bar:** a plain determinate LinearProgress renders the Figma bar.
- An 8px Border track, fully rounded.
- A Primary-600 fill with a rounded end.
- Success-500 across the whole bar at 100%.

Figma draws the fill in eighths; the reference shows the exact value.

**Empty state:** four illustrations are exported from the Figma set (empty box, search, resources, no activity). They use the fixed Neutral palette, so they're the same in both modes.

## Verified (Playwright: `progress-bar.spec.ts`, `empty-state.spec.ts`, `table.spec.ts`)
- **Progress bar:**
  - The track is 400×8, radius 20, in Border.
  - 50% fills half in Primary-600; 100% is Success-500.
  - It's a progressbar named by its context, with aria-valuenow.
  - The table cell is a 72px bar with the percentage 8px after it.
- **Empty state:**
  - Desktop: padding 24, gap 20, radius 20, a 72px illustration, a Bold 20 Text-primary title, and a Text-secondary description up to 600px, centred.
  - Buttons: Outlined and Filled, 41px tall, 16px apart.
  - Mobile: padding 16, gap 16, a Bold 16 title, and a full-width description.
- **Table:** the progress cell is now built.

## Changed in the theme
- **New override:** `MuiLinearProgress`.
- **Tokens:** none new.

## Out of date, to update
- **Figma:**
  - The Empty state set shows the null placeholder (a #5E6780 square) instead of an illustration.
  - The prototype's dashed dropzone version isn't in Figma.
- **Prototype:** progress bars are hand-rolled in about 20 files (RatioBar and page CSS).

## Not built yet
- The other 30 empty-state illustrations: export them when a page needs one.
- The Table's illustration cells: they need the Gamification illustrations.
