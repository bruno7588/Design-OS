import { forwardRef, type ComponentPropsWithoutRef, type ComponentType } from 'react'
import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { DirectboxNotif, DocumentText, PlayCircle, VolumeHigh } from 'iconsax-react'
import { FlashcardIcon, LinkChainIcon } from '../icons/FigmaIcons'

// 5Mins Tag (Figma Badges / Tags page, set Tags): the media type in the top-left corner
// of a thumbnail. A Border square with a Bold Iconsax icon in Text-secondary, rounded
// only at the bottom right, where it meets the image. MUI has no equivalent, so this
// is a Box styled from the tokens.
//
// Figma → props
//   Media Type → type "video" | "pdf" | "link" | "scorm" | "flashcard" | "audio"
//   Size       → size "L" (40, icon 32) | "M" (28, icon 20) | "S" (24, icon 16)

export type TagType = 'video' | 'pdf' | 'link' | 'scorm' | 'flashcard' | 'audio'

// Link and Flashcard use the Figma shapes: Iconsax React has no exact match for link-2 and note-2.
type IconComponent = ComponentType<{ size: number }>
const bold = (Icon: typeof PlayCircle): IconComponent =>
  function BoldIcon({ size }) {
    return <Icon size={size} variant="Bold" color="currentColor" aria-hidden />
  }
export const TAG_TYPES: Record<TagType, { label: string; Icon: IconComponent }> = {
  video: { label: 'Video', Icon: bold(PlayCircle) },
  pdf: { label: 'PDF', Icon: bold(DocumentText) },
  link: { label: 'Link', Icon: LinkChainIcon },
  scorm: { label: 'SCORM', Icon: bold(DirectboxNotif) },
  flashcard: { label: 'Flashcard', Icon: FlashcardIcon },
  audio: { label: 'Audio', Icon: bold(VolumeHigh) },
}

const SIZES = { L: { box: 40, icon: 32 }, M: { box: 28, icon: 20 }, S: { box: 24, icon: 16 } } as const

export interface TagProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  sx?: SxProps<Theme>
  type: TagType
  size?: keyof typeof SIZES
}

export const Tag = forwardRef<HTMLDivElement, TagProps>(function Tag({ type, size = 'M', sx, ...props }, ref) {
  const { label, Icon } = TAG_TYPES[type]
  const { box, icon } = SIZES[size]
  return (
    <Box
      ref={ref}
      role="img"
      aria-label={label}
      className="ds-tag"
      {...props}
      sx={[
        (theme) => ({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          width: box,
          height: box,
          padding: `${theme.tokens.space.xs}px`,
          backgroundColor: theme.tokens.semantic.border,
          color: theme.tokens.semantic.textSecondary,
          borderRadius: `0 0 ${theme.tokens.radius.s}px 0`,
          '& svg': { display: 'block', flexShrink: 0 },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Icon size={icon} />
    </Box>
  )
})
