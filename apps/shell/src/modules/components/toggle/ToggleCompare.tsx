import { toggleFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { ToggleMatrix } from './ToggleMatrix'

// Figma = the Toggle set (dark 8160:364, light 11917:3970), checked 2026-09-29.
const compare: Compare = {
  page: toggleFigma.page,
  set: toggleFigma.set,
  frames: { light: '/figma/toggle-light.png', dark: '/figma/toggle-dark.png' },
  live: (mode) => <ToggleMatrix mode={mode} />,
  differences: [
    { property: 'Size', figma: '36×20 track, 16px thumb, 2px inset', reference: 'Same', status: 'Matches' },
    { property: 'On', figma: 'Selected track (Secondary-600 light, Secondary-500 dark)', reference: 'Same', status: 'Matches' },
    {
      property: 'Off, light mode',
      figma: 'Bound to Text-disabled, but drawn #656B7C (the dark value)',
      reference: 'Text-disabled: Neutral-300 #9EA4B3',
      status: 'Design to update',
      note: 'The light frame sets Surface colours to Light mode but not Text colours, so the track resolves in dark mode. Set Text colours to Light mode on the frame. The prototype uses Neutral-400 in both modes.',
    },
    { property: 'Off, dark mode', figma: 'Text-disabled: Neutral-400', reference: 'Same', status: 'Matches' },
    { property: 'Thumb', figma: 'Neutral-25, no shadow', reference: 'Same', status: 'Matches', note: 'The prototype adds a 0 1px 2px shadow: code to update there.' },
    { property: 'Hover', figma: 'None', reference: 'None', status: 'Matches' },
    { property: 'Disabled', figma: 'Not in the set', reference: 'The track at 40%, the label in Text-disabled', status: 'Design to update', note: 'Follows the prototype.' },
    { property: 'Focus', figma: 'Not in the set', reference: '2px ring in the primary button colour, 2px outside the track', status: 'Design to update' },
    { property: 'Small size', figma: 'Not in the set', reference: 'Not built', status: 'Design to update', note: 'The prototype has a 28×16 size. Add it to Figma or remove it from the prototype.' },
    { property: 'Semantics', figma: 'Not shown', reference: 'A checkbox input with role switch, linked to its label', status: 'Matches', note: 'MUI 5 Switch has no switch role: the Toggle wrapper adds it. The prototype Toggle has it too.' },
  ],
  engineering: {
    mui: 'Switch (with FormControlLabel)',
    usage: `import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

// With the 5Mins theme, plain MUI Switch renders the Figma Toggle.
// MUI 5 doesn't add the switch role: pass it (the Toggle wrapper does).
<FormControlLabel
  control={<Switch checked={on} onChange={(e) => setOn(e.target.checked)} inputProps={{ role: 'switch' }} />}
  label="Email notifications"
/>`,
    props: [
      { figma: 'Toggle=true', code: 'checked' },
      { figma: 'Toggle=false', code: 'checked={false}' },
    ],
    theme: ['MuiSwitch styleOverrides.root: track, thumb, colours, disabled and focus ring; no ripple.', 'No new tokens.'],
    files: ['packages/components/src/Selection/selection.overrides.tsx', 'packages/components/src/Selection/Toggle.tsx (adds role switch)', 'packages/components/src/Selection/toggle.figma.ts (Figma mapping)'],
  },
}

export function ToggleCompare() {
  return <CompareTemplate c={compare} />
}
