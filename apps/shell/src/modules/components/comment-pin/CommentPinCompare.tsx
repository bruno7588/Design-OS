import { commentPinFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { CommentPinMatrix } from './CommentPinMatrix'

// Code first: no Figma frames yet.
const compare: Compare = {
  page: commentPinFigma.page,
  set: commentPinFigma.set,
  live: (mode) => <CommentPinMatrix mode={mode} />,
  differences: [
    { property: 'Component', figma: 'Not in the Library', reference: 'CommentPin', status: 'Design to update', note: 'Built in code first for Phase 4c (comments on live prototypes). Add a light and a dark set with Status and State.' },
    { property: 'Fills', figma: '–', reference: 'Primary button, Warning button, Success button, Danger-500', status: 'Design to update' },
    { property: 'Shape', figma: '–', reference: '28px, round with a pointed bottom-left corner, 2px Page-background ring, Shadow S', status: 'Design to update' },
  ],
  engineering: {
    mui: 'ButtonBase',
    usage: `<CommentPin author="Bruno" status="pending" aria-label="Comment from Bruno" />`,
    props: [
      { figma: 'Status (to add)', code: 'status: pending | in-progress | done | failed' },
      { figma: 'State=Selected (to add)', code: 'selected' },
    ],
    theme: ['No theme override: styled from the tokens inside the component.'],
    files: ['packages/components/src/CommentPin/CommentPin.tsx', 'packages/components/src/CommentPin/commentPin.figma.ts (no Figma nodes yet)'],
  },
}

export function CommentPinCompare() {
  return <CompareTemplate c={compare} />
}
