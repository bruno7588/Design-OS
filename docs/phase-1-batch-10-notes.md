# Phase 1, batch 10: Integer, Radio button and Inline inputs

Checked 2026-09-29.
- **Why this batch:** the last three Input field types. They build on the batch 4 field overrides.
- **Sources:** the Figma Library (Input page), `playground/docs/design-system/input.md` and `playground/src/components/InputInteger`.
- **Per-property detail:** each component's Compare tab.

| Component | MUI | Figma set |
|---|---|---|
| Integer input | `TextField` with `ds-integer` + `InputInteger` wrapper | Input field/Integer `10145:10895` dark, `12114:20914` light |
| Radio button input | `TextField` with `ds-radio-input` + `InputRadio` wrapper | Input field/Radio button `8974:30479` dark, `12114:20857` light |
| Inline input | `InputBase` with `ds-inline-title` / `ds-inline-description` + `InputInline` wrapper | Input field/Inline `10330:4736` dark, `12114:20828` light |

All three share `packages/components/src/InputField/inputTypes.overrides.ts`. The rules for Integer and Radio button are added to `MuiOutlinedInput` in `field.overrides.tsx`, and it adds a new `MuiInputBase` override for Inline.

## Verified (Playwright: `input-integer.spec.ts`, `input-radio.spec.ts`, `input-inline.spec.ts`)

**Integer input**
- The field is 37px and hugs its content. The value is 26px, 12px from − and +.
- Colours:
  - Border-elevated at rest.
  - Hover: Border-hover with no fill, and a Page-background-hover halo on +.
  - Active: Selected.
  - Error: Text-error.
- Helper text is Text-secondary.
- It's a spinbutton named by its label, with aria-valuenow, min and max.
  - − and + step it; the arrow keys, Home and End work.
  - Typing above max caps at max; empty or below min is corrected on blur.
  - − and + are skipped by Tab.

**Radio button input**
- The field is 37px, with a 21px radio 8px before the text.
- Colours:
  - Hover: Border-hover and a halo on the radio.
  - Active: Selected.
  - Selected: a Selected radio; the border stays Border-elevated.
  - Success: a Success-500 radio.
  - Disabled: Text-disabled.
- In a RadioGroup, the radios are one named group with arrow keys. Each radio and each text field has its own name.

**Inline input**
- Title: Bold 32, 48px tall, Text-primary.
- Description: Regular 16, Text-secondary, 4px below the title.
- Placeholders are Text-disabled.
- Error: the title turns Text-error. The message sits under it and is linked with aria-describedby.

## Mismatches recorded

**Figma**
- **Integer:**
  - Success looks the same as Filled.
  - No min/max state and no label-at-start variant (the prototype has one, plus a "%" suffix).
- **Radio button:**
  - The Disabled variant is named Selected=true but draws an empty radio.
  - No helper or error.
- **Inline:**
  - The placeholder "Add Title" isn't sentence case; code uses "Add a title".
  - The description is 868px next to a 900px title.
  - There's no disabled variant.

**Prototype**
- The prototype Integer has no spinbutton role or arrow keys, and there's no Radio button or Inline component at all.

## Follow-up, 2026-09-29 (Bruno)
- **Figma:** the Integer − and + icons are now 20px in both sets (88 instances rescaled, so the strokes scale too). The field hugs to 114×37, matching code. The Compare frames are re-exported.
- **`playground/docs/design-system/input.md`** now follows Figma:
  - The node IDs are the current light copies (`12114:*`).
  - Radio: Semibold label, a Success-500 radio with no tick icon, a hover halo on the radio, and disabled drawn off.
  - Inline: no Danger icon on error; the message sits under the title.
  - Integer: 20px icons and a 114px field.

## Follow-up, 2026-09-29: Inline Size (Bruno)
- **Figma:** Bruno added `Size` (L, M) to Input field/Inline and replaced the light copy (new set `12300:6403`; the old `12114:20828` is gone).
  - M: title Bold 20, description Regular 14.
  - Error: the message now sits 4px under the title (was 0).
  - Added the missing M `State=Filled, Description=false` variant to both sets, so each has 16.
- **Code:** `InputInline` takes `size="L" | "M"`. M is MUI `size="small"` on the InputBase, as Search uses small for M. The error message is 4px under the title.
- **Shell:** the matrix shows L then M, and the Preview has a Size control. The Compare frames are re-exported, and the spec checks the M sizes and both 4px gaps.
- **`input.md`:** updated with the sizes and the 4px error gap.

## Not built
- The Integer label-at-start layout and unit suffix. They're prototype only, not in Figma.
