import { expect, test } from '@playwright/test'

// External training card checks against Figma Card/External training (dark 5908:21523, light 9577:3582).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/external-training-card')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`external-training-card-matrix-${mode}`).screenshot({ path: `e2e/screenshots/external-training-card-matrix-${mode}.png`, animations: 'disabled' })
  })
}

const SLUG = 'external-training-card'

test('sizes match Figma', async ({ page }) => {
  await expect(async () => {
    const cards = await page.getByTestId(`${SLUG}-matrix-light`).evaluate((el) =>
      [...el.querySelectorAll('.ds-product-card')].map((c) => {
        const r = c.getBoundingClientRect()
        const cs = getComputedStyle(c)
        return { size: [Math.round(r.width), Math.round(r.height)], radius: cs.borderRadius, shadow: cs.boxShadow !== 'none', fill: cs.backgroundColor }
      }),
    )
    expect(cards[0]).toMatchObject({ size: [272, 300], radius: '12px', shadow: true })
    expect(cards[2]).toMatchObject({ size: [300, 325], radius: '12px' })
    expect(cards[3].fill).toBe('rgb(239, 240, 242)')
  }).toPass()
  const preview = page.getByTestId('external-training-card-preview')
  await preview.getByRole('button', { name: /Technical Product Manager/ }).click()
  await expect(preview.getByRole('status')).toHaveText('Opened the training.')
})
