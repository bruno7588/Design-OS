import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { Badge, Button, CommentPin, InputField, menuPaperStyles, type BadgeType } from '@design-os/components'
import type { CommentStatus, DemoComment, FrameMessage } from '@design-os/demos'
import { SHELL_ORIGIN, commentsApi, tellShell } from './api'
import { OVERLAY_ATTR, describeElement, uniqueSelector } from './selector'

// Figma-style comments on a running demo. Pins sit over the element each comment points at, on
// the route it was left on, and follow it on scroll and resize. In comment mode (from the
// Prototypes viewer, the C key, or ?comment=1) hovering outlines an element and a click opens
// the composer. Comments live on the Design OS server, so everyone sees the same pins, and
// watch mode's progress shows on them.

const AUTHOR_KEY = 'design-os-comment-author'
const STATUS_BADGE: Record<CommentStatus, { type: BadgeType; label: string }> = {
  pending: { type: 'informative', label: 'Pending' },
  'in-progress': { type: 'progress', label: 'In progress' },
  done: { type: 'success', label: 'Done' },
  failed: { type: 'error', label: 'Failed' },
}

const readAuthor = () => {
  try {
    return localStorage.getItem(AUTHOR_KEY) ?? ''
  } catch {
    return ''
  }
}

const popoverPaper = { sx: (theme: Parameters<typeof menuPaperStyles>[0]) => ({ ...menuPaperStyles(theme), maxHeight: 'none', width: 320 }) }

/** Where an element is on screen, or null if it isn't there. */
function rectOf(selector: string): DOMRect | null {
  try {
    const el = document.querySelector(selector)
    if (!el) return null
    const r = el.getBoundingClientRect()
    return r.width || r.height ? r : null
  } catch {
    return null
  }
}

const inOverlay = (el: EventTarget | null) => el instanceof Element && !!el.closest(`[${OVERLAY_ATTR}]`)

/** Set by the Design OS server's thumbnailer, so pins don't end up in gallery thumbnails. */
const forThumbnail = () => !!(window as unknown as { __designOsThumbnail?: boolean }).__designOsThumbnail

export function CommentLayer({ slug, base, children }: { slug: string; base: string; children: ReactNode }) {
  if (forThumbnail()) return <>{children}</>
  return <Layer slug={slug} base={base}>{children}</Layer>
}

