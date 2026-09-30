import { expect, test } from '@playwright/test'

// Quiz options checks against Figma Quiz/Options (dark 5504:24966, light 12112:10047).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/quiz-options')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`quiz-options-matrix-${mode}`).screenshot({ path: `e2e/screenshots/quiz-options-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('rows match Figma in each state', async ({ page }) => {
  const rows = await page.getByTestId('quiz-options-matrix-light').locator('.ds-quiz-option').evaluateAll((els) =>
    els.map((e) => {
      const cs = getComputedStyle(e)
      return { h: Math.round(e.getBoundingClientRect().height), bg: cs.backgroundColor, edge: cs.boxShadow, weight: cs.fontWeight, pad: cs.padding, radius: cs.borderRadius }
    }),
  )
  expect(rows[1]).toMatchObject({ h: 45, bg: 'rgb(255, 255, 255)', pad: '12px', radius: '12px', weight: '400' })
  expect(rows[1].edge).toContain('rgb(239, 240, 242) 0px -3px 0px 0px inset')
  expect(rows[0].h).toBe(87) // mobile wraps to three lines
  expect(rows[2].bg).toBe('rgb(239, 240, 242)') // hover
  expect(rows[4]).toMatchObject({ bg: 'rgb(255, 187, 56)', weight: '600' }) // selected: Secondary-500
  expect(rows[6].bg).toBe('rgb(24, 169, 87)') // right: Success-500
  expect(rows[11].bg).toBe('rgb(223, 22, 66)') // wrong: Danger-500
})

test('a radio group named by the question; checking reveals the answer', async ({ page }) => {
  const preview = page.getByTestId('quiz-options-preview')
  const group = preview.getByRole('radiogroup', { name: /How often is user feedback/ })
  await group.getByRole('radio', { name: /Always/ }).check()
  await page.keyboard.press('ArrowDown')
  await expect(group.getByRole('radio', { name: /occasionally/ })).toBeChecked()
  await page.keyboard.press('ArrowUp')
  await preview.getByRole('button', { name: 'Check Answer' }).click()
  await expect(preview.getByText(', your answer, incorrect')).toBeAttached()
  await expect(preview.getByText(', the correct answer')).toBeAttached()
  await expect(preview.getByRole('status')).toContainText('Not quite!')
})

test('plain rows keep their hover after checking', async ({ page }) => {
  const preview = page.getByTestId('quiz-options-preview')
  await preview.getByRole('radio', { name: /Always/ }).check()
  await preview.getByRole('button', { name: 'Check Answer' }).click()
  const other = preview.locator('.ds-quiz-option').nth(2) // "Never": not picked, not the answer
  await other.hover()
  await expect(other).toHaveCSS('background-color', 'rgb(239, 240, 242)')
})
