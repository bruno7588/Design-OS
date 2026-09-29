import { expect, test } from '@playwright/test'

// Tooltip reference checks against the Figma Tooltip set (dark 2683:29027, light 11927:8087).

test.use({ viewport: { width: 1800, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/tooltip')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`tooltip-matrix-${mode}`).screenshot({ path: `e2e/screenshots/tooltip-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('the bubble matches Figma: 8/12 padding, radius 12, 14px Regular, Tooltip-background per mode', async ({ page }) => {
  await page.waitForTimeout(400) // Grow transition
  const bubble = page.getByTestId('tooltip-matrix-light').locator('.MuiTooltip-tooltip').first()
  const s = await bubble.evaluate((el) => {
    const cs = getComputedStyle(el)
    return { p: cs.padding, r: cs.borderRadius, size: cs.fontSize, weight: cs.fontWeight, bg: cs.backgroundColor, h: Math.round(el.getBoundingClientRect().height) }
  })
  expect(s).toEqual({ p: '8px 12px', r: '12px', size: '14px', weight: '400', bg: 'rgb(32, 34, 42)', h: 37 })

  await page.getByRole('button', { name: 'Dark', exact: true }).click()
  const dark = await page.getByTestId('tooltip-matrix-dark').locator('.MuiTooltip-tooltip').first().evaluate((el) => getComputedStyle(el).backgroundColor)
  expect(dark).toBe('rgb(15, 16, 20)')
})

test('the caret is 12×6 and the bubble sits 4px from the caret', async ({ page }) => {
  // Wait for the Grow transition to finish scaling the open tooltips.
  await expect
    .poll(() => page.getByTestId('tooltip-matrix-light').locator('.MuiTooltip-arrow').last().evaluate((el) => el.getBoundingClientRect().width))
    .toBe(6)
  const m = await page.getByTestId('tooltip-matrix-light').evaluate((el) => {
    const out = []
    for (const popper of el.querySelectorAll('.MuiTooltip-popper')) {
      const arrow = popper.querySelector('.MuiTooltip-arrow')!.getBoundingClientRect()
      const bubble = popper.querySelector('.MuiTooltip-tooltip')!.getBoundingClientRect()
      const trigger = popper.parentElement!.firstElementChild!.getBoundingClientRect()
      const placement = popper.getAttribute('data-popper-placement')!
      const gap =
        placement.startsWith('top') ? trigger.top - arrow.bottom
        : placement.startsWith('bottom') ? arrow.top - trigger.bottom
        : placement.startsWith('right') ? arrow.left - trigger.right
        : trigger.left - arrow.right
      const inset = placement.endsWith('start') ? arrow.left - bubble.left : placement.endsWith('end') ? bubble.right - arrow.right : null
      out.push({ placement, w: Math.round(arrow.width), h: Math.round(arrow.height), gap: Math.round(gap), inset: inset === null ? null : Math.round(inset) })
    }
    return out
  })
  expect(m).toHaveLength(16)
  for (const c of m) {
    const sideways = c.placement.startsWith('left') || c.placement.startsWith('right')
    expect([c.w, c.h], c.placement).toEqual(sideways ? [6, 12] : [12, 6])
    expect(c.gap, c.placement).toBe(4)
    if (c.inset !== null) expect(c.inset, c.placement).toBe(16)
  }
})

test('hover and focus show it, Escape hides it, and the trigger is described by it', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'More information' }).first()
  await trigger.hover()
  const tip = page.getByRole('tooltip', { name: 'Learners see this skill on their profile.' })
  await expect(tip).toBeVisible()
  await expect(trigger).toHaveAccessibleDescription('Learners see this skill on their profile.')
  await page.mouse.move(0, 0)
  await expect(tip).toBeHidden()
  await trigger.focus()
  await expect(tip).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(tip).toBeHidden()
})
