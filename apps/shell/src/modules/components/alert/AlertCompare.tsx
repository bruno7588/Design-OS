import { alertFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { AlertMatrix } from './AlertMatrix'

// Figma = the Alert set (dark 3658:32304, light 12060:2785), checked 2026-09-29.
const compare: Compare = {
  page: alertFigma.page,
  set: alertFigma.set,
  frames: { light: '/figma/alert-light.png', dark: '/figma/alert-dark.png' },
  live: (mode) => <AlertMatrix mode={mode} />,
  differences: [
    { property: 'Container', figma: 'Radius 12, padding 8/12, gap 8', reference: 'Same', status: 'Matches' },
    { property: 'Callout fill and text', figma: 'Input-background; Regular 14 Text-secondary', reference: 'Same', status: 'Matches' },
    {
      property: 'Alert fill',
      figma: 'Secondary-500 at 12%, not bound to a variable',
      reference: 'The same value, as a new token: alertBackground',
      status: 'Design to update',
      note: 'Bind it to a variable. alerts-toast.md says Warning-500 at 16% in one place and this value in another.',
    },
    { property: 'Alert text', figma: 'SemiBold 14 Text-warning', reference: 'Same', status: 'Matches', note: 'alerts-toast.md says Medium.' },
    { property: 'Supporting text title', figma: 'SemiBold 14', reference: 'Same', status: 'Matches', note: 'alerts-toast.md says Medium.' },
    { property: 'Gaps', figma: 'Callout 8; Alert illustration 12, icon 8, button 24', reference: 'Same', status: 'Matches' },
    { property: 'Illustrations', figma: 'The pin (Callout) and the bell (Alert)', reference: 'Same, exported from Figma', status: 'Matches', note: 'The prototype draws the bell as an emoji: code to update there.' },
    { property: 'Icons', figma: 'IoInformationCircleOutline; Iconsax Danger Bold', reference: 'Same', status: 'Matches', note: 'The prototype uses its own info icon, 24px in Alerts.' },
    { property: 'Buttons', figma: 'Link at the end of the row; Outlined-2 with an icon under supporting text', reference: 'Same', status: 'Matches' },
    { property: 'Button under supporting text', figma: 'Outlined-2 Medium with its padding overridden to 8px: 37px tall', reference: 'The Library’s Medium Outlined-2: 41px', status: 'Design to update', note: 'Reset the instance, or use a size that is 37px.' },
    { property: 'Alert, Button=false', figma: 'All three Alert variants show the button, including those named Button=false', reference: 'The button only when there is an action', status: 'Design to update' },
    { property: 'Collapsible Callout', figma: 'Icon and supporting text rows show an arrow-up icon next to the title', reference: 'Not built', status: 'Design to update', note: 'It looks like a collapse toggle, but there is no collapsed variant. Confirm whether Callouts collapse.' },
    { property: 'Role', figma: 'Not shown', reference: 'Callout role note, Alert role status', status: 'Matches', note: 'MUI defaults to role alert, which interrupts screen readers on page load.' },
  ],
  engineering: {
    mui: 'Alert (variant="standard")',
    usage: `import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

// With the 5Mins theme, plain MUI renders the boxes. severity info → Callout, warning → Alert.
<Alert severity="info" role="note">You can add your content to a collection.</Alert>
<Alert severity="warning" role="status" action={<Button variant="link">Renew</Button>}>Your licence ends in 7 days</Alert>
<Alert severity="info" role="note"><AlertTitle>Collections</AlertTitle>Learners see them on their home page.</Alert>`,
    props: [
      { figma: 'Type=Callout / Alert', code: 'severity info / warning' },
      { figma: 'Illustration=true', code: 'icon: the pin or bell illustration' },
      { figma: 'Icon=true', code: 'icon: the info outline or Danger Bold' },
      { figma: 'Supporting text=true', code: 'AlertTitle, then the body' },
      { figma: 'Button=true', code: 'action (a link Button), or an Outlined-2 Button in the message' },
    ],
    theme: [
      'MuiAlert styleOverrides.root: inlineAlertStyles for variant standard; filled stays the Toast.',
      'New token: alertBackground (Secondary-500 at 12%).',
    ],
    files: [
      'packages/components/src/Alert/alert.overrides.ts',
      'packages/components/src/Alert/Alert.tsx (icons, illustrations, button layout, roles)',
      'packages/components/src/icons/Illustrations.tsx (pin and bell)',
      'packages/components/src/Alert/alert.figma.ts (Figma mapping)',
    ],
  },
}

export function AlertCompare() {
  return <CompareTemplate c={compare} />
}
