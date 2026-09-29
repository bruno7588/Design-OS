import { expect, test } from '@playwright/test'

// Alert and Callout reference checks against the Figma Alert set (dark 3658:32304, light 12060:2785).

test.use({ viewport: { width: 1600, height: 1400 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/alert')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`alert-matrix-${mode}`).screenshot({ path: `e2e/screenshots/alert-matrix-${mode}.png`, animations: 'disabled' })
  })
}

const read = (el: Element) =>
  [...el.querySelectorAll('.MuiAlert-root')].map((a) => {
    const cs = getComputedStyle(a)
    const r = a.getBoundingClientRect()
    const icon = a.querySelector('.MuiAlert-icon')?.getBoundingClientRect()
    const msg = a.querySelector('.MuiAlert-message')!
    const range = document.createRange()
    range.selectNodeContents(msg.querySelector('.MuiAlertTitle-root') ?? msg)
    const text = range.getBoundingClientRect()
    const action = a.querySelector('.MuiAlert-action .MuiButton-root')?.getBoundingClientRect()
    return {
      h: Math.round(r.height),
      bg: cs.backgroundColor,
      color: cs.color,
      weight: cs.fontWeight,
      radius: cs.borderTopLeftRadius,
      padding: cs.padding,
      role: a.getAttribute('role'),
      iconSize: icon ? Math.round(icon.width) : 0,
      iconToText: icon ? Math.round(text.left - icon.right) : null,
      textToButton: action ? Math.round(action.left - msg.getBoundingClientRect().right) : null,
      buttonColor: a.querySelector('.MuiAlert-action .MuiButton-root') ? getComputedStyle(a.querySelector('.MuiAlert-action .MuiButton-root')!).color : null,
    }
  })

test('Callouts match Figma in light mode', async ({ page }) => {
  const a = await page.getByTestId('alert-matrix-light').evaluate(read)
  const callouts = a.slice(0, 12)
  for (const c of callouts) expect(c).toMatchObject({ bg: 'rgba(191, 194, 204, 0.16)', color: 'rgb(69, 76, 94)', radius: '12px', padding: '8px 12px', role: 'note' })
  expect(callouts[0]).toMatchObject({ h: 37, iconSize: 20, iconToText: 8, weight: '400' })
  expect(callouts[1]).toMatchObject({ h: 37, textToButton: 8, buttonColor: 'rgb(32, 34, 42)' }) // link in Text-primary
  expect(callouts[4]).toMatchObject({ h: 37, iconSize: 20, iconToText: 8 }) // icon
  expect(callouts[8]).toMatchObject({ h: 37, iconSize: 0 }) // neither
})

test('Alerts match Figma: fill, SemiBold warning text, 12 / 8 / 24px gaps', async ({ page }) => {
  const a = (await page.getByTestId('alert-matrix-light').evaluate(read)).slice(12)
  for (const x of a) expect(x).toMatchObject({ h: 37, bg: 'rgba(255, 187, 56, 0.12)', color: 'rgb(232, 130, 6)', weight: '600', role: 'status', textToButton: 24, buttonColor: 'rgb(232, 130, 6)' })
  expect(a[0].iconToText).toBe(12) // bell
  expect(a[1].iconToText).toBe(8) // Danger Bold
})

test('dark mode: the Callout fill and text follow the tokens; the Alert fill stays', async ({ page }) => {
  await page.getByRole('button', { name: 'Dark', exact: true }).click()
  await expect(async () => {
    const a = await page.getByTestId('alert-matrix-dark').evaluate(read)
    expect(a[0]).toMatchObject({ bg: 'rgba(69, 76, 94, 0.16)', color: 'rgb(191, 194, 204)' })
    expect(a[12]).toMatchObject({ bg: 'rgba(255, 187, 56, 0.12)', color: 'rgb(255, 165, 56)' })
  }).toPass()
})

test('with supporting text the button moves under it, 16px below the body (8px gap + 8px margin)', async ({ page }) => {
  const m = await page.getByTestId('alert-matrix-light').evaluate((el) => {
    const a = el.querySelectorAll('.MuiAlert-root')[3]
    const title = a.querySelector('.MuiAlertTitle-root')!
    const btn = a.querySelector('.MuiAlert-message > .MuiButton-root')!
    const range = document.createRange()
    range.setStartAfter(title)
    range.setEndBefore(btn)
    return {
      weight: getComputedStyle(title).fontWeight,
      gap: Math.round(btn.getBoundingClientRect().top - range.getBoundingClientRect().bottom),
      h: Math.round(btn.getBoundingClientRect().height),
    }
  })
  expect(m.weight).toBe('600')
  expect(Math.abs(m.gap - 16)).toBeLessThanOrEqual(1) // the text range adds up to 1px of line box
  expect(m.h).toBe(41) // the Library's Medium button (Figma's instance overrides it to 37px)
})

test('the preview button works from the keyboard', async ({ page }) => {
  const btn = page.getByTestId('alert-preview').getByRole('button', { name: 'Learn more' })
  await btn.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByText('Button clicked 1 times')).toBeVisible()
})
