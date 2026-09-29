import { expect, test } from '@playwright/test'

// Input field reference checks against Figma Input field/Outlined (dark 8974:24610, light 12114:20561).

test.use({ viewport: { width: 1800, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/input')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`input-matrix-${mode}`).screenshot({ path: `e2e/screenshots/input-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('every field is 37px, with the label and helper 8px away', async ({ page }) => {
  const m = await page.getByTestId('input-matrix-light').evaluate((el) => {
    const fields = [...el.querySelectorAll('.MuiOutlinedInput-root')].map((f) => Math.round(f.getBoundingClientRect().height))
    const control = el.querySelectorAll('.MuiFormControl-root')[2] // Enabled, label and helper
    const [label, field, helper] = [...control.children].map((c) => c.getBoundingClientRect())
    return { fields, gaps: [Math.round(field.top - label.bottom), Math.round(helper.top - field.bottom)] }
  })
  expect(new Set(m.fields)).toEqual(new Set([37]))
  expect(m.gaps).toEqual([8, 8])
})

const LIGHT_BORDERS: Record<string, string> = {
  Enabled: 'rgb(223, 225, 230)', // Border-elevated
  Hover: 'rgb(158, 164, 179)', // Border-hover
  Active: 'rgb(237, 163, 13)', // Selected
  Error: 'rgb(223, 22, 66)', // Text-error
  Disabled: 'rgb(223, 225, 230)',
}

test('border colours per state match Figma in light mode', async ({ page }) => {
  const borders = await page.getByTestId('input-matrix-light').evaluate((el) =>
    [...el.querySelectorAll('.MuiOutlinedInput-notchedOutline')].map((o) => getComputedStyle(o).borderTopColor),
  )
  // Rows of three: Enabled, Hover, Active, Filled, Error, Success, Disabled.
  const row = (i: number) => borders[i * 3]
  expect(row(0)).toBe(LIGHT_BORDERS.Enabled)
  expect(row(1)).toBe(LIGHT_BORDERS.Hover)
  expect(row(2)).toBe(LIGHT_BORDERS.Active)
  expect(row(4)).toBe(LIGHT_BORDERS.Error)
  expect(row(6)).toBe(LIGHT_BORDERS.Disabled)
})

test('dark mode active border is Secondary-500', async ({ page }) => {
  await page.getByRole('button', { name: 'Dark', exact: true }).click()
  // The border colour fades for 150ms after the switch.
  await expect
    .poll(() =>
      page.getByTestId('input-matrix-dark').evaluate((el) => getComputedStyle(el.querySelectorAll('.MuiOutlinedInput-notchedOutline')[6]).borderTopColor),
    )
    .toBe('rgb(255, 187, 56)')
})

test('the label names the field, and an error is announced', async ({ page }) => {
  const field = page.getByRole('textbox', { name: 'Course title' })
  await expect(field).toHaveAccessibleDescription('Learners see this on their feed.')
  await field.fill('ab')
  await page.getByLabel('Validation').click()
  await page.getByRole('option', { name: 'Error' }).click()
  await expect(field).toHaveAttribute('aria-invalid', 'true')
  await expect(field).toHaveAccessibleDescription('Add a title of 3 characters or more')
})
