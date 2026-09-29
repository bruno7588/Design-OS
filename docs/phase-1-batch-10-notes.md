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
  - The icons are 21px; code uses 20px in a 24px halo, so the field is 114px wide, not 116px.
  - Success looks the same as Filled.
  - No min/max state and no label-at-start variant (the prototype has one, plus a "%" suffix).
- **Radio button:**
  - The Disabled variant is named Selected=true but draws an empty radio.
  - No helper or error.
- **Inline:**
  - The placeholder "Add Title" isn't sentence case; code uses "Add a title".
  - The description is 868px next to a 900px title.
  - There's no disabled variant.

**Prototype docs (`input.md`)**
- Radio success: the doc says a tick icon; Figma has only the green radio.
- Radio label: the doc says Medium 14; Figma uses Semibold 14.
- Inline error: the doc says a Danger icon; Figma has none.
- The prototype Integer has no spinbutton role or arrow keys, and there's no Radio button or Inline component at all.

## Not built
- The Integer label-at-start layout and unit suffix. They're prototype only, not in Figma.
