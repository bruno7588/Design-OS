import { ToastBody } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

// Content from the Toast section of playground/docs/design-system/alerts-toast.md
// and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'A toast confirms that something happened, briefly, without interrupting. It appears at the bottom of the window, stays for 5 seconds and goes away on its own.',
  whenToUse: [
    'To confirm an action worked: saved, published, sent.',
    'To say something is under way in the background, such as a report being prepared.',
    'To offer a quick Undo after a reversible action.',
  ],
  whenNotToUse: [
    'When the person must act or decide. Use a dialog.',
    'For a message that must stay visible. Use an alert on the page.',
    'For form errors. Show them next to the field.',
    'For long messages. A toast is read at a glance.',
  ],
  anatomy: {
    example: <ToastBody type="success" message="Course published" />,
    parts: [
      { name: 'Container', description: 'Hugs its content, up to 560px. Radius 12, padding 12px by 16px, Shadow L. Solid fill by type, the same in both modes.' },
      { name: 'Icon', description: 'Optional. 24px, in Neutral-25: tick circle, info outline, or the danger triangle for warnings and errors.' },
      { name: 'Message', description: 'Poppins Bold 16px in Neutral-25. 8px after the icon.' },
      { name: 'Action', description: 'Optional, not in Figma: an underlined text button such as Undo.' },
    ],
  },
  variants: [
    { name: 'Information', description: 'Neutral news. Neutral-700 fill.', example: <ToastBody type="info" message="Report is being prepared" /> },
    { name: 'Success', description: 'The action worked. Success-500 fill. The most common toast.', example: <ToastBody type="success" message="Changes saved" /> },
    { name: 'Warning', description: 'It worked, with something to check. Warning-600 fill.', example: <ToastBody type="warning" message="Some learners have no team" /> },
    { name: 'Error', description: 'It did not work. Danger-500 fill.', example: <ToastBody type="error" message="Could not save changes" /> },
  ],
  states: [
    { name: 'Entering', description: 'Grows in at the bottom centre, 24px from the edge. New toasts appear above the ones already showing, 8px apart.' },
    { name: 'Showing', description: 'Stays for 5 seconds. Hovering over it or focusing it pauses the timer.' },
    { name: 'Leaving', description: 'Fades out on its own, or straight away after its action is used.' },
  ],
  dos: [
    {
      do: { example: <ToastBody type="success" message="Course published" />, text: 'Say what happened, in a few words, without punctuation.' },
      dont: { example: <ToastBody type="success" message="Success!" />, text: 'Use vague words or exclamation marks.' },
    },
    {
      do: { example: <ToastBody type="info" message="Lesson deleted" action={{ label: 'Undo', onClick: () => {} }} />, text: 'Offer Undo for actions that can be reversed.' },
      dont: { example: <ToastBody type="error" message="Your session expired. Sign in again to keep your changes." />, text: 'Use a toast for something people must act on. Use a dialog.' },
    },
  ],
  content: [
    'Past tense for what happened: "Course published", "Changes saved".',
    'Sentence case, no full stop, no exclamation mark.',
    'Keep it to one line, about five words.',
    'Errors say what failed: "Could not save changes", not "Something went wrong".',
  ],
  accessibility: [
    'Success and Information toasts use role="status": screen readers announce them without interrupting.',
    'Warning and Error toasts use role="alert", which interrupts.',
    'Hover and focus pause the timer, so people have time to read it or reach the action.',
    'Never put the only way to do something in a toast; it disappears.',
  ],
  figma: [{ label: 'Toast (Figma Library, one copy for both modes)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=5045-14119' }],
  spec: 'playground/docs/design-system/alerts-toast.md',
}

export function ToastGuidelines() {
  return <GuidelinesTemplate g={g} />
}
