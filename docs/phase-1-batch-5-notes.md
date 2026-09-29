# Phase 1, batch 5: Checkbox, Radio and Toggle

Checked 2026-09-29.
- **Why this batch:** the selection controls are used across the prototype (Checkbox and Radio are imported in 10 files each, Toggle in 6), and the Dropdown's multi-select rows needed the checkbox.
- **Sources:** the prototype (`selection-controls.md` and `src/components/{Checkbox,Radio,Toggle}`), cross-checked with the Figma Library page Checkbox / Radio / Toggle.
- **Per-property detail:** each component's Compare tab.

| Component | MUI | Figma set |
|---|---|---|
| Checkbox | `Checkbox` + a thin `Checkbox` wrapper | Checkbox instances `6339:10484` dark, `11917:3924` light |
| Radio | `Radio` in `RadioGroup` (no wrapper) | radio-button instances `5001:18926` dark, `11917:3950` light |
| Toggle | `Switch` + a thin `Toggle` wrapper | Toggle `8160:364` dark, `11917:3970` light |

All three share one set of theme overrides (`packages/components/src/Selection/selection.overrides.tsx`), so plain MUI renders the Figma controls:
- The Figma glyphs (copied into `icons/FigmaIcons.tsx`) are the default icons for MUI Checkbox and Radio.
- `MuiFormControlLabel` gives the label row. `MuiFormLabel` gives the group label (a fieldset legend) the field-label look.

The wrappers exist only where MUI 5 falls short:
- **Checkbox** sets the native indeterminate property. MUI draws the glyph but leaves the input "not checked" for screen readers.
- **Toggle** adds `role="switch"`. A theme default can't do it, because any `inputProps` passed in would replace it.

## Verified (Playwright: `checkbox.spec.ts`, `radio.spec.ts`, `toggle.spec.ts`, `dropdown.spec.ts`)

**Checkbox**
- 32px halo and a 16px box.
- Text-primary unchecked, Selected when checked or indeterminate (light and dark).
- Page-background-hover halo; Text-disabled when disabled.
- The label is 12px from the box and ticks it.
- Indeterminate reads as mixed; Space ticks.

**Radio**
- 24px halo, 15px ring, the same colours as the checkbox.
- The group is named by its legend. The arrow keys move and pick; the labels pick.

**Toggle**
- 36×20 track and a 16px Neutral-25 thumb, 2px in, with no shadow.
- Off is Text-disabled, on is Selected (light and dark). Disabled is Text-disabled, on or off (decided 2026-09-29).
- It's a switch, named and described by the settings row.

**Dropdown multi-select**
- The rows are 37px, with a 16px checkbox 12px from the label.
- Selected rows keep the plain fill; the tick is Selected.
- The listbox is aria-multiselectable, and the field lists the picks.

## Changed in the theme
- New overrides: `MuiCheckbox`, `MuiRadio`, `MuiSwitch`, `MuiFormControlLabel` and `MuiFormLabel`.
- `MuiMenuItem` adds the checkbox row (`.ds-row-check`).
- No new tokens.

## Shell
Every stock MUI Switch in the Preview panels now draws the Figma Toggle.

## Decision for Bruno
- **Toggle off in light mode.** The Figma track is bound to Text-disabled but draws `#656B7C` (the dark value), because the light frame sets Surface colours to Light mode and not Text colours. The reference follows the binding: Text-disabled, Neutral-300 `#9EA4B3`. If `#656B7C` is the intended colour, it needs its own token (Neutral-400 in both modes, as the prototype has it).

## Out of date, to update

**Figma**
- **Checkbox:** no Disabled Checked or Disabled Indeterminate frames (they should be filled with Text-disabled, decided 2026-09-29); no focus.
- **Radio:**
  - No focus.
  - The Not selected Hover frame has 3px padding, while the others have none.
  - In List itens, the radio instance is 16×24 on some rows and 20×20 on others.
- **Toggle:**
  - The light frame needs Text colours set to Light mode.
  - No disabled or focus frames.
  - No small size (the prototype has 28×16).

**Prototype**
- **Checkbox:**
  - A button with role checkbox and no label.
  - A 1.5px Text-secondary border (Figma: 1px Text-primary).
  - A white mark drawn on top (Figma cuts it out).
- **Radio:**
  - A 1.5px ring (Figma: 1.07px).
  - The unselected ring turns Border-hover on hover.
  - The focus ring is Selected.
- **Toggle:** Neutral-400 off in both modes, a thumb shadow, and disabled on fades Selected to 40% (should be Text-disabled).
- **selection-controls.md:** gives 1.5px strokes for both the box and the ring.

## Not built yet
- **Dropdown:** radio rows, and the avatar, skill icon, search, helper and supporting text rows.
- **Input field:** the Radio button input (its own Figma set, still "Figma only").
