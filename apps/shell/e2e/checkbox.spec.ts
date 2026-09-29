import { expect, test } from '@playwright/test'

// Checkbox reference checks against the Figma Checkbox set (dark 6339:10484, light 11917:3924).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/checkbox')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`checkbox-matrix-${mode}`).screenshot({ path: `e2e/screenshots/checkbox-matrix-${mode}.png`, animations: 'disabled' })
  })
}

const read = (el: Element) =>
  [...el.querySelectorAll('.MuiCheckbox-root')].map((c) => {
    const r = c.getBoundingClientRect()
    const svg = c.querySelector('svg')!.getBoundingClientRect()
    const cs = getComputedStyle(c)
    return { w: Math.round(r.width), h: Math.round(r.height), glyph: Math.round(svg.width), color: cs.color, bg: cs.backgroundColor, outline: cs.outlineStyle }
  })

test('sizes and colours match Figma in light mode', async ({ page }) => {
  // Rows: Enabled, Hover, Focus, Disabled. Columns: Not checked, Checked, Indeterminate.
  const c = await page.getByTestId('checkbox-matrix-light').evaluate(read)
  for (const x of c) expect(x).toMatchObject({ w: 32, h: 32, glyph: 16 })
  expect(c[0].color).toBe('rgb(32, 34, 42)') // Text-primary
  expect(c[1].color).toBe('rgb(237, 163, 13)') // Selected: Secondary-600
  expect(c[2].color).toBe('rgb(237, 163, 13)')
  expect(c[0].bg).toBe('rgba(0, 0, 0, 0)')
  for (const x of c.slice(3, 6)) expect(x.bg).toBe('rgb(239, 240, 242)') // Page-background-hover
  for (const x of c.slice(6, 9)) expect(x.outline).toBe('solid')
  for (const x of c.slice(9)) expect(x.color).toBe('rgb(158, 164, 179)') // Text-disabled
})

test('dark mode uses the dark Selected and Text-primary', async ({ page }) => {
  await page.getByRole('button', { name: 'Dark', exact: true }).click()
  await expect(async () => {
    const c = await page.getByTestId('checkbox-matrix-dark').evaluate(read)
    expect(c[0].color).toBe('rgb(249, 249, 250)')
    expect(c[1].color).toBe('rgb(255, 187, 56)')
    expect(c[3].bg).toBe('rgb(45, 49, 61)')
  }).toPass()
})

test('the label ticks the box, 12px away, and indeterminate reads as mixed', async ({ page }) => {
  const preview = page.getByTestId('checkbox-preview')
  const all = preview.getByRole('checkbox', { name: 'All departments' })
  await expect(all).toBeChecked({ indeterminate: true })
  await preview.getByText('People', { exact: true }).click()
  await expect(preview.getByRole('checkbox', { name: 'People' })).toBeChecked()
  await all.focus()
  await page.keyboard.press('Space')
  await expect(all).toBeChecked()
  await page.keyboard.press('Space')
  await expect(all).not.toBeChecked()
  expect(await all.evaluate((e) => (e as HTMLInputElement).indeterminate)).toBe(false)

  const gap = await page.getByTestId('checkbox-labels-light').evaluate((el) => {
    const row = el.querySelector('.MuiFormControlLabel-root')!
    const glyph = row.querySelector('svg')!.getBoundingClientRect()
    const label = row.querySelector('.MuiFormControlLabel-label')!.getBoundingClientRect()
    return { gap: Math.round(label.left - glyph.right), inset: Math.round(glyph.left - row.getBoundingClientRect().left) }
  })
  expect(gap.gap).toBe(12)
})
