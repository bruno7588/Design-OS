import { expect, test } from '@playwright/test'

// Instructor card checks against Figma Card/Instructor (dark 5149:27386, light 9926:2477).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/instructor-card')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`instructor-card-matrix-${mode}`).screenshot({ path: `e2e/screenshots/instructor-card-matrix-${mode}.png`, animations: 'disabled' })
  })
}

const SLUG = 'instructor-card'

test('sizes and skills match Figma', async ({ page }) => {
  await expect(async () => {
    const cards = await page.getByTestId(`${SLUG}-matrix-light`).evaluate((el) =>
      [...el.querySelectorAll('.ds-instructor-card')].map((c) => {
        const r = c.getBoundingClientRect()
        const cs = getComputedStyle(c)
        return { size: [Math.round(r.width), Math.round(r.height)], radius: cs.borderRadius, shadow: cs.boxShadow !== 'none', fill: cs.backgroundColor }
      }),
    )
    expect(cards[0]).toMatchObject({ size: [340, 137], radius: '12px', shadow: true })
    expect(cards[1]).toMatchObject({ size: [404, 160], fill: 'rgb(255, 255, 255)' })
    expect(cards[2].fill).toBe('rgb(239, 240, 242)')
  }).toPass()
  const preview = page.getByTestId('instructor-card-preview')
  await expect(preview.getByRole('list', { name: 'Skills' }).getByRole('listitem')).toHaveCount(2)
  await preview.getByRole('button', { name: 'Instructor name' }).click()
  await expect(preview.getByRole('status')).toHaveText('Opened the instructor.')
})
