import { Box } from '@mui/material'
import { Badge, Tag, type TagProps } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const OnThumbnail = (props: TagProps) => (
  <Box
    sx={(theme) => ({
      position: 'relative',
      width: 160,
      height: 90,
      borderRadius: `${theme.tokens.radius.s}px`,
      overflow: 'hidden',
      backgroundImage: 'url(/samples/thumbnail.png)',
      backgroundSize: 'cover',
    })}
  >
    <Tag {...props} sx={{ position: 'absolute', top: 0, left: 0 }} />
  </Box>
)

// Content from the Figma Tags set and the 5mins-copy-review skill (badges.md covers Badges only).
const g: Guidelines = {
  overview: 'A tag shows the media type of a piece of content, such as a video or a PDF, in the corner of its thumbnail.',
  whenToUse: ['On thumbnails of lessons and resources, so people know what they will open.', 'Where several media types sit side by side, such as a lesson list.'],
  whenNotToUse: ['For status, such as In progress or Completed. Use a badge.', 'For categories or skills. Use a chip.', 'On their own, away from a thumbnail.'],
  anatomy: {
    example: <OnThumbnail type="video" size="L" />,
    parts: [
      { name: 'Tag', description: 'A Border square in the top-left corner, rounded at the bottom right only: 12px in L, 8px in M and S. L 40px, M 28px, S 24px, with 4px padding.' },
      { name: 'Icon', description: 'Bold, in Text-secondary: 32px in L, 20px in M, 16px in S.' },
    ],
  },
  variants: [
    { name: 'L', description: 'Large thumbnails, such as a lesson hero.', example: <OnThumbnail type="pdf" size="L" /> },
    { name: 'M', description: 'The default: cards and lists.', example: <OnThumbnail type="link" size="M" /> },
    { name: 'S', description: 'Small thumbnails, such as table rows.', example: <OnThumbnail type="audio" size="S" /> },
  ],
  states: [{ name: 'Default', description: 'Tags have no interactive states; the thumbnail around them does.' }],
  dos: [
    {
      do: { example: <OnThumbnail type="video" size="M" />, text: 'Put the tag in the top-left corner of the thumbnail.' },
      dont: { example: <Badge type="progress" label="Video" />, text: 'Use a badge for the media type.' },
    },
  ],
  content: ['Icons only. The type name is the accessible name: Video, PDF, Link, SCORM, Flashcard, Audio.'],
  accessibility: [
    'Each tag is an image named by its media type, so screen readers say "Video".',
    'If the card already says the type in text, hide the tag from screen readers with aria-hidden.',
  ],
  figma: [
    { label: 'Tags, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12319-7504' },
    { label: 'Tags, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=4603-27712' },
  ],
  spec: 'Figma Library, Badges / Tags page',
}

export function TagGuidelines() {
  return <GuidelinesTemplate g={g} />
}
