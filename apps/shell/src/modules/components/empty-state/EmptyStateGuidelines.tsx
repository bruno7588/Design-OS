import { EmptyState } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const noop = () => {}

// Content from playground/docs/design-system/empty-state.md and the 5mins-copy-review skill.
const g: Guidelines = {
  overview: 'An empty state fills a list, table, tab or search result that has nothing to show yet, and points to the action that fills it.',
  whenToUse: ['When a content area has no items yet.', 'When a search or filter finds nothing.', 'To prompt a first action: upload content, create a course, invite people.'],
  whenNotToUse: ['For errors. Use an alert.', 'While content is loading. Use a skeleton or spinner.', 'For a single missing field. Use helper text.'],
  anatomy: {
    example: <EmptyState illustration="empty-box" title="No courses yet" description="Create a course to start sharing it with your teams." primaryAction={{ label: 'Create Course', onClick: noop }} />,
    parts: [
      { name: 'Illustration', description: '72px, from the Figma Illustrations Empty state set, chosen for the context.' },
      { name: 'Title', description: 'Bold 20px in Text-primary (Bold 16px on mobile).' },
      { name: 'Description', description: 'Regular 14px in Text-secondary, centred, up to 600px wide.' },
      { name: 'Buttons', description: 'Optional: Outlined then Filled, Medium, 16px apart.' },
      { name: 'Frame', description: 'Padding 24, gap 20, radius 20 (mobile: 16 and 16). Dropzone: Input-background, a dashed Border-elevated outline (8px dashes and gaps), padding 32.' },
    ],
  },
  variants: [
    { name: 'Desktop', description: 'The default.', example: <EmptyState illustration="search" title="No results" description="Try a different word, or clear the filters." /> },
    {
      name: 'Dropzone',
      description: 'For an area the admin fills themselves, such as a course’s content or resources: Input-background inside a dashed outline, the full width.',
      example: <EmptyState surface="dropzone" illustration="resources" title="Add resources" primaryAction={{ label: 'Upload Files', onClick: noop }} />,
    },
    { name: 'Mobile', description: 'In the mobile app: tighter spacing, a smaller title.', example: <EmptyState device="mobile" illustration="no-activity" title="No activity yet" /> },
  ],
  states: [{ name: 'Default', description: 'Only the buttons have states.' }],
  dos: [
    {
      do: { example: <EmptyState illustration="resources" title="Add resources" description="Give learners everything in one place." primaryAction={{ label: 'Upload Files', onClick: noop }} />, text: 'Say what to do next, and offer the action.' },
      dont: { example: <EmptyState illustration="resources" title="Oops! Nothing here :(" />, text: 'Apologise or leave people without a next step.' },
    },
  ],
  content: [
    'Title: short and factual: "No courses yet", "Nothing assigned".',
    'Description: the benefit of acting, in one or two lines.',
    'Buttons: verbs, in Title Case: "Upload Files".',
  ],
  accessibility: ['The illustration is decorative (empty alt).', 'The title is a heading at the right level for the page.', 'Keep the table header or page title so people know where they are.'],
  figma: [
    { label: 'Empty state, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11921-5779' },
    { label: 'Empty state, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=5452-37234' },
    { label: 'Illustrations Empty state (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=9120-8372' },
  ],
  spec: 'playground/docs/design-system/empty-state.md',
}

export function EmptyStateGuidelines() {
  return <GuidelinesTemplate g={g} />
}
