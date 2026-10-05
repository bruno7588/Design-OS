import type { DemoComment, FrameMessage, NewComment } from '@design-os/demos'

// The comments API on the Design OS server (through the playground's /api proxy), and messages
// to the Prototypes viewer around the frame.

async function call<T>(url: string, init?: RequestInit): Promise<T> {
  const r = await fetch(url, { ...init, headers: { 'content-type': 'application/json', ...init?.headers } })
  const body = await r.json().catch(() => null)
  if (!r.ok) throw new Error(body?.error ?? "The Design OS server isn't running.")
  return body as T
}

export const commentsApi = (slug: string) => ({
  list: () => call<{ comments: DemoComment[] }>(`/api/demos/${slug}/comments`).then((r) => r.comments),
  add: (c: NewComment) => call<DemoComment>(`/api/demos/${slug}/comments`, { method: 'POST', body: JSON.stringify(c) }),
  setStatus: (id: string, status: DemoComment['status']) => call<DemoComment>(`/api/demos/${slug}/comments/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  remove: (id: string) => call(`/api/demos/${slug}/comments/${id}`, { method: 'DELETE', body: '{}' }),
})

/** The Prototypes viewer's origin; messages from anywhere else are ignored. */
export const SHELL_ORIGIN = import.meta.env.VITE_SHELL_ORIGIN ?? 'http://localhost:5173'

export function tellShell(message: FrameMessage) {
  if (window.parent !== window) window.parent.postMessage(message, SHELL_ORIGIN)
}
