import { expect, test } from '@playwright/test'

// Radio reference checks against the Figma radio-button set (dark 5001:18926, light 11917:3950).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/radio')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`radio-matrix-${mode}`).screenshot({ path: `e2e/screenshots/radio-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('sizes and colours match Figma in light mode', async ({ page }) => {
  // Rows: Enabled, Hover, Focus, Disabled. Columns: Not selected, Selected.
  const r = await page.getByTestId('radio-matrix-light').evaluate((el) =>
    [...el.querySelectorAll('.MuiRadio-root')].map((c) => {
      const b = c.getBoundingClientRect()
      const ring = c.querySelector('circle')!.getBoundingClientRect()
      const cs = getComputedStyle(c)
      return { w: Math.round(b.width), ring: Math.round(ring.width * 2) / 2, color: cs.color, bg: cs.backgroundColor, outline: cs.outlineStyle }
    }),
  )
  for (const x of r) expect(x.w).toBe(24)
  expect(r[0].ring).toBe(15) // the 15px ring (the box leaves out the stroke)
  expect(r[0].color).toBe('rgb(32, 34, 42)')
  expect(r[1].color).toBe('rgb(237, 163, 13)')
  expect(r[2].bg).toBe('rgb(239, 240, 242)')
  expect(r[3].bg).toBe('rgb(239, 240, 242)')
  expect(r[4].outline).toBe('solid')
  expect(r[6].color).toBe('rgb(158, 164, 179)')
  expect(r[7].color).toBe('rgb(158, 164, 179)')
})

test('a group: named by its legend, arrow keys move and pick, labels pick', async ({ page }) => {
  const group = page.getByTestId('radio-preview').getByRole('radiogroup')
  await expect(page.getByRole('group', { name: 'Enrolment' })).toBeVisible()
  const auto = group.getByRole('radio', { name: 'Automatic' })
  await expect(auto).toBeChecked()
  await auto.focus()
  await page.keyboard.press('ArrowDown')
  await expect(group.getByRole('radio', { name: 'Manual review' })).toBeChecked()
  await group.getByText('Hybrid').click()
  await expect(group.getByRole('radio', { name: 'Hybrid' })).toBeChecked()
  await expect(auto).not.toBeChecked()
})
