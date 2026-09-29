import { expect, test } from '@playwright/test'

// Tab navigation checks against Figma Tab nav (dark 1324:35285, light 9897:18192).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/tab-navigation')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`tab-navigation-matrix-${mode}`).screenshot({ path: `e2e/screenshots/tab-navigation-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('bar, tabs, label and selected colour match Figma', async ({ page }) => {
  await expect(async () => {
    const bars = await page.getByTestId('tab-navigation-matrix-light').evaluate((el) =>
      [...el.querySelectorAll('nav')].map((n) => {
        const tabs = [...n.querySelectorAll('button')]
        const label = (b: Element) => b.querySelector('.MuiBottomNavigationAction-label')!
        return {
          h: Math.round(n.getBoundingClientRect().height),
          pad: getComputedStyle(n).padding,
          fill: getComputedStyle(n).backgroundColor,
          line: getComputedStyle(n).boxShadow,
          tabs: tabs.map((b) => [Math.round(b.getBoundingClientRect().width), Math.round(b.getBoundingClientRect().height)]),
          icon: Math.round(tabs[0].querySelector('svg')!.getBoundingClientRect().width),
          font: [getComputedStyle(label(tabs[0])).fontSize, getComputedStyle(label(tabs[0])).lineHeight, getComputedStyle(label(tabs[0])).fontWeight],
          colours: tabs.map((b) => getComputedStyle(b).color),
        }
      }),
    )
    expect(bars).toHaveLength(6)
    expect(bars[0]).toMatchObject({ h: 66, pad: '8px 16px', fill: 'rgb(249, 249, 250)', icon: 24, font: ['10px', '14px', '400'] })
    expect(bars[0].line).toContain('rgb(223, 225, 230)') // Border on top
    expect(bars[0].tabs).toEqual(Array(5).fill([69, 50]))
    expect(bars[0].colours).toEqual(Array(5).fill('rgb(69, 76, 94)')) // Text-secondary
    // Page=Home … Profile: only the selected tab turns Selected (Secondary-600 in light mode)
    for (let i = 1; i <= 5; i++) {
      expect(bars[i].colours[i - 1]).toBe('rgb(237, 163, 13)')
      expect(bars[i].colours.filter((c) => c === 'rgb(69, 76, 94)')).toHaveLength(4)
      expect(bars[i].font).toEqual(['10px', '14px', '400']) // the label doesn't grow when selected
    }
  }).toPass()
})

test('a nav landmark with aria-current on the current page', async ({ page }) => {
  const preview = page.getByTestId('tab-navigation-preview')
  const nav = preview.getByRole('navigation', { name: 'Main' })
  await expect(nav.getByRole('button', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
  await nav.getByRole('button', { name: 'Progress' }).click()
  await expect(nav.getByRole('button', { name: 'Progress' })).toHaveAttribute('aria-current', 'page')
  await expect(nav.getByRole('button', { name: 'Home' })).not.toHaveAttribute('aria-current')
  await expect(preview.getByRole('status')).toHaveText('Current page: progress.')
})
