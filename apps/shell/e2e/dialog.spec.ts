import { expect, test } from '@playwright/test'

// Dialog reference checks against the Figma Dialog set (dark 7789:24651, light 12242:5728).

test.use({ viewport: { width: 1800, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/dialog')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    const matrix = page.getByTestId(`dialog-matrix-${mode}`)
    await matrix.screenshot({ path: `e2e/screenshots/dialog-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('each variant matches the Figma heights at 345px wide', async ({ page }) => {
  const sizes = await page.getByTestId('dialog-matrix-light').locator(':scope > div > div').evaluateAll((els) =>
    els.map((el) => {
      const r = el.getBoundingClientRect()
      return [Math.round(r.width), Math.round(r.height)]
    }),
  )
  // Figma, per type: 243 (icon + text), 211 (icon), 171 (text), 139 (neither).
  expect(sizes).toEqual(Array(4).fill([[345, 243], [345, 211], [345, 171], [345, 139]]).flat())
})

test('opens as an alertdialog named by its title, with focus on Cancel', async ({ page }) => {
  await page.getByRole('button', { name: 'Open the dialog' }).click()
  const dialog = page.getByRole('alertdialog', { name: 'Delete this course?' })
  await expect(dialog).toBeVisible()
  await expect(dialog).toHaveAccessibleDescription('Learners lose access straight away. This cannot be undone.')
  await expect(dialog.getByRole('button', { name: 'Cancel' })).toBeFocused()
  expect(await dialog.evaluate((el) => Math.round(el.getBoundingClientRect().width))).toBe(345)
})

test('Escape and a click on the scrim do not close it; Cancel does', async ({ page }) => {
  await page.getByRole('button', { name: 'Open the dialog' }).click()
  const dialog = page.getByRole('alertdialog')
  await page.keyboard.press('Escape')
  await expect(dialog).toBeVisible()
  await page.mouse.click(20, 20)
  await expect(dialog).toBeVisible()
  await dialog.getByRole('button', { name: 'Cancel' }).click()
  await expect(dialog).toBeHidden()
  await expect(page.getByRole('button', { name: 'Open the dialog' })).toBeFocused()
})
