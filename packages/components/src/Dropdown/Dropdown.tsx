import { forwardRef, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import ListSubheader from '@mui/material/ListSubheader'
import MenuItem from '@mui/material/MenuItem'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import { Danger } from 'iconsax-react'
import { CheckboxCheckedIcon, CheckboxIcon } from '../icons/FigmaIcons'

// 5Mins Dropdown. MUI TextField with select: the field, chevron and menu are all
// styled in the theme (field.overrides.tsx), so <TextField select> looks the same.
// MUI gives it the combobox and listbox roles, arrow keys, type-ahead and Escape.
// The wrapper adds options, a placeholder, the leading icon and the label beside it.
//
// Figma → props
//   Label top / Label start → label + labelPlacement "top" / "start"
//   Icon left=true          → iconLeft
//   Helper text=true        → helperText
//   State=Active            → open
//   Disabled / Read-only    → disabled
//   State=Error             → error + helperText: as the input field, with the Bold Danger icon
//   Listbox Wrapping menu itens=true → options[].group: a title per group, a divider between
//   Listbox Caret=true, Position     → caret, menuPosition "bottom" | "top"
//   List itens Checkbox=true → multiple: the rows show a checkbox, the field lists the picks.
//                              The listbox is aria-multiselectable; the checkbox is only a glyph,
//                              so each row stays one option.

export interface DropdownOption {
  value: string
  label: string
  disabled?: boolean
  /** Groups the options under a title (Figma Listbox Wrapping menu itens=true). */
  group?: string
}

type Single = { multiple?: false; value: string; onChange: (value: string) => void }
type Multiple = { multiple: true; value: string[]; onChange: (value: string[]) => void }

/** Everything but value, onChange and multiple. */
export type DropdownBaseProps = Omit<TextFieldProps, 'select' | 'variant' | 'onChange' | 'value' | 'children'> & {
  options: DropdownOption[]
  labelPlacement?: 'top' | 'start'
  iconLeft?: ReactNode
  /** The Listbox caret, pointing at the field. */
  caret?: boolean
  /** Where the menu opens: below the field (default) or above it. */
  menuPosition?: 'bottom' | 'top'
}

export type DropdownProps = DropdownBaseProps & (Single | Multiple)

// A group title inside the Select. MUI Select clones every child as an option (role, onClick,
// aria-selected); this ignores those props, so the title can't be picked and isn't announced as
// an option. muiSkipListHighlight keeps the menu's keyboard focus on the real options.
function GroupTitle({ title, divided }: { title: string; divided: boolean }) {
  return (
    <ListSubheader role="presentation" className={divided ? 'ds-group-divided' : undefined}>
      {title}
    </ListSubheader>
  )
}
GroupTitle.muiSkipListHighlight = true

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
  { options, value, onChange, multiple, placeholder = 'Select', labelPlacement = 'top', iconLeft, caret = false, menuPosition = 'bottom', error, className, SelectProps, InputProps, ...props },
  ref,
) {
  const labelOf = (v: string) => options.find((o) => o.value === v)?.label
  const picked = (v: unknown) => (multiple ? (v as string[]).map(labelOf).join(', ') : labelOf(v as string))
  const isEmpty = multiple ? value.length === 0 : !value
  return (
    <TextField
      ref={ref}
      select
      value={value}
      onChange={(e) => (onChange as (v: unknown) => void)(e.target.value)}
      error={error}
      className={[labelPlacement === 'start' && 'ds-label-start', className].filter(Boolean).join(' ') || undefined}
      SelectProps={{
        displayEmpty: true,
        multiple,
        renderValue: (v) =>
          !isEmpty ? picked(v) : <Box component="span" sx={{ color: 'text.disabled' }}>{placeholder}</Box>,
        MenuProps: {
          ...(menuPosition === 'top' && {
            anchorOrigin: { vertical: 'top', horizontal: 'left' },
            transformOrigin: { vertical: 'bottom', horizontal: 'left' },
          }),
          ...(caret && { PaperProps: { className: `ds-menu-caret-${menuPosition}` } }),
          ...SelectProps?.MenuProps,
        },
        ...(SelectProps && (({ MenuProps: _m, ...rest }) => rest)(SelectProps)),
      }}
      InputProps={{
        startAdornment: iconLeft ? <InputAdornment position="start">{iconLeft}</InputAdornment> : undefined,
        endAdornment: error ? (
          <InputAdornment position="end">
            <Danger variant="Bold" color="currentColor" className="ds-validation-icon ds-error" aria-hidden />
          </InputAdornment>
        ) : undefined,
        ...InputProps,
      }}
      {...props}
    >
      {options.flatMap((o, i) => [
        ...(o.group && o.group !== options[i - 1]?.group
          ? [
              <GroupTitle key={`group-${o.group}`} title={o.group} divided={i > 0} />,
            ]
          : []),
        <MenuItem key={o.value} value={o.value} disabled={o.disabled}>
          {multiple &&
            (value.includes(o.value) ? (
              <CheckboxCheckedIcon className="ds-row-check" />
            ) : (
              <CheckboxIcon className="ds-row-check" />
            ))}
          {o.label}
        </MenuItem>,
      ])}
    </TextField>
  )
})
