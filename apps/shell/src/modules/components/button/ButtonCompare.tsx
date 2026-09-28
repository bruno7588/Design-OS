import { buttonFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { ButtonMatrix } from './ButtonMatrix'

// Figma = the Buttons set on the dark board (10825:3269), checked 2026-09-28.
// Background and prototype mismatches: docs/phase-1a-button-notes.md.
const compare: Compare = {
  page: buttonFigma.page,
  set: buttonFigma.set,
  frames: { light: '/figma/button-light.png', dark: '/figma/button-dark.png' },
  live: (mode) => <ButtonMatrix mode={mode} />,
  differences: [
    { property: 'Height', figma: 'Small 33, Medium 41, Large 48', reference: 'Small 33, Medium 41, Large 48', status: 'Matches' },
    { property: 'Corner radius', figma: '12 (radius-sm)', reference: '12 (radius-sm)', status: 'Matches' },
    {
      property: 'Padding and gap',
      figma: '8/16, 10/20, 12/24; 4 or 8 gap; icon side 12, 16, 20',
      reference: 'Same, 1px less on bordered configurations',
      status: 'Matches',
    },
    {
      property: 'Colours, light and dark',
      figma: 'Button variables in both modes',
      reference: 'Same tokens',
      status: 'Matches',
      note: 'Dark Primary-button-background-pressed is #00AFC4 in Figma. The prototype still has Primary-700.',
    },
    { property: 'AI', figma: 'Radial gradient, gradient ring on AI-Outlined', reference: 'Same', status: 'Matches' },
    {
      property: 'Link',
      figma: 'Dark board: Medium 500, primary button colours. Light board: Bold, skip-ink none',
      reference: 'Medium 500, primary button colours',
      status: 'Design to update',
      note: 'The light board is a separate copy of the set and still has the old Link.',
    },
    {
      property: 'Loading',
      figma: 'With icon: label stays, spinner in the icon slot. Without: shrinks to the spinner',
      reference: 'Label hidden, width kept, spinner centred',
      status: 'Design to update',
      note: 'Bruno decided on 2026-09-28: always hide the label and keep the width.',
    },
    {
      property: 'Focus',
      figma: 'No focus frames in the set',
      reference: '2px ring in the primary button colour, 2px offset',
      status: 'Design to update',
    },
    {
      property: 'Missing combinations',
      figma:
        'No Small for Danger-outlined, Danger-text, Warning, Warning-text, Success, Success-outlined, Success-text. No Medium for Warning-text, Success-text. Medium Danger-, Warning- and Success-outlined and Small Warning-outlined only with an icon',
      reference: 'Every configuration in every size, with or without an icon',
      status: 'Design to update',
      note: 'Same 13 gaps on both boards.',
    },
  ],
  engineering: {
    mui: 'Button',
    usage: `import Button from '@mui/material/Button'

// With the 5Mins theme, plain MUI renders the reference.
<Button variant="outlined" color="error" size="small" startIcon={<Add />} disableRipple disableElevation>
  Delete
</Button>`,
    props: [
      { figma: 'Configuration', code: 'variant (contained, outlined, outlined2, text, link) + color (primary, error, warning, success, ai)' },
      { figma: 'Size', code: 'size (small, medium, large)' },
      { figma: 'Icon', code: 'startIcon' },
      { figma: 'Disabled', code: 'disabled' },
      { figma: 'State: Loading', code: 'loading on the Design OS wrapper (disabled, aria-busy, spinner). Plain MUI 5 has no loading prop' },
      { figma: 'State: Hover, Pressed', code: ':hover and :active, from the theme' },
    ],
    theme: [
      'Custom variants outlined2 and link, and a custom ai colour (module augmentation).',
      'defaultProps: variant contained, color primary, size medium, disableRipple, disableElevation.',
      'All visuals live in MuiButton styleOverrides.root, keyed on ownerState (variant, color, size).',
      'Focus ring on .Mui-focusVisible: 2px outline, 2px offset.',
    ],
    files: [
      'packages/components/src/Button/button.overrides.ts (theme overrides)',
      'packages/components/src/Button/Button.tsx (icon and loading wrapper)',
      'packages/components/src/Button/button.figma.ts (Figma mapping)',
      'packages/components/src/theme/tokens.ts (tokens)',
    ],
  },
}

export function ButtonCompare() {
  return <CompareTemplate c={compare} />
}
