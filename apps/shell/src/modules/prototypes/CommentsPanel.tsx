import { useEffect, useState } from 'react'
import { Box, ButtonBase, FormControlLabel, Typography } from '@mui/material'
import { Alert, Badge, EmptyState, Toggle, type BadgeType } from '@design-os/components'
import type { CommentStatus, DemoComment, WatchState } from '@design-os/demos'

// The Comments tab of the demo viewer: watch mode's switch, and every comment on the demo's
// working copy grouped by status. Refreshes every 2 seconds, and straight away when the frame
// says the comments changed (reloadKey).

const GROUPS: { status: CommentStatus; title: string; badge: BadgeType; label: string }[] = [
  { status: 'in-progress', title: 'In progress', badge: 'progress', label: 'In progress' },
  { status: 'pending', title: 'Pending', badge: 'informative', label: 'Pending' },
  { status: 'failed', title: 'Failed', badge: 'error', label: 'Failed' },
  { status: 'done', title: 'Done', badge: 'success', label: 'Done' },
]

export function useComments(slug: string, reloadKey: number) {
  const [comments, setComments] = useState<DemoComment[] | null>(null)
  const [watch, setWatch] = useState<WatchState | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let live = true
    Promise.all([fetch(`/api/demos/${slug}/comments`).then((r) => r.json()), fetch(`/api/demos/${slug}/watch`).then((r) => r.json())])
      .then(([c, w]) => {
        if (!live) return
        setComments(c.comments ?? [])
        setWatch(w)
      })
      .catch(() => {})
    return () => {
      live = false
    }
  }, [slug, reloadKey, tick])

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 2000)
    return () => clearInterval(t)
  }, [])

  const setWatchOn = async (on: boolean) => {
    const r = await fetch(`/api/demos/${slug}/watch`, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ on }) })
    if (r.ok) setWatch(await r.json())
  }

  return { comments, watch, setWatchOn, refresh: () => setTick((n) => n + 1) }
}

export function CommentsPanel({
  comments,
  watch,
  onWatch,
  onFocus,
  readOnly,
}: {
  comments: DemoComment[]
  watch: WatchState | null
  onWatch: (on: boolean) => void
  onFocus: (id: string) => void
  readOnly: boolean
}) {
  const working = watch?.current ? comments.find((c) => c.id === watch.current) : undefined
  return (
    <Box data-testid="comments-panel" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {readOnly ? (
        <Alert type="callout" icon illustration={false}>
          Comments are on the current version. Switch to Current to add them or use watch mode.
        </Alert>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <FormControlLabel
            control={<Toggle checked={!!watch?.on} onChange={(e) => onWatch(e.target.checked)} />}
            label="Watch mode"
            sx={{ m: 0, gap: 3 }}
          />
          <Typography variant="caption" sx={(theme) => ({ color: theme.tokens.semantic.textSecondary })}>
            {working ? `Working on: "${working.text}"` : 'Haiku applies new comments to the current version, one at a time.'}
          </Typography>
        </Box>
      )}

      {comments.length === 0 ? (
        <EmptyState
          illustration="message"
          title="No comments yet"
          description="Press Comment, or C in the demo, then click anything to comment on it."
          titleComponent="h3"
        />
      ) : (
        GROUPS.map((g) => {
          const list = comments.filter((c) => c.status === g.status).sort((a, b) => a.createdAt.localeCompare(b.createdAt))
          if (!list.length) return null
          return (
            <Box key={g.status} component="section" aria-label={`${g.title} comments`} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6" component="h3" sx={(theme) => ({ color: theme.tokens.semantic.textSecondary })}>
                {g.title} ({list.length})
              </Typography>
              {list.map((c) => (
                <ButtonBase
                  key={c.id}
                  onClick={() => onFocus(c.id)}
                  disableRipple
                  aria-label={`Show comment from ${c.author}: ${c.text}`}
                  sx={(theme) => ({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    gap: 1,
                    p: 3,
                    textAlign: 'left',
                    borderRadius: `${theme.tokens.radius.s}px`,
                    border: `1px solid ${theme.tokens.semantic.border}`,
                    '&:hover': { backgroundColor: theme.tokens.semantic.inputBackgroundHover },
                    '&.Mui-focusVisible': { outline: `2px solid ${theme.tokens.semantic.primaryButtonBackground}` },
                  })}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                    <Typography variant="subtitle2" sx={(theme) => ({ color: theme.tokens.semantic.textPrimary })}>
                      {c.author}
                    </Typography>
                    <Badge type={g.badge} label={g.label} />
                  </Box>
                  <Typography variant="body2" sx={(theme) => ({ color: theme.tokens.semantic.textPrimary, overflowWrap: 'anywhere' })}>
                    {c.text}
                  </Typography>
                  <Typography variant="caption" sx={(theme) => ({ color: theme.tokens.semantic.textSecondary, overflowWrap: 'anywhere' })}>
                    {c.path} · {c.element.name ?? c.element.text ?? c.element.tag}
                    {c.agentNote ? ` · Watch mode: ${c.agentNote}` : ''}
                  </Typography>
                </ButtonBase>
              ))}
            </Box>
          )
        })
      )}
    </Box>
  )
}
