import { badgeFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { BadgeMatrix } from './BadgeMatrix'

// Figma = the Badge set (dark 5799:479, light 12186:1609), checked 2026-09-29.
const compare: Compare = {
  page: badgeFigma.page,
  set: badgeFigma.set,
  frames: { light: '/figma/badge-light.png', dark: '/figma/badge-dark.png' },
  live: (mode) => <BadgeMatrix mode={mode} />,
  differences: [
    { property: 'Size', figma: '29px tall: padding 6/12, 14px Medium at 1.2', reference: 'Same', status: 'Matches' },
    { property: 'Radius', figma: 'XXL (40px): fully rounded', reference: 'radius-full', status: 'Matches', note: 'Both render as a pill at this height.' },
    { property: 'Gap', figma: '4px; 8px with the remove icon', reference: 'Same', status: 'Matches' },
    {
      property: 'Colours',
      figma: 'Text-success, -warning, -error, -progress, Text-secondary; 16% fills; Input-background; New Danger-400',
      reference: 'Same tokens (Text-progress and the four fills added)',
      status: 'Matches',
      note: 'design-system-guidelines.md still lists Success-100 style fills and old text values.',
    },
    { property: 'Icons', figma: 'Iconsax tick circle, info circle, task square, danger; Ionicons info and close', reference: 'Same', status: 'Matches', note: 'The prototype uses Iconsax InfoCircle for Informative.' },
    { property: 'In progress with icon', figma: '28px tall: its label has line-height 1', reference: '29px, like the others', status: 'Design to update' },
    { property: 'Warning icon', figma: 'Info circle, the same shape as Informative', reference: 'Same', status: 'Design to update', note: 'Warning and Informative differ by colour alone. A warning triangle would be clearer.' },
    { property: 'Quiz and Scheduled', figma: 'Not in the set', reference: 'Not built', status: 'Design to update', note: 'The prototype has both types. Add them to Figma or remove them from the prototype.' },
    { property: 'Live region', figma: 'Not shown', reference: 'No role="status"', status: 'Matches', note: 'The prototype puts role="status" on every badge: code to update there.' },
  ],
  engineering: {
    mui: 'Chip (variant="badge")',
    usage: `import Chip from '@mui/material/Chip'

// With the 5Mins theme, plain MUI renders the reference.
<Chip variant="badge" color="success" label="Completed" icon={<TickCircle />} />
<Chip variant="badge" color="progress" label="In progress" />
<Chip variant="badge" label="Leadership" onDelete={remove} deleteIcon={<CloseIcon />} />`,
    props: [
      { figma: 'Type', code: 'color: success, warning, error, progress (In progress), default (Informative), new' },
      { figma: 'Icon left', code: 'icon' },
      { figma: 'Icon right', code: 'onDelete + deleteIcon (replaces the icon)' },
    ],
    theme: [
      'A badge variant on MuiChip and two palette colours, progress and new (module augmentation).',
      'MuiChip styleOverrides.root returns badgeStyles when variant is badge.',
      'Tokens: Text-progress and four 16% badge fills in tokens.ts.',
    ],
    files: [
      'packages/components/src/Chip/chip.overrides.ts (badgeStyles)',
      'packages/components/src/Badge/Badge.tsx (type and icons)',
      'packages/components/src/Badge/badge.figma.ts (Figma mapping)',
    ],
  },
}

export function BadgeCompare() {
  return <CompareTemplate c={compare} />
}
