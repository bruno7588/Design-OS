import { expect, test } from '@playwright/test'

// Bottom sheet checks against Figma Bottom sheet (dark 7479:106, light instance 12279:281).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/bottom-sheet')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`bottom-sheet-matrix-${mode}`).screenshot({ path: `e2e/screenshots/bottom-sheet-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('sheet, handle and scrim match Figma', async ({ page }) => {
  const m = await page.getByTestId('bottom-sheet-matrix-light').evaluate((el) => {
    const sheet = el.querySelector('.ds-bottom-sheet')!
    const cs = getComputedStyle(sheet)
    const handle = sheet.querySelector('.ds-sheet-handle')!
    const bar = handle.firstElementChild!
    return {
      sheet: [Math.round(sheet.getBoundingClientRect().width), Math.round(sheet.getBoundingClientRect().height)],
      pad: cs.padding,
      radius: [cs.borderTopLeftRadius, cs.borderBottomLeftRadius],
      handle: Math.round(handle.getBoundingClientRect().height),
      bar: [Math.round(bar.getBoundingClientRect().width), Math.round(bar.getBoundingClientRect().height), getComputedStyle(bar).backgroundColor],
      scrim: getComputedStyle(sheet.parentElement!).backgroundColor,
    }
  })
  expect(m).toMatchObject({ sheet: [375, 560], pad: '0px 16px 20px', radius: ['12px', '0px'], handle: 36, bar: [64, 4, 'rgb(69, 76, 94)'], scrim: 'rgba(15, 16, 20, 0.64)' })
})

test('opens from the bottom and closes on Escape; focus returns', async ({ page }) => {
  const opener = page.getByRole('button', { name: 'Open Sheet' })
  await opener.click()
  const sheet = page.getByRole('dialog', { name: 'Lesson options' })
  await expect(sheet).toBeVisible()
  // Sits on the bottom edge once it has slid in.
  await expect.poll(async () => { const b = (await sheet.boundingBox())!; return Math.round(b.y + b.height) }).toBe(1200)
  await sheet.getByRole('button', { name: 'Share' }).click()
  await expect(page.getByTestId('bottom-sheet-preview').getByRole('status')).toHaveText('Picked “Share”.')
  await opener.click()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()
  await expect(opener).toBeFocused()
})
