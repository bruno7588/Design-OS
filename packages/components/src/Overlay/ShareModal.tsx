import { useId, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import MuiDialog, { type DialogProps } from '@mui/material/Dialog'
import { Avatar } from '../Avatar/Avatar'
import { Button } from '../Button/Button'
import { ContentSwitcher } from '../ContentSwitcher/ContentSwitcher'
import { LinkChainIcon, ShareNodesIcon } from '../icons/FigmaIcons'
import { Search } from '../Search/Search'
import { dialogPaperStyles } from '../Dialog/dialog.overrides'
import { Checkbox } from '../Selection/Checkbox'
import { CloseButton } from './CloseButton'

// 5Mins Share modal (Figma Modal/Send 5399:12437; light board 12358:472) on MUI Dialog: pick
// people or teams to share something with, or copy its link. Built from the 5Mins Search,
// Content switcher, Avatar, Checkbox and Button.
//
// Figma → props
//   Type=Team    → the People tab (people, each with their role)
//   Type=Company → the Teams tab (teams, each with their manager)
//
// 400 wide, padding 32, sections 24 apart. Closes on the close button, the scrim and Escape.

export interface ShareTarget {
  id: string
  name: string
  /** Role for a person, manager for a team. */
  detail?: string
  avatar?: string
}

export interface ShareModalProps extends Omit<DialogProps, 'title' | 'onClose' | 'children'> {
  onClose: () => void
  title?: string
  people: ShareTarget[]
  teams: ShareTarget[]
  selected: string[]
  onSelectedChange: (ids: string[]) => void
  onShareTo?: () => void
  onCopyLink?: () => void
}

export function ShareModal({ onClose, title = 'Share lesson', PaperProps, ...rest }: ShareModalProps) {
  const id = useId()
  const { people, teams, selected, onSelectedChange, onShareTo, onCopyLink, ...props } = rest
  return (
    <MuiDialog
      onClose={onClose}
      aria-labelledby={`${id}-title`}
      PaperProps={{ ...PaperProps, sx: shareSurface }}
      {...props}
    >
      <ShareModalContent
        titleId={`${id}-title`}
        title={title}
        onClose={onClose}
        people={people}
        teams={teams}
        selected={selected}
        onSelectedChange={onSelectedChange}
        onShareTo={onShareTo}
        onCopyLink={onCopyLink}
      />
    </MuiDialog>
  )
}

const shareSurface = (theme: import('@mui/material/styles').Theme) => ({
  position: 'relative' as const,
  width: 400,
  maxWidth: 'calc(100% - 32px)',
  height: 816,
  maxHeight: 'calc(100% - 32px)',
  boxSizing: 'border-box' as const,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: `${theme.tokens.space.l}px`,
  padding: `${theme.tokens.space.xl}px`,
  margin: 0,
})

/** The inside of the Share modal, also used to draw it in place in the docs. */
export function ShareModalContent({
  title = 'Share lesson',
  titleId,
  onClose,
  people,
  teams,
  selected,
  onSelectedChange,
  onShareTo,
  onCopyLink,
}: Pick<ShareModalProps, 'onClose' | 'people' | 'teams' | 'selected' | 'onSelectedChange' | 'onShareTo' | 'onCopyLink'> & { title?: string; titleId?: string }) {
  const [tab, setTab] = useState<'people' | 'teams'>('people')
  const [query, setQuery] = useState('')
  const list = useMemo(() => {
    const all = tab === 'people' ? people : teams
    const q = query.trim().toLowerCase()
    return q ? all.filter((t) => `${t.name} ${t.detail ?? ''}`.toLowerCase().includes(q)) : all
  }, [tab, people, teams, query])
  const toggle = (id: string) => onSelectedChange(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id])

  return (
    <>
      <CloseButton onClick={onClose} sx={(theme) => ({ position: 'absolute', top: `${theme.tokens.space.ssm}px`, right: `${theme.tokens.space.ssm}px` })} />
      <Box component="h2" id={titleId} sx={(theme) => ({ m: 0, fontSize: 20, fontWeight: 700, lineHeight: 1.5, color: theme.tokens.semantic.textPrimary })}>
        {title}
      </Box>
      <Search size="L" value={query} onChange={setQuery} placeholder="Search" label={tab === 'people' ? 'Search people' : 'Search teams'} />
      <Box sx={(theme) => ({ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.s}px` })}>
        <ContentSwitcher
          aria-label="Share with"
          value={tab}
          onChange={(v) => setTab(v as 'people' | 'teams')}
          items={[
            { value: 'people', label: 'People' },
            { value: 'teams', label: 'Teams' },
          ]}
          sx={{ width: '100%', '& .MuiToggleButton-root': { flex: 1 } }}
        />
        <Box component="ul" aria-label={tab === 'people' ? 'People' : 'Teams'} sx={{ m: 0, p: 0, listStyle: 'none', flex: 1, minHeight: 0, overflowY: 'auto' }}>
          {list.map((t) => (
            <Box
              component="li"
              key={t.id}
              className="ds-share-row"
              sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: `${theme.tokens.space.sm}px`,
                minHeight: 56,
                boxSizing: 'border-box',
                padding: `${theme.tokens.space.s}px ${theme.tokens.space.m}px`,
                // Figma draws the row's bottom border inside its 56px.
                boxShadow: `inset 0 -1px 0 ${theme.tokens.semantic.border}`,
              })}
            >
              <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: `${theme.tokens.space.sm}px`, minWidth: 0 })}>
                <Avatar size={40} src={t.avatar} alt="" />
                <Box sx={{ minWidth: 0 }}>
                  <Box sx={(theme) => ({ fontSize: 14, fontWeight: 700, lineHeight: 1.5, color: theme.tokens.semantic.textPrimary })}>{t.name}</Box>
                  {t.detail && <Box sx={(theme) => ({ fontSize: 12, lineHeight: 1.5, color: theme.tokens.semantic.textSecondary })}>{t.detail}</Box>}
                </Box>
              </Box>
              <Checkbox checked={selected.includes(t.id)} onChange={() => toggle(t.id)} inputProps={{ 'aria-label': t.name }} />
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={(theme) => ({ display: 'flex', gap: `${theme.tokens.space.sm}px`, '& > *': { flex: 1 } })}>
        <Button variant="outlined" endIcon={<ShareNodesIcon size={20} />} onClick={onShareTo}>
          Share To
        </Button>
        <Button variant="outlined" endIcon={<LinkChainIcon size={20} />} onClick={onCopyLink}>
          Copy Link
        </Button>
      </Box>
    </>
  )
}

/** Draws the Share modal in place (docs and visual tests). */
export function ShareModalPreview(props: Parameters<typeof ShareModalContent>[0]) {
  return (
    <Box role="group" aria-label="Share modal preview" sx={(theme) => ({ ...dialogPaperStyles(theme), ...shareSurface(theme), maxWidth: 'none', maxHeight: 'none' })}>
      <ShareModalContent {...props} />
    </Box>
  )
}
