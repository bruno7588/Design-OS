# Phase 1, batch 18: Remaining overlays (Full screen modal, Share modal, Bottom sheet)

Checked 2026-09-29.
- **Why this batch:** the overlays that were still Figma-only, from Bruno's order (overlays and gaps before Gamification).
- **Sources:**
  - The Figma Library: the Dialog / Modal / Sheet page.
  - `playground/docs/design-system/overlays.md`: the full-screen close button.
  - `src/components/CloseButton`.
- **Per-property detail:** each component's Compare tab.

| Component | MUI | Figma |
|---|---|---|
| FullScreenModal | Dialog (fullScreen) + CloseButton (fullscreen) | Modal/Full screen `3223:31934` / `11498:1694` |
| ShareModal | Dialog + Search + ContentSwitcher + Avatar + Checkbox + Button | Modal/Send `5399:12437` / light board `12358:472` (new) |
| BottomSheet | Drawer (anchor bottom) | Bottom sheet `7479:106` / light instance `12279:281` |

## Built
- **CloseButton `variant="fullscreen"`:**
  - A 40px disc with 4px padding, filled Input-background, holding a 32px glyph in Text-secondary.
  - On hover, Input-background-hover with a Text-primary glyph.
- **FullScreenModal:**
  - The whole viewport in Page-background, with no radius or shadow.
  - **Close button:** 20px from the top and 30 from the right. On small screens it sits 16 under the status bar (the safe area) and 20 from the right.
  - Escape closes it, focus is trapped inside and returns on close, and it's named by `aria-labelledby`.
- **ShareModal:**
  - **Surface:** 400 × 816, padding 32, sections 24 apart, the Dialog surface (radius 12, Shadow L).
  - **Contents:** a "Share lesson" title (the dialog's name), Search L, a People/Teams Content switcher, then a scrolling list of 56px rows (Avatar 40, name, detail, and a Checkbox named by the person or team).
  - **Actions:** Share To and Copy Link, Outlined Buttons with the icon after the label.
  - Search filters the list.
- **BottomSheet:**
  - **Scrim:** Neutral-900 at 64%.
  - **Sheet:** Page-background, top corners 12, padding 0 16 20 16.
  - **Header:** a 36px header holding a 64 × 4 Neutral-500 handle, then the content slot.
  - **Accessibility:** the sheet is the dialog, named by `aria-label` or `aria-labelledby`. It closes on Escape or a tap on the scrim, and focus returns.
- **In-place previews for the docs:** `FullScreenModalContent`, `ShareModalPreview` and `BottomSheetPreview`.
- **New icon:** `ShareNodesIcon`, copied from Figma.
- **Shell:** three pages with frames at 1:1.
- **Tests:** `e2e/{full-screen-modal,share-modal,bottom-sheet}.spec.ts` (12 checks).
- **Inventory:** 62 components in code, 15 Figma-only.

## Changed in Figma
- **Modal/Send light version:** Modal/Send had no light version. I added a "Modal/Send, light mode" board (`12358:472`) next to the dark one. It holds instances of both variants, set to the Light variable modes.

## Mismatches recorded (Design to update)
- **Modal/Send** is an older component:
  - **Surface:** the Team variant has radius 16 and a loose shadow; Company has 12 and Shadow L.
  - **Deleted variables:** the Search and the People/Teams toggle are bound to a deleted Input-background.
  - **Old toggle:** the toggle is an old Chip/Toggle rather than the Content switcher.
  - **Buttons:** hand-built with a raw `#00CEE6` stroke, 45px tall, labelled "Share to" and "Copy link". Code uses the Buttons set, 41px, with "Share To" and "Copy Link" in Title Case.
  - **Close control:** the two variants draw it differently.
  - **Scrollbar:** a raw `#3E4354` bar.
- **Bottom sheet swipe:** the handle suggests swipe to close, which isn't built. MUI SwipeableDrawer could add it.

## Follow-up (Bruno, 2026-09-29)
- **Bottom sheet scrim uses the token:** in Figma, the raw `#0F1014` at 64% rectangle is swapped for the Overlay component (Device=Mobile), which the Modal and Side drawer use. In code the sheet uses the Scrim token through the theme's MuiDrawer backdrop.
- **Full-screen close is 40px:** in Figma, both sets' mobile close button (a scaled 43px) is replaced with a copy of the desktop 40px button (padding 4, a 32px glyph), 60 from the top and 20 from the right. `overlays.md` and the prototype's `CloseButton.css` go from 44 to 40.

## Prototype differences
- **overlays.md:** it gives the full-screen close button as 44px (from the Programs file). The Library draws 40.
- **Bottom sheet and Share modal:** the prototype has neither.
