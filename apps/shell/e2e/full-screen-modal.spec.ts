import { expect, test } from '@playwright/test'

// Full screen modal checks against Figma Modal/Full screen (dark 3223:31934, light 11498:1694).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/full-screen-modal')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`full-screen-modal-matrix-${mode}`).screenshot({ path: `e2e/screenshots/full-screen-modal-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('the close button matches Figma', async ({ page }) => {
  const frames = page.getByTestId('full-screen-modal-matrix-light').locator('.ds-full-screen-frame')
  const m = await frames.evaluateAll((els) =>
    els.map((f) => {
      const b = f.querySelector('button')!
      const r = b.getBoundingClientRect()
      const fr = f.getBoundingClientRect()
      const cs = getComputedStyle(b)
      return { size: Math.round(r.width), top: Math.round(r.top - fr.top), right: Math.round(fr.right - r.right), radius: cs.borderRadius, fill: cs.backgroundColor, glyph: Math.round(b.querySelector('svg')!.getBoundingClientRect().width) }
    }),
  )
  expect(m[0]).toMatchObject({ size: 40, top: 20, right: 30, fill: 'rgba(191, 194, 204, 0.16)', glyph: 32 })
  expect(m[1]).toMatchObject({ size: 40, top: 60, right: 20 })
})

test('opens full screen, closes on the button and on Escape, focus returns', async ({ page }) => {
  const opener = page.getByRole('button', { name: 'Create Flashcard' })
  await opener.click()
  const dialog = page.getByRole('dialog', { name: 'Create flashcard' })
  await expect(dialog).toBeVisible()
  const box = await dialog.boundingBox()
  expect(box).toMatchObject({ x: 0, y: 0, width: 1600, height: 1200 })
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(opener).toBeFocused()
  await opener.click()
  await page.getByRole('dialog').getByRole('button', { name: 'Close' }).click()
  await expect(page.getByRole('dialog')).toBeHidden()
})
