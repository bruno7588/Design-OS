import { expect, test } from '@playwright/test'

// Level illustration checks against Figma Illustrations/ Learning path (dark 9120:9437, light 11196:8794).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/level-illustration')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`level-illustration-matrix-${mode}`).screenshot({ path: `e2e/screenshots/level-illustration-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('32 illustrations, 56 and 72px, all loaded', async ({ page }) => {
  const imgs = page.getByTestId('level-illustration-matrix-light').locator('img')
  await expect(imgs).toHaveCount(32)
  const m = await imgs.evaluateAll((els) => els.map((e) => [(e as HTMLImageElement).naturalWidth > 0, Math.round(e.getBoundingClientRect().width)]))
  expect(m.every(([ok]) => ok)).toBe(true)
  expect(m.slice(0, 4).map(([, w]) => w)).toEqual([56, 72, 56, 72])
})
