import { progressBarFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { ProgressBarMatrix } from './ProgressBarMatrix'

// Figma = the Progress bar set (dark 7046:25097, light 12000:10067), checked 2026-09-29.
const compare: Compare = {
  page: progressBarFigma.page,
  set: progressBarFigma.set,
  frames: { light: '/figma/progress-bar-light.png', dark: '/figma/progress-bar-dark.png' },
  live: (mode) => <ProgressBarMatrix mode={mode} />,
  differences: [
    { property: 'Track', figma: '8px, radius 20, Border', reference: 'Same', status: 'Matches' },
    { property: 'Fill', figma: 'Primary-600 with a rounded end', reference: 'Same', status: 'Matches' },
    { property: 'Complete', figma: 'Success-500 across the bar', reference: 'Same, at 100%', status: 'Matches' },
    {
      property: 'Steps',
      figma: 'Nine variants in eighths (0, 12, 25… 87, 100%), built from eight 50px segments',
      reference: 'Any value from 0 to 100',
      status: 'Matches',
      note: 'The segments are how Figma draws the fill; they have no gaps, so the exact value reads the same.',
    },
    { property: 'Table cell', figma: '72px bar, the percentage 8px after it, row 56px', reference: 'Same (width 72, showLabel)', status: 'Matches' },
    { property: 'Semantics', figma: 'Not shown', reference: 'progressbar with its value, named by its context', status: 'Matches' },
  ],
  engineering: {
    mui: 'LinearProgress (determinate)',
    usage: `import LinearProgress from '@mui/material/LinearProgress'

// With the 5Mins theme, plain MUI renders the Figma bar.
<LinearProgress variant="determinate" value={62} aria-label="Course progress" />`,
    props: [{ figma: 'Progress', code: 'value (0 to 100)' }],
    theme: ['MuiLinearProgress: track, fill, and Success-500 at 100%.', 'No new tokens.'],
    files: ['packages/components/src/ProgressBar/progressBar.overrides.ts', 'packages/components/src/ProgressBar/ProgressBar.tsx'],
  },
}

export function ProgressBarCompare() {
  return <CompareTemplate c={compare} />
}
