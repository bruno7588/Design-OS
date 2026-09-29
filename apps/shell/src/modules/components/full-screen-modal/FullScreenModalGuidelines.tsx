import { Box } from '@mui/material'
import { CloseButton } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

// Content from playground/docs/design-system/overlays.md and the Figma Modal/Full screen set.
const g: Guidelines = {
  overview: 'A full-screen modal replaces the whole page for a focused task, such as editing a lesson or creating a flashcard.',
  whenToUse: ['For long or complex tasks that need the whole screen: lesson editors, Create Flashcard, the Add Content forms.'],
  whenNotToUse: ['For a short form or a choice. Use the Modal or the Dialog.', 'For details beside the page. Use the Side drawer.'],
  anatomy: {
    example: (
      <Box sx={(theme) => ({ position: 'relative', width: 480, height: 200, bgcolor: theme.tokens.semantic.pageBackground, outline: `1px solid ${theme.tokens.semantic.border}` })}>
        <CloseButton variant="fullscreen" sx={{ position: 'absolute', top: 20, right: 30 }} />
      </Box>
    ),
    parts: [
      { name: 'Surface', description: 'The whole viewport in Page-background. No radius, no shadow.' },
      { name: 'Close button', description: 'A 40px disc: Input-background, a 32px close glyph in Text-secondary. Desktop: 20px from the top, 30 from the right. Mobile: 16 under the status bar, 20 from the right.' },
      { name: 'Content', description: 'The task’s own layout, usually a centred column.' },
    ],
  },
  variants: [],
  states: [{ name: 'Close button hover', description: 'Input-background-hover fill and a Text-primary glyph; a 2px Primary focus ring.' }],
  dos: [
    {
      do: { example: <Box sx={{ p: 2 }}>Lesson editor, full screen</Box>, text: 'Use it for work that needs the whole screen.' },
      dont: { example: <Box sx={{ p: 2 }}>“Delete this lesson?” full screen</Box>, text: 'Use it for a confirmation; use the Dialog.' },
    },
  ],
  content: ['Give the task a heading and point aria-labelledby at it.', 'Button labels in Title Case: "Save Flashcard".'],
  accessibility: ['It’s a dialog: focus moves in, stays inside and returns on close.', 'Escape and the close button close it; the close button is named "Close".'],
  figma: [
    { label: 'Modal/Full screen, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11498-1694' },
    { label: 'Modal/Full screen, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=3223-31934' },
  ],
  spec: 'playground/docs/design-system/overlays.md',
}

export function FullScreenModalGuidelines() {
  return <GuidelinesTemplate g={g} />
}
