import { expect, test } from '@playwright/test'

// Page header checks against Figma Header (dark 7902:1019, light 11921:13215).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/page-header')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`page-header-matrix-${mode}`).screenshot({ path: `e2e/screenshots/page-header-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('type, gaps and colours match Figma for Page and Section', async ({ page }) => {
  await expect(async () => {
    const h = await page.getByTestId('page-header-matrix-light').evaluate((el) =>
      [...el.querySelectorAll('.ds-page-header')].map((hd) => {
        const title = hd.querySelector('h2, h3')!
        const support = title.nextElementSibling!
        const meta = hd.querySelector('li')!
        return {
          gap: getComputedStyle(hd).rowGap,
          title: [getComputedStyle(title).fontSize, getComputedStyle(title).fontWeight, getComputedStyle(title).color],
          support: [getComputedStyle(support).fontSize, getComputedStyle(support).color],
          meta: [getComputedStyle(meta).fontSize, getComputedStyle(meta).color, Math.round(meta.querySelector('svg')!.getBoundingClientRect().width)],
          titleGap: Math.round(support.getBoundingClientRect().top - title.getBoundingClientRect().bottom),
          divider: !!hd.querySelector('hr'),
        }
      }),
    )
    expect(h[0]).toMatchObject({ gap: '16px', title: ['24px', '700', 'rgb(32, 34, 42)'], support: ['16px', 'rgb(69, 76, 94)'], meta: ['14px', 'rgb(101, 107, 124)', 16], titleGap: 4, divider: true })
    expect(h[1]).toMatchObject({ gap: '12px', title: ['20px', '700', 'rgb(32, 34, 42)'], support: ['14px', 'rgb(69, 76, 94)'], meta: ['12px', 'rgb(101, 107, 124)', 14] })
  }).toPass()
})

test('the title is a heading and the navigation is a tablist', async ({ page }) => {
  const preview = page.getByTestId('page-header-preview')
  await expect(preview.getByRole('heading', { name: 'Title of this page' })).toBeVisible()
  await expect(preview.getByRole('tablist', { name: 'Sections' })).toBeVisible()
  await page.getByLabel('Navigation').uncheck()
  await expect(preview.getByRole('tablist')).toHaveCount(0)
})
