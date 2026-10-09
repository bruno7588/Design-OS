// pnpm build:site: the private shared site (Phase 4d), deployed by Vercel on every push.
// Builds the shell and the playground read-only (VITE_STATIC=1), exports the demos' data the
// Design OS server would serve, and puts it all in site/:
//   site/                 the shell: Components and Prototypes
//   site/playground/      the playground, where demos run
//   site/data/            demos.json, one JSON per demo and version (with the handoff), thumbnails
// Run with tsx: it imports @design-os/demos/folders, which is TypeScript.

import { execSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { DemoList } from '@design-os/demos'
import { demoFolder, listDemos, readDemo } from '@design-os/demos/folders'

const root = fileURLToPath(new URL('..', import.meta.url))
const site = join(root, 'site')
const demosDir = join(root, 'apps/playground/demos')

const run = (cmd: string, env: Record<string, string>) => execSync(cmd, { cwd: root, stdio: 'inherit', env: { ...process.env, ...env } })

rmSync(site, { recursive: true, force: true })

// 1. Both apps, read-only.
run('pnpm --filter @design-os/shell build', { VITE_STATIC: '1' })
run('pnpm --filter @design-os/playground build', { VITE_STATIC: '1', VITE_BASE: '/playground/' })
cpSync(join(root, 'apps/shell/dist'), site, { recursive: true })
cpSync(join(root, 'apps/playground/dist'), join(site, 'playground'), { recursive: true })

// 2. The demo data, in the shapes /api/demos returns (see apps/shell/src/modules/prototypes/useDemos.ts).
const data = join(site, 'data', 'demos')
mkdirSync(data, { recursive: true })
const write = (path: string, value: unknown) => writeFileSync(path, JSON.stringify(value))
const thumbnail = (from: string, to: string) => {
  if (!existsSync(join(from, 'thumbnail.png'))) return
  mkdirSync(to, { recursive: true })
  cpSync(join(from, 'thumbnail.png'), join(to, 'thumbnail.png'))
}

// Comments stay on Bruno's machine: the shared copy is read-only.
const demos = (await listDemos(demosDir)).map((d) => ({ ...d, openComments: 0 }))
const list: DemoList = {
  demos,
  features: [...new Set(demos.filter((d) => !d.template).map((d) => d.feature))].sort((a, b) => a.localeCompare(b)),
  playgroundUrl: '/playground',
}
write(join(site, 'data', 'demos.json'), list)

let files = 0
for (const d of demos) {
  write(join(data, `${d.slug}.json`), { ...(await readDemo(demosDir, d.slug)), openComments: 0 })
  thumbnail(demoFolder(demosDir, d.slug), join(data, d.slug))
  files++
  for (const v of d.versions) {
    mkdirSync(join(data, d.slug, 'v'), { recursive: true })
    write(join(data, d.slug, 'v', `${v.id}.json`), { ...(await readDemo(demosDir, d.slug, v.id)), openComments: 0 })
    thumbnail(demoFolder(demosDir, d.slug, v.id), join(data, d.slug, 'v', v.id))
    files++
  }
}

console.log(`\nShared site built in site/: ${demos.length} demos, ${files} demo files.`)
