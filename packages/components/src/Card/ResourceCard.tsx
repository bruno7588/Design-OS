import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import type { SxProps, Theme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import { ExportSquare, ImportCurve } from 'iconsax-react'
import { CardRoot, clamp } from './CardBase'
import { RESOURCE_TYPES, TypeThumbnail, type ResourceType } from './illustrations'

// 5Mins Resource card (Figma Card/Resources: dark 12213:3040, light 12228:2749): a course
// resource with its type tile, title, meta line and one action.
//
// Figma → props
//   Device=Web/Admin / Mobile app → device "web" | "mobile"
//   Type thumbnail Type           → type
//   State=Hover                   → :hover; the action fills Input-background-hover and shows its Tooltip
//
// The action downloads a file (import-curve) or opens a link (export-square; Figma only draws
// the download). Its name includes the title: "Download Brand guidelines".

export interface ResourceCardProps {
  device?: 'web' | 'mobile'
  type: ResourceType
  title: string
  /** File size, such as "1.1 MB"; the meta line reads "PDF • 1.1 MB". Links read "External link". */
  size?: string
  onOpen?: () => void
  className?: string
  sx?: SxProps<Theme>
}

export function ResourceCard({ device = 'web', type, title, size, onOpen, className, sx }: ResourceCardProps) {
  const mobile = device === 'mobile'
  const link = type === 'link'
  const label = link ? 'Open link' : 'Download'
  const Icon = link ? ExportSquare : ImportCurve
  const meta = link || !size ? RESOURCE_TYPES[type] : `${RESOURCE_TYPES[type]} • ${size}`

  return (
    <CardRoot
      className={['ds-resource-card', className].filter(Boolean).join(' ')}
      hover={!mobile}
      sx={[
        (theme) => {
          const t = theme.tokens
          return {
            display: 'flex',
            alignItems: 'center',
            gap: `${mobile ? t.space.s : t.space.sm}px`,
            padding: mobile ? `${t.space.sm}px` : `${t.space.sm}px ${t.space.m}px ${t.space.sm}px ${t.space.sm}px`,
          }
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <TypeThumbnail type={type} size={mobile ? 40 : 48} />
      <Box sx={(theme) => ({ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.xs}px` })}>
        <Box component="h3" sx={(theme) => ({ m: 0, fontSize: mobile ? 14 : 16, fontWeight: 700, lineHeight: 1.5, color: theme.tokens.semantic.textPrimary, ...clamp(1) })}>
          {title}
        </Box>
        <Box component="p" sx={(theme) => ({ m: 0, fontSize: mobile ? 12 : 14, lineHeight: mobile ? 1.2 : 1.5, color: theme.tokens.semantic.textTertiary, ...clamp(1) })}>
          {meta}
        </Box>
      </Box>
      <Tooltip title={label} placement="top">
        <IconButton
          className="ds-resource-action"
          aria-label={`${label} ${title}`}
          onClick={onOpen}
          disableRipple
          sx={(theme) => ({
            width: 28,
            height: 28,
            padding: `${theme.tokens.space.xs}px`,
            color: theme.tokens.semantic.textSecondary,
            // Figma's Hover variant shows the action hovered too; ds-hover on the card forces it for docs.
            '&:hover, .ds-card.ds-hover &': { backgroundColor: theme.tokens.semantic.inputBackgroundHover, color: theme.tokens.semantic.textPrimary },
            '&.Mui-focusVisible': { outline: `2px solid ${theme.tokens.semantic.primaryButtonBackground}` },
          })}
        >
          <Icon size={20} color="currentColor" />
        </IconButton>
      </Tooltip>
    </CardRoot>
  )
}
