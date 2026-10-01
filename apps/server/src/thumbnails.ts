import { existsSync, watch, type FSWatcher } from 'node:fs'
import { rename, rm } from 'node:fs/promises'
import { join, sep } from 'node:path'
import { chromium, type Browser } from 'playwright'
import { SLUG } from '@design-os/demos'
import { listDemos } from './demos'

// Demo thumbnails. Playwright opens the running playground at 1440×900 in dark mode and writes
// <slug>/thumbnail.png. The demos folder is watched: a save anywhere in <slug>/src/ takes a new
// shot 2 seconds after the last change. Shots run one at a time; if the playground isn't
// running they're skipped and the gallery shows its placeholder.

export interface Thumbnailer {
  /** Takes a shot soon (after delayMs), replacing any pending one for the same demo. */
  schedule(slug: string, delayMs?: number): void
  /** Drops a pending shot, such as when the demo is deleted. */
  cancel(slug: string): void
  /** Takes a shot now and resolves when it's written. */
  shoot(slug: string): Promise<boolean>
  watch(): void
  /** Shoots every demo that has no thumbnail yet. */
  fillMissing(): Promise<void>
  close(): Promise<void>
}

interface Log {
  info(msg: string): void
  warn(msg: string): void
}

export function createThumbnailer({ dir, playgroundUrl, log }: { dir: string; playgroundUrl: string; log: Log }): Thumbnailer {
  let browser: Promise<Browser> | null = null
  let watcher: FSWatcher | null = null
  const timers = new Map<string, NodeJS.Timeout>()
  let chain: Promise<unknown> = Promise.resolve()

  const reachable = async () => {
    try {
      await fetch(playgroundUrl, { signal: AbortSignal.timeout(2000) })
      return true
    } catch {
      return false
    }
  }

  // A demo that's been deleted (or is being deleted) gets no thumbnail: writing one would
  // recreate its folder.
  const exists = (slug: string) => existsSync(join(dir, slug, 'demo.json'))

  const take = async (slug: string) => {
    if (!exists(slug)) return false
    if (!(await reachable())) {
      log.warn(`Thumbnail for ${slug} skipped: the playground isn't running at ${playgroundUrl}.`)
      return false
    }
    browser ??= chromium.launch()
    const page = await (await browser).newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
    try {
      await page.addInitScript(() => localStorage.setItem('design-os-mode', 'dark'))
      await page.goto(`${playgroundUrl}/demos/${slug}`, { waitUntil: 'networkidle', timeout: 30_000 })
      await page.evaluate(() => document.fonts.ready)
      await page.waitForTimeout(300)
      // Shoot to a temporary file, then swap it in, so the gallery never reads half a file.
      const tmp = join(dir, `.${slug}.thumbnail.tmp.png`)
      await page.screenshot({ path: tmp, animations: 'disabled' })
      if (!exists(slug)) {
        await rm(tmp, { force: true })
        return false
      }
      await rename(tmp, join(dir, slug, 'thumbnail.png'))
      log.info(`Thumbnail written for ${slug}.`)
      return true
    } catch (e) {
      log.warn(`Thumbnail for ${slug} failed: ${(e as Error).message}`)
      return false
    } finally {
      await page.close()
    }
  }

  const shoot = (slug: string) => {
    const run = chain.then(() => take(slug))
    chain = run.catch(() => {})
    return run
  }

  return {
    schedule(slug, delayMs = 2000) {
      clearTimeout(timers.get(slug))
      timers.set(
        slug,
        setTimeout(() => {
          timers.delete(slug)
          void shoot(slug)
        }, delayMs),
      )
    },
    cancel(slug) {
      clearTimeout(timers.get(slug))
      timers.delete(slug)
    },
    shoot,
    watch() {
      watcher = watch(dir, { recursive: true }, (_event, filename) => {
        if (!filename) return
        const [slug, folder] = filename.split(sep)
        if (folder === 'src' && SLUG.test(slug) && exists(slug)) this.schedule(slug)
      })
    },
    async fillMissing() {
      for (const d of await listDemos(dir)) if (!d.thumbnailAt) this.schedule(d.slug, 0)
    },
    async close() {
      watcher?.close()
      timers.forEach(clearTimeout)
      if (browser) await (await browser).close()
    },
  }
}
