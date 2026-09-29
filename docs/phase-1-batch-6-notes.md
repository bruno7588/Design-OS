# Phase 1, batch 6: Modal, Side drawer and Alert

Checked 2026-09-29.
- **Why this batch:** these are the prototype's most used overlays. Modals and drawers appear in about 110 files each, and the close button in 52. Alert is imported in 9 files.
- **Sources:** the prototype (`overlays.md`, `alerts-toast.md`, `src/components/{Alert,CloseButton}` and the drawers), cross-checked with the Figma Library pages Dialog / Modal / Sheet and Alert.
- **Per-property detail:** each component's Compare tab.

| Component | MUI | Figma |
|---|---|---|
| Alert and Callout | `Alert` variant standard + an `Alert` wrapper | Alert set `3658:32304` dark, `12060:2785` light |
| Modal | `Dialog maxWidth="md"` + a `Modal` wrapper | Modal `7479:4350` dark, light instance `11919:4717` |
| Side drawer | `Drawer anchor="right"` + a `SideDrawer` wrapper | Side Drawer `10871:12768` dark, light instance `11919:4738` |

**Shared by Modal and Side drawer** (`packages/components/src/Overlay`):
- `CloseButton` (the default variant of the prototype's CloseButton).
- `SectionHeader` (Figma Header/Type=Section).

**Overrides:**
- **Alert:** the inline styles live in `Alert/alert.overrides.ts`. `MuiAlert` sends variant standard there; filled is still the Toast.
- **Modal:** `MuiDialog` gives `maxWidth="md"` the 720px Modal. The confirmation Dialog keeps its own width.
- **Side drawer:** `MuiDrawer` gives the side panel and the scrim.

## Verified (Playwright: `alert.spec.ts`, `modal.spec.ts`, `side-drawer.spec.ts`)

**Alert**
- **Callout:** Input-background with Regular Text-secondary text, radius 12 and padding 8/12. The icon or illustration is 20px, 8px from the text. The link button is Text-primary, 8px after the text.
- **Alert:** a Secondary-500 12% fill with SemiBold Text-warning text. The bell sits 12px from the text, Danger Bold 8px, and the button 24px after the text.
- **Supporting text:** a SemiBold title. The button sits 16px under the body.
- **Roles:** Callouts are role note and Alerts role status.

**Modal**
- 720px, padding 24, radius 12, Shadow L.
- The close button is 32px, 10px from the top right.
- The title is Bold 20, with the divider 12px under the headline.
- It's a dialog named by its title and described by its supporting text.
- The close button, Escape and the scrim all close it, and focus returns.

**Side drawer**
- 720px, the full height, against the right edge. Padding 20/24, with no shadow or radius.
- The footer buttons are 16px apart and 20px from the bottom. The content scrolls and the footer stays in view.
- It's a dialog, named and described.
- Escape, Cancel and the scrim close it, and focus returns.

## Changed in the theme
- New token: `alertBackground` (Secondary-500 at 12%, as Figma; not bound to a variable there).
- `MuiAlert` standard, `MuiDialog` maxWidth md, and a new `MuiDrawer`.
- New illustrations: the pin and the bell, exported from Figma (`icons/Illustrations.tsx`).

## Out of date, to update

**Figma**
- **Alert:**
  - The Alert fill isn't bound to a variable.
  - All three Alert variants show the button, including those named `Button=false`.
  - The Outlined-2 button under supporting text has its padding overridden to 37px.
  - Icon rows with supporting text show an arrow-up with no collapsed variant: do Callouts collapse?
- **Side Drawer:** the footer is 656px against the 672px content.

**Prototype**
- **alerts-toast.md:**
  - Says Warning-500 at 16% for the Alert fill in one place, and Secondary-500 at 12% in another.
  - Says Medium, where Figma uses SemiBold.
  - Still gives the old light node, 11914:638.
- **Alert:**
  - The bell is an emoji.
  - The info icon is 24px in Alerts.
- **overlays.md:**
  - Gives 16px above the header divider (Figma: 12).
  - Its drawer diagram says a 64% scrim.

## Not built yet
- Modal/Full screen, Modal/Send, Bottom sheet, and the full-screen close button.
- The collapsible Callout.

## Follow-up, 2026-09-29 (Bruno)
- **Collapsible Callout.** A Callout with more than 3 lines of supporting text collapses and expands. The chevron (ArrowUp2, 20px) sits at the end of the title row. It starts expanded; collapsing hides the body and its button. It's a button with aria-expanded, named "Hide details" or "Show details". In Figma the chevron shows on 3-line bodies, only on Icon rows, and there's no collapsed variant: design to update.
- **Side drawer close.** It was always in Figma, in the section header row: 32px, level with the title, 24px from the right. My first read stopped too shallow. The reference now puts it there too (SectionHeader `action`). A duplicate I added to the Figma component was removed.
- **Light and dark for every component.** Modal and Side Drawer already had light versions, as instances on a Light mode board; the first inventory only counted copies. A scan of all 23 pages found four without a light version, now added in Figma:
  - **Toast:** a Light mode board with instances. The Information fill is rebound from Border to Neutral-700, so it stays dark in light mode, as in code.
  - **Bottom sheet:** a Light mode board with an instance.
  - **Illustrations/ Functions:** a Light mode board with instances.
  - **Modal/Send:** drawn light, so it got a board set to Dark mode with instances. 18 of its colours aren't bound to variables (the cyan buttons, a purple and some greys), so they don't change with the mode: design to update.
- **Card/Folder:** the dark copy is "Card/Folder" and the light one "Card/folder". The inventory pairs them; rename one to match.
- **Inventory:** `figma.json` records how each item's light version exists (`light`: copy, instance, none). `pnpm inventory` reports `lightVersion`, `namesDiffer` and a `noLightVersion` count (0 now), and the overview flags gaps. CLAUDE.md has the rule.
