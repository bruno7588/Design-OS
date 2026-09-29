import { Box } from '@mui/material'
import { BottomSheetPreview } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { SlotPlaceholder } from '../shared/SlotPlaceholder'

// Content from playground/docs/design-system/overlays.md and the Figma Bottom sheet.
const g: Guidelines = {
  overview: 'A bottom sheet rises from the bottom of the mobile app with options or a short form, over the dimmed page.',
  whenToUse: ['In the mobile app, for a short list of options or a quick form tied to the current page.'],
  whenNotToUse: ['On desktop. Use the Modal or the Side drawer.', 'For long tasks. Use the Full screen modal.'],
  anatomy: {
    example: (
      <Box sx={{ transform: 'scale(0.5)', transformOrigin: 'top left', height: 406 }}>
        <BottomSheetPreview>
          <SlotPlaceholder />
        </BottomSheetPreview>
      </Box>
    ),
    parts: [
      { name: 'Scrim', description: 'The page dims under Neutral-900 at 64%.' },
      { name: 'Sheet', description: 'Page-background, top corners 12, padding 0 16 20 16, 8px gap.' },
      { name: 'Handle', description: 'A 64 × 4 Neutral-500 bar, centred in a 36px header.' },
      { name: 'Content', description: 'A slot, 12px between items; it scrolls if it grows past the screen.' },
    ],
  },
  variants: [],
  states: [],
  dos: [
    {
      do: { example: <Box sx={{ p: 2 }}>Three lesson options</Box>, text: 'Keep it short: a few options or one small form.' },
      dont: { example: <Box sx={{ p: 2 }}>A long settings page</Box>, text: 'Fill it with a whole page.' },
    },
  ],
  content: ['Give the sheet a heading and point aria-labelledby at it.'],
  accessibility: ['It’s a dialog: focus moves in, stays inside and returns on close.', 'Escape and a tap on the scrim close it. The handle is decorative.'],
  figma: [
    { label: 'Bottom sheet, light mode (instance, Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12279-281' },
    { label: 'Bottom sheet, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=7479-106' },
  ],
  spec: 'playground/docs/design-system/overlays.md',
}

export function BottomSheetGuidelines() {
  return <GuidelinesTemplate g={g} />
}
