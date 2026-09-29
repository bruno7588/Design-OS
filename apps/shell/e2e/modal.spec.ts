import { expect, test } from '@playwright/test'

// Modal reference checks against the Figma Modal (7479:4350).

test.use({ viewport: { width: 1600, height: 1100 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/modal')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`modal-matrix-${mode}`).screenshot({ path: `e2e/screenshots/modal-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('the panel matches the Figma Modal', async ({ page }) => {
  const m = await page.getByTestId('modal-matrix-light').evaluate((el) => {
    const panel = el.firstElementChild as HTMLElement
    const r = panel.getBoundingClientRect()
    const cs = getComputedStyle(panel)
    const close = panel.querySelector('button[aria-label="Close"]')!.getBoundingClientRect()
    const title = panel.querySelector('h2')!
    const divider = panel.querySelector('hr')!.getBoundingClientRect()
    const headline = title.parentElement!.getBoundingClientRect()
    return {
      w: Math.round(r.width),
      padding: cs.padding,
      radius: cs.borderTopLeftRadius,
      shadow: cs.boxShadow,
      closeTop: Math.round(close.top - r.top),
      closeRight: Math.round(r.right - close.right),
      closeSize: Math.round(close.width),
      title: [getComputedStyle(title).fontSize, getComputedStyle(title).fontWeight],
      toDivider: Math.round(divider.top - headline.bottom),
    }
  })
  expect(m).toEqual({
    w: 720,
    padding: '24px',
    radius: '12px',
    shadow: 'rgba(32, 34, 42, 0.12) -4px 0px 24px 0px',
    closeTop: 10,
    closeRight: 10,
    closeSize: 32,
    title: ['20px', '700'],
    toDivider: 12,
  })
})

test('it opens as a named dialog, and closes on the close button, Escape and the scrim', async ({ page }) => {
  const opener = page.getByRole('button', { name: 'Edit collection' })
  await opener.click()
  const dialog = page.getByRole('dialog', { name: 'Edit collection' })
  await expect(dialog).toBeVisible()
  await expect(dialog).toHaveAccessibleDescription('Learners see the name on their home page.')
  const paper = await dialog.evaluate((d) => Math.round(d.getBoundingClientRect().width))
  expect(paper).toBe(720)
  await dialog.getByRole('button', { name: 'Close' }).click()
  await expect(dialog).toBeHidden()
  await expect(opener).toBeFocused()

  await opener.click()
  await expect(dialog).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()

  await opener.click()
  await expect(dialog).toBeVisible()
  await page.mouse.click(20, 20)
  await expect(dialog).toBeHidden()
})
