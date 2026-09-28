import { expect, test } from '@playwright/test'

// Button reference checks. Screenshots land in e2e/screenshots for comparison
// with the Figma boards (light 12141:7567, dark 10825:3269).

test.use({ viewport: { width: 3000, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/button')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    const matrix = page.getByTestId(`button-matrix-${mode}`)
    await matrix.scrollIntoViewIfNeeded()
    await matrix.screenshot({ path: `e2e/screenshots/button-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('every boxed configuration matches the Figma heights (33 / 41 / 48)', async ({ page }) => {
  const matrix = page.getByTestId('button-matrix-light')
  const heights = await matrix.locator('button').evaluateAll((buttons) =>
    buttons.map((b) => ({
      classes: b.className,
      height: Math.round(b.getBoundingClientRect().height * 10) / 10,
    })),
  )
  const boxed = heights.filter((h) => !/MuiButton-(text|link)/.test(h.classes))
  const bySize = (s: string) => new Set(boxed.filter((h) => h.classes.includes(`MuiButton-size${s}`)).map((h) => Math.round(h.height)))
  expect([...bySize('Small')]).toEqual([33])
  expect([...bySize('Medium')]).toEqual([41])
  expect([...bySize('Large')]).toEqual([48])
})

test('link matches the updated Figma link (Medium 500, 14 / 21 / 24 tall)', async ({ page }) => {
  const links = page.getByTestId('button-matrix-light').locator('button.MuiButton-link')
  const measured = await links.evaluateAll((bs) =>
    bs.map((b) => ({
      size: b.className.match(/MuiButton-size(Small|Medium|Large)/)![1],
      height: Math.round(b.getBoundingClientRect().height),
      weight: getComputedStyle(b).fontWeight,
    })),
  )
  const expected = { Small: 14, Medium: 21, Large: 24 } as Record<string, number>
  for (const m of measured) {
    expect(m.height).toBe(expected[m.size])
    expect(m.weight).toBe('500')
  }
})

test('keyboard focus shows the 2px ring', async ({ page }) => {
  const canvasButton = page.locator('[data-mode] button').first()
  await canvasButton.focus()
  await page.keyboard.press('Tab')
  await page.keyboard.press('Shift+Tab')
  const outline = await canvasButton.evaluate((b) => getComputedStyle(b).outlineWidth + ' ' + getComputedStyle(b).outlineOffset)
  expect(outline).toBe('2px 2px')
})

test('loading keeps the width', async ({ page }) => {
  const matrix = page.getByTestId('button-matrix-light')
  const row = matrix.locator('button.MuiButton-sizeMedium.MuiButton-contained')
  const enabled = await row.nth(0).boundingBox()
  const loading = await row.nth(4).boundingBox()
  expect(Math.round(loading!.width)).toBe(Math.round(enabled!.width))
  await expect(row.nth(4)).toHaveAttribute('aria-busy', 'true')
  await expect(row.nth(4)).toHaveAttribute('aria-label', 'Button')
})
