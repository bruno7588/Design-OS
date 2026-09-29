import { tooltipFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { TooltipMatrix } from './TooltipMatrix'

// Figma = the Tooltip set (dark 2683:29027, light 11927:8087), checked 2026-09-29.
const compare: Compare = {
  page: tooltipFigma.page,
  set: tooltipFigma.set,
  frames: { light: '/figma/tooltip-light.png', dark: '/figma/tooltip-dark.png' },
  live: (mode) => <TooltipMatrix mode={mode} />,
  differences: [
    { property: 'Bubble', figma: 'Padding 8/12, radius 12, Paragraph M 14/1.5 in Neutral-25, Shadow L', reference: 'Same', status: 'Matches' },
    {
      property: 'Background',
      figma: 'Tooltip-background: Neutral-800 light, Neutral-900 dark',
      reference: 'Same token',
      status: 'Matches',
      note: 'alerts-toast.md says #20222A in both modes; the token is #0F1014 in dark.',
    },
    { property: 'Caret', figma: '12×6, 16px inset for start and end', reference: 'Same', status: 'Matches' },
    { property: 'Max width', figma: '288 (set description)', reference: '288, then wraps', status: 'Matches' },
    { property: 'Gap to the trigger', figma: '4px; 8px for Right with icon', reference: '4px everywhere', status: 'Design to update', note: 'Right is the only variant with 8px.' },
    { property: 'Info icon', figma: 'Ionicons info outline, 20px', reference: 'Same', status: 'Matches', note: 'The prototype uses its own InfoIcon.' },
    {
      property: 'Accessibility',
      figma: 'Not shown',
      reference: 'aria-describedby, Escape, focus opens it, flips at the edge',
      status: 'Matches',
      note: 'The prototype has no aria-describedby and no flip: code to update there.',
    },
    { property: 'Hand-rolled tooltips', figma: '–', reference: '–', status: 'Code to update', note: '17 prototype CSS files style their own tooltips (Roles, User fields, Calendar, content tables).' },
  ],
  engineering: {
    mui: 'Tooltip',
    usage: `import Tooltip from '@mui/material/Tooltip'

// With the 5Mins theme, plain MUI renders the reference, caret included.
<Tooltip title="Duplicate" placement="top">
  <IconButton aria-label="Duplicate"><Copy /></IconButton>
</Tooltip>`,
    props: [
      { figma: 'Position + Alignment', code: 'placement: top, top-start, top-end, bottom, bottom-start, bottom-end, left, right' },
      { figma: 'Icon', code: 'InfoTooltip, or any focusable child of Tooltip' },
    ],
    theme: [
      'defaultProps: arrow, placement top, and popper modifiers for the 4px gap and the 16px caret inset.',
      'styleOverrides: tooltip (bubble), arrow (the caret colour), popper (a 12×6 caret per side, drawn with clip-path).',
      'Pass extra popper settings through slotProps.popper; PopperProps replaces the theme defaults.',
    ],
    files: [
      'packages/components/src/Tooltip/tooltip.overrides.ts (theme overrides)',
      'packages/components/src/Tooltip/InfoTooltip.tsx (the info trigger)',
      'packages/components/src/Tooltip/tooltip.figma.ts (Figma mapping)',
    ],
  },
}

export function TooltipCompare() {
  return <CompareTemplate c={compare} />
}
