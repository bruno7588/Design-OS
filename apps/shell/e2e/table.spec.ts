import { expect, test } from '@playwright/test'

// Table checks against the Figma Table (7896:2624 / 11927:7332) and its row, header and data sets.

test.use({ viewport: { width: 1600, height: 1400 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/table')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshots, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    for (const id of ['table-figma', 'table-rows', 'table-header', 'table-cells']) {
      await page.getByTestId(`${id}-${mode}`).screenshot({ path: `e2e/screenshots/${id}-${mode}.png`, animations: 'disabled' })
    }
  })
}

test('header bar, card rows 12px apart and pagination match Figma', async ({ page }) => {
  const m = await page.getByTestId('table-figma-light').evaluate((el) => {
    const th = el.querySelectorAll('th')
    const rows = [...el.querySelectorAll('tbody tr')].map((r) => r.getBoundingClientRect())
    const head = el.querySelector('thead tr')!.getBoundingClientRect()
    const td = el.querySelector('tbody td')!
    const tdLast = el.querySelectorAll('tbody tr:first-child td')[5]
    const cs = getComputedStyle(td)
    const thcs = getComputedStyle(th[0])
    const pag = el.querySelector('.MuiTablePagination-root')!
    const table = el.querySelector('table')!.getBoundingClientRect()
    return {
      head: [Math.round(head.height), thcs.backgroundColor, thcs.color, thcs.borderTopLeftRadius, thcs.padding],
      row: [Math.round(rows[0].height), cs.borderTopColor, cs.borderLeftWidth, cs.borderTopLeftRadius, getComputedStyle(tdLast).borderTopRightRadius, cs.color, cs.fontSize],
      gaps: [Math.round(rows[0].top - head.bottom), Math.round(rows[1].top - rows[0].bottom)],
      pagination: [pag.textContent, Math.round(table.right - pag.getBoundingClientRect().right)],
    }
  })
  expect(m).toEqual({
    head: [37, 'rgba(191, 194, 204, 0.16)', 'rgb(69, 76, 94)', '12px', '8px 12px'],
    row: [37, 'rgb(223, 225, 230)', '1px', '12px', '12px', 'rgb(32, 34, 42)', '14px'],
    gaps: [12, 12],
    pagination: ['1-10 of 28', 0],
  })
})

test('row states: hover, selected, selected hover, read-only', async ({ page }) => {
  const rows = await page.getByTestId('table-rows-light').evaluate((el) =>
    [...el.querySelectorAll('tbody tr')].map((r) => {
      const cs = getComputedStyle(r.querySelector('td')!)
      return [cs.backgroundColor, cs.borderTopColor, cs.color]
    }),
  )
  expect(rows[0]).toEqual(['rgba(0, 0, 0, 0)', 'rgb(223, 225, 230)', 'rgb(32, 34, 42)'])
  expect(rows[1][0]).toBe('rgba(191, 194, 204, 0.16)')
  expect(rows[2].slice(0, 2)).toEqual(['rgba(255, 187, 56, 0.12)', 'rgba(255, 187, 56, 0.12)'])
  expect(rows[3].slice(0, 2)).toEqual(['rgba(255, 187, 56, 0.24)', 'rgba(255, 187, 56, 0.24)'])
  expect(rows[4][2]).toBe('rgb(158, 164, 179)')
})

test('cells: 24px checkboxes, 12px gaps, two-line text, date, thumbnail', async ({ page }) => {
  const m = await page.getByTestId('table-cells-light').evaluate((el) => {
    const cb = el.querySelector('.MuiCheckbox-root')!.getBoundingClientRect()
    const cbCell = el.querySelectorAll('tbody tr:first-child td')[4]
    const cbText = cbCell.querySelector('.MuiCheckbox-root')!.nextElementSibling!.getBoundingClientRect()
    const two = el.querySelectorAll('tbody tr:first-child td')[1].querySelectorAll('span')
    const date = el.querySelector('time')!
    const thumb = el.querySelector('img[src*="thumbnail"]')!.getBoundingClientRect()
    return {
      checkbox: Math.round(cb.width),
      gap: Math.round(cbText.left - cb.right),
      two: [getComputedStyle(two[0]).fontWeight, getComputedStyle(two[1]).color, Math.round(two[1].getBoundingClientRect().top - two[0].getBoundingClientRect().bottom)],
      date: [date.textContent, getComputedStyle(date.lastElementChild!).fontSize],
      thumb: [Math.round(thumb.width), Math.round(thumb.height)],
    }
  })
  expect(m).toEqual({ checkbox: 24, gap: 12, two: ['600', 'rgb(69, 76, 94)', 2], date: ['1 Jan,2025', '12px'], thumb: [72, 44] })
})

test('the preview table: select all, sort, page, read-only row', async ({ page }) => {
  const table = page.getByTestId('table-preview').getByRole('table', { name: 'Learners' })
  const all = table.getByRole('checkbox', { name: 'Select all learners on this page' })
  await expect(all).toBeChecked({ indeterminate: true })
  await all.click()
  await expect(table.getByRole('checkbox', { name: 'Select Ana Costa' })).toBeChecked()
  await expect(table.getByRole('row', { name: /Ana Costa/ })).toHaveClass(/Mui-selected/)

  const sort = table.getByRole('button', { name: 'Name' })
  await expect(table.getByRole('columnheader').first()).toHaveAttribute('aria-sort', 'ascending')
  await sort.click()
  await expect(table.getByRole('columnheader').first()).toHaveAttribute('aria-sort', 'descending')
  await sort.click()

  const archived = table.getByRole('row', { name: /Eva Silva/ })
  await expect(archived).toHaveAttribute('aria-disabled', 'true')
  await expect(archived.getByRole('checkbox')).toBeDisabled()
  await page.getByTestId('table-preview').getByRole('button', { name: 'Go to next page' }).click()
  await expect(page.getByTestId('table-preview').getByText('6-10 of 14')).toBeVisible()
})
