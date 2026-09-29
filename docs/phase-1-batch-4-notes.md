# Phase 1, batch 4: Input field, Search and Dropdown

Checked 2026-09-29.
- **Why this batch:** these are the prototype's most hand-rolled controls: about 56 raw inputs in 43 files, 15 hand-rolled search fields and about 18 local dropdowns.
- **Sources:** the prototype (`input.md`, `search.md`, `dropdown.md`, `listbox.md`, and `src/components/{InputField,Search,Dropdown}`), cross-checked with the Figma Library.
- **Per-property detail:** each component's Compare tab.

| Component | MUI | Figma set |
|---|---|---|
| Input field | `TextField` + `InputField` wrapper | Input field/Outlined `8974:24610` dark, `12114:20561` light |
| Search | `OutlinedInput className="ds-search"` + `Search` wrapper | Search `697:33529` dark, `11927:6338` light |
| Dropdown | `TextField select` + `Menu`, plus a `Dropdown` wrapper | Dropdown `8925:1408` / `12113:14844`; Listbox `9162:1042`; List itens `9162:941` |

All three share one set of theme overrides (`packages/components/src/Field/field.overrides.tsx`):
- A plain MUI `TextField` gets the Figma field: the label static above it, a 37px box with its border drawn inside, and helper text below, all 8px apart.
- Every MUI `Menu` gets the Listbox look.

## Verified (Playwright: `input.spec.ts`, `search.spec.ts`, `dropdown.spec.ts`)

**Input field**
- Every field is 37px, with 8px between the label, the field and the helper.
- Border colours match Figma in light mode:
  - Enabled: Border-elevated
  - Hover: Border-hover
  - Active: Selected
  - Error: Text-error
  - Disabled: Border-elevated
- Dark Active is Secondary-500.
- The label names the field, the helper describes it, and an error sets `aria-invalid` and becomes the description.

**Search**
- M is 37px with a 12px radius; L is 48px with a 16px radius. Both use the Input-background fill.
- The clear button appears once there's text; it clears the field and puts focus back. Escape clears too.

**Dropdown**
- Every field is 37px.
- The menu has a 12px radius and a Border-elevated border.
- Rows are 37px. Hover is Cards-background-hover. Selected (hovered or not) is Secondary-500 with a Medium label.
- It's a combobox named by its label and described by its helper. Enter opens it, the arrows move, Enter picks, and Escape closes it and returns focus.

## Changed in the theme
- New overrides: `MuiTextField`, `MuiInputLabel`, `MuiFormHelperText`, `MuiOutlinedInput` (including the `ds-search` rules), `MuiSelect`, `MuiMenu` and `MuiMenuItem`.
- No new tokens.
- `menuPaperStyles` is exported so a menu can be drawn in place, as `dialogPaperStyles` is.

## Shell
The shell's own panels use stock MUI TextField and Select, so they now render as 5Mins fields and menus. That covers every Preview properties panel and the component page selects.

## Out of date, to update

**Figma**
- **Input field:** no Warning validation (the prototype has one).
- **Dropdown:** done 2026-09-29. Both sets (dark `8925:1408`, light `12113:14844`) now have `State=Error`: 10 variants each, cloned from Enabled, with the Text-error border, label and message and the Bold Danger icon instance before the chevron, matching the input field and the reference.
- **Search:** Hover with text has no clear-button variant of its own; the reference shows the clear button.

**Prototype**
- **Input field:**
  - About 39px tall instead of 37px, because its border sits outside the padding.
  - `design-system-guidelines.md` gives 12/16 padding; Figma has 8/12.
  - `input.md` gives the wrong opacity for `--input-background-elevated`.
- **Search:**
  - The L radius is hard-coded.
  - The clear icon is an Iconsax Add rotated 45°.
  - No Escape to clear.
  - 15 files hand-roll search fields.
- **Dropdown:**
  - The selected row uses `--selected` (Secondary-600 in light mode). Figma uses Secondary-500.
  - The menu is 240px tall with a Border border.
  - The error state uses Danger-500 in both modes.
  - No combobox role, no arrow keys, and the label isn't linked.
  - About 18 local dropdowns.
  - Four sources disagree on the selected row style.
- **Tokens:** done 2026-09-29. `playground/src/styles/tokens.css` dark `--border` is now Neutral-700, as in Figma, and `colors.md` is updated.

## Not built yet (shown in the inventory as missing in code)
- **Input field:** the Integer, Inline and Radio button inputs. Done in batch 10.
- **Dropdown menu rows:** radio, avatar, skill icon, search, helper and supporting text. Checkbox rows and multi-select arrived in batch 5.
