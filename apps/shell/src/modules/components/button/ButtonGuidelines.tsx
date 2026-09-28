import { Stack } from '@mui/material'
import { Button, SparkleIcon } from '@design-os/components'
import { Add, Trash } from 'iconsax-react'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

// Content from playground/docs/design-system/buttons.md and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'A button starts an action: saving, creating, confirming, deleting. Its style tells people how important the action is and what kind of action it is. Each view has one main action, shown as a filled button, and everything else steps down from there.',
  whenToUse: [
    'To submit a form or confirm a decision.',
    'To start a task, such as adding a learner or creating a course.',
    'To open a dialog, drawer or flow where the action continues.',
    'For AI-powered actions from Hugo, using the AI configuration.',
  ],
  whenNotToUse: [
    'To take people to another page. Use a link.',
    'To switch between views of the same content. Use tabs or a content switcher.',
    'To filter or select options. Use chips, checkboxes or radios.',
    'For an on and off setting that applies straight away. Use a toggle.',
  ],
  anatomy: {
    example: (
      <Button size="large" icon={<Add color="currentColor" />}>
        Add learner
      </Button>
    ),
    parts: [
      { name: 'Container', description: 'Hugs its content. Radius 12px. Height is fixed per size: 33, 41 or 48px. Filled configurations have no border; outlined ones draw a 1px border inside that height.' },
      { name: 'Leading icon', description: 'Optional. Iconsax Linear in the label colour, 16, 20 or 24px to match the size. Always before the label.' },
      { name: 'Label', description: 'Poppins Bold, 12, 14 or 16px (Link uses Medium). Says what the button does.' },
      { name: 'Spinner', description: 'Only while loading. 20px, in the label colour, centred in place of the content.' },
    ],
  },
  variants: [
    { name: 'Filled', description: 'The main action in a view. Use one per view.', example: <Button>Save changes</Button> },
    { name: 'Outlined', description: 'Secondary actions, such as Cancel next to a filled button.', example: <Button variant="outlined">Cancel</Button> },
    { name: 'Outlined-2', description: 'Neutral, tertiary actions that should not look branded until someone interacts with them.', example: <Button variant="outlined2">Export</Button> },
    { name: 'Text and link', description: 'Low-emphasis actions inside content. Link is for navigation-like actions: a Medium-weight, underlined label in the primary button colour.', example: <Stack direction="row" sx={{ gap: 4 }}><Button variant="text">View all</Button><Button variant="link">Learn more</Button></Stack> },
    { name: 'Danger', description: 'Destructive actions such as delete or remove. Filled, outlined and text.', example: <Button color="error">Delete course</Button> },
    { name: 'Warning', description: 'Actions with consequences that need a second thought. Filled, outlined and text.', example: <Button color="warning">Reset progress</Button> },
    { name: 'Success', description: 'Positive confirmations, such as marking something complete. Filled, outlined and text.', example: <Button color="success">Mark as complete</Button> },
    { name: 'AI', description: 'Hugo and AI-powered features only. Cyan to purple gradient, always with the sparkle icon. Filled and outlined.', example: <Button color="ai" icon={<SparkleIcon />}>Generate</Button> },
  ],
  states: [
    { name: 'Enabled', description: 'Resting state.' },
    { name: 'Hover', description: 'Filled gets darker in light mode and lighter in dark mode. Outlined gains a 16% cyan fill (24% for danger, warning and success). AI gains a cyan ring and a purple glow.' },
    { name: 'Pressed', description: 'One step further than hover. Outlined goes back to transparent with the pressed colour on the border and label.' },
    { name: 'Focus', description: 'Keyboard focus only: a 2px ring in the primary button colour, 2px outside the button.' },
    { name: 'Disabled', description: 'Grey fill and muted label for filled buttons. Muted border and label for outlined and text. Not clickable.' },
    { name: 'Loading', description: 'Takes the disabled look, swaps the content for a spinner and keeps its width, so the layout does not jump.' },
  ],
  dos: [
    {
      do: { example: <><Button variant="outlined">Cancel</Button><Button>Save changes</Button></>, text: 'Pair one filled button with outlined buttons for the other actions.' },
      dont: { example: <><Button>Cancel</Button><Button>Save changes</Button></>, text: 'Put two filled buttons side by side. People cannot tell which one matters.' },
    },
    {
      do: { example: <Button>Add learner</Button>, text: 'Start with a verb and use sentence case.' },
      dont: { example: <><Button>Submit</Button><Button>Add Learner</Button></>, text: 'Use vague labels or Title Case.' },
    },
    {
      do: { example: <><Button variant="outlined">Cancel</Button><Button color="error" icon={<Trash color="currentColor" />}>Delete course</Button></>, text: 'Use danger for actions that remove or destroy something.' },
      dont: { example: <Button color="error">Save changes</Button>, text: 'Use danger for emphasis on a safe action.' },
    },
    {
      do: { example: <Button color="ai" icon={<SparkleIcon />}>Generate questions</Button>, text: 'Keep the AI gradient for actions Hugo performs.' },
      dont: { example: <Button color="ai" icon={<SparkleIcon />}>Save changes</Button>, text: 'Use the AI gradient to make an ordinary action stand out.' },
    },
  ],
  content: [
    'Sentence case: capitalise the first word and proper nouns only. "Save changes", not "Save Changes".',
    'Start with a verb that names the action: "Add learner", "Create automation", "Mark as complete".',
    'Avoid vague labels such as "Submit", "OK" or "Click here".',
    'Keep labels short, ideally one to three words. Labels do not wrap.',
    'Match the wording of the thing that triggered the action. A dialog titled "Delete course?" confirms with "Delete course".',
  ],
  accessibility: [
    'Use a real button element. The component does this for you.',
    'An icon-only button needs an aria-label that says what it does.',
    'While loading, the button keeps its label as the accessible name and sets aria-busy.',
    'Focus is visible for keyboard users only, as a 2px ring with a 2px offset.',
    'Light filled buttons use Primary-700 and dark filled buttons use a dark label on Primary-500, both to meet WCAG AA. Never use Primary-500 as text on white.',
  ],
  figma: [
    { label: 'Buttons, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12141-7567' },
    { label: 'Buttons, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=10825-3269' },
  ],
  spec: 'playground/docs/design-system/buttons.md',
}

export function ButtonGuidelines() {
  return <GuidelinesTemplate g={g} />
}
