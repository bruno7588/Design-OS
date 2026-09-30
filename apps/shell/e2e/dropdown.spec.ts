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

test('the error state matches the input field: red border and label, Danger icon 24px after the value and 8px before the chevron', async ({ page }) => {
  const m = await page.getByTestId('dropdown-matrix-light').evaluate((el) => {
    const control = [...el.querySelectorAll('.MuiFormControl-root')][13] // Error row, label top and helper
    const root = control.querySelector('.MuiOutlinedInput-root')!
    const value = root.querySelector('.MuiSelect-select')!.firstChild as Node
    const range = document.createRange()
    range.selectNodeContents(value)
    const text = range.getBoundingClientRect()
    const icon = root.querySelector('.ds-validation-icon')!.getBoundingClientRect()
    const chevron = root.querySelector('.MuiSelect-icon')!.getBoundingClientRect()
    return {
      border: getComputedStyle(root.querySelector('.MuiOutlinedInput-notchedOutline')!).borderTopColor,
      label: getComputedStyle(control.querySelector('label')!).color,
      helper: control.querySelector('.MuiFormHelperText-root')!.textContent,
      toChevron: Math.round(chevron.left - icon.right),
      height: Math.round(root.getBoundingClientRect().height),
      iconAfterText: icon.left > text.right,
    }
  })
  expect(m).toEqual({ border: 'rgb(223, 22, 66)', label: 'rgb(223, 22, 66)', helper: 'Error message', toChevron: 8, height: 37, iconAfterText: true })
})

test('an error in the preview is announced', async ({ page }) => {
  await page.getByLabel('Error').check()
  const combo = page.getByRole('combobox', { name: 'Department' })
  await expect(combo).toHaveAccessibleDescription('Select a department to continue')
  await expect(page.locator('input[aria-invalid="true"]').first()).toHaveCount(1)
})

test('multi-select rows match the Figma checkbox rows', async ({ page }) => {
  const rows = await page.getByTestId('dropdown-multi-light').evaluate((el) =>
    [...el.querySelectorAll('.MuiMenuItem-root')].map((r) => {
      const glyph = r.querySelector('.ds-row-check')!.getBoundingClientRect()
      const range = document.createRange()
      range.selectNodeContents(r.lastChild!)
      return {
        h: Math.round(r.getBoundingClientRect().height),
        gap: Math.round(range.getBoundingClientRect().left - glyph.right),
        glyph: Math.round(glyph.width),
        bg: getComputedStyle(r).backgroundColor,
        check: getComputedStyle(r.querySelector('.ds-row-check')!).color,
        weight: getComputedStyle(r).fontWeight,
      }
    }),
  )
  for (const r of rows) expect(r).toMatchObject({ h: 37, gap: 12, glyph: 16 })
  expect(rows[1].bg).toBe('rgb(239, 240, 242)') // hover
  expect(rows[2]).toMatchObject({ bg: 'rgba(0, 0, 0, 0)', check: 'rgb(237, 163, 13)', weight: '400' }) // selected keeps the plain fill
  expect(rows[3].bg).toBe('rgb(239, 240, 242)') // selected and hovered
})

test('multi-select picks several and lists them in the field', async ({ page }) => {
  await page.getByLabel('Multiple').check()
  const combo = page.getByRole('combobox', { name: 'Department' })
  await combo.click()
  const listbox = page.getByRole('listbox')
  await expect(listbox).toHaveAttribute('aria-multiselectable', 'true')
  await listbox.getByRole('option', { name: 'People' }).click()
  await listbox.getByRole('option', { name: 'Sales' }).click()
  await expect(listbox.getByRole('option', { name: 'Sales' })).toHaveAttribute('aria-selected', 'true')
  await page.keyboard.press('Escape')
  await expect(combo).toHaveText('People, Sales')
})

test('Listbox: the caret points at the field and groups have titles', async ({ page }) => {
  await page.getByTestId('dropdown-listbox-light').screenshot({ path: 'e2e/screenshots/dropdown-listbox-light.png', animations: 'disabled' })
  await page.getByRole('checkbox', { name: 'Groups' }).check()
  await page.getByRole('checkbox', { name: 'Caret' }).check()
  await page.getByRole('combobox', { name: /Department/ }).click()
  const listbox = page.getByRole('listbox')
  await expect(listbox).toBeVisible()
  // The titles are presentational: only the five departments are options.
  await expect(listbox.getByRole('option')).toHaveCount(5)
  await page.locator('.MuiMenu-list .MuiListSubheader-root').first().click()
  await expect(listbox).toBeVisible() // clicking a title picks nothing
  const titles = await page.locator('.MuiMenu-list .MuiListSubheader-root').evaluateAll((els) =>
    els.map((e) => [e.textContent, getComputedStyle(e).fontWeight, getComputedStyle(e).color, getComputedStyle(e).paddingTop]),
  )
  expect(titles).toEqual([
    ['Business', '600', 'rgb(101, 107, 124)', '8px'],
    ['Technical', '600', 'rgb(101, 107, 124)', '17px'], // 4 gap + 1px divider + 12
  ])
  const caret = await page.locator('.ds-menu-caret-bottom').evaluate((p) => {
    const cs = getComputedStyle(p, '::before')
    return [cs.width, cs.height, cs.top, cs.right, getComputedStyle(p).overflow]
  })
  expect(caret).toEqual(['16px', '8px', '-8px', '16px', 'visible'])
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('listbox')).toBeHidden()
})
