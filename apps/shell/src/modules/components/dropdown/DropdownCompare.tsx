import { dropdownFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { DropdownMatrix } from './DropdownMatrix'

// Figma = the Dropdown set (dark 8925:1408, light 12113:14844), Listbox (9162:1042)
// and List itens (9162:941), checked 2026-09-29.
const compare: Compare = {
  page: dropdownFigma.page,
  set: dropdownFigma.set,
  frames: { light: '/figma/dropdown-light.png', dark: '/figma/dropdown-dark.png' },
  live: (mode) => <DropdownMatrix mode={mode} />,
  differences: [
    { property: 'Field', figma: '37px: padding 8/12, gap 8, radius 12, Border-elevated; 20px ArrowDown2', reference: 'Same', status: 'Matches' },
    { property: 'Label', figma: 'Semibold 14, top (8px) or start (12px)', reference: 'Same', status: 'Matches' },
    { property: 'States', figma: 'Hover Border-hover; Active Selected with the chevron up; Read-only and disabled with Border and Text-disabled', reference: 'Same', status: 'Matches' },
    { property: 'Menu', figma: 'Cards-background, Border-elevated, radius 12, padding 8, Shadow L', reference: 'Same; max 320px tall', status: 'Matches', note: 'The prototype menu uses Border and 240px.' },
    { property: 'Rows', figma: '37px: padding 8/12, radius 8; hover Cards-background-hover', reference: 'Same', status: 'Matches' },
    {
      property: 'Selected row',
      figma: 'Secondary-500, Medium Neutral-800 label (also when hovered)',
      reference: 'Same',
      status: 'Matches',
      note: 'The prototype uses Selected (Secondary-600 in light); the guidelines, listbox.md and dropdown.md disagree with each other.',
    },
    {
      property: 'Error',
      figma: 'State=Error: Text-error border, label and message, Bold Danger icon before the chevron',
      reference: 'Same',
      status: 'Matches',
      note: 'Added to both Figma sets on 2026-09-29 (Bruno). The prototype uses Danger-500 in both modes, leaves the label unchanged and has no icon: code to update there.',
    },
    { property: 'Checkbox rows (multi-select)', figma: 'List itens Checkbox=true: a 16px checkbox, 12px from the label; selected rows keep the Cards-background fill', reference: 'Dropdown multiple: the same rows, the picks listed in the field', status: 'Matches', note: 'The checkbox is a glyph, so each row stays one option in an aria-multiselectable listbox.' },
    { property: 'Radio rows', figma: 'List itens Radio=true: the radio instance is 16×24 on some rows and 20×20 on others', reference: 'Not built', status: 'Design to update', note: 'Make the radio instance the same size on every row. A single-select dropdown already shows its pick with the Secondary-500 row.' },
    { property: 'Rich rows', figma: 'Avatar, skill icon, search, helper and supporting text rows', reference: 'Not built yet', status: 'Code to update', note: 'The inventory lists them as missing in code.' },
    {
      property: 'Accessibility',
      figma: 'Not shown',
      reference: 'Combobox and listbox roles, arrow keys, type-ahead, Escape, linked label',
      status: 'Matches',
      note: 'The prototype has none of these: code to update there.',
    },
  ],
  engineering: {
    mui: 'TextField (select) and Menu',
    usage: `import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

// With the 5Mins theme, plain MUI renders the reference, menu included.
<TextField select label="Department" value={value} onChange={(e) => setValue(e.target.value)}>
  <MenuItem value="people">People</MenuItem>
  <MenuItem value="sales">Sales</MenuItem>
</TextField>`,
    props: [
      { figma: 'Label top / Label start', code: 'label; Design OS labelPlacement="start" (class ds-label-start)' },
      { figma: 'Icon left', code: 'InputProps.startAdornment (Design OS: iconLeft)' },
      { figma: 'Helper text', code: 'helperText' },
      { figma: 'State=Active', code: 'open, from MUI' },
      { figma: 'Disabled, Read-only', code: 'disabled' },
    ],
    theme: [
      'MuiSelect: ArrowDown2 as the icon, room for it in the padding.',
      'MuiMenu paper: the Listbox surface (menuPaperStyles). MuiMenuItem: rows, hover, selected and disabled.',
      'The field itself comes from MuiOutlinedInput, shared with the input field.',
    ],
    files: [
      'packages/components/src/Field/field.overrides.tsx (theme overrides)',
      'packages/components/src/Dropdown/Dropdown.tsx (options, placeholder, icon, label start)',
      'packages/components/src/Dropdown/dropdown.figma.ts (Figma mappings for the field and the rows)',
    ],
  },
}

export function DropdownCompare() {
  return <CompareTemplate c={compare} />
}
