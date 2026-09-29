import { expect, test } from '@playwright/test'

// Toast reference checks against the Figma Toast set (5045:14119).

test.use({ viewport: { width: 1800, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/toast')
  await page.evaluate(() => document.fonts.ready)
})

test('matrix screenshot', async ({ page }) => {
  await page.getByTestId('toast-matrix-light').screenshot({ path: 'e2e/screenshots/toast-matrix-light.png', animations: 'disabled' })
})

test('each toast is 48px tall with the Figma fill, padding and type', async ({ page }) => {
  const toasts = await page.getByTestId('toast-matrix-light').locator('.MuiAlert-root').evaluateAll((els) =>
    els.map((el) => {
      const cs = getComputedStyle(el)
      return { h: Math.round(el.getBoundingClientRect().height), bg: cs.backgroundColor, p: cs.padding, r: cs.borderRadius, size: cs.fontSize, weight: cs.fontWeight }
    }),
  )
  const fills = ['rgb(45, 49, 61)', 'rgb(24, 169, 87)', 'rgb(232, 130, 6)', 'rgb(223, 22, 66)']
  expect(toasts).toHaveLength(8)
  toasts.forEach((t, i) => expect(t).toEqual({ h: 48, bg: fills[Math.floor(i / 2)], p: '12px 16px', r: '12px', size: '16px', weight: '700' }))
})

test('success is announced politely and errors interrupt', async ({ page }) => {
  const matrix = page.getByTestId('toast-matrix-light')
  await expect(matrix.getByRole('status')).toHaveCount(4)
  await expect(matrix.getByRole('alert')).toHaveCount(4)
})

test('Show toast stacks new toasts above, and each one leaves after 5 seconds', async ({ page }) => {
  await page.clock.install()
  await page.goto('/components/toast')
  const stack = page.getByTestId('toast-stack')
  await page.getByRole('button', { name: 'Show toast' }).click()
  await page.clock.runFor(1000)
  await page.getByRole('button', { name: 'Show toast' }).click()
  const toasts = stack.locator('.MuiAlert-root')
  await expect(toasts).toHaveCount(2)
  const [first, second] = await toasts.evaluateAll((els) => els.map((el) => el.getBoundingClientRect().top))
  expect(second).toBeLessThan(first) // the newer one sits above

  await page.clock.runFor(4200) // the first has now shown for 5.2s
  await expect(toasts).toHaveCount(1)
  await page.clock.runFor(1500)
  await expect(toasts).toHaveCount(0)
})

test('hovering a toast pauses its timer', async ({ page }) => {
  await page.clock.install()
  await page.goto('/components/toast')
  await page.getByRole('button', { name: 'Show toast' }).click()
  const toast = page.getByTestId('toast-stack').locator('.MuiAlert-root')
  await toast.hover()
  await page.clock.runFor(8000)
  await expect(toast).toHaveCount(1)
  await page.mouse.move(0, 0)
  await page.clock.runFor(6000)
  await expect(toast).toHaveCount(0)
})
