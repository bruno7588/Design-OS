import { expect, test } from '@playwright/test'

// Learning path checks against Figma Learning path (dark 5514:8463, light 11984:7015).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/learning-path')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`learning-path-matrix-${mode}`).screenshot({ path: `e2e/screenshots/learning-path-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('sizes, padding, radius and the inner edge', async ({ page }) => {
  const cards = await page.getByTestId('learning-path-matrix-light').locator('.ds-learning-path-card').evaluateAll((els) =>
    els.map((e) => {
      const cs = getComputedStyle(e)
      return [Math.round(e.getBoundingClientRect().width), cs.paddingTop, cs.borderTopLeftRadius, cs.boxShadow.includes('inset')]
    }),
  )
  expect(cards[0]).toEqual([343, '16px', '12px', true]) // s, in progress
  expect(cards[2]).toEqual([408, '16px', '12px', true]) // md
  expect(cards[5]).toEqual([343, '16px', '12px', false]) // disabled
  expect(cards[10]).toEqual([900, '24px', '16px', true]) // l, in progress
  const edge = await page.getByTestId('learning-path-matrix-light').locator('.ds-learning-path-card').nth(3).evaluate((e) => getComputedStyle(e).boxShadow)
  expect(edge).toContain('rgb(24, 169, 87)') // Success-500
})

test('the chevron shows every topic and says so', async ({ page }) => {
  const card = page.getByTestId('learning-path-preview').locator('.ds-learning-path-card').first()
  const toggle = card.getByRole('button', { name: 'Show all 5 topics' })
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect(card.getByRole('list', { name: 'Topics' }).getByRole('listitem')).toHaveCount(1)
  await toggle.click()
  await expect(card.getByRole('button', { name: 'Show fewer topics' })).toHaveAttribute('aria-expanded', 'true')
  await expect(card.getByRole('list', { name: 'Topics' }).getByRole('listitem')).toHaveCount(5)
})

test('progress is named, the button works, and a completed certificate is a Certificate card', async ({ page }) => {
  const preview = page.getByTestId('learning-path-preview')
  await expect(preview.getByRole('progressbar', { name: '80 of 120 modules' })).toBeVisible()
  await preview.getByRole('button', { name: 'Keep Learning' }).click()
  await expect(preview.getByRole('status')).toHaveText('Buttons pressed 1 times.')
  await expect(page.getByTestId('learning-path-matrix-light').locator('.ds-certificate-card')).toHaveCount(2)
  await expect(page.getByTestId('learning-path-matrix-light').getByRole('img', { name: 'Completed' })).toHaveCount(3)
})
