# Phase 1, batch 3: Badge, Tooltip and Toast

Checked 2026-09-29. Picked by use in the prototype: Toast 20 files, Tooltip 15, Badge 13 (plus 83 hand-rolled badge selectors).
- **Sources:** the prototype (`badges.md`, `alerts-toast.md`, and `src/components/{Badge,Tooltip,Toast}`), cross-checked with the Figma Library.
- **Per-property detail:** each component's Compare tab.

| Component | MUI | Figma set |
|---|---|---|
| Badge | `Chip variant="badge"` + `Badge` wrapper | `5799:479` dark, `12186:1609` light |
| Tooltip | `Tooltip` + `InfoTooltip` | `2683:29027` dark, `11927:8087` light |
| Toast | `Alert variant="filled"` + `ToastProvider` / `useToast` | `5045:14119`, one copy for both modes |

## Verified (Playwright: `badge.spec.ts`, `tooltip.spec.ts`, `toast.spec.ts`)

**Badge**
- All 16 badges are 29px tall, with 6/12 padding, 14px Medium and no border.
- Fill and text colour per type match Figma in light mode, and Text-progress in dark.
- A removable badge goes on Delete, or on a click on its ✕.

**Tooltip**
- The bubble has 8/12 padding, a 12px radius and 14px Regular text. Tooltip-background is `#20222A` in light mode and `#0F1014` in dark.
- In all 16 variants, the caret is 12×6 (6×12 at the sides), 4px from the trigger, and 16px in for Start and End.
- Hover and focus open it, and Escape closes it.
- The info button is described by its tooltip.

**Toast**
- Toasts are 48px tall, with the Figma fill for each type, 12/16 padding, a 12px radius and 16px Bold text.
- Warning and Error use `role="alert"`; the others use `role="status"`.
- New toasts stack above older ones, and each one leaves after 5 seconds. Hovering pauses the timer.

## Changed in the theme
- New tokens:
  - `textProgress`: Primary-700 in light mode, Primary-500 in dark.
  - Four 16% badge fills.
- New palette colours: `progress` and `new`.
- New Chip variant: `badge`.
- `MuiTooltip`: a 12×6 caret and popper offsets for the 4px gap and 16px inset.
- `MuiAlert` (filled only): the toast body and its icons.
- `icons/DialogIcons.tsx` is now `icons/FigmaIcons.tsx` and adds the Ionicons close. Extra props now pass through to the SVG, because MUI clones icons with its own click handlers.

## Shell
- The Compare status labels are now the reference Badge (Matches in success, Design to update in warning, Code to update in error). No stock MUI status chips are left.
- `ToastProvider` is mounted at the root of the shell.

## Out of date, to update

**Figma**
- **Badge:**
  - The In progress badge with an icon is 28px (its label line-height is 1).
  - Warning and Informative share the info-circle shape.
  - "In Progress" is Title Case.
- **Tooltip:** Right is 8px from its trigger; every other variant is 4px.
- **Toast:**
  - Done 2026-09-29: Information was bound to the mode-aware Border variable (white text on pale grey in light mode). It is now bound to Neutral-700, as the reference, and the Toast has a light board.
  - The sample text uses "!".
  - Undo isn't in the set.

**Prototype**
- **Badge:**
  - Quiz and Scheduled types aren't in Figma.
  - `role="status"` on every badge.
  - 35 CSS files re-implement the badge.
  - The guidelines list stale fills and text values.
- **Tooltip:**
  - No `aria-describedby` and no flip at the window edge.
  - The docs say `#20222A` in both modes.
  - 17 CSS files style their own tooltips.
- **Toast:**
  - Information uses Neutral-600.
  - It never wraps, so long messages overflow.
  - No pause on hover.
  - 26 page-local ToastContainers, each with its own state.

## ConfirmModal (from batch 2)
- **What Bruno said:** ConfirmModal closes only on Cancel.
- **What the check found:** the latest prototype (`4bb97c7`) matches our copy. In the running prototype, on Roles > Company Roles > Delete role, Escape and a click on the scrim both close it.
- **The notes:** the batch 2 notes and Dialog's Compare tab keep "closes on both", with how it was checked.
- **The reference:** closes only on Cancel or the action, as Bruno decided.
