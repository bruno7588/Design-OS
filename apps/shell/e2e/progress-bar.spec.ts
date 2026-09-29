import { expect, test } from '@playwright/test'

// Progress bar checks against the Figma Progress bar set (dark 7046:25097, light 12000:10067).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/progress-bar')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`progress-bar-matrix-${mode}`).screenshot({ path: `e2e/screenshots/progress-bar-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('track, fill and complete match Figma', async ({ page }) => {
  await expect(async () => {
    const bars = await page.getByTestId('progress-bar-matrix-light').evaluate((el) =>
      [...el.querySelectorAll('.MuiLinearProgress-root')].map((b) => {
        const r = b.getBoundingClientRect()
        const bar = b.querySelector('.MuiLinearProgress-bar')!
        const br = bar.getBoundingClientRect()
        return {
          w: Math.round(r.width),
          h: Math.round(r.height),
          radius: getComputedStyle(b).borderTopLeftRadius,
          track: getComputedStyle(b).backgroundColor,
          fill: getComputedStyle(bar).backgroundColor,
          filled: Math.round(((Math.min(br.right, r.right) - r.left) / r.width) * 1000) / 10,
        }
      }),
    )
    for (const b of bars) expect(b).toMatchObject({ w: 400, h: 8, radius: '20px', track: 'rgb(223, 225, 230)' })
    expect(bars[4]).toMatchObject({ fill: 'rgb(0, 175, 196)', filled: 50 }) // Primary-600
    expect(bars[8]).toMatchObject({ fill: 'rgb(24, 169, 87)', filled: 100 }) // Success-500
  }).toPass()
})

test('it is a named progressbar with its value; the table cell shows the percentage 8px after a 72px bar', async ({ page }) => {
  const bar = page.getByTestId('progress-bar-preview').getByRole('progressbar', { name: 'Leadership essentials' })
  await expect(bar).toHaveAttribute('aria-valuenow', '62')
  const cell = await page.getByTestId('progress-bar-cell-light').evaluate((b) => {
    const label = b.nextElementSibling!
    return { w: Math.round(b.getBoundingClientRect().width), gap: Math.round(label.getBoundingClientRect().left - b.getBoundingClientRect().right), text: label.textContent }
  })
  expect(cell).toEqual({ w: 72, gap: 8, text: '100%' })
})
