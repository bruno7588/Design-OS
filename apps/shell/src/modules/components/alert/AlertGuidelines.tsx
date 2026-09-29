import { Alert, Badge } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const noop = () => {}

// Content from playground/docs/design-system/alerts-toast.md and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'Alerts and Callouts are messages that sit in the page, above or beside the content they are about. A Callout guides: a tip, some context, a feature to try. An Alert warns: something needs attention, such as a licence that is about to end.',
  whenToUse: [
    'Callout: to explain a page or a feature, or point to something useful.',
    'Alert: for a warning that stays true until someone acts, such as expiring content or a missing setting.',
  ],
  whenNotToUse: [
    'To confirm an action that just happened. Use a toast.',
    'For a decision that must be made now. Use a dialog.',
    'For the status of one item in a list. Use a badge.',
    'For errors in a form field. Use the field’s error state.',
  ],
  anatomy: {
    example: <Alert action={{ label: 'Learn more', onClick: noop }}>You can add your content and 5Mins content to a collection.</Alert>,
    parts: [
      { name: 'Container', description: 'Fills the width. Radius 12, padding 8px by 12px. Callout: Input-background. Alert: Secondary-500 at 12%.' },
      { name: 'Illustration or icon', description: '20px. Callout: the pin, or the info outline icon. Alert: the bell, or Danger Bold. One or the other, never both.' },
      { name: 'Text', description: 'Callout: Regular 14px in Text-secondary. Alert: SemiBold 14px in Text-warning.' },
      { name: 'Supporting text', description: 'Callout only: a SemiBold title, then the body 8px below.' },
      { name: 'Button', description: 'A link at the end of the row (Text-primary, or Text-warning in an Alert). Under supporting text: an Outlined-2 button, 16px below.' },
    ],
  },
  variants: [
    { name: 'Callout', description: 'Guidance and context.', example: <Alert>You can add your content and 5Mins content to a collection.</Alert> },
    {
      name: 'Callout with supporting text',
      description: 'When the message needs a title and a few lines.',
      example: <Alert icon title="Collections are shared with your teams">Learners see them on their home page, in the order you set.</Alert>,
    },
    { name: 'Alert', description: 'A warning that needs attention.', example: <Alert type="alert" action={{ label: 'Renew', onClick: noop }}>Your licence ends in 7 days</Alert> },
  ],
  states: [
    { name: 'Default', description: 'Alerts and Callouts have no hover or pressed state. Only their button does.' },
    { name: 'Dismissible', description: 'Optional: onClose adds a close button at the end of the row. Keep important warnings until they’re resolved.' },
  ],
  dos: [
    {
      do: { example: <Alert type="alert" action={{ label: 'Renew', onClick: noop }}>Your licence ends in 7 days</Alert>, text: 'Say what is wrong and offer the next step.' },
      dont: { example: <Alert type="alert">Warning!</Alert>, text: 'Warn without saying what about.' },
    },
    {
      do: { example: <Badge type="warning" label="Due in 3 days" icon />, text: 'Use a badge for the status of one item.' },
      dont: { example: <Alert type="alert">Due in 3 days</Alert>, text: 'Put an Alert on every row.' },
    },
    {
      do: { example: <Alert icon>You can reorder lessons by dragging them.</Alert>, text: 'Pick the illustration or the icon.' },
      dont: { example: <Alert icon title="Tip">Tips, tricks, notes and more notes, all in one box with a button.</Alert>, text: 'Add supporting text to a message that fits on one line.' },
    },
  ],
  content: [
    'Sentence case, no exclamation marks.',
    'Alert text is the warning itself: "Your licence ends in 7 days", not "Warning".',
    'Button labels are one or two words: "Renew", "Learn more".',
    'Supporting text: a short title, then a sentence or a short list.',
  ],
  accessibility: [
    'Callouts are role note and Alerts role status: part of the page, so they don’t interrupt a screen reader when it loads. Use role alert only for a warning that appears after an action.',
    'The illustration and icon are decorative; the text carries the message.',
    'Text-warning on the Alert fill meets AA for 14px SemiBold text.',
    'The button is a real button, reached with Tab.',
  ],
  figma: [
    { label: 'Alert, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12060-2785' },
    { label: 'Alert, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=3658-32304' },
  ],
  spec: 'playground/docs/design-system/alerts-toast.md',
}

export function AlertGuidelines() {
  return <GuidelinesTemplate g={g} />
}
