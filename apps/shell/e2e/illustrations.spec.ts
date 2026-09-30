import { expect, test } from '@playwright/test'

// Illustration sets (batch 22): every file loads at its drawn size, in both modes.

test.use({ viewport: { width: 1600, height: 1200 } })

const SETS = [
  { slug: 'certificate-illustration', count: 4, first: 240 },
  { slug: 'gamification-illustration', count: 4, first: 96 },
  { slug: 'progress-illustration', count: 7, first: 40 },
  { slug: 'assessment-illustration', count: 22, first: 56 },
  { slug: 'empty-state-illustration', count: 33, first: 72 },
  { slug: 'function-illustration', count: 20, first: 96 },
]

for (const s of SETS) {
  for (const mode of ['light', 'dark'] as const) {
    test(`${s.slug}: ${s.count} loaded, matrix screenshot, ${mode}`, async ({ page }) => {
      await page.goto(`/components/${s.slug}`)
      if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
      const matrix = page.getByTestId(`${s.slug}-matrix-${mode}`)
      const imgs = matrix.locator('img')
      await expect(imgs).toHaveCount(s.count)
      await page.waitForFunction((sel) => [...document.querySelectorAll(sel)].every((i) => (i as HTMLImageElement).complete), `[data-testid="${s.slug}-matrix-${mode}"] img`)
      const m = await imgs.evaluateAll((els) => els.map((e) => [(e as HTMLImageElement).naturalWidth > 0, Math.round(e.getBoundingClientRect().height), e.getAttribute('alt')]))
      expect(m.every(([ok, , alt]) => ok && alt === '')).toBe(true)
      expect(m[0][1]).toBe(s.first)
      await matrix.screenshot({ path: `e2e/screenshots/${s.slug}-matrix-${mode}.png`, animations: 'disabled' })
    })
  }
}

test('the Passed, Nearly there and Not passed rings follow the page background', async ({ page }) => {
  await page.goto('/components/progress-illustration')
  const light = await page.getByTestId('progress-illustration-matrix-light').locator('img').nth(4).getAttribute('src')
  await page.getByRole('button', { name: 'Dark', exact: true }).click()
  const dark = await page.getByTestId('progress-illustration-matrix-dark').locator('img').nth(4).getAttribute('src')
  // A different file per mode (Vite may inline them as data URLs, so compare the sources).
  expect(light).not.toEqual(dark)
  const streak = await page.getByTestId('progress-illustration-matrix-dark').locator('img').first().getAttribute('src')
  await page.getByRole('button', { name: 'Light', exact: true }).click()
  expect(await page.getByTestId('progress-illustration-matrix-light').locator('img').first().getAttribute('src')).toEqual(streak)
})

test('Share is 120 wide in the Empty state', async ({ page }) => {
  // Share is fifth in the Figma order.
  await page.goto('/components/empty-state-illustration')
  const w = await page.getByTestId('empty-state-illustration-matrix-light').locator('img').nth(4).evaluate((e) => Math.round(e.getBoundingClientRect().width))
  expect(w).toBe(120)
})
