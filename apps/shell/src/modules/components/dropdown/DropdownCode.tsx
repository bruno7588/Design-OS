import { Stack, Typography } from '@mui/material'
import dropdownSource from '@design-os/components/src/Dropdown/Dropdown.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { Dropdown } from '@design-os/components'

<Dropdown
  label="Department"
  placeholder="Select a department"
  options={[{ value: 'people', label: 'People' }, { value: 'sales', label: 'Sales' }]}
  value={department}
  onChange={setDepartment}
  fullWidth
/>

// Label beside the field, with a leading icon, as a sort control
<Dropdown label="Sort by" labelPlacement="start" iconLeft={<Sort />} options={sorts} value={sort} onChange={setSort} />

// Plain MUI renders the same field and menu
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

<TextField select label="Department" value={department} onChange={(e) => setDepartment(e.target.value)}>
  <MenuItem value="people">People</MenuItem>
</TextField>`

export function DropdownCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 TextField with select: the field, the chevron and the menu are styled in the shared field
        overrides (see the Input field page), and every MUI Menu gets the Listbox look. The wrapper adds options, the
        placeholder, the leading icon and the label beside the field. The file below is read from the source.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="Dropdown.tsx" caption="packages/components/src/Dropdown" code={dropdownSource} />
    </Stack>
  )
}
