import { expect, test } from '@playwright/test'

// Dropdown reference checks against the Figma Dropdown set (dark 8925:1408, light 12113:14844),
// Listbox (9162:1042) and List itens (9162:941).

test.use({ viewport: { width: 1800, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/dropdown')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`dropdown-matrix-${mode}`).screenshot({ path: `e2e/screenshots/dropdown-matrix-${mode}.png`, animations: 'disabled' })
    await page.getByTestId(`dropdown-menu-${mode}`).screenshot({ path: `e2e/screenshots/dropdown-menu-${mode}.png`, animations: 'disabled' })
  })
}

test('every field is 37px', async ({ page }) => {
  const heights = await page.getByTestId('dropdown-matrix-light').evaluate((el) =>
    [...el.querySelectorAll('.MuiOutlinedInput-root')].map((f) => Math.round(f.getBoundingClientRect().height)),
  )
  expect(new Set(heights)).toEqual(new Set([37]))
})

test('the menu and its rows match the Figma Listbox', async ({ page }) => {
  const m = await page.getByTestId('dropdown-menu-light').evaluate((el) => {
    const cs = getComputedStyle(el)
    const rows = [...el.querySelectorAll('.MuiMenuItem-root')].map((r) => ({
      h: Math.round(r.getBoundingClientRect().height),
      bg: getComputedStyle(r).backgroundColor,
      weight: getComputedStyle(r).fontWeight,
    }))
    return { r: cs.borderTopLeftRadius, border: cs.borderTopColor, rows }
  })
  expect(m.r).toBe('12px')
  expect(m.border).toBe('rgb(223, 225, 230)')
  for (const r of m.rows) expect(r.h).toBe(37)
  expect(m.rows[1].bg).toBe('rgb(239, 240, 242)') // hover: Cards-background-hover
  expect(m.rows[2]).toMatchObject({ bg: 'rgb(255, 187, 56)', weight: '500' }) // selected: Secondary-500, Medium
  expect(m.rows[3]).toMatchObject({ bg: 'rgb(255, 187, 56)', weight: '500' }) // selected and hovered
})

test('it is a combobox named by its label, and works from the keyboard', async ({ page }) => {
  const combo = page.getByRole('combobox', { name: 'Department' })
  await expect(combo).toHaveAccessibleDescription('Learners see courses for their department first.')
  await combo.focus()
  await page.keyboard.press('Enter')
  const listbox = page.getByRole('listbox')
  await expect(listbox).toBeVisible()
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  await expect(listbox).toBeHidden()
  await expect(combo).toHaveText('Sales')
  await expect(combo).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await expect(listbox).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(listbox).toBeHidden()
  await expect(combo).toHaveText('Sales')
})
