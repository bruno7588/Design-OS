import { expect, test } from '@playwright/test'

// Ranking badge checks against Figma Ranking, leaderboard (dark 2613:26421, light 8442:6198).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/ranking-badge')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`ranking-badge-matrix-${mode}`).screenshot({ path: `e2e/screenshots/ranking-badge-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('medals for 1 to 3, the number alone from 4, each named', async ({ page }) => {
  const m = await page.getByTestId('ranking-badge-matrix-light').locator('.ds-ranking-badge').evaluateAll((els) =>
    els.map((e) => [Math.round(e.getBoundingClientRect().width), !!e.querySelector('img'), getComputedStyle(e).color, e.getAttribute('aria-label')]),
  )
  expect(m).toEqual([
    [32, true, 'rgb(249, 249, 250)', 'Rank 1'],
    [32, true, 'rgb(249, 249, 250)', 'Rank 2'],
    [32, true, 'rgb(249, 249, 250)', 'Rank 3'],
    [32, false, 'rgb(158, 164, 179)', 'Rank 4'],
  ])
})
