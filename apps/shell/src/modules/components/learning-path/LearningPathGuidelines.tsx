import { LearningPathCard, LevelIllustration } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

// Content from the Figma "Learning path" set (not documented in the prototype).
const noop = () => {}
const g: Guidelines = {
  overview: 'The learning path card is one step on a learner’s path through a skill: each level, then the certificate at the end. It shows where they are, what the level covers and what to do next.',
  whenToUse: ['On a skill’s learning path, one card per level and one for the certificate, in order.', 'md, beside other content, when only the level and its progress matter.'],
  whenNotToUse: ['For a single lesson or course. Use the Lesson or Course card.', 'For an earned certificate on its own. Use the Certificate card.'],
  anatomy: {
    example: <LearningPathCard level={3} title="Intermediate" description="Build confidence with everyday tasks" topics={['Negotiation', 'Forecasting']} state="in-progress" progress={{ value: 40, total: 90 }} actionLabel="Keep Learning" onAction={noop} />,
    parts: [
      { name: 'Surface', description: 'Cards-background, radius 12, Shadow S in light. In progress and Completed add a 4px inner edge on the right and bottom.' },
      { name: 'Illustration', description: 'The level shield or certificate medal: 56px, 72px on l. Grey when disabled.' },
      { name: 'Headline', description: 'The title (Bold 16, 20 on l) and a description (Regular 12, 16 on l), 4 apart.' },
      { name: 'Topics', description: 'Pills with a 1px Border and radius 8. On s, the first one and a chevron that shows the rest.' },
      { name: 'Progress', description: 'An 8px Progress bar and the modules done, 8 apart.' },
      { name: 'Action', description: 'A Filled Medium Button: full width on s, beside the title on l.' },
    ],
  },
  variants: [
    { name: 'Level', description: 'A step of the path, with its shield.', example: <LevelIllustration level={3} /> },
    { name: 'Certificate', description: 'The last step. Pending until it starts; completed, it becomes the Certificate card.', example: <LevelIllustration level="master" /> },
  ],
  states: [
    { name: 'In progress', description: 'Primary-500 edge, progress and the Keep Learning button.' },
    { name: 'Completed', description: 'Success-500 edge and a tick.' },
    { name: 'Disabled', description: 'Not unlocked yet: grey illustration, every text in Text-disabled, no button.' },
    { name: 'Pending (certificate)', description: 'Ready to start: Get Started, or on md a Text-warning note and an info icon.' },
  ],
  dos: [
    {
      do: { example: <LevelIllustration level={2} />, text: 'Keep the levels in order and show every one, so the learner sees the whole path.' },
      dont: { example: <LevelIllustration level={2} disabled />, text: 'Hide locked levels. Show them disabled instead.' },
    },
  ],
  content: ['Titles are the level name (“Master”) or the certificate (“Master Certificate”).', 'Button labels are Title Case: “Keep Learning”, “Get Started”.', 'Progress counts modules: “80/120”.'],
  accessibility: [
    'The title is a heading; the tick is named “Completed”.',
    'The progress bar is named “80 of 120 modules”.',
    'The chevron is a button with aria-expanded, named “Show all 5 topics” or “Show fewer topics”.',
    'Disabled cards are not interactive, and their meaning does not rely on the grey alone: they have no button or progress.',
  ],
  figma: [
    { label: 'Learning path, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11984-7015' },
    { label: 'Learning path, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=5514-8463' },
  ],
  spec: 'playground/docs/design-system/gamification.md',
}

export function LearningPathGuidelines() {
  return <GuidelinesTemplate g={g} />
}
