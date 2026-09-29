import { Box } from '@mui/material'
import { ConfirmDialogPreview, ModalPreview, SideDrawerPreview } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { SlotPlaceholder } from '../shared/SlotPlaceholder'

const noop = () => {}
const Small = ({ children }: { children: React.ReactNode }) => <Box sx={{ zoom: 0.5, pointerEvents: 'none' }}>{children}</Box>

// Content from playground/docs/design-system/overlays.md and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'A modal opens a focused task in front of the page: a short form, a preview, a setting. The page stays in view behind the scrim, and nothing else can be used until the modal closes.',
  whenToUse: [
    'For a short task that doesn’t need the page behind it: edit a name, pick a few options, preview content.',
    'When the task has one main action, such as Save.',
  ],
  whenNotToUse: [
    'For a yes or no decision. Use a dialog.',
    'For long forms, or when people need to see the page. Use a side drawer.',
    'For a whole workflow, such as a lesson editor. Use a full-screen modal or a page.',
  ],
  anatomy: {
    example: (
      <Small>
        <ModalPreview title="Edit collection" supportingText="Learners see the name on their home page." onClose={noop} action={{ label: 'Save', onClick: noop }}>
          <SlotPlaceholder />
        </ModalPreview>
      </Small>
    ),
    parts: [
      { name: 'Surface', description: '720px wide, Page-background, radius 12, padding 24, Shadow L. Sections 20px apart, centred.' },
      { name: 'Close button', description: 'IoCloseOutline 24px in a 32px frame, 10px from the top right. Text-secondary, Text-primary on hover.' },
      { name: 'Section header', description: 'Title Bold 20px in Text-primary; supporting text 14px in Text-secondary, 4px below; a Border divider 12px under that.' },
      { name: 'Content', description: 'At least 320px tall, the full width.' },
      { name: 'Button', description: 'One Filled Medium button, centred.' },
      { name: 'Scrim', description: 'Neutral-900 at 50%.' },
    ],
  },
  variants: [
    { name: 'With supporting text', description: 'When the title needs a line of context.', example: <Small><ModalPreview title="Edit collection" supportingText="Learners see the name on their home page." onClose={noop}><SlotPlaceholder minHeight={120} /></ModalPreview></Small> },
    { name: 'Without a button', description: 'For previews and read-only content.', example: <Small><ModalPreview title="Preview" onClose={noop}><SlotPlaceholder minHeight={120} /></ModalPreview></Small> },
  ],
  states: [
    { name: 'Open', description: 'Focus moves into the modal and stays there. The page behind is inert.' },
    { name: 'Closed', description: 'By the close button, Escape or a click on the scrim. Focus returns to what opened it.' },
  ],
  dos: [
    {
      do: { example: <Small><ModalPreview title="Edit collection" onClose={noop} action={{ label: 'Save', onClick: noop }}><SlotPlaceholder minHeight={120} /></ModalPreview></Small>, text: 'Keep it to one task and one main action.' },
      dont: { example: <Small><ConfirmDialogPreview type="error" title="Delete this collection?" actionLabel="Delete" /></Small>, text: 'Use a modal to confirm a deletion. Use a dialog.' },
    },
    {
      do: { example: <Small><SideDrawerPreview title="Edit learner" onClose={noop} height={360} primaryAction={{ label: 'Save', onClick: noop }}><SlotPlaceholder minHeight="100%" /></SideDrawerPreview></Small>, text: 'Use a side drawer for long forms.' },
      dont: { example: <Small><ModalPreview title="Edit learner" onClose={noop}><SlotPlaceholder label="Twelve fields, scrolling" minHeight={400} /></ModalPreview></Small>, text: 'Scroll a long form inside a modal.' },
    },
  ],
  content: [
    'Title: what the task is, in sentence case: "Edit collection".',
    'Button: the verb that finishes it: "Save", "Add", "Send".',
    'Supporting text: one short sentence, only when it helps.',
  ],
  accessibility: [
    'It is a dialog named by its title and described by its supporting text.',
    'Focus moves in on open, stays inside, and returns on close.',
    'Escape closes it. The close button is labelled "Close".',
    'Everything behind the scrim is hidden from screen readers while it is open.',
  ],
  figma: [
    { label: 'Modal, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=7479-4350' },
    { label: 'Modal, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11919-4717' },
  ],
  spec: 'playground/docs/design-system/overlays.md',
}

export function ModalGuidelines() {
  return <GuidelinesTemplate g={g} />
}
