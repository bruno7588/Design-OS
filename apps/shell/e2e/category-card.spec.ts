import { expect, test } from '@playwright/test'

// Category card checks against Figma Card/ Category (dark 10176:1806, light 10574:3913).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/category-card')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`category-card-matrix-${mode}`).screenshot({ path: `e2e/screenshots/category-card-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('sizes, image, glow and badge match Figma', async ({ page }) => {
  await expect(async () => {
    const cards = await page.getByTestId('category-card-matrix-light').evaluate((el) =>
      [...el.querySelectorAll('.ds-category-card')].map((c) => {
        const r = c.getBoundingClientRect()
        const img = c.querySelector('.ds-category-image') as HTMLElement
        const glow = c.querySelector('.ds-category-glow')!
        const title = c.querySelector('.ds-card-heading')!
        return {
          size: [Math.round(r.width), Math.round(r.height)],
          image: [img.offsetWidth, img.offsetHeight],
          glow: [getComputedStyle(glow).filter, getComputedStyle(glow).opacity],
          title: [getComputedStyle(title).fontSize, getComputedStyle(title).color],
          badge: c.querySelector('.MuiChip-root')?.textContent ?? null,
        }
      }),
    )
    expect(cards[0]).toMatchObject({ size: [300, 273], image: [240, 140], glow: ['blur(16px)', '0.32'], title: ['16px', 'rgb(32, 34, 42)'], badge: null })
    expect(cards[1].badge).toBe('New Courses')
    expect(cards[4].title[1]).toBe('rgb(158, 164, 179)') // disabled
    expect(cards[5]).toMatchObject({ size: [272, 235], // Figma 238: its 21px title sits in a 24px box
      image: [208, 116], title: ['14px', 'rgb(32, 34, 42)'] })
  }).toPass()
})

test('a disabled desktop card explains itself in a tooltip', async ({ page }) => {
  const preview = page.getByTestId('category-card-preview')
  await page.getByRole('checkbox', { name: 'Disabled' }).check()
  await preview.locator('.ds-category-card').hover()
  await expect(page.getByRole('tooltip')).toHaveText('Category not available in your plan. Please contact Customer Success')
  await expect(preview.getByLabel('Locked')).toBeVisible()
})
