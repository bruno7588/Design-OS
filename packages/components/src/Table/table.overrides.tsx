import type { Components, Theme } from '@mui/material/styles'
import { ArrowDown, ArrowLeft2, ArrowRight2 } from 'iconsax-react'

// MuiTable, MuiTableCell, MuiTableRow, MuiTableSortLabel and MuiTablePagination theme overrides.
// Implements playground/docs/design-system/table.md, cross-checked with the Figma Library:
// Table (dark 7896:2624, light 11927:7332), Table row (7896:2804 / 11927:7487), Table header
// (11872:3077 / 11927:7554) and Table data (11766:619 / 11927:7602).
//
// A plain MUI Table renders the Figma table and keeps real table semantics: the header is a
// filled bar, and each body row is its own card (1px Border, radius 12), 12px apart
// (separate borders with 12px spacing). Columns share the width equally, as in Figma.
//   Table row State=Hover     → <TableRow hover>; forced with ds-hover
//   Table row Selected=true   → <TableRow selected>
//   Table row Disabled=true   → aria-disabled="true" on the row
//   Table header Icon=true    → <TableSortLabel> (ArrowDown 20px)
//   Pagination                → <TablePagination component="div"> ("1-10 of 28", 16px chevrons)

const ArrowLeftIcon = () => <ArrowLeft2 size={16} color="currentColor" />
const ArrowRightIcon = () => <ArrowRight2 size={16} color="currentColor" />
const SortIcon = (props: { className?: string }) => <ArrowDown size={20} color="currentColor" className={props.className} />

export const MuiTable: Components<Theme>['MuiTable'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderCollapse: 'separate',
      borderSpacing: `0 ${theme.tokens.space.sm}px`,
      // Border spacing also adds 12px above the header and below the last row.
      marginBlock: -theme.tokens.space.sm,
      tableLayout: 'fixed',
    }),
  },
}

export const MuiTableCell: Components<Theme>['MuiTableCell'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const t = theme.tokens
      return {
        padding: `${t.space.s}px ${t.space.sm}px`,
        border: 0,
        fontFamily: theme.typography.fontFamily,
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 1.5,
        // Figma: 24px checkbox frames in the header and cells (4px round the box).
        '& .MuiCheckbox-root': { width: 24, height: 24, padding: t.space.xs },
      }
    },
    head: ({ theme }) => {
      const t = theme.tokens
      const s = t.semantic
      return {
        backgroundColor: s.inputBackground,
        color: s.textSecondary,
        '&:first-of-type': { borderTopLeftRadius: t.radius.sm, borderBottomLeftRadius: t.radius.sm },
        '&:last-of-type': { borderTopRightRadius: t.radius.sm, borderBottomRightRadius: t.radius.sm },
      }
    },
    body: ({ theme }) => {
      const t = theme.tokens
      const s = t.semantic
      const line = `1px solid ${s.border}`
      return {
        color: s.textPrimary,
        // Figma draws the row's 1px border inside: take it off the padding, so rows stay 37px.
        padding: `${t.space.s - 1}px ${t.space.sm}px`,
        borderTop: line,
        borderBottom: line,
        transition: 'background-color 150ms, border-color 150ms',
        '&:first-of-type': { borderLeft: line, paddingLeft: t.space.sm - 1, borderTopLeftRadius: t.radius.sm, borderBottomLeftRadius: t.radius.sm },
        '&:last-of-type': { borderRight: line, paddingRight: t.space.sm - 1, borderTopRightRadius: t.radius.sm, borderBottomRightRadius: t.radius.sm },
        // Figma cell State=Hover: interactive text turns Text-button-hover.
        '& a, & .ds-cell-link': { color: 'inherit', textDecoration: 'none', borderRadius: t.radius.xs },
        '& a:hover, & .ds-cell-link:hover, & .ds-cell-link.ds-hover': { color: s.textButtonHover },
        '& a:focus-visible, & .ds-cell-link:focus-visible': { outline: `2px solid ${s.primaryButtonBackground}`, outlineOffset: 2 },
        // Action icon (table.md): a 20px icon; on hover a round Input-background-hover pill, 4px padding.
        '& .MuiIconButton-root': {
          padding: t.space.xs,
          color: 'inherit',
          '& svg': { width: t.iconSize.md, height: t.iconSize.md },
          '&:hover, &.ds-hover': { backgroundColor: s.inputBackgroundHover },
          '&.Mui-disabled': { color: 'inherit', opacity: 0.5 },
          '&.Mui-focusVisible': { outline: `2px solid ${s.primaryButtonBackground}`, outlineOffset: 0 },
        },
      }
    },
  },
}

