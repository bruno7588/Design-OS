import { expect, test } from '@playwright/test'

// Top navigation checks against Figma Top Nav/Admin (dark 5385:20137, light 11982:3602).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/top-navigation')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`top-navigation-matrix-${mode}`).screenshot({ path: `e2e/screenshots/top-navigation-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('bar, logo and actions match Figma', async ({ page }) => {
  await expect(async () => {
    const bars = await page.getByTestId('top-navigation-matrix-light').evaluate((el) =>
      [...el.querySelectorAll('.ds-top-nav')].map((b) => {
        const cs = getComputedStyle(b)
        const logo = b.querySelector('svg[aria-label="5Mins.ai"]')
        return {
          h: Math.round(b.getBoundingClientRect().height),
          pad: cs.padding,
          fill: cs.backgroundColor,
          line: cs.boxShadow,
          logo: logo ? [Math.round(logo.getBoundingClientRect().width), Math.round(logo.getBoundingClientRect().height)] : null,
        }
      }),
    )
    expect(bars[0]).toMatchObject({ h: 70, pad: '8px 32px', fill: 'rgb(249, 249, 250)', logo: [102, 22] })
    expect(bars[0].line).toContain('rgb(223, 225, 230)') // Border underneath
    expect(bars[1]).toMatchObject({ h: 70, logo: [102, 22] })
    expect(bars[2]).toMatchObject({ h: 72, pad: '8px 16px', logo: null })
  }).toPass()
})

test('every action is a named button; the theme button says what it switches to', async ({ page }) => {
  const preview = page.getByTestId('top-navigation-preview')
  await expect(preview.locator('header.ds-top-nav')).toBeVisible() // the banner landmark when it sits at the top of a page
  await preview.getByRole('button', { name: 'Exit Admin' }).click()
  await expect(preview.getByRole('status')).toHaveText('Clicked “Exit Admin”.')
  const theme = preview.getByRole('button', { name: /Switch to (dark|light) mode/ })
  const before = await theme.getAttribute('aria-label')
  await theme.click()
  await expect(preview.getByRole('button', { name: /Switch to (dark|light) mode/ })).not.toHaveAttribute('aria-label', before!)
  await expect(preview.getByRole('button', { name: 'Log out' })).toBeVisible()
})
