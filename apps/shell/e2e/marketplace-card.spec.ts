import { expect, test } from '@playwright/test'

// Marketplace card checks against Figma Card/Marketplace (dark 5213:4524, light 9577:3648).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/marketplace-card')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`marketplace-card-matrix-${mode}`).screenshot({ path: `e2e/screenshots/marketplace-card-matrix-${mode}.png`, animations: 'disabled' })
  })
}

const SLUG = 'marketplace-card'

test('sizes, radius and the reward price match Figma', async ({ page }) => {
  await expect(async () => {
    const cards = await page.getByTestId(`${SLUG}-matrix-light`).evaluate((el) =>
      [...el.querySelectorAll('.ds-product-card')].map((c) => {
        const r = c.getBoundingClientRect()
        const cs = getComputedStyle(c)
        return { size: [Math.round(r.width), Math.round(r.height)], radius: cs.borderRadius, shadow: cs.boxShadow !== 'none', fill: cs.backgroundColor }
      }),
    )
    expect(cards.map((c) => c.size)).toEqual([[272, 314], [300, 367], [272, 265], [300, 325], [272, 265], [300, 325]])
    expect(cards[0].radius).toBe('8px') // mobile
    expect(cards[1].radius).toBe('12px')
  }).toPass()
  const reward = page.getByTestId('marketplace-card-matrix-light').locator('.ds-product-reward').nth(1)
  await expect(reward.getByLabel('2000 points')).toBeVisible()
  await expect(reward.locator('.ds-product-price img')).toHaveCSS('width', '24px')
})
