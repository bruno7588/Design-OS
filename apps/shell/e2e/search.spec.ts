import { expect, test } from '@playwright/test'

// Search reference checks against the Figma Search set (dark 697:33529, light 11927:6338).

test.use({ viewport: { width: 1800, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/search')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`search-matrix-${mode}`).screenshot({ path: `e2e/screenshots/search-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('M is 37px and L is 48px, with the Figma radius and fill', async ({ page }) => {
  const sizes = await page.getByTestId('search-matrix-light').evaluate((el) =>
    [...el.querySelectorAll('.ds-search')].slice(0, 2).map((s) => ({
      h: Math.round(s.getBoundingClientRect().height),
      r: getComputedStyle(s).borderTopLeftRadius,
      bg: getComputedStyle(s).backgroundColor,
    })),
  )
  expect(sizes).toEqual([
    { h: 37, r: '12px', bg: 'rgba(191, 194, 204, 0.16)' },
    { h: 48, r: '16px', bg: 'rgba(191, 194, 204, 0.16)' },
  ])
})

test('the clear button appears with text, clears and returns focus; Escape clears too', async ({ page }) => {
  const preview = page.getByTestId('search-preview')
  const field = preview.getByRole('searchbox', { name: 'Search courses' })
  await expect(preview.getByRole('button', { name: 'Clear search' })).toHaveCount(0)
  await field.fill('data')
  await expect(page.getByText('1 course')).toBeVisible()
  await preview.getByRole('button', { name: 'Clear search' }).click()
  await expect(field).toHaveValue('')
  await expect(field).toBeFocused()
  await field.fill('fire')
  await page.keyboard.press('Escape')
  await expect(field).toHaveValue('')
})
