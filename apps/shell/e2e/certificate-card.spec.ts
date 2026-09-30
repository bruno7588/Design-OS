import { expect, test } from '@playwright/test'

// Certificate card checks against Figma Certificate instances (dark 5514:2390, light 8442:6119).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/certificate-card')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`certificate-card-matrix-${mode}`).screenshot({ path: `e2e/screenshots/certificate-card-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('sizes, text colour and tier edge', async ({ page }) => {
  const m = await page.getByTestId('certificate-card-matrix-light').locator('.ds-certificate-card').evaluateAll((els) =>
    els.map((e) => {
      const r = e.getBoundingClientRect()
      const cs = getComputedStyle(e)
      return [Math.round(r.width), Math.round(r.height), cs.borderTopLeftRadius, cs.color, cs.boxShadow]
    }),
  )
  expect(m[0].slice(0, 4)).toEqual([343, 96, '12px', 'rgb(32, 34, 42)'])
  expect(m[0][4]).toContain('rgb(255, 123, 0)')
  expect(m[2].slice(0, 4)).toEqual([343, 96, '12px', 'rgb(249, 249, 250)'])
  expect(m[2][4]).toContain('rgb(130, 47, 175)')
  expect(m[3][4]).toContain('rgb(94, 96, 206)')
  expect(m[4].slice(0, 3)).toEqual([408, 96, '12px'])
  expect(m[5].slice(0, 3)).toEqual([900, 120, '16px'])
})

test('Download works and the tick is named', async ({ page }) => {
  const preview = page.getByTestId('certificate-card-preview')
  await expect(preview.getByRole('img', { name: 'Earned' })).toBeVisible()
  await preview.getByRole('button', { name: 'Download' }).click()
  await expect(preview.getByRole('status')).toHaveText('Downloaded 1 times.')
  await expect(preview.getByRole('heading', { name: 'Master Certificate' })).toBeVisible()
})
