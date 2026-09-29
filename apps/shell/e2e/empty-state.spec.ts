import { expect, test } from '@playwright/test'

// Empty state checks against the Figma Empty state set (dark 5452:37234, light 11921:5779).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/empty-state')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`empty-state-matrix-${mode}`).screenshot({ path: `e2e/screenshots/empty-state-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('desktop and mobile match Figma', async ({ page }) => {
  const m = await page.getByTestId('empty-state-matrix-light').evaluate((el) =>
    [...el.children].map((c) => {
      const root = (c.matches('[class*="MuiStack"]') ? c.firstElementChild! : c) as HTMLElement
      const cs = getComputedStyle(root)
      const img = root.querySelector('img')!.getBoundingClientRect()
      const title = root.querySelector('h2')!
      const desc = title.nextElementSibling as HTMLElement
      const buttons = [...root.querySelectorAll('.MuiButton-root')].map((b) => b.getBoundingClientRect())
      return {
        padding: cs.padding,
        gap: cs.rowGap,
        radius: cs.borderTopLeftRadius,
        img: [Math.round(img.width), Math.round(img.height)],
        title: [getComputedStyle(title).fontSize, getComputedStyle(title).fontWeight, getComputedStyle(title).color],
        desc: [getComputedStyle(desc).color, getComputedStyle(desc).maxWidth, getComputedStyle(desc).textAlign],
        buttons: [buttons.length, Math.round(buttons[1].left - buttons[0].right), Math.round(buttons[0].height)],
      }
    }),
  )
  expect(m[0]).toEqual({ padding: '24px', gap: '20px', radius: '20px', img: [72, 72], title: ['20px', '700', 'rgb(32, 34, 42)'], desc: ['rgb(69, 76, 94)', '600px', 'center'], buttons: [2, 16, 41] })
  expect(m[1]).toMatchObject({ padding: '16px', gap: '16px', title: ['16px', '700', 'rgb(32, 34, 42)'], desc: ['rgb(69, 76, 94)', 'none', 'center'] })
})

test('the actions work and the title is a heading', async ({ page }) => {
  const preview = page.getByTestId('empty-state-preview')
  await expect(preview.getByRole('heading', { name: 'Add resources to your course' })).toBeVisible()
  await preview.getByRole('button', { name: 'Upload files' }).click()
  await expect(preview.getByText('Clicked “Upload files”')).toBeVisible()
})
