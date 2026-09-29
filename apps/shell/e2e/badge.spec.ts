import { expect, test } from '@playwright/test'

// Badge reference checks against the Figma Badge set (dark 5799:479, light 12186:1609).

test.use({ viewport: { width: 1800, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/badge')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`badge-matrix-${mode}`).screenshot({ path: `e2e/screenshots/badge-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('every badge is 29px tall, fully rounded, with 6/12 padding and 14px Medium', async ({ page }) => {
  const badges = await page.getByTestId('badge-matrix-light').locator('.MuiChip-root').evaluateAll((els) =>
    els.map((el) => {
      const cs = getComputedStyle(el)
      return { h: Math.round(el.getBoundingClientRect().height), p: cs.padding, weight: cs.fontWeight, size: cs.fontSize, border: cs.borderTopWidth }
    }),
  )
  expect(badges).toHaveLength(16)
  for (const b of badges) expect(b).toEqual({ h: 29, p: '6px 12px', weight: '500', size: '14px', border: '0px' })
})

const LIGHT = {
  Success: ['rgba(24, 169, 87, 0.16)', 'rgb(17, 118, 61)'],
  Warning: ['rgba(255, 165, 56, 0.16)', 'rgb(232, 130, 6)'],
  'In progress': ['rgba(0, 206, 230, 0.16)', 'rgb(0, 131, 147)'],
  Error: ['rgba(223, 22, 66, 0.16)', 'rgb(223, 22, 66)'],
  Information: ['rgba(191, 194, 204, 0.16)', 'rgb(69, 76, 94)'],
  New: ['rgb(233, 92, 123)', 'rgb(249, 249, 250)'],
}

test('each type has the Figma fill and text colour in light mode', async ({ page }) => {
  const matrix = page.getByTestId('badge-matrix-light')
  for (const [label, [bg, color]] of Object.entries(LIGHT)) {
    const badge = matrix.locator('.MuiChip-root', { hasText: label }).first()
    const style = await badge.evaluate((el) => [getComputedStyle(el).backgroundColor, getComputedStyle(el).color])
    expect(style, label).toEqual([bg, color])
  }
})

test('dark mode uses the dark text tokens', async ({ page }) => {
  await page.getByRole('button', { name: 'Dark', exact: true }).click()
  const colour = await page
    .getByTestId('badge-matrix-dark')
    .locator('.MuiChip-root', { hasText: 'In progress' })
    .first()
    .evaluate((el) => getComputedStyle(el).color)
  expect(colour).toBe('rgb(0, 206, 230)') // Text-progress, dark: Primary-500
})

test('a removable badge is removed with the Delete key and with its icon', async ({ page }) => {
  const row = page.getByTestId('skills-row')
  await expect(row.locator('.MuiChip-root')).toHaveCount(3)
  await row.getByRole('button', { name: 'Compliance' }).focus()
  await page.keyboard.press('Delete')
  await expect(row.locator('.MuiChip-root')).toHaveCount(2)
  await row.locator('.MuiChip-root', { hasText: 'Leadership' }).locator('.MuiChip-deleteIcon').click()
  await expect(row.locator('.MuiChip-root')).toHaveCount(1)
})