export const MuiTableRow: Components<Theme>['MuiTableRow'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const s = theme.tokens.semantic
      return {
        // MUI tints the row itself; the Figma states live on the cells, inside the card borders.
        '&.MuiTableRow-hover:hover, &.Mui-selected, &.Mui-selected:hover': { backgroundColor: 'transparent' },
        '&.MuiTableRow-hover:hover > .MuiTableCell-body, &.ds-hover > .MuiTableCell-body': { backgroundColor: s.inputBackground },
        '&.Mui-selected > .MuiTableCell-body': { backgroundColor: s.rowSelected, borderColor: s.rowSelected },
        '&.Mui-selected.MuiTableRow-hover:hover > .MuiTableCell-body, &.Mui-selected.ds-hover > .MuiTableCell-body': {
          backgroundColor: s.rowSelectedHover,
          borderColor: s.rowSelectedHover,
        },
        // Read-only rows: Text-disabled, and pictures lose their colour (Figma blend: luminosity).
        '&[aria-disabled="true"] > .MuiTableCell-body': {
          color: s.textDisabled,
          '& .ds-cell-secondary': { color: s.textDisabled },
          '& img': { mixBlendMode: 'luminosity' },
        },
        '&[aria-disabled="true"].MuiTableRow-hover:hover > .MuiTableCell-body': { backgroundColor: 'transparent' },
      }
    },
  },
}

export const MuiTableSortLabel: Components<Theme>['MuiTableSortLabel'] = {
  defaultProps: { IconComponent: SortIcon },
  styleOverrides: {
    root: ({ theme }) => {
      const s = theme.tokens.semantic
      return {
        gap: theme.tokens.space.xs,
        color: 'inherit',
        '&:hover, &.Mui-active': { color: s.textPrimary },
        '&.Mui-focusVisible': { outline: `2px solid ${s.primaryButtonBackground}`, outlineOffset: 2, borderRadius: theme.tokens.radius.xs },
      }
    },
    // Figma shows the arrow on every sortable header, not only on hover.
    icon: { margin: 0, opacity: 1, color: 'inherit !important' },
  },
}

export const MuiTablePagination: Components<Theme>['MuiTablePagination'] = {
  defaultProps: {
    component: 'div',
    rowsPerPageOptions: [],
    labelDisplayedRows: ({ from, to, count }) => `${from}-${to} of ${count === -1 ? `more than ${to}` : count}`,
    slots: { actions: { previousButtonIcon: ArrowLeftIcon, nextButtonIcon: ArrowRightIcon } },
  },
  styleOverrides: {
    root: ({ theme }) => ({ overflow: 'visible', color: theme.tokens.semantic.textSecondary, border: 0 }),
    toolbar: ({ theme }) => ({ minHeight: 0, padding: 0, gap: theme.tokens.space.m, justifyContent: 'flex-end', '@media (min-width: 0px)': { minHeight: 0, paddingLeft: 0, paddingRight: 0 } }),
    spacer: { display: 'none' },
    displayedRows: { margin: 0, fontFamily: 'inherit', fontSize: 14, lineHeight: 1.5 },
    actions: ({ theme }) => {
      const s = theme.tokens.semantic
      return {
        marginLeft: 0,
        display: 'flex',
        gap: theme.tokens.space.m,
        '& .MuiIconButton-root': {
          padding: 0,
          color: s.textPrimary,
          borderRadius: theme.tokens.radius.xs,
          '&:hover': { backgroundColor: 'transparent', color: s.textButtonHover },
          '&.Mui-disabled': { color: s.textDisabled },
          '&.Mui-focusVisible': { outline: `2px solid ${s.primaryButtonBackground}`, outlineOffset: 2 },
        },
      }
    },
  },
}
