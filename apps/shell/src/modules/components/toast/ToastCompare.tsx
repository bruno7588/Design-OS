import { toastFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { ToastMatrix } from './ToastMatrix'

// Figma = the Toast set (5045:14119, one copy), checked 2026-09-29.
const compare: Compare = {
  page: toastFigma.page,
  set: toastFigma.set,
  frames: { light: '/figma/toast-light.png', dark: '/figma/toast-dark.png' },
  live: (mode) => <ToastMatrix mode={mode} />,
  differences: [
    { property: 'Size', figma: '48px tall: padding 12/16, gap 8, 24px icon, H4 16/700', reference: 'Same', status: 'Matches' },
    { property: 'Radius and shadow', figma: '12, Shadow L', reference: 'Same', status: 'Matches' },
    { property: 'Fills', figma: 'Success-500, Warning-600, Danger-500', reference: 'Same', status: 'Matches' },
    {
      property: 'Information fill',
      figma: 'Neutral-700 in both modes (was the mode-aware Border variable, rebound 2026-09-29)',
      reference: 'Neutral-700 #2D313D in both modes',
      status: 'Matches',
      note: 'The prototype uses Neutral-600.',
    },
    { property: 'Modes', figma: 'The set on the dark board; instances on a Light mode board (12279:19181), added 2026-09-29', reference: 'Same colours in both modes', status: 'Matches' },
    { property: 'Sample text', figma: '"Warning message!", "Error message!"', reference: 'Same in the matrix', status: 'Design to update', note: 'No exclamation marks in warnings or errors (copy rules).' },
    { property: 'Undo action', figma: 'Not in the set', reference: 'Optional underlined action', status: 'Design to update', note: 'The prototype uses Undo after deleting content.' },
    { property: 'Long messages', figma: 'One line', reference: 'Wraps at 560px', status: 'Matches', note: 'The prototype never wraps, so long messages run off narrow screens: code to update there.' },
    { property: 'Timer and roles', figma: 'Not shown', reference: '5s, paused on hover and focus; status or alert', status: 'Matches', note: 'The prototype does not pause, and mounts a separate stack on each of 26 pages.' },
  ],
  engineering: {
    mui: 'Alert (variant="filled")',
    usage: `import Alert from '@mui/material/Alert'

// With the 5Mins theme, a plain filled Alert is the toast body.
<Alert variant="filled" severity="success">Course published</Alert>
<Alert variant="filled" severity="info" icon={false}>Report is being prepared</Alert>

// Placement and timing: use Snackbar, or the ToastProvider in Design OS.`,
    props: [
      { figma: 'Type', code: 'severity: info, success, warning, error' },
      { figma: 'Icon', code: 'icon={false} hides it; the icons come from iconMapping in the theme' },
    ],
    theme: [
      'MuiAlert styleOverrides.root styles only variant="filled"; standard and outlined are left for the inline Alert.',
      'defaultProps.iconMapping: Iconsax TickCircle and Danger, and the Ionicons info outline from Figma.',
      'Fills come from the palette directly, so they do not change with the mode.',
    ],
    files: [
      'packages/components/src/Toast/toast.overrides.tsx (theme overrides)',
      'packages/components/src/Toast/Toast.tsx (ToastProvider, useToast, ToastBody)',
      'packages/components/src/Toast/toast.figma.ts (Figma mapping)',
    ],
  },
}

export function ToastCompare() {
  return <CompareTemplate c={compare} />
}
