import { checkboxFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { CheckboxMatrix } from './CheckboxMatrix'

// Figma = the Checkbox instances set (dark 6339:10484, light 11917:3924), checked 2026-09-29.
const compare: Compare = {
  page: checkboxFigma.page,
  set: checkboxFigma.set,
  frames: { light: '/figma/checkbox-light.png', dark: '/figma/checkbox-dark.png' },
  live: (mode) => <CheckboxMatrix mode={mode} />,
  differences: [
    { property: 'Size', figma: '32px halo, 8px padding, 16px box', reference: 'Same', status: 'Matches' },
    { property: 'Border', figma: '1px inside, Text-primary', reference: 'Same', status: 'Matches', note: 'selection-controls.md says 1.5px; the prototype draws 1.5px in Text-secondary: code to update there.' },
    {
      property: 'Checked and indeterminate',
      figma: 'Selected fill (Secondary-600 light, Secondary-500 dark) with the tick or bar cut out',
      reference: 'Same glyphs, copied from Figma',
      status: 'Matches',
      note: 'The mark shows what is behind it: white on a light page, dark in dark mode. The prototype draws a white mark on top.',
    },
    { property: 'Hover', figma: 'Page-background-hover halo, radius XXL', reference: 'Same, also when hovering the label', status: 'Matches' },
    { property: 'Disabled', figma: 'Not checked only: Text-disabled border', reference: 'Text-disabled for every value: the border, or the fill of checked and indeterminate', status: 'Design to update', note: 'Add Disabled Checked and Disabled Indeterminate frames, filled with Text-disabled (decided 2026-09-29).' },
    { property: 'Focus', figma: 'Not in the set', reference: '2px ring in the primary button colour round the halo', status: 'Design to update', note: 'The same ring as Button, Chip and Tabs.' },
    { property: 'Label', figma: 'Not in the set (the List itens rows put the box 12px from the text)', reference: 'FormControlLabel: Regular 14px Text-primary, 12px from the box', status: 'Matches' },
    {
      property: 'Semantics',
      figma: 'Not shown',
      reference: 'A native checkbox input, linked to its label; indeterminate reads as mixed (the wrapper sets the native property)',
      status: 'Matches',
      note: 'The prototype Checkbox is a button with role checkbox and no label: code to update there.',
    },
  ],
  engineering: {
    mui: 'Checkbox (with FormControlLabel)',
    usage: `import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

// With the 5Mins theme, plain MUI renders the reference. For indeterminate,
// also set the native property so it's announced as mixed (as the Checkbox wrapper does).
<FormControlLabel control={<Checkbox checked={agreed} onChange={onChange} />} label="I agree to the terms" />
<Checkbox checked={all} indeterminate={some && !all} onChange={toggleAll} inputProps={{ 'aria-label': 'Select all' }} />`,
    props: [
      { figma: 'Checked=Checked', code: 'checked' },
      { figma: 'Checked=Indeterminate', code: 'indeterminate' },
      { figma: 'State=Hover', code: ':hover on the box or its label' },
      { figma: 'Disabled=true', code: 'disabled' },
    ],
    theme: [
      'MuiCheckbox defaultProps: the Figma glyphs as icon, checkedIcon and indeterminateIcon; no ripple.',
      'MuiCheckbox styleOverrides.root: halo, colours and focus ring.',
      'MuiFormControlLabel and MuiFormLabel: the label row and the group label.',
      'No new tokens.',
    ],
    files: [
      'packages/components/src/Selection/selection.overrides.tsx',
      'packages/components/src/Selection/Checkbox.tsx (sets the native indeterminate property)',
      'packages/components/src/icons/FigmaIcons.tsx (Checkbox glyphs)',
      'packages/components/src/Selection/checkbox.figma.ts (Figma mapping)',
    ],
  },
}

export function CheckboxCompare() {
  return <CompareTemplate c={compare} />
}
