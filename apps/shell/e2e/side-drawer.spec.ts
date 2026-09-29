import { expect, test } from '@playwright/test'

// Side drawer reference checks against the Figma Side Drawer (10871:12768).

test.use({ viewport: { width: 1600, height: 900 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/side-drawer')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`drawer-matrix-${mode}`).screenshot({ path: `e2e/screenshots/drawer-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('it opens against the right edge: 720px, full height, the Figma padding and footer', async ({ page }) => {
  await page.getByRole('button', { name: 'Edit Learner' }).click()
  const dialog = page.getByRole('dialog', { name: 'Edit learner' })
  await expect(dialog).toBeVisible()
  await expect(dialog).toHaveAccessibleDescription('Changes apply the next time they sign in.')
  await expect(async () => {
    const m = await dialog.evaluate((d) => {
      const r = d.getBoundingClientRect()
      const cs = getComputedStyle(d)
      const buttons = [...d.querySelectorAll('.MuiButton-root')].map((b) => b.getBoundingClientRect())
      return {
        w: Math.round(r.width),
        h: Math.round(r.height),
        right: Math.round(window.innerWidth - r.right),
        padding: cs.padding,
        shadow: cs.boxShadow,
        radius: cs.borderTopLeftRadius,
        bottomGap: Math.round(r.bottom - buttons[0].bottom),
        buttonGap: Math.round(buttons[1].left - buttons[0].right),
      }
    })
    expect(m).toEqual({ w: 720, h: 900, right: 0, padding: '20px 24px', shadow: 'none', radius: '0px', bottomGap: 20, buttonGap: 16 })
  }).toPass()
  // The content scrolls; the footer stays in view.
  await expect(dialog.getByRole('button', { name: 'Save' })).toBeInViewport()
  await expect(dialog.getByRole('button', { name: 'Close' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(page.getByRole('button', { name: 'Edit Learner' })).toBeFocused()
})

test('Cancel and the scrim close it', async ({ page }) => {
  const opener = page.getByRole('button', { name: 'Edit Learner' })
  await opener.click()
  const dialog = page.getByRole('dialog', { name: 'Edit learner' })
  await dialog.getByRole('button', { name: 'Cancel' }).click()
  await expect(dialog).toBeHidden()
  await opener.click()
  await expect(dialog).toBeVisible()
  await page.mouse.click(20, 20)
  await expect(dialog).toBeHidden()
})

test('the close button sits at the end of the header row, as in Figma', async ({ page }) => {
  const m = await page.getByTestId('drawer-matrix-light').evaluate((el) => {
    const panel = el.firstElementChild!.getBoundingClientRect()
    const close = el.querySelector('button[aria-label="Close"]')!.getBoundingClientRect()
    const title = el.querySelector('h2')!.getBoundingClientRect()
    return { size: Math.round(close.width), right: Math.round(panel.right - close.right), top: Math.round(close.top - title.top), gap: Math.round(close.left - title.right) >= 16 }
  })
  expect(m).toEqual({ size: 32, right: 24, top: 0, gap: true })
})
