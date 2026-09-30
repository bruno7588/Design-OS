import { Box } from '@mui/material'
import { LevelIllustration } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

// Content from the Figma "Illustrations/ Learning path" set and the prototype's level-illustrations.
const g: Guidelines = {
  overview: 'Level illustrations mark a skill level: shields for levels 1 to 5, medals for Advanced, Expert and Master.',
  whenToUse: ['On learning path and certificate cards.', 'Wherever a skill level needs a picture, such as a profile.'],
  whenNotToUse: ['As buttons or status icons. They are artwork.'],
  anatomy: {
    example: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <LevelIllustration level={5} />
        <LevelIllustration level={5} size="large" />
      </Box>
    ),
    parts: [
      { name: 'Small', description: '56px, the number only.' },
      { name: 'Large', description: '72px, with a “Level” banner or a ribbon.' },
    ],
  },
  variants: [
    { name: 'Levels 1 to 5', description: 'Pink, green, blue, purple and orange shields.', example: <LevelIllustration level={1} /> },
    { name: 'Advanced, Expert, Master', description: 'Blue, purple and orange medals.', example: <LevelIllustration level="expert" /> },
    { name: 'Disabled', description: 'Grey, for levels not unlocked yet.', example: <LevelIllustration level={1} disabled /> },
  ],
  states: [],
  dos: [
    {
      do: { example: <LevelIllustration level={3} label="Level 3" />, text: 'Name it when it stands alone.' },
      dont: { example: <LevelIllustration level={3} size="large" sx={{ width: 40, height: 40 }} />, text: 'Shrink the large artwork; use the small one.' },
    },
  ],
  content: [],
  accessibility: ['Decorative by default (empty alt), as the level is in the text beside it.', 'Pass label when nothing else names the level.'],
  figma: [
    { label: 'Illustrations/ Learning path, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11196-8794' },
    { label: 'Illustrations/ Learning path, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=9120-9437' },
  ],
  spec: 'playground/docs/design-system/gamification.md',
}

export function LevelIllustrationGuidelines() {
  return <GuidelinesTemplate g={g} />
}
