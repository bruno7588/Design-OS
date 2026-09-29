import { expect, test } from '@playwright/test'

// App top navigation checks against Figma Top nav/ App (dark 1910:18375, light 11235:11758).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/app-top-navigation')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`app-top-navigation-matrix-${mode}`).screenshot({ path: `e2e/screenshots/app-top-navigation-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('bar heights, padding and border per page match Figma', async ({ page }) => {
  await expect(async () => {
    const rows = await page.getByTestId('app-top-navigation-matrix-light').evaluate((el) =>
      Object.fromEntries(
        [...el.querySelectorAll('[data-page]')].map((p) => {
          const header = p.querySelector('.ds-app-top-nav')!
          const row = p.querySelector('.ds-app-top-nav-row')!
          return [
            p.getAttribute('data-page'),
            {
              status: Math.round(p.querySelector('.ds-status-bar')!.getBoundingClientRect().height),
              h: Math.round(row.getBoundingClientRect().height),
              pad: getComputedStyle(row).padding,
              line: getComputedStyle(row).boxShadow,
              fill: getComputedStyle(header).backgroundColor,
            },
          ]
        }),
      ),
    )
    const heights = { home: 65, search: 65, progress: 65, feed: 65, profile: 64, detail: 56, skill: 56, 'lesson-feed': 56 }
    for (const [p, h] of Object.entries(heights)) {
      expect(rows[p].h, p).toBe(h)
      expect(rows[p].status, p).toBe(25)
      expect(rows[p].pad, p).toBe(h === 56 ? '8px 16px' : '12px 16px')
    }
    expect(rows.home.fill).toBe('rgb(249, 249, 250)')
    expect(rows.home.line).toContain('rgb(223, 225, 230)')
    expect(rows['lesson-feed']).toMatchObject({ fill: 'rgba(0, 0, 0, 0)', line: 'none' })
  }).toPass()
})

test('chips, icons, back button and profile match Figma', async ({ page }) => {
  const m = await page.getByTestId('app-top-navigation-matrix-light').evaluate((el) => {
    const q = (p: string, s: string) => el.querySelector(`[data-page="${p}"] ${s}`)!
    const r = (e: Element) => e.getBoundingClientRect()
    const chips = (p: string) => [...el.querySelectorAll(`[data-page="${p}"] .MuiChip-root`)]
    const gap = (a: Element, b: Element) => Math.round(r(b).left - r(a).right)
    const back = q('detail', '.ds-app-back')
    const icons = [...el.querySelectorAll('[data-page="home"] .ds-app-icon')]
    const dot = q('home', '.ds-nudge')
    const title = q('feed', 'h1')
    const feedRow = q('feed', '.ds-app-top-nav-row')
    return {
      chipH: Math.round(r(chips('home')[0]).height),
      homeGap: gap(chips('home')[0], chips('home')[1]),
      progressGap: gap(chips('progress')[0], chips('progress')[1]),
      icons: icons.map((i) => Math.round(r(i.querySelector('svg')!).width)),
      iconGap: gap(icons[0], icons[1]),
      dot: [Math.round(r(dot).width), getComputedStyle(dot).backgroundColor],
      back: [Math.round(r(back).width), Math.round(r(back).height), getComputedStyle(back).borderRadius !== '0px'],
      title: [getComputedStyle(title).fontSize, getComputedStyle(title).fontWeight, Math.abs(Math.round(r(title).left + r(title).width / 2 - (r(feedRow).left + r(feedRow).width / 2)))],
      search: Math.round(r(q('search', '.ds-search')).height),
      avatar: Math.round(r(q('profile', '.MuiAvatar-root')).width),
      badge: Math.round(r(q('profile', '.ds-app-settings')).width),
      add: [Math.round(r(q('profile', '.ds-app-add')).width), getComputedStyle(q('profile', '.ds-app-add')).backgroundColor],
      role: [getComputedStyle(q('profile', 'h1 + p')).fontSize, getComputedStyle(q('profile', 'h1 + p')).color],
    }
  })
  expect(m).toMatchObject({
    chipH: 33,
    homeGap: 8,
    progressGap: 16,
    icons: [28, 28],
    iconGap: 16,
    dot: [8, 'rgb(223, 22, 66)'],
    back: [40, 40, true],
    title: ['16px', '700', 0],
    search: 37,
    avatar: 40,
    badge: 18,
    add: [40, 'rgb(0, 206, 230)'],
    role: ['12px', 'rgb(69, 76, 94)'],
  })
})

test('every action is a named button; search takes text', async ({ page }) => {
  const preview = page.getByTestId('app-top-navigation-preview')
  await expect(preview.getByRole('button', { name: 'Notifications, new' })).toBeVisible()
  await preview.getByRole('button', { name: 'Your Workspace' }).click()
  await expect(preview.getByRole('button', { name: 'Your Workspace' })).toHaveAttribute('aria-pressed', 'true')
  await preview.getByRole('button', { name: 'Streak' }).click()
  await expect(preview.getByRole('status')).toHaveText('Clicked “Streak”.')

  const pick = async (name: string) => {
    await page.getByRole('combobox', { name: /^Page/ }).click()
    await page.getByRole('option', { name, exact: true }).click()
  }
  await pick('Detail page')
  await expect(preview.getByRole('heading', { name: 'Notifications' })).toBeVisible()
  await preview.getByRole('button', { name: 'Back' }).click()
  await expect(preview.getByRole('status')).toHaveText('Clicked “Back”.')
  await pick('Search')
  await preview.getByRole('searchbox').fill('Leadership')
  await expect(preview.getByRole('searchbox')).toHaveValue('Leadership')
  await pick('Profile')
  await expect(preview.getByRole('heading', { name: 'Anthony Wallace' })).toBeVisible()
  await preview.getByRole('button', { name: 'Profile settings' }).click()
  await expect(preview.getByRole('status')).toHaveText('Clicked “Profile settings”.')
})
