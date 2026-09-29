import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

// Figma Header/Type=Section, as used in the Modal and Side Drawer: the title (Bold 20 in
// Text-primary) and supporting text (Regular 14 in Text-secondary) 4px apart, then a
// Border divider 12px below. `action` sits at the end of the headline row, 16px away
// (Figma "CTA's": the Side Drawer's close button). The ids let the overlay name and
// describe itself.

export interface SectionHeaderProps {
  title: ReactNode
  supportingText?: ReactNode
  titleId?: string
  supportingTextId?: string
  action?: ReactNode
}

export function SectionHeader({ title, supportingText, titleId, supportingTextId, action }: SectionHeaderProps) {
  return (
    <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.sm}px`, width: '100%' })}>
      <Box sx={(theme) => ({ display: 'flex', alignItems: 'flex-start', gap: `${theme.tokens.space.m}px` })}>
        <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.xs}px`, flex: 1, minWidth: 0 })}>
          <Typography id={titleId} component="h2" sx={(theme) => ({ fontSize: 20, fontWeight: 700, lineHeight: 1.5, color: theme.tokens.semantic.textPrimary })}>
            {title}
          </Typography>
          {supportingText && (
            <Typography id={supportingTextId} sx={(theme) => ({ fontSize: 14, lineHeight: 1.5, color: theme.tokens.semantic.textSecondary })}>
              {supportingText}
            </Typography>
          )}
        </Box>
        {action}
      </Box>
      <Divider sx={(theme) => ({ borderColor: theme.tokens.semantic.border })} />
    </Box>
  )
}
