import { expect, test } from '@playwright/test'

// Tabs reference checks against the Figma Tab items set (dark 1939:18281, light 12134:6969)
// and Tabs (8497:24855).

test.use({ viewport: { width: 1800, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/tabs')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    const matrix = page.getByTestId(`tabs-matrix-${mode}`)
    await matrix.screenshot({ path: `e2e/screenshots/tabs-matrix-${mode}.png`, animations: 'disabled' })
    await page.getByTestId(`tabs-bar-${mode}`).screenshot({ path: `e2e/screenshots/tabs-bar-${mode}.png`, animations: 'disabled' })
  })
}

test('the bar is 27px tall, tabs sit 16px apart, and the indicator is 2px under the selected label', async ({ page }) => {
  const bar = page.getByTestId('tabs-bar-light')
  // MUI re-measures the indicator once the web font has loaded.
  await expect
    .poll(() => bar.evaluate((el) => el.querySelector('.MuiTabs-indicator')!.getBoundingClientRect().width === el.querySelector('[role="tab"]')!.getBoundingClientRect().width))
    .toBe(true)
  const m = await bar.evaluate((el) => {
    const tabs = [...el.querySelectorAll('[role="tab"]')].map((t) => t.getBoundingClientRect())
    const selected = el.querySelector('[role="tab"][aria-selected="true"]')!.getBoundingClientRect()
    const indicator = el.querySelector('.MuiTabs-indicator')!
    const ir = indicator.getBoundingClientRect()
    return {
      height: tabs[0].height,
      gap: tabs[1].left - tabs[0].right,
      indicator: { h: ir.height, w: Math.round(ir.width), bottom: ir.bottom - selected.bottom, colour: getComputedStyle(indicator).backgroundColor },
      selectedWidth: Math.round(selected.width),
    }
  })
  expect(m.height).toBe(27)
  expect(m.gap).toBe(16)
  expect(m.indicator.h).toBe(2)
  expect(m.indicator.w).toBe(m.selectedWidth)
  expect(m.indicator.bottom).toBe(0)
  expect(m.indicator.colour).toBe('rgb(237, 163, 13)') // Selected, light: Secondary-600
})

test('labels are 14px Medium, Bold when selected, and the counter is a 20px pill', async ({ page }) => {
  const tabs = page.getByRole('tablist', { name: 'Course sections' }).getByRole('tab')
  const weights = await tabs.evaluateAll((els) => els.map((el) => getComputedStyle(el).fontWeight))
  expect(weights).toEqual(['700', '500', '500', '500'])
  const counter = await tabs.nth(1).locator('.ds-tab-counter').evaluate((el) => el.getBoundingClientRect().height)
  expect(counter).toBe(20)
})

test('arrow keys move between tabs and Enter selects', async ({ page }) => {
  const list = page.getByRole('tablist', { name: 'Course sections' })
  await list.getByRole('tab', { name: 'Overview' }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(list.getByRole('tab', { name: /Learners/ })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(list.getByRole('tab', { name: /Learners/ })).toHaveAttribute('aria-selected', 'true')
})

test('the selected tab keeps its width when the selection moves', async ({ page }) => {
  const tab = page.getByRole('tablist', { name: 'Course sections' }).getByRole('tab', { name: 'Settings' })
  const before = await tab.evaluate((el) => el.getBoundingClientRect().width)
  await tab.click()
  const after = await tab.evaluate((el) => el.getBoundingClientRect().width)
  expect(after).toBe(before)
})
