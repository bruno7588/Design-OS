import { useCallback, useEffect, useState } from 'react'

// The Prototypes module talks to the server's /api/demos routes (apps/server/src/demos.ts),
// which read and write the demo folders in apps/playground/demos.

export type Load<T> =
  | { status: 'loading' }
  /** The server isn't running. */
  | { status: 'offline' }
  | { status: 'error'; message: string; code: number }
  | { status: 'ok'; data: T }

/** GETs a JSON route; reload() fetches it again. */
export function useApi<T>(url: string): Load<T> & { reload: () => void } {
  const [state, setState] = useState<Load<T>>({ status: 'loading' })
  const [tick, setTick] = useState(0)
  const reload = useCallback(() => setTick((t) => t + 1), [])

  useEffect(() => {
    let live = true
    fetch(url)
      .then(async (r) => {
        const body = await r.json().catch(() => null)
        if (!live) return
        if (r.ok && body) setState({ status: 'ok', data: body })
        // No JSON body means the dev proxy answered: the server isn't running.
        else if (!body) setState({ status: 'offline' })
        else setState({ status: 'error', message: body.error, code: r.status })
      })
      .catch(() => live && setState({ status: 'offline' }))
    return () => {
      live = false
    }
  }, [url, tick])

  return { ...state, reload }
}

/** POSTs JSON and returns the reply, or throws with the server's message. */
export async function postJson<T>(url: string, body: unknown = {}): Promise<T> {
  const r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
  const reply = await r.json().catch(() => null)
  if (!r.ok) throw new Error(reply?.error ?? "The Design OS server isn't running.")
  return reply as T
}

/** The thumbnail for a demo or one of its versions; stamp busts the cache when it changes. */
export const thumbnailUrl = (slug: string, version?: string, stamp?: string | null) => {
  const q = new URLSearchParams()
  if (version) q.set('version', version)
  if (stamp) q.set('t', stamp)
  const qs = q.toString()
  return `/api/demos/${slug}/thumbnail${qs ? `?${qs}` : ''}`
}

/** "1 Oct 2026" */
export const shortDate = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
