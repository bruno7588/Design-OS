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
  /** Comments on the working copy that aren't done yet. */
  openComments: number
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

// Comments on a running demo (Phase 4c): demos/<slug>/comments.json.

export const COMMENT_STATUSES = ['pending', 'in-progress', 'done', 'failed'] as const
export type CommentStatus = (typeof COMMENT_STATUSES)[number]

/** What the commenter clicked, so a person or an agent can find it in the code. */
export interface CommentElement {
  tag: string
  role?: string
  /** The accessible name, such as a button's label. */
  name?: string
  /** Up to 120 characters of the element's text. */
  text?: string
  /** React components from the page down to the element, best effort: "PeoplePage > AdminPage > PageHeader". */
  components?: string
}

export interface DemoComment {
  id: string
  text: string
  author: string
  createdAt: string
  updatedAt: string
  /** Comments are left on the working copy; basedOn is the latest saved version at the time. */
  version: 'current'
  basedOn: string | null
  /** The route inside the demo, such as /admin/people. */
  path: string
  selector: string
  element: CommentElement
  /** Where the pin sits inside the element, 0 to 1 from its top-left corner. */
  x: number
  y: number
  status: CommentStatus
  /** What watch mode changed, or why it couldn't. */
  agentNote?: string
}

export type NewComment = Pick<DemoComment, 'text' | 'author' | 'path' | 'selector' | 'element' | 'x' | 'y'>

export interface WatchState {
  on: boolean
  /** True while Haiku is working on a comment in this demo. */
  busy: boolean
  /** The comment being worked on. */
  current: string | null
}

/** Messages between the Prototypes viewer (shell) and the demo frame (playground). */
export type FrameMessage =
  | { type: 'design-os:comment-mode'; on: boolean }
  | { type: 'design-os:focus-comment'; id: string }
  | { type: 'design-os:show-resolved'; on: boolean }
  | { type: 'design-os:comments-changed' }
  /** The demo's comment layer is listening; the viewer replies with its comment mode. */
  | { type: 'design-os:frame-ready' }
  | { type: 'design-os:comment-mode-changed'; on: boolean }
