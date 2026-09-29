import { expect, test } from '@playwright/test'

// Chip reference checks against the Figma Chips set (dark 5162:28510, light 12160:12109).

test.use({ viewport: { width: 1800, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/chip')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    const matrix = page.getByTestId(`chip-matrix-${mode}`)
    await matrix.screenshot({ path: `e2e/screenshots/chip-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('every chip is 33px tall with the Figma padding and radius', async ({ page }) => {
  const chips = await page.getByTestId('chip-matrix-light').locator('.MuiChip-root').evaluateAll((els) =>
    els.map((el) => {
      const cs = getComputedStyle(el)
      return { h: el.getBoundingClientRect().height, radius: cs.borderTopLeftRadius, pt: cs.paddingTop, border: cs.borderTopWidth }
    }),
  )
  expect(chips).toHaveLength(12)
  for (const c of chips) {
    expect(c.h).toBe(33)
    expect(c.radius).toBe('24px')
    expect(c.pt).toBe('5px')
    expect(c.border).toBe('1px')
  }
})

test('selected chip is Bold on Secondary-500 with a Neutral-800 label, and is announced as pressed', async ({ page }) => {
  const selected = page.getByTestId('chip-matrix-light').locator('.MuiChip-root.Mui-selected').first()
  const style = await selected.evaluate((el) => {
    const cs = getComputedStyle(el)
    return { bg: cs.backgroundColor, color: cs.color, weight: cs.fontWeight }
  })
  expect(style).toEqual({ bg: 'rgb(255, 187, 56)', color: 'rgb(32, 34, 42)', weight: '700' })
  await expect(selected).toHaveAttribute('aria-pressed', 'true')
})

test('hovering a selected chip keeps its fill', async ({ page }) => {
  const filter = page.getByRole('group', { name: 'Filter by topic' }).getByRole('button', { name: 'All' })
  await filter.hover()
  expect(await filter.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe('rgb(255, 187, 56)')
})

test('keyboard focus shows the 2px ring and Space toggles selection', async ({ page }) => {
  const chip = page.getByRole('group', { name: 'Filter by topic' }).getByRole('button', { name: 'Compliance' })
  await chip.focus()
  await page.keyboard.press('Space')
  await expect(chip).toHaveAttribute('aria-pressed', 'true')
  await page.keyboard.press('Shift+Tab')
  await page.keyboard.press('Tab')
  const outline = await chip.evaluate((el) => getComputedStyle(el).outlineWidth)
  expect(outline).toBe('2px')
})
