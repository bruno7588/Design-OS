import { expect, test } from '@playwright/test'

// Content switcher checks against the Figma Content switcher item set (dark 8497:24186, light 11908:5278).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/content-switcher')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`content-switcher-matrix-${mode}`).screenshot({ path: `e2e/screenshots/content-switcher-matrix-${mode}.png`, animations: 'disabled' })
    await page.getByTestId(`content-switcher-${mode}`).screenshot({ path: `e2e/screenshots/content-switcher-${mode}.png`, animations: 'disabled' })
  })
}

test('the track and sections match Figma in light mode', async ({ page }) => {
  await expect(async () => {
    const m = await page.getByTestId('content-switcher-light').evaluate((g) => {
      const cs = getComputedStyle(g)
      const items = [...g.querySelectorAll('.MuiToggleButton-root')]
      const r = items.map((i) => i.getBoundingClientRect())
      const s = items.map((i) => getComputedStyle(i))
      return {
        track: [cs.backgroundColor, cs.padding, cs.borderTopLeftRadius, Math.round(g.getBoundingClientRect().height)],
        gap: Math.round(r[1].left - r[0].right),
        item: [Math.round(r[1].height), s[1].padding, s[1].borderTopLeftRadius, s[1].color, s[1].fontWeight, s[1].backgroundColor],
        selected: [s[0].backgroundColor, s[0].color, s[0].fontWeight],
      }
    })
    expect(m).toEqual({
      track: ['rgba(191, 194, 204, 0.16)', '4px', '12px', 41],
      gap: 4,
      item: [33, '6px 12px', '8px', 'rgb(69, 76, 94)', '400', 'rgba(0, 0, 0, 0)'],
      selected: ['rgb(255, 187, 56)', 'rgb(32, 34, 42)', '700'],
    })
  }).toPass()
})

test('hover, disabled and the icon sizes', async ({ page }) => {
  const m = await page.getByTestId('content-switcher-matrix-light').evaluate((el) => {
    const btns = [...el.querySelectorAll('.MuiToggleButton-root')]
    const hover = btns.find((b) => b.classList.contains('ds-hover'))!
    const disabled = btns.find((b) => b.classList.contains('Mui-disabled'))!
    const right = el.querySelector('svg.ds-icon-right')!.getBoundingClientRect()
    const left = btns[2].querySelector('svg')!.getBoundingClientRect()
    return { hover: getComputedStyle(hover).backgroundColor, disabled: getComputedStyle(disabled).color, right: Math.round(right.width), left: Math.round(left.width) }
  })
  expect(m).toEqual({ hover: 'rgb(223, 225, 230)', disabled: 'rgb(158, 164, 179)', right: 16, left: 20 })
})

test('one section is always selected, from the mouse or the keyboard', async ({ page }) => {
  const group = page.getByTestId('content-switcher-preview').getByRole('group', { name: 'View' })
  const grid = group.getByRole('button', { name: 'Grid' })
  await expect(grid).toHaveAttribute('aria-pressed', 'true')
  await grid.click()
  await expect(grid).toHaveAttribute('aria-pressed', 'true')
  await group.getByRole('button', { name: 'List' }).focus()
  await page.keyboard.press('Space')
  await expect(group.getByRole('button', { name: 'List' })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByText('Showing the list view')).toBeVisible()
})