function Layer({ slug, base, children }: { slug: string; base: string; children: ReactNode }) {
  const api = useMemo(() => commentsApi(slug), [slug])
  const { pathname, search } = useLocation()
  const path = (pathname.startsWith(base) ? pathname.slice(base.length) : pathname) || '/'
  const [comments, setComments] = useState<DemoComment[]>([])
  const [mode, setMode] = useState(() => new URLSearchParams(search).get('comment') === '1')
  const [showResolved, setShowResolved] = useState(false)
  const [hover, setHover] = useState<DOMRect | null>(null)
  const [draft, setDraft] = useState<{ el: Element; left: number; top: number; x: number; y: number } | null>(null)
  const [open, setOpen] = useState<{ id: string; anchor: HTMLElement } | null>(null)
  const [, setFrame] = useState(0) // re-renders pins on scroll, resize and layout changes

  const reload = useCallback(() => api.list().then(setComments).catch(() => {}), [api])
  const changed = useCallback(() => {
    void reload()
    tellShell({ type: 'design-os:comments-changed' })
  }, [reload])

  // Comments: on load, then every 2 seconds, so watch mode's progress shows on the pins.
  useEffect(() => {
    void reload()
    const t = setInterval(reload, 2000)
    return () => clearInterval(t)
  }, [reload])

  // Keep pins on their elements.
  useEffect(() => {
    const bump = () => setFrame((n) => n + 1)
    window.addEventListener('scroll', bump, true)
    window.addEventListener('resize', bump)
    const t = setInterval(bump, 500)
    return () => {
      window.removeEventListener('scroll', bump, true)
      window.removeEventListener('resize', bump)
      clearInterval(t)
    }
  }, [])

  const setCommentMode = useCallback((on: boolean) => {
    setMode(on)
    setHover(null)
    tellShell({ type: 'design-os:comment-mode-changed', on })
  }, [])

  // Messages from the Prototypes viewer.
  useEffect(() => {
    const onMessage = (e: MessageEvent<FrameMessage>) => {
      if (e.origin !== SHELL_ORIGIN && e.origin !== window.location.origin) return
      const m = e.data
      if (m?.type === 'design-os:comment-mode') setCommentMode(m.on)
      if (m?.type === 'design-os:show-resolved') setShowResolved(m.on)
      if (m?.type === 'design-os:focus-comment') {
        const pin = document.querySelector<HTMLElement>(`[data-comment-id="${CSS.escape(m.id)}"]`)
        if (pin) {
          pin.scrollIntoView({ block: 'center', behavior: 'smooth' })
          setOpen({ id: m.id, anchor: pin })
        }
      }
    }
    window.addEventListener('message', onMessage)
    tellShell({ type: 'design-os:frame-ready' })
    return () => window.removeEventListener('message', onMessage)
  }, [setCommentMode])

  // C turns comment mode on and off; Escape leaves it. Not while typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'c' || e.key === 'C') setCommentMode(!mode)
      if (e.key === 'Escape' && mode && !draft) setCommentMode(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mode, draft, setCommentMode])

  // Comment mode: outline what's under the cursor; a click opens the composer instead of acting.
  useEffect(() => {
    if (!mode) return
    const onMove = (e: MouseEvent) => setHover(inOverlay(e.target) || !(e.target instanceof Element) ? null : e.target.getBoundingClientRect())
    const block = (e: Event) => {
      if (inOverlay(e.target)) return
      e.preventDefault()
      e.stopPropagation()
    }
    const onClick = (e: MouseEvent) => {
      if (inOverlay(e.target) || !(e.target instanceof Element) || draft) return
      block(e)
      const r = e.target.getBoundingClientRect()
      setDraft({ el: e.target, left: e.clientX, top: e.clientY, x: (e.clientX - r.left) / (r.width || 1), y: (e.clientY - r.top) / (r.height || 1) })
    }
    document.addEventListener('mousemove', onMove, true)
    document.addEventListener('click', onClick, true)
    document.addEventListener('mousedown', block, true)
    document.addEventListener('mouseup', block, true)
    document.body.style.cursor = 'crosshair'
    return () => {
      document.removeEventListener('mousemove', onMove, true)
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('mousedown', block, true)
      document.removeEventListener('mouseup', block, true)
      document.body.style.cursor = ''
    }
  }, [mode, draft])

  const visible = comments.filter((c) => c.path === path && (showResolved || c.status !== 'done'))
  const openComment = comments.find((c) => c.id === open?.id)

  return (
    <>
      {children}
      <Box {...{ [OVERLAY_ATTR]: '' }} sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: (theme) => theme.zIndex.modal - 1 }}>
        {mode && hover && (
          <Box
            sx={(theme) => ({
              position: 'fixed',
              left: hover.left,
              top: hover.top,
              width: hover.width,
              height: hover.height,
              outline: `2px solid ${theme.tokens.semantic.primaryButtonBackground}`,
              outlineOffset: 2,
              borderRadius: `${theme.tokens.radius.xs}px`,
            })}
          />
        )}
        {visible.map((c, i) => {
          const r = rectOf(c.selector)
          if (!r) return null
          return (
            <CommentPin
              key={c.id}
              data-comment-id={c.id}
              author={c.author}
              status={c.status}
              selected={open?.id === c.id}
              aria-label={`Comment ${i + 1} from ${c.author}: ${c.text}`}
              onClick={(e) => setOpen({ id: c.id, anchor: e.currentTarget })}
              // The pin's pointed bottom-left corner sits on the spot that was clicked.
              sx={{ position: 'fixed', left: r.left + c.x * r.width, top: r.top + c.y * r.height - 28, pointerEvents: 'auto' }}
            />
          )
        })}
      </Box>

      {draft && (
        <Composer
          anchor={{ left: draft.left, top: draft.top }}
          onCancel={() => setDraft(null)}
          onSubmit={async (text, author) => {
            await api.add({ text, author, path, selector: uniqueSelector(draft.el), element: describeElement(draft.el), x: draft.x, y: draft.y })
            setDraft(null)
            changed()
          }}
        />
      )}

      <Popover
        open={!!openComment}
        anchorEl={open?.anchor}
        onClose={() => setOpen(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        PaperProps={popoverPaper}
        {...{ [OVERLAY_ATTR]: '' }}
      >
        {openComment && (
          <Thread
            comment={openComment}
            onStatus={async (status) => {
              await api.setStatus(openComment.id, status)
              setOpen(null)
              changed()
            }}
            onDelete={async () => {
              await api.remove(openComment.id)
              setOpen(null)
              changed()
            }}
          />
        )}
      </Popover>
    </>
  )
}

