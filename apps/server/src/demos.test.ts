import { existsSync } from 'node:fs'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { DemoMeta } from '@design-os/demos'
import { DemoError, deleteDemo, demoFolder, duplicateDemo, listDemos, readDemo, readFeatures, saveVersion } from './demos'

let dir: string
const ctx = () => ({ dir, author: 'Bruno Carvalho', now: () => new Date('2026-10-01T10:00:00Z') })

async function makeDemo(slug: string, meta: Partial<DemoMeta> = {}) {
  await mkdir(join(dir, slug, 'src'), { recursive: true })
  await writeFile(join(dir, slug, 'src', 'index.tsx'), `export default () => '${slug}'\n`)
  await writeFile(join(dir, slug, 'handoff.md'), `# ${slug}\n`)
  const full: DemoMeta = {
    name: slug,
    feature: 'Enrolments',
    platform: 'Admin',
    author: 'Bruno Carvalho',
    description: 'A demo',
    template: false,
    handoff: 'handoff.md',
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-01T00:00:00.000Z',
    versions: [],
    ...meta,
  }
  await writeFile(join(dir, slug, 'demo.json'), JSON.stringify(full))
}

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), 'demos-'))
})
afterEach(async () => {
  await rm(dir, { recursive: true, force: true })
})

describe('demos', () => {
  it('lists starters first and skips folders without demo.json', async () => {
    await makeDemo('bulk-invite')
    await makeDemo('admin-starter', { template: true, feature: 'Template' })
    await mkdir(join(dir, 'not-a-demo'))
    const list = await listDemos(dir)
    expect(list.map((d) => d.slug)).toEqual(['admin-starter', 'bulk-invite'])
    expect(list[0].thumbnailAt).toBeNull()
  })

  it('saves numbered versions as frozen snapshots', async () => {
    await makeDemo('bulk-invite')
    const v1 = await saveVersion(ctx(), 'bulk-invite', 'First pass')
    await writeFile(join(dir, 'bulk-invite', 'src', 'index.tsx'), 'changed\n')
    const v2 = await saveVersion(ctx(), 'bulk-invite', '')
    expect([v1.id, v2.id]).toEqual(['v1', 'v2'])
    expect(v2.note).toBe('Version 2')
    expect(await readFile(join(dir, 'bulk-invite', 'versions', 'v1', 'src', 'index.tsx'), 'utf8')).toContain("'bulk-invite'")
    expect(await readFile(join(dir, 'bulk-invite', 'versions', 'v2', 'src', 'index.tsx'), 'utf8')).toBe('changed\n')
    const demo = await readDemo(dir, 'bulk-invite', 'v1')
    expect(demo.versions).toHaveLength(2)
    expect(demo.handoffBody).toBe('# bulk-invite\n')
    expect(demo.updatedAt).toBe('2026-10-01T10:00:00.000Z')
  })

  it('duplicates without the version history, with a unique slug', async () => {
    await makeDemo('bulk-invite')
    await saveVersion(ctx(), 'bulk-invite', 'First pass')
    const a = await duplicateDemo(ctx(), 'bulk-invite', { name: 'Bulk invite' })
    const b = await duplicateDemo(ctx(), 'bulk-invite', { name: 'Bulk invite', version: 'v1' })
    expect(a.slug).toBe('bulk-invite-2')
    expect(b.slug).toBe('bulk-invite-3')
    expect(a.versions).toEqual([])
    expect(b.duplicatedFrom).toEqual({ slug: 'bulk-invite', version: 'v1' })
    expect(existsSync(join(dir, 'bulk-invite-2', 'versions'))).toBe(false)
    expect(existsSync(join(dir, 'bulk-invite-3', 'handoff.md'))).toBe(true)
  })

  it('needs a feature when duplicating a starter', async () => {
    await makeDemo('admin-starter', { template: true, feature: 'Template' })
    await expect(duplicateDemo(ctx(), 'admin-starter', { name: 'New thing' })).rejects.toThrow('Pick the feature')
    const demo = await duplicateDemo(ctx(), 'admin-starter', { name: 'New thing', feature: 'Custom fields' })
    expect(demo).toMatchObject({ slug: 'new-thing', feature: 'Custom fields', template: false, description: '' })
  })

  it('refuses to delete starters, and deletes demos', async () => {
    await makeDemo('admin-starter', { template: true })
    await makeDemo('bulk-invite')
    await expect(deleteDemo(dir, 'admin-starter')).rejects.toMatchObject({ status: 409 })
    await deleteDemo(dir, 'bulk-invite')
    expect(existsSync(join(dir, 'bulk-invite'))).toBe(false)
  })

  it('rejects bad slugs and versions', async () => {
    expect(() => demoFolder(dir, '../etc')).toThrow(DemoError)
    expect(() => demoFolder(dir, 'ok', '../../x')).toThrow(DemoError)
    await expect(readDemo(dir, 'missing')).rejects.toMatchObject({ status: 404 })
    await makeDemo('bulk-invite')
    await expect(readDemo(dir, 'bulk-invite', 'v9')).rejects.toMatchObject({ status: 404 })
  })

  it('reads feature names from the vault index', async () => {
    await mkdir(join(dir, '20 features'))
    await writeFile(join(dir, '20 features', '_index.md'), '| Feature | Aliases |\n|---|---|\n| Reports | analytics |\n| Assessments | x |\n')
    expect(await readFeatures(dir)).toEqual(['Assessments', 'Reports'])
  })
})
