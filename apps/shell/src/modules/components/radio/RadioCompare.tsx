import { radioFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { RadioMatrix } from './RadioMatrix'

// Figma = the radio-button instances set (dark 5001:18926, light 11917:3950), checked 2026-09-29.
const compare: Compare = {
  page: radioFigma.page,
  set: radioFigma.set,
  frames: { light: '/figma/radio-light.png', dark: '/figma/radio-dark.png' },
  live: (mode) => <RadioMatrix mode={mode} />,
  differences: [
    { property: 'Size', figma: '24px halo, 15px ring, 7.5px dot', reference: 'Same', status: 'Matches' },
    { property: 'Ring', figma: '1.07px stroke, centred; Text-primary', reference: 'Same', status: 'Matches', note: 'selection-controls.md and the prototype use 1.5px: code to update there.' },
    { property: 'Selected', figma: 'Selected ring and dot', reference: 'Same', status: 'Matches' },
    {
      property: 'Hover',
      figma: 'Page-background-hover halo; the ring keeps its colour',
      reference: 'Same, also when hovering the label',
      status: 'Matches',
      note: 'The prototype also turns the unselected ring Border-hover: code to update there.',
    },
    { property: 'Hover frame', figma: 'Not selected, Hover has 3px padding; the others have none', reference: 'n/a', status: 'Design to update', note: 'It renders the same, but the frames differ. Tidy the auto layout.' },
    { property: 'Disabled', figma: 'Text-disabled ring and dot', reference: 'Same', status: 'Matches' },
    { property: 'Focus', figma: 'Not in the set', reference: '2px ring in the primary button colour round the halo', status: 'Design to update', note: 'The prototype uses a Selected ring 2px outside the ring.' },
    {
      property: 'Group',
      figma: 'Not shown',
      reference: 'RadioGroup (role radiogroup) in a fieldset with a legend; arrow keys move and pick',
      status: 'Matches',
      note: 'The prototype leaves grouping to each screen.',
    },
  ],
  engineering: {
    mui: 'Radio (in RadioGroup, with FormControlLabel)',
    usage: `import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

// With the 5Mins theme, plain MUI renders the reference.
<RadioGroup name="enrolment" value={mode} onChange={(e) => setMode(e.target.value)}>
  <FormControlLabel value="auto" control={<Radio />} label="Automatic" />
  <FormControlLabel value="manual" control={<Radio />} label="Manual review" />
</RadioGroup>`,
    props: [
      { figma: 'Selected=true', code: 'checked (or the RadioGroup value)' },
      { figma: 'State=Hover', code: ':hover on the ring or its label' },
      { figma: 'Disabled=true', code: 'disabled' },
    ],
    theme: [
      'MuiRadio defaultProps: the Figma ring and dot as icon and checkedIcon; no ripple.',
      'MuiRadio styleOverrides.root: halo, colours and focus ring (shared with the checkbox).',
      'MuiFormControlLabel and MuiFormLabel: the label row and the group label.',
    ],
    files: [
      'packages/components/src/Selection/selection.overrides.tsx',
      'packages/components/src/icons/FigmaIcons.tsx (Radio glyphs)',
      'packages/components/src/Selection/radio.figma.ts (Figma mapping)',
    ],
  },
}

export function RadioCompare() {
  return <CompareTemplate c={compare} />
}
