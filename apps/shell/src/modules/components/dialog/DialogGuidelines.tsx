import { ConfirmDialogPreview } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

// Content from playground/docs/design-system/overlays.md, the Figma Dialog description
// and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'A dialog appears in front of the page to give critical information or ask for a decision. Everything behind it is disabled until the person confirms or cancels. Use it for quick yes or no decisions, most often before something destructive.',
  whenToUse: [
    'To confirm a destructive or irreversible action, such as deleting a course.',
    'To warn about a consequence before it happens, such as resetting progress.',
    'To confirm that something important worked, when the person needs to acknowledge it.',
  ],
  whenNotToUse: [
    'For a form or longer content. Use a modal or a side drawer.',
    'For feedback that does not need a decision. Use a toast.',
    'For information that can sit on the page. Use an alert.',
    'For every action. Undo is kinder than a confirmation for anything that can be reversed.',
  ],
  anatomy: {
    example: (
      <ConfirmDialogPreview
        type="error"
        title="Delete this course?"
        secondaryText="Learners lose access straight away."
        actionLabel="Delete course"
      />
    ),
    parts: [
      { name: 'Surface', description: '345px wide, padding 24px, radius 12px, Page-background, Shadow L. Content centred.' },
      { name: 'Icon', description: 'Optional. 56px, set by the type: danger triangle, orange info circle, grey info circle or green tick.' },
      { name: 'Title', description: 'Poppins Bold 20px in Text-primary. 16px under the icon.' },
      { name: 'Secondary text', description: 'Optional. Poppins Regular 16px in Text-secondary, 8px under the title.' },
      { name: 'Buttons', description: 'Medium Cancel (Outlined-2) and the action, 12px apart, 20px under the text.' },
    ],
  },
  variants: [
    { name: 'Error', description: 'Destructive actions. Danger button.', example: <ConfirmDialogPreview type="error" title="Delete this course?" actionLabel="Delete course" /> },
    { name: 'Warning', description: 'Actions with consequences. Warning button.', example: <ConfirmDialogPreview type="warning" title="Reset progress?" actionLabel="Reset progress" /> },
    { name: 'Info', description: 'Neutral decisions. Primary button.', example: <ConfirmDialogPreview type="info" title="Leave without saving?" actionLabel="Leave" /> },
    { name: 'Success', description: 'Acknowledging a result. Primary button.', example: <ConfirmDialogPreview type="success" title="Course published" actionLabel="View course" /> },
  ],
  states: [
    { name: 'Open', description: 'The scrim covers the page (25% in light mode, 50% in dark). Focus moves to Cancel and stays inside the dialog.' },
    { name: 'Closing', description: 'Only Cancel or the action closes it. Escape and a click on the scrim do nothing, so a decision is never made by accident.' },
    { name: 'After closing', description: 'Focus returns to the control that opened it.' },
  ],
  dos: [
    {
      do: { example: <ConfirmDialogPreview type="error" title="Delete this course?" actionLabel="Delete course" />, text: 'Name the action in the title and repeat it on the button.' },
      dont: { example: <ConfirmDialogPreview type="error" title="Are you sure?" actionLabel="OK" />, text: 'Use vague titles and buttons such as "Are you sure?" and "OK".' },
    },
    {
      do: { example: <ConfirmDialogPreview type="error" title="Remove 3 learners?" actionLabel="Remove learners" />, text: 'Match the type to the action: Error for destructive ones.' },
      dont: { example: <ConfirmDialogPreview type="success" title="Remove 3 learners?" actionLabel="Remove learners" />, text: 'Use a friendly type for a destructive action.' },
    },
  ],
  content: [
    'Title: a short question or statement in sentence case that names the action, such as "Delete this course?".',
    'Secondary text: the consequence, in one or two sentences. Say what happens, not "Are you sure?".',
    'Action button: a verb that repeats the title, such as "Delete course". Never "OK" or "Yes".',
    'Cancel is always "Cancel".',
    'No exclamation marks in errors or warnings.',
  ],
  accessibility: [
    'role="alertdialog" with aria-labelledby pointing at the title and aria-describedby at the secondary text.',
    'Focus starts on Cancel, so a stray Enter never confirms a destructive action.',
    'Focus is trapped inside while open and returns to the trigger on close.',
    'The icon is decorative; the title carries the meaning.',
  ],
  figma: [
    { label: 'Dialog, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12242-5728' },
    { label: 'Dialog, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=7789-24651' },
  ],
  spec: 'playground/docs/design-system/overlays.md',
}

export function DialogGuidelines() {
  return <GuidelinesTemplate g={g} />
}
