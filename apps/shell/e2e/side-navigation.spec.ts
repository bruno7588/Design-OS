import { expect, test } from '@playwright/test'

// Side navigation checks against Figma Side navigation (dark 4697:13314, light 12048:2302)
// and the Menu/Itens sets (WebApp 12048:2401, Admin 12048:2440).

test.use({ viewport: { width: 1600, height: 1400 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/side-navigation')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`side-navigation-matrix-${mode}`).screenshot({ path: `e2e/screenshots/side-navigation-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('panels and menu items match Figma', async ({ page }) => {
  await expect(async () => {
    const m = await page.getByTestId('side-navigation-matrix-light').evaluate((el) => {
      const navs = [...el.querySelectorAll('.ds-side-nav')]
      const item = (nav: Element, sel: string) => {
        const n = nav.querySelector(sel)!
        const cs = getComputedStyle(n)
        const r = n.getBoundingClientRect()
        return { w: Math.round(r.width), h: Math.round(r.height), pad: cs.padding, size: cs.fontSize, weight: cs.fontWeight, colour: cs.color, fill: cs.backgroundColor, icon: Math.round(n.querySelector('svg')?.getBoundingClientRect().width ?? 0) }
      }
      return {
        widths: navs.map((n) => Math.round(n.getBoundingClientRect().width)),
        border: navs.map((n) => getComputedStyle(n).boxShadow),
        web: item(navs[0], '.ds-nav-web:not(.Mui-selected):not(.ds-hover)'),
        webSelected: item(navs[0], '.ds-nav-web.Mui-selected'),
        webHover: item(navs[0], '.ds-nav-web.ds-hover'),
        webTile: item(navs[1], '.ds-nav-web'),
        admin: item(navs[2], '.ds-nav-admin:not(.Mui-selected):not(.ds-has-selected):not(.ds-hover)'),
        adminGroup: item(navs[2], '.ds-nav-admin.ds-has-selected'),
        sub: item(navs[2], '.ds-nav-sub:not(.Mui-selected)'),
        subSelected: item(navs[2], '.ds-nav-sub.Mui-selected'),
        adminTile: item(navs[3], '.ds-nav-admin'),
      }
    })
    expect(m.widths).toEqual([240, 88, 240, 68])
    expect(m.border[0]).toBe('none')
    expect(m.border[2]).toContain('rgb(223, 225, 230)') // Admin: Border on the right
    const secondary = 'rgb(69, 76, 94)'
    const selected = 'rgb(237, 163, 13)'
    expect(m.web).toMatchObject({ h: 56, pad: '16px', size: '16px', weight: '400', colour: secondary, icon: 24 })
    expect(m.webSelected).toMatchObject({ colour: selected, weight: '700', fill: 'rgba(0, 0, 0, 0)' })
    expect(m.webHover.fill).toBe('rgba(191, 194, 204, 0.16)') // Input-background
    expect(m.webTile).toMatchObject({ w: 56, h: 56 })
    expect(m.admin).toMatchObject({ h: 45, pad: '12px 16px', size: '14px', colour: secondary, icon: 20 })
    expect(m.adminGroup).toMatchObject({ weight: '700', colour: secondary })
    expect(m.sub).toMatchObject({ h: 45, pad: '12px 16px 12px 42px', colour: 'rgb(101, 107, 124)' }) // Text-tertiary
    expect(m.subSelected).toMatchObject({ colour: selected, weight: '700' })
    expect(m.adminTile).toMatchObject({ w: 52, h: 44 })
  }).toPass()
})

test('it is a named nav: groups open and close, the current page is marked, collapsed items are named', async ({ page }) => {
  const preview = page.getByTestId('side-navigation-preview')
  const nav = preview.getByRole('navigation', { name: 'Main' })
  await expect(nav.getByRole('button', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
  const group = nav.getByRole('button', { name: 'People & Teams' })
  await expect(group).toHaveAttribute('aria-expanded', 'false')
  await group.click()
  await expect(group).toHaveAttribute('aria-expanded', 'true')
  await nav.getByRole('button', { name: 'Teams', exact: true }).click()
  await expect(nav.getByRole('button', { name: 'Teams', exact: true })).toHaveAttribute('aria-current', 'page')

  await page.getByLabel('Collapsed').check()
  const home = nav.getByRole('button', { name: 'Home' })
  await home.hover()
  await expect(page.getByRole('tooltip', { name: 'Home' })).toBeVisible()
})
