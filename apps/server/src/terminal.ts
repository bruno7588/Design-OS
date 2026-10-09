import { chmodSync, existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import type { FastifyInstance } from 'fastify'
import websocket from '@fastify/websocket'
import * as pty from 'node-pty'
import { SLUG } from '@design-os/demos'

// The Claude Code terminal beside a demo (Phase 4d). One session per demo: `claude` runs from
// the repo root, so it reads CLAUDE.md, told which demo is open. Sessions outlive the page, so
// leaving the viewer doesn't stop Claude mid-change; coming back replays the recent output.
//
// Local only: the server listens on 127.0.0.1, and the WebSocket also checks Origin, because
// any website open in the browser could otherwise connect to it.

const SCROLLBACK = 200_000

/** Pages allowed to open a terminal: the Design OS shell. */
export const SHELL_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173']

type ClientMessage = { type: 'input'; data: string } | { type: 'resize'; cols: number; rows: number } | { type: 'restart' }

interface Session {
  pty: pty.IPty
  buffer: string
  clients: Set<{ send(data: string): void }>
}

// node-pty's prebuilt helper can lose its execute bit when unpacked (pnpm, macOS), which makes
// every spawn fail with "posix_spawnp failed". Put it back.
function fixSpawnHelper() {
  try {
    const root = dirname(createRequire(import.meta.url).resolve('node-pty/package.json'))
    for (const dir of [`prebuilds/${process.platform}-${process.arch}`, 'build/Release']) {
      const helper = join(root, dir, 'spawn-helper')
      if (existsSync(helper)) chmodSync(helper, 0o755)
    }
  } catch {
    /* not fatal: spawning will report its own error */
  }
}

export function claudeCommand(slug: string) {
  return [
    'claude',
    '--append-system-prompt',
    `The user is looking at the demo "${slug}" in the Design OS Prototypes module. Its code is in apps/playground/demos/${slug}/src. Read apps/playground/demos/README.md before changing it, and only edit that demo's src unless the user asks for something else.`,
  ]
}

export async function registerTerminal(app: FastifyInstance, { repoRoot }: { repoRoot: string }) {
  fixSpawnHelper()
  await app.register(websocket)
  const sessions = new Map<string, Session>()

  const start = (slug: string): Session => {
    const [file, ...args] = claudeCommand(slug)
    const term = pty.spawn(file, args, {
      name: 'xterm-256color',
      cols: 100,
      rows: 30,
      cwd: repoRoot,
      env: { ...process.env, TERM: 'xterm-256color', COLORTERM: 'truecolor' } as Record<string, string>,
    })
    const session: Session = { pty: term, buffer: '', clients: new Set() }
    term.onData((data) => {
      session.buffer = (session.buffer + data).slice(-SCROLLBACK)
      for (const c of session.clients) c.send(data)
    })
    term.onExit(({ exitCode }) => {
      const note = `\r\n\x1b[2m[Claude Code ended (${exitCode}). Press Restart to start again.]\x1b[0m\r\n`
      session.buffer += note
      for (const c of session.clients) c.send(note)
      if (sessions.get(slug) === session) sessions.delete(slug)
    })
    sessions.set(slug, session)
    return session
  }

  app.get<{ Querystring: { demo?: string } }>('/api/terminal', { websocket: true }, (socket, req) => {
    const origin = req.headers.origin ?? ''
    const slug = req.query.demo ?? ''
    if (!SHELL_ORIGINS.includes(origin) || !SLUG.test(slug)) {
      socket.close(1008, 'Not allowed')
      return
    }
    let session = sessions.get(slug) ?? start(slug)
    const client = { send: (data: string) => socket.readyState === socket.OPEN && socket.send(data) }
    session.clients.add(client)
    if (session.buffer) client.send(session.buffer)

    socket.on('message', (raw) => {
      let msg: ClientMessage
      try {
        msg = JSON.parse(String(raw))
      } catch {
        return
      }
      if (msg.type === 'input') session.pty.write(msg.data)
      if (msg.type === 'resize' && msg.cols > 0 && msg.rows > 0) session.pty.resize(Math.floor(msg.cols), Math.floor(msg.rows))
      if (msg.type === 'restart') {
        session.clients.delete(client)
        sessions.delete(slug)
        session.pty.kill()
        session = start(slug)
        session.clients.add(client)
        client.send('\x1bc') // clear the screen for the new session
      }
    })
    socket.on('close', () => session.clients.delete(client))
  })

  app.addHook('onClose', async () => {
    for (const s of sessions.values()) s.pty.kill()
    sessions.clear()
  })

  return { sessions }
}
