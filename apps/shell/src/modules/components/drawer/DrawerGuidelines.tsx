import { Box } from '@mui/material'
import { ModalPreview, SideDrawerPreview } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { SlotPlaceholder } from '../shared/SlotPlaceholder'

const noop = () => {}
const Small = ({ children }: { children: React.ReactNode }) => <Box sx={{ zoom: 0.5, pointerEvents: 'none' }}>{children}</Box>

// Content from playground/docs/design-system/overlays.md and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'A side drawer slides in from the right for a longer task: editing a record, a detailed setting, a long form. It covers part of the page and scrolls on its own, with its buttons always in view.',
  whenToUse: [
    'For long forms and record details.',
    'When people benefit from keeping the page in view behind it, such as the list they are editing.',
  ],
  whenNotToUse: [
    'For a short task with one field or two. Use a modal.',
    'For a yes or no decision. Use a dialog.',
    'For navigation. Use the side navigation.',
  ],
  anatomy: {
    example: (
      <Small>
        <SideDrawerPreview height={480} title="Edit learner" supportingText="Changes apply the next time they sign in." onClose={noop} primaryAction={{ label: 'Save', onClick: noop }} secondaryAction={{ label: 'Cancel', onClick: noop }}>
          <SlotPlaceholder label="Form slot" minHeight="100%" />
        </SideDrawerPreview>
      </Small>
    ),
    parts: [
      { name: 'Panel', description: '720px wide, the full height, against the right edge. Page-background, padding 20px by 24px, no radius or shadow. Sections 20px apart.' },
      { name: 'Close button', description: 'At the end of the header row, level with the title: 32px, IoCloseOutline 24px in Text-secondary.' },
      { name: 'Section header', description: 'As the modal’s: title, supporting text and a divider.' },
      { name: 'Content', description: 'Fills the space and scrolls on its own.' },
      { name: 'Footer', description: 'A Border divider, then a Filled and an Outlined button, 16px apart. Always in view.' },
      { name: 'Scrim', description: 'Neutral-900 at 25% (light) or 50% (dark), over the rest of the page.' },
    ],
  },
  variants: [
    { name: 'With footer', description: 'Forms: Save and Cancel.', example: <Small><SideDrawerPreview height={300} title="Edit learner" onClose={noop} primaryAction={{ label: 'Save', onClick: noop }} secondaryAction={{ label: 'Cancel', onClick: noop }}><SlotPlaceholder minHeight="100%" /></SideDrawerPreview></Small> },
    { name: 'Without footer', description: 'Read-only details.', example: <Small><SideDrawerPreview height={300} title="Learner details" onClose={noop}><SlotPlaceholder minHeight="100%" /></SideDrawerPreview></Small> },
  ],
  states: [
    { name: 'Open', description: 'Slides in from the right. Focus moves into the panel and stays there.' },
    { name: 'Closed', description: 'By the close button, Cancel, Escape or a click on the scrim. Focus returns to what opened it.' },
  ],
  dos: [
    {
      do: { example: <Small><SideDrawerPreview height={300} title="Edit learner" onClose={noop} primaryAction={{ label: 'Save', onClick: noop }} secondaryAction={{ label: 'Cancel', onClick: noop }}><SlotPlaceholder minHeight="100%" /></SideDrawerPreview></Small>, text: 'Put the main action first, then Cancel.' },
      dont: { example: <Small><SideDrawerPreview height={300} title="Edit learner" onClose={noop} primaryAction={{ label: 'Cancel', onClick: noop }} secondaryAction={{ label: 'Save', onClick: noop }}><SlotPlaceholder minHeight="100%" /></SideDrawerPreview></Small>, text: 'Make Cancel the Filled button.' },
    },
    {
      do: { example: <Small><ModalPreview title="Rename" onClose={noop} action={{ label: 'Save', onClick: noop }}><SlotPlaceholder minHeight={80} /></ModalPreview></Small>, text: 'Use a modal for a quick edit.' },
      dont: { example: <Small><SideDrawerPreview height={300} title="Rename" onClose={noop} primaryAction={{ label: 'Save', onClick: noop }}><SlotPlaceholder label="One field" minHeight={60} /></SideDrawerPreview></Small>, text: 'Open a drawer for one field.' },
    },
  ],
  content: [
    'Title: what is being edited or shown: "Edit learner".',
    'Main action: the verb that finishes the task; the second button is "Cancel".',
    'Group long forms under short headings.',
  ],
  accessibility: [
    'The panel is a dialog named by its title and described by its supporting text.',
    'Focus moves in on open, stays inside, and returns on close.',
    'Escape closes it. The close button is labelled "Close".',
    'The footer stays in view, so the actions are always reachable.',
  ],
  figma: [
    { label: 'Side Drawer, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=10871-12768' },
    { label: 'Side Drawer, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11919-4738' },
  ],
  spec: 'playground/docs/design-system/overlays.md',
}

export function DrawerGuidelines() {
  return <GuidelinesTemplate g={g} />
}
