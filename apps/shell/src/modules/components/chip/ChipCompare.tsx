import { chipFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { ChipMatrix } from './ChipMatrix'

// Figma = the Chips set (dark 5162:28510, light 12160:12109), checked 2026-09-29.
const compare: Compare = {
  page: chipFigma.page,
  set: chipFigma.set,
  frames: { light: '/figma/chip-light.png', dark: '/figma/chip-dark.png' },
  live: (mode) => <ChipMatrix mode={mode} />,
  differences: [
    { property: 'Height', figma: '33 (1px border inside, padding 6/12)', reference: '33', status: 'Matches', note: 'The prototype chip is 35px: it adds the border outside the padding.' },
    { property: 'Padding and gap', figma: '6/12; 10 on the icon side; 4 gap', reference: 'Same', status: 'Matches' },
    { property: 'Corner radius', figma: '24', reference: '24 (radius-l)', status: 'Matches', note: 'The prototype uses radius-full; both render as a pill at this height.' },
    { property: 'Type', figma: 'Paragraph M regular 14/1.5; Selected H5 Bold', reference: 'Same', status: 'Matches' },
    { property: 'Colours', figma: 'Border-elevated, Text-secondary; hover Border-hover and Page-background-hover; selected Secondary-500 and Neutral-800', reference: 'Same tokens', status: 'Matches' },
    {
      property: 'Disabled border, dark',
      figma: 'Border #2D313D (Neutral-700)',
      reference: 'Same',
      status: 'Matches',
      note: 'Bruno, 2026-09-29: Figma is correct. The prototype tokens.css now follows it too.',
    },
    { property: 'Selected hover', figma: 'Not in the set', reference: 'Same as selected', status: 'Design to update', note: 'The prototype darkens to Secondary-600 on hover.' },
    { property: 'Focus', figma: 'No focus frames', reference: '2px ring in the primary button colour, 2px offset', status: 'Design to update' },
    { property: 'Warning chip', figma: 'Not in the set', reference: 'Not built', status: 'Design to update', note: 'The prototype has a warning variant (orange border). Add it to Figma or remove it from the prototype.' },
  ],
  engineering: {
    mui: 'Chip',
    usage: `import Chip from '@mui/material/Chip'

// With the 5Mins theme, plain MUI renders the reference.
<Chip label="Compliance" onClick={toggle} className={selected ? 'Mui-selected' : undefined} aria-pressed={selected} />
<Chip label="Leadership" deleteIcon={<CloseCircle />} onDelete={remove} />`,
    props: [
      { figma: 'Selected', code: 'Mui-selected class + aria-pressed (the Design OS Chip does both with selected)' },
      { figma: 'State: Hover', code: ':hover, on clickable or deletable chips' },
      { figma: 'Icon left', code: 'icon' },
      { figma: 'Icon right', code: 'deleteIcon + onDelete' },
      { figma: 'Disabled', code: 'disabled' },
    ],
    theme: [
      'MuiChip styleOverrides.root, only for color="default"; coloured chips are left to MUI.',
      'MUI disabled opacity (0.38) is reset to 1; the disabled look comes from the tokens.',
      'Focus ring on .Mui-focusVisible: 2px outline, 2px offset.',
    ],
    files: [
      'packages/components/src/Chip/chip.overrides.ts (theme overrides)',
      'packages/components/src/Chip/Chip.tsx (selected wrapper)',
      'packages/components/src/Chip/chip.figma.ts (Figma mapping)',
    ],
  },
}

export function ChipCompare() {
  return <CompareTemplate c={compare} />
}
