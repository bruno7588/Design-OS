import { emptyStateFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { EmptyStateMatrix } from './EmptyStateMatrix'

// Figma = the Empty state set (dark 5452:37234, light 11921:5779), checked 2026-09-29.
const compare: Compare = {
  page: emptyStateFigma.page,
  set: emptyStateFigma.set,
  frames: { light: '/figma/empty-state-light.png', dark: '/figma/empty-state-dark.png' },
  live: (mode) => <EmptyStateMatrix mode={mode} />,
  differences: [
    { property: 'Desktop', figma: 'Padding 24, gap 20, radius 20; title Bold 20; description up to 600px', reference: 'Same', status: 'Matches' },
    { property: 'Mobile', figma: '375px; padding 16, gap 16; title Bold 16', reference: 'Same; fills its parent', status: 'Matches' },
    { property: 'Info', figma: 'Title and description 8px apart, centred', reference: 'Same', status: 'Matches' },
    { property: 'Buttons', figma: 'Outlined and Filled Medium, 16px apart', reference: 'Same', status: 'Matches' },
    { property: 'Illustration', figma: 'The null placeholder (a #5E6780 square) in the set', reference: 'A real illustration from the set; four exported', status: 'Matches', note: 'The other 30 illustrations can be exported when a page needs them.' },
    { property: 'Dropzone surface', figma: 'Surface=Dropzone (added 2026-09-29): Input-background, dashed Border-elevated 8/8 inside, radius 20, desktop padding 32', reference: 'Same (surface="dropzone"; the outline is an SVG so the dashes can be set)', status: 'Matches', note: 'From the prototype’s course builder. It fills the width of its area in code; Figma hugs.' },
  ],
  engineering: {
    mui: 'Typography + Button (no MUI equivalent)',
    usage: `import { EmptyState } from '@design-os/components'

<EmptyState illustration="empty-box" title="No courses yet" primaryAction={{ label: 'Create course', onClick: create }} />`,
    props: [
      { figma: 'Device', code: 'device (desktop, mobile)' },
      { figma: 'Surface', code: 'surface (plain, dropzone)' },
      { figma: 'Illustrations Empty state', code: 'illustration (a name, or any node)' },
      { figma: 'CTA', code: 'secondaryAction (Outlined), primaryAction (Filled)' },
    ],
    theme: ['No theme overrides: tokens only.'],
    files: ['packages/components/src/EmptyState/EmptyState.tsx', 'packages/components/src/EmptyState/illustrations/*.svg'],
  },
}

export function EmptyStateCompare() {
  return <CompareTemplate c={compare} />
}
