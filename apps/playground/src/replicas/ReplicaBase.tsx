import { createContext, useContext } from 'react'
import { useLocation } from 'react-router-dom'

// Where a replica is mounted: '' for the replica routes (/admin, /web), or the demo's path
// (/demos/<slug>, /demos/<slug>/v/<version>). Layouts navigate relative to it, so a demo's
// side navigation stays inside the demo.

const BaseContext = createContext('')

export const ReplicaBase = BaseContext.Provider

/** The replica's base, a way to build paths under it, and the pathname without it. */
export function useReplicaBase() {
  const base = useContext(BaseContext)
  const { pathname } = useLocation()
  return {
    base,
    to: (path: string) => `${base}${path}`,
    path: pathname.startsWith(base) ? pathname.slice(base.length) : pathname,
  }
}
