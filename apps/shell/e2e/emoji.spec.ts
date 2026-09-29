import { expect, test } from '@playwright/test'

// Emoji checks against Figma Emojies (dark 10587:2256, light board 12368:97).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/emoji')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`emoji-matrix-${mode}`).screenshot({ path: `e2e/screenshots/emoji-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('13 emojis at 240; plain faces follow the mode', async ({ page }) => {
  const m = page.getByTestId('emoji-matrix-light').locator('.ds-emoji')
  await expect(m).toHaveCount(13)
  const face = () => m.first().locator('circle').evaluate((c) => getComputedStyle(c).fill)
  expect(await face()).toBe('rgba(191, 194, 204, 0.16)') // Input-background, light
  const size = await m.nth(3).evaluate((e) => [Math.round(e.getBoundingClientRect().width), (e as HTMLImageElement).naturalWidth])
  expect(size).toEqual([240, 240]) // Love: the gradient artwork
  await page.getByRole('button', { name: 'Dark', exact: true }).click()
  const dark = page.getByTestId('emoji-matrix-dark').locator('.ds-emoji').first().locator('circle')
  await expect.poll(() => dark.evaluate((c) => getComputedStyle(c).fill)).toBe('rgba(69, 76, 94, 0.16)')
})

test('decorative by default, named with a label', async ({ page }) => {
  await expect(page.getByTestId('emoji-preview').getByRole('img', { name: 'smile' })).toBeVisible()
  expect(await page.getByTestId('emoji-matrix-light').locator('svg.ds-emoji').first().getAttribute('aria-hidden')).toBe('true')
})
