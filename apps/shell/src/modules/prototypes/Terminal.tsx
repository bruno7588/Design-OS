import { useEffect, useRef, useState } from 'react'
import { Box, Typography, useTheme, type Theme } from '@mui/material'
import { Alert, Button, CardRoot } from '@design-os/components'
import { Terminal as XTerm, type ITheme } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'

// The Claude Code terminal beside a demo: xterm.js on the server's /api/terminal WebSocket
// (apps/server/src/terminal.ts). The session belongs to the demo and outlives this page, so
// leaving and coming back picks up where it was. Reconnects by itself if the socket drops.

// Terminals need a fixed-width font; the 5Mins type scale has none, so this is the system one.
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

function termTheme(theme: Theme): ITheme {
  const s = theme.tokens.semantic
  return { background: s.cardsBackground, foreground: s.textPrimary, cursor: s.primaryButtonBackground, cursorAccent: s.cardsBackground, selectionBackground: s.inputBackgroundHover }
}

export function Terminal({ slug, note }: { slug: string; note?: string }) {
  const theme = useTheme<Theme>()
  const host = useRef<HTMLDivElement>(null)
  const term = useRef<XTerm | null>(null)
  const socket = useRef<WebSocket | null>(null)
  const [state, setState] = useState<'connecting' | 'open' | 'closed'>('connecting')

  useEffect(() => {
    if (!host.current) return
    const xterm = new XTerm({ fontFamily: MONO, fontSize: 13, lineHeight: 1.2, cursorBlink: true, theme: termTheme(theme), scrollback: 5000 })
    const fit = new FitAddon()
    xterm.loadAddon(fit)
    xterm.open(host.current)
    term.current = xterm
    let disposed = false
    let retry: ReturnType<typeof setTimeout> | undefined

    const send = (msg: object) => socket.current?.readyState === WebSocket.OPEN && socket.current.send(JSON.stringify(msg))
    const sendSize = () => send({ type: 'resize', cols: xterm.cols, rows: xterm.rows })

    const connect = () => {
      const ws = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/api/terminal?demo=${encodeURIComponent(slug)}`)
      socket.current = ws
      setState('connecting')
      ws.onopen = () => {
        setState('open')
        xterm.reset()
        sendSize()
        xterm.focus()
      }
      ws.onmessage = (e) => xterm.write(typeof e.data === 'string' ? e.data : '')
      ws.onclose = () => {
        if (disposed) return
        setState('closed')
        retry = setTimeout(connect, 2000)
      }
    }

    const input = xterm.onData((data) => send({ type: 'input', data }))
    const resized = xterm.onResize(sendSize)
    const observer = new ResizeObserver(() => {
      try {
        fit.fit()
      } catch {
        /* hidden or zero-sized */
      }
    })
    observer.observe(host.current)
    fit.fit()
    connect()

    return () => {
      disposed = true
      clearTimeout(retry)
      observer.disconnect()
      input.dispose()
      resized.dispose()
      socket.current?.close()
      xterm.dispose()
      term.current = null
    }
    // The theme follows separately, so switching modes doesn't reconnect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  useEffect(() => {
    if (term.current) term.current.options.theme = termTheme(theme)
  }, [theme])

  return (
    <CardRoot hover={false} data-testid="terminal" sx={{ display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0, height: '100%' }}>
      <Box sx={(t) => ({ display: 'flex', alignItems: 'center', gap: 3, px: 4, py: 2, borderBottom: `1px solid ${t.tokens.semantic.border}` })}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle2" sx={(t) => ({ color: t.tokens.semantic.textPrimary })}>
            Claude Code
          </Typography>
          <Typography variant="caption" sx={(t) => ({ color: t.tokens.semantic.textSecondary })}>
            demos/{slug}
            {note ? ` · ${note}` : ''}
            {state === 'connecting' ? ' · Connecting' : ''}
          </Typography>
        </Box>
        <Button variant="text" size="small" onClick={() => socket.current?.readyState === WebSocket.OPEN && socket.current.send(JSON.stringify({ type: 'restart' }))}>
          Restart
        </Button>
      </Box>
      {state === 'closed' && (
        <Box sx={{ p: 4 }}>
          <Alert type="alert" icon illustration={false} title="The terminal isn't connected">
            It runs through the Design OS server. Start it with pnpm dev; this reconnects by itself.
          </Alert>
        </Box>
      )}
      <Box ref={host} aria-label="Claude Code terminal" sx={{ flex: 1, minHeight: 0, p: 3, '& .xterm': { height: '100%' } }} />
    </CardRoot>
  )
}
