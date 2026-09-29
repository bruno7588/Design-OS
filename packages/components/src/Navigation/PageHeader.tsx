import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

// 5Mins page and section header (Figma Header: dark 7902:1019, light 11921:13215).
// A column of slots: the label (metadata), the title with supporting text and actions,
// a divider, then the navigation (tabs). Every slot is optional.
//
// Figma → props
//   Type=Page / Section → type "page" (H1, Bold 24, gap 16) | "section" (H2, Bold 20, gap 12)
//   Label slot          → metadata: items with a 16px (14px in Section) icon, 8px apart
//   Header slot         → title, supportingText, actions (12px apart)
//   Navigation slot     → navigation, such as Tabs, under a divider

export interface PageHeaderMeta {
  icon?: ReactNode
  label: ReactNode
}

export interface PageHeaderProps {
  type?: 'page' | 'section'
  title: ReactNode
  supportingText?: ReactNode
  metadata?: PageHeaderMeta[]
  actions?: ReactNode
  navigation?: ReactNode
  /** Heading level; by default h1 for a page and h2 for a section. */
  headingComponent?: 'h1' | 'h2' | 'h3'
}

export function PageHeader({ type = 'page', title, supportingText, metadata, actions, navigation, headingComponent }: PageHeaderProps) {
  const page = type === 'page'
  return (
    <Box component="header" className={`ds-page-header ds-${type}`} sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${page ? theme.tokens.space.m : theme.tokens.space.sm}px` })}>
      {metadata && metadata.length > 0 && (
        <Box component="ul" sx={(theme) => ({ display: 'flex', flexWrap: 'wrap', gap: `${theme.tokens.space.s}px`, m: 0, p: 0, listStyle: 'none' })}>
          {metadata.map((m, i) => (
            <Box
              component="li"
              key={i}
              sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                gap: `${theme.tokens.space.xs}px`,
                fontSize: page ? 14 : 12,
                lineHeight: page ? 1.5 : 1.2,
                color: theme.tokens.semantic.textTertiary,
                '& svg': { width: page ? 16 : 14, height: page ? 16 : 14, flexShrink: 0 },
              })}
            >
              {m.icon}
              {m.label}
            </Box>
          ))}
        </Box>
      )}

      <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: `${theme.tokens.space.m}px`, flexWrap: 'wrap' })}>
        <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.xs}px`, minWidth: 0 })}>
          <Typography
            component={headingComponent ?? (page ? 'h1' : 'h2')}
            sx={(theme) => ({ m: 0, fontSize: page ? 24 : 20, fontWeight: 700, lineHeight: 1.5, color: theme.tokens.semantic.textPrimary })}
          >
            {title}
          </Typography>
          {supportingText && (
            <Typography component="p" sx={(theme) => ({ m: 0, fontSize: page ? 16 : 14, lineHeight: 1.5, color: theme.tokens.semantic.textSecondary })}>
              {supportingText}
            </Typography>
          )}
        </Box>
        {actions && <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: `${theme.tokens.space.sm}px`, flexShrink: 0 })}>{actions}</Box>}
      </Box>

      {navigation && (
        <>
          <Divider />
          <Box>{navigation}</Box>
        </>
      )}
    </Box>
  )
}