function Composer({ anchor, onCancel, onSubmit }: { anchor: { left: number; top: number }; onCancel: () => void; onSubmit: (text: string, author: string) => Promise<void> }) {
  const [text, setText] = useState('')
  const [author, setAuthor] = useState(readAuthor)
  const [known] = useState(() => !!readAuthor())
  const [error, setError] = useState('')
  const submit = async () => {
    try {
      localStorage.setItem(AUTHOR_KEY, author.trim())
    } catch {
      /* the name just isn't remembered */
    }
    await onSubmit(text, author).catch((e: Error) => setError(e.message))
  }
  return (
    <Popover open anchorReference="anchorPosition" anchorPosition={anchor} onClose={onCancel} PaperProps={popoverPaper} {...{ [OVERLAY_ATTR]: '' }}>
      <Box
        component="form"
        aria-label="New comment"
        onSubmit={(e) => {
          e.preventDefault()
          void submit()
        }}
        sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.sm}px`, padding: `${theme.tokens.space.m}px` })}
      >
        {!known && <InputField label="Your name" value={author} onChange={(e) => setAuthor(e.target.value)} fullWidth size="small" />}
        <InputField
          label="Comment"
          placeholder="What should change here?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) void submit()
          }}
          multiline
          minRows={2}
          fullWidth
          autoFocus={known}
          validation={error ? 'error' : 'none'}
          helperText={error || undefined}
        />
        <Box sx={(theme) => ({ display: 'flex', justifyContent: 'flex-end', gap: `${theme.tokens.space.s}px` })}>
          <Button variant="text" size="small" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" size="small" type="submit" disabled={!text.trim() || !author.trim()}>
            Comment
          </Button>
        </Box>
      </Box>
    </Popover>
  )
}

function Thread({ comment, onStatus, onDelete }: { comment: DemoComment; onStatus: (s: CommentStatus) => void; onDelete: () => void }) {
  const when = new Date(comment.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
  const badge = STATUS_BADGE[comment.status]
  const closed = comment.status === 'done'
  return (
    <Box data-testid="comment-thread" sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.s}px`, padding: `${theme.tokens.space.m}px` })}>
      <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: `${theme.tokens.space.s}px` })}>
        <Box>
          <Typography variant="subtitle2" sx={(theme) => ({ color: theme.tokens.semantic.textPrimary })}>
            {comment.author}
          </Typography>
          <Typography variant="caption" sx={(theme) => ({ color: theme.tokens.semantic.textSecondary })}>
            {when}
          </Typography>
        </Box>
        <Badge type={badge.type} label={badge.label} />
      </Box>
      <Typography variant="body2" sx={(theme) => ({ color: theme.tokens.semantic.textPrimary, overflowWrap: 'anywhere' })}>
        {comment.text}
      </Typography>
      {comment.agentNote && (
        <Typography variant="caption" sx={(theme) => ({ color: theme.tokens.semantic.textSecondary, overflowWrap: 'anywhere' })}>
          Watch mode: {comment.agentNote}
        </Typography>
      )}
      <Box sx={(theme) => ({ display: 'flex', justifyContent: 'flex-end', gap: `${theme.tokens.space.s}px`, mt: `${theme.tokens.space.xs}px` })}>
        <Button variant="text" size="small" color="error" onClick={onDelete}>
          Delete
        </Button>
        <Button variant="outlined" size="small" onClick={() => onStatus(closed ? 'pending' : 'done')} disabled={comment.status === 'in-progress'}>
          {closed ? 'Reopen' : 'Resolve'}
        </Button>
      </Box>
    </Box>
  )
}
