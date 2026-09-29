# Phase 1, batch 2: Chip, Tabs and Dialog

Checked 2026-09-29.
- **Reference:** `packages/components` (MUI 5.18 + 5Mins theme).
- **Sources:** the prototype (`playground/docs/design-system/chips-switcher-tabs.md`, `overlays.md`, `src/components/Chip`, `src/components/ConfirmModal`), cross-checked with the Figma Library.
- **Rule:** the prototype is the reference. Where it disagrees with Figma, Figma wins and the mismatch is listed.
- **Per-property detail:** each component's Compare tab (`apps/shell/src/modules/components/<slug>/<Name>Compare.tsx`).

| Component | MUI | Figma set (dark, light) |
|---|---|---|
| Chip | `Chip` + `selected` wrapper | Chips `5162:28510`, `12160:12109` |
| Tabs | `Tabs` + `Tab` with `count` | Tab items `1939:18281`, `12134:6969`; Tabs `8497:24855` |
| Dialog | `Dialog` + `ConfirmDialog` | Dialog `7789:24651`, `12242:5728` |

## Verified (Playwright: `chip.spec.ts`, `tabs.spec.ts`, `dialog.spec.ts`)

**Chip**
- 33px tall, 24 radius, padding 5 + 1px border.
- The selected chip is Bold Neutral-800 on Secondary-500, with `aria-pressed`.
- Hover doesn't change a selected chip.
- Focus shows the 2px ring, and Space toggles the chip.

**Tabs**
- The bar is 27px tall, with tabs 16px apart.
- The indicator is 2px, as wide as the tab, in Selected (Secondary-600 in light mode).
- Labels are 14 Medium, and Bold when selected.
- The counter is 20px.
- Arrow keys move between tabs.
- Width stays the same when the selection moves.

**Dialog**
- Every variant is 345px wide, at the Figma heights of 243, 211, 171 and 139px.
- It's an `alertdialog` named by its title and described by its text.
- Focus starts on Cancel.
- Escape and scrim clicks do nothing; Cancel closes it and returns focus to the trigger.

## Decided
- **Dark `Border` token** (Bruno, 2026-09-29): Figma is correct, Neutral-700 `#2D313D`. `tokens.ts` now follows it; `Border-elevated` stays Neutral-600, as in Figma. The prototype's `tokens.css` sets both to Neutral-600 (to keep borders visible on cards), so it needs updating.
- **Dialog closing** (Bruno, 2026-09-28): only Cancel or the action closes it. Escape and a click on the scrim do nothing, as `overlays.md` says. The prototype's ConfirmModal closes on both, so its code needs updating. Checked 2026-09-29 in the running prototype (Roles > Company Roles > Delete role): Escape and a click on the scrim both close it (`ConfirmModal.tsx:17` and `:26`).

## Changed in the theme
- `shadow.l` is now Figma's Shadow L (`-4px 0 24px`, 12%). The prototype's `tokens.css` has `4px 4px 24px`.
- New semantic tokens:
  - `chipSelectedBackground`: Secondary-500 in both modes.
  - `textOnSelected`: Neutral-800.

## Out of date, to update

**Figma**
- **Chips:** no Focus or selected-hover frames. The prototype also has a warning chip that isn't in Figma.
- **Tab items:** no Focus or Disabled frames. Tabs widen slightly when selected; the reference reserves the Bold width.
- **Dialog:**
  - The Error variants label both buttons "Cancel".
  - The Info icon is the only Ionicons icon in the Library; the rest are Iconsax.

**Prototype**
- **Chip:**
  - 35px instead of 33px.
  - The docs' token table is stale (`--border-elevated`, `--border`).
- **Tabs:**
  - About 25 page-local copies, with gaps of 16, 20 or 24px.
  - About 12 use Secondary-500 for the indicator in light mode, and there are three counter styles.
  - Most have no focus style or arrow keys.
  - These should move to one shared component.
- **ConfirmModal:**
  - 560px wide and left-aligned, with an 8px title gap and a 72px icon.
  - Uses `aria-label` instead of `aria-labelledby`.
  - Closes on Escape and scrim clicks.
  - Its content styles live in `People.css`.

## Shell notes
- The shell's own MUI Tabs (the component page tabs) now render as the 5Mins Tabs.
- The Compare status labels are coloured MUI Chips, which the Chip overrides leave alone (`color` isn't `default`). They move to Badge when it's built.
- `iconsax-react` is now a dependency of `packages/components` (used by Dialog).
