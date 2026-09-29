# Phase 1, batch 8: Table

Checked 2026-09-29.
- **Why this batch:** 20 prototype files import the Table, the most used of the remaining components.
- **Sources:** the prototype (`table.md`, `src/components/Table`), cross-checked with the Figma Library Table page.
- **Per-property detail:** the Table's Compare tab.

| Part | MUI | Figma (dark, light) |
|---|---|---|
| Table | `Table`, `TableHead`, `TableBody`, `TableRow`, `TableCell` | Table `7896:2624`, light instance `11927:7332` |
| Row states | `TableRow` hover, selected, aria-disabled | Table row `7896:2804`, `11927:7487` |
| Header | head `TableCell`, `TableSortLabel`, `Checkbox` | Table header `11872:3077`, `11927:7554` |
| Cells | `CellContent`, `CellDate`, `TableThumbnail` | Table data `11766:619`, `11927:7602`; Thumbnail type `9537:7400` |
| Pagination | `TablePagination` | Pagination instance in the Table |

A plain MUI Table renders the Figma table and keeps real table semantics:
- **Header:** a filled bar.
- **Rows:** each row is a card, drawn with separate borders and 12px spacing.
- **Border:** the 1px border sits inside, as in Figma, so rows stay 37px.
- **Cells:** a table cell can't be an auto layout frame, so `CellContent` lays out what goes inside.

## Verified (Playwright: `table.spec.ts`)
- **Header:** 37px, Input-background, radius 12, cells padded 8/12, Text-secondary.
- **Rows:** 37px, with a 1px Border and radius 12. The first row sits 12px below the header, and each row 12px below the last.
- **Pagination:** "1-10 of 28", right-aligned.
- **Row states:**
  - Hover is Input-background.
  - Selected is the Selected-row variable (Secondary-500 at 16%), or Selected-row-hover (24%), on fill and border.
  - Read-only is Text-disabled.
- **Cells:**
  - 24px checkboxes, 12px from the text.
  - Two-line text is SemiBold over Text-secondary, 2px apart.
  - The date is 14px over a 12px year.
  - The thumbnail is 72×44.
- **Preview:**
  - Select-all is indeterminate when only some rows are picked.
  - Sorting sets aria-sort on the column.
  - Paging works.
  - The archived row is read-only, with its checkbox disabled.

## Changed in the theme
- **New overrides:** `MuiTable`, `MuiTableCell`, `MuiTableRow`, `MuiTableSortLabel` and `MuiTablePagination`.
- **New tokens:** `rowSelected` and `rowSelectedHover`: the Figma variables Selected-row (Secondary-500 at 16%) and Selected-row-hover (24%).

## Out of date, to update
**Figma**
- Done 2026-09-29 (Bruno):
  - Selected rows use the Selected-row and Selected-row-hover variables in both boards; the light board had raw 12% before.
  - Single-line text is Regular in every cell.
  - The light checkbox + illustration cells use 24px checkbox frames.
- **Focus:** no focus states for cells, the sort label or pagination.

**Prototype**
- **table.md:** its opening section still calls the header borderless.
- **Hover and selected fills:** the prototype uses the `#EDA30D` amber for selected rows; Figma uses Secondary-500.

## Not built yet
- Illustration cells: they need the Gamification illustrations. The progress cell arrived in batch 9.
