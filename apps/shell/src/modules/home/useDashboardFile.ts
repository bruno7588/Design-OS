import { useEffect, useState } from 'react'

// Home only reads files: GET /api/dashboard/<file> returns one file from the vault's
// "50 outputs/dashboard" folder (apps/server). Formats: docs/phase-3-notes.md.

interface Loaded {
  file: string
  vault: string
  updatedAt: string
  /** Sample data written by hand, not by a skill or engine yet. */
  sample: boolean
}
export type DashboardJson<T> = Loaded & { kind: 'json'; data: T }
export type DashboardMarkdown = Loaded & { kind: 'markdown'; body: string }

export type DashboardState<F> =
  | { status: 'loading' }
  | { status: 'missing' }
  /** The server isn't running. Home shows one alert for this, not one per card. */
  | { status: 'offline' }
  /** The file is there but can't be read, such as broken JSON. */
  | { status: 'error'; message: string }
  | ({ status: 'ok' } & F)

export function useDashboardFile<F extends DashboardJson<unknown> | DashboardMarkdown>(file: string): DashboardState<F> {
  const [state, setState] = useState<DashboardState<F>>({ status: 'loading' })

  useEffect(() => {
    let live = true
    fetch(`/api/dashboard/${encodeURIComponent(file)}`)
      .then(async (r) => {
        const body = await r.json().catch(() => null)
        if (!live) return
        if (r.ok && body) setState({ status: 'ok', ...body })
        else if (r.status === 404) setState({ status: 'missing' })
        // No JSON body means the dev proxy answered: the server isn't running.
        else if (!body) setState({ status: 'offline' })
        else setState({ status: 'error', message: body.error })
      })
      .catch(() => live && setState({ status: 'offline' }))
    return () => {
      live = false
    }
  }, [file])

  return state
}

/** A link that opens a vault note in Obsidian. `file` is a path from the vault root, or a note name. */
export function obsidianUrl(vault: string, file: string) {
  const enc = (s: string) => encodeURIComponent(s).replace(/\(/g, '%28').replace(/\)/g, '%29')
  return `obsidian://open?vault=${enc(vault)}&file=${enc(file)}`
}

export const DASHBOARD_FOLDER = '50 outputs/dashboard'
