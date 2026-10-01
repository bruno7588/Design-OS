// @design-os/demos: the shape of a demo folder (apps/playground/demos/<slug>/demo.json),
// shared by the server, which reads and writes the folders, and the shell, which shows them.

export const PLATFORMS = ['Admin', 'Web app', 'Native app'] as const
export type Platform = (typeof PLATFORMS)[number]

/** The feature of a starter demo. Every other demo names a feature from the vault's 20 features. */
export const TEMPLATE_FEATURE = 'Template'

export interface DemoVersion {
  /** v1, v2, … */
  id: string
  note: string
  savedAt: string
  author: string
}

export interface DemoMeta {
  name: string
  feature: string
  platform: Platform
  author: string
  description: string
  /** A starter: duplicate it to begin a demo. */
  template: boolean
  /** The handoff file in the demo folder. */
  handoff: string
  createdAt: string
  updatedAt: string
  /** Oldest first. */
  versions: DemoVersion[]
  duplicatedFrom?: { slug: string; version?: string }
}

/** A demo as the server lists it: the folder name plus demo.json and its thumbnail time. */
export interface DemoSummary extends DemoMeta {
  slug: string
  /** When thumbnail.png was last written; null if there isn't one yet. */
  thumbnailAt: string | null
}

export interface DemoList {
  demos: DemoSummary[]
  /** Features from the vault's 20 features index. */
  features: string[]
  playgroundUrl: string
}

export interface DemoDetail extends DemoSummary {
  /** The handoff Markdown of the requested version (or the working copy). */
  handoffBody: string
}

export const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
export const VERSION = /^v\d+$/

/** "Bulk invite: CSV v2" → "bulk-invite-csv-v2". */
export const slugify = (name: string) =>
  name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/, '') || 'demo'
