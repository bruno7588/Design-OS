import { existsSync } from 'node:fs'
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { SLUG, TEMPLATE_FEATURE, VERSION, slugify, type DemoDetail, type DemoMeta, type DemoSummary, type DemoVersion } from '@design-os/demos'

// Demo folders in apps/playground/demos: listing, versions, duplicates. Plain functions that take
// the demos folder, so they can be tested on a temporary one (demos.test.ts).
//
//   <slug>/demo.json, handoff.md, thumbnail.png, src/   the working copy
//   <slug>/versions/vN/src, handoff.md, thumbnail.png   frozen snapshots

export class DemoError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
  }
}

export interface DemoContext {
  dir: string
  author: string
  now?: () => Date
}

const stamp = (ctx: DemoContext) => (ctx.now ? ctx.now() : new Date()).toISOString()

function checkSlug(slug: string) {
  if (!SLUG.test(slug)) throw new DemoError(400, `"${slug}" isn't a valid demo name.`)
}

function checkVersion(version: string | undefined) {
  if (version !== undefined && !VERSION.test(version)) throw new DemoError(400, `"${version}" isn't a valid version.`)
}

/** The folder holding a demo's src, handoff and thumbnail: the working copy or a version. */
export function demoFolder(dir: string, slug: string, version?: string) {
  checkSlug(slug)
  checkVersion(version)
  return version ? join(dir, slug, 'versions', version) : join(dir, slug)
}

async function readMeta(dir: string, slug: string): Promise<DemoMeta> {
  checkSlug(slug)
  try {
    return JSON.parse(await readFile(join(dir, slug, 'demo.json'), 'utf8'))
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === 'ENOENT') throw new DemoError(404, `There's no demo called ${slug}.`)
    throw new DemoError(500, `${slug}/demo.json isn't valid JSON.`)
  }
}

const writeMeta = (dir: string, slug: string, meta: DemoMeta) => writeFile(join(dir, slug, 'demo.json'), JSON.stringify(meta, null, 2) + '\n')

async function openComments(folder: string) {
  try {
    const { comments } = JSON.parse(await readFile(join(folder, 'comments.json'), 'utf8'))
    return (comments as { status: string }[]).filter((c) => c.status !== 'done').length
  } catch {
    return 0
  }
}

async function thumbnailAt(folder: string) {
  try {
    return (await stat(join(folder, 'thumbnail.png'))).mtime.toISOString()
  } catch {
    return null
  }
}

export async function listDemos(dir: string): Promise<DemoSummary[]> {
  if (!existsSync(dir)) return []
  const entries = await readdir(dir, { withFileTypes: true })
  const demos: DemoSummary[] = []
  for (const e of entries) {
    if (!e.isDirectory() || !SLUG.test(e.name) || !existsSync(join(dir, e.name, 'demo.json'))) continue
    try {
      const meta = await readMeta(dir, e.name)
      demos.push({ ...meta, slug: e.name, thumbnailAt: await thumbnailAt(join(dir, e.name)), openComments: await openComments(join(dir, e.name)) })
    } catch {
      // A broken demo.json shouldn't hide the others.
    }
  }
  // Starters first, then the most recently changed.
  return demos.sort((a, b) => Number(b.template) - Number(a.template) || b.updatedAt.localeCompare(a.updatedAt))
}

export async function readDemo(dir: string, slug: string, version?: string): Promise<DemoDetail> {
  const meta = await readMeta(dir, slug)
  if (version && !meta.versions.some((v) => v.id === version)) throw new DemoError(404, `${slug} has no ${version}.`)
  const folder = demoFolder(dir, slug, version)
  let handoffBody = ''
  try {
    handoffBody = await readFile(join(folder, meta.handoff), 'utf8')
  } catch {
    /* no handoff yet */
  }
  return { ...meta, slug, thumbnailAt: await thumbnailAt(folder), openComments: await openComments(demoFolder(dir, slug)), handoffBody }
}

/** Freezes the working copy as the next version (v1, v2, …). */
export async function saveVersion(ctx: DemoContext, slug: string, note: string): Promise<DemoVersion> {
  const meta = await readMeta(ctx.dir, slug)
  const next = Math.max(0, ...meta.versions.map((v) => Number(v.id.slice(1)))) + 1
  const version: DemoVersion = { id: `v${next}`, note: note.trim() || `Version ${next}`, savedAt: stamp(ctx), author: ctx.author }
  const from = demoFolder(ctx.dir, slug)
  const to = demoFolder(ctx.dir, slug, version.id)
  await mkdir(to, { recursive: true })
  await cp(join(from, 'src'), join(to, 'src'), { recursive: true })
  for (const file of [meta.handoff, 'thumbnail.png']) if (existsSync(join(from, file))) await cp(join(from, file), join(to, file))
  await writeMeta(ctx.dir, slug, { ...meta, versions: [...meta.versions, version], updatedAt: version.savedAt })
  return version
}

/** Copies a demo (its working copy or one version) into a new folder, without the version history. */
export async function duplicateDemo(
  ctx: DemoContext,
  slug: string,
  options: { name: string; feature?: string; version?: string },
): Promise<DemoSummary> {
  const name = options.name.trim()
  if (!name) throw new DemoError(400, 'The new demo needs a name.')
  const meta = await readMeta(ctx.dir, slug)
  if (options.version && !meta.versions.some((v) => v.id === options.version)) throw new DemoError(404, `${slug} has no ${options.version}.`)
  const feature = options.feature?.trim() || meta.feature
  if (feature === TEMPLATE_FEATURE && meta.template) throw new DemoError(400, 'Pick the feature this demo is for.')

  const base = slugify(name)
  let newSlug = base
  for (let n = 2; existsSync(join(ctx.dir, newSlug)); n++) newSlug = `${base}-${n}`

  const from = demoFolder(ctx.dir, slug, options.version)
  const to = join(ctx.dir, newSlug)
  await mkdir(to, { recursive: true })
  await cp(join(from, 'src'), join(to, 'src'), { recursive: true })
  for (const file of [meta.handoff, 'thumbnail.png']) if (existsSync(join(from, file))) await cp(join(from, file), join(to, file))

  const now = stamp(ctx)
  const copy: DemoMeta = {
    name,
    feature,
    platform: meta.platform,
    author: ctx.author,
    description: meta.template ? '' : meta.description,
    template: false,
    handoff: meta.handoff,
    createdAt: now,
    updatedAt: now,
    versions: [],
    duplicatedFrom: { slug, ...(options.version ? { version: options.version } : {}) },
  }
  await writeMeta(ctx.dir, newSlug, copy)
  return { ...copy, slug: newSlug, thumbnailAt: await thumbnailAt(to), openComments: 0 }
}

export async function deleteDemo(dir: string, slug: string) {
  const meta = await readMeta(dir, slug)
  if (meta.template) throw new DemoError(409, `${meta.name} is a starter and can't be deleted.`)
  await rm(join(dir, slug), { recursive: true, force: true })
}

/** Feature names from the vault's "20 features/_index.md" table. */
export async function readFeatures(vaultPath: string): Promise<string[]> {
  try {
    const text = await readFile(join(vaultPath, '20 features', '_index.md'), 'utf8')
    return text
      .split('\n')
      .filter((l) => l.startsWith('|') && !/^\|\s*-/.test(l))
      .map((l) => l.split('|')[1]?.trim() ?? '')
      .filter((f) => f && f !== 'Feature')
      .sort((a, b) => a.localeCompare(b))
  } catch {
    return []
  }
}
