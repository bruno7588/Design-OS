import { expect, test } from '@playwright/test'

// Breadcrumb checks against the Figma Breadcrumb item set (dark 8497:1494, light 11935:2383).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/breadcrumb')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`breadcrumb-matrix-${mode}`).screenshot({ path: `e2e/screenshots/breadcrumb-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('the trail matches Figma: 14px, Text-tertiary links, 16px chevrons 2px after, 4px between, current page Text-secondary', async ({ page }) => {
  const m = await page.getByTestId('breadcrumb-trail-light').evaluate((nav) => {
    const lis = [...nav.querySelectorAll('li')]
    const link = nav.querySelector('li > button, li > a')!
    const sep = nav.querySelector('.MuiBreadcrumbs-separator')!
    const next = lis[2]
    const current = nav.querySelector('[aria-current="page"]')!
    const lr = link.getBoundingClientRect()
    const sr = sep.querySelector('svg')!.getBoundingClientRect()
    return {
      font: getComputedStyle(link).fontSize,
      link: getComputedStyle(link).color,
      chevron: Math.round(sr.width),
      toChevron: Math.round(sr.left - lr.right),
      toNext: Math.round(next.getBoundingClientRect().left - sr.right),
      current: getComputedStyle(current).color,
      currentIsLink: current.tagName === 'A' || current.tagName === 'BUTTON',
      lastSep: lis[lis.length - 1].classList.contains('MuiBreadcrumbs-separator'),
    }
  })
  expect(m).toEqual({ font: '14px', link: 'rgb(101, 107, 124)', chevron: 16, toChevron: 2, toNext: 4, current: 'rgb(69, 76, 94)', currentIsLink: false, lastSep: false })
})

test('hover is Text-primary and underlined, with the chevron; disabled is Text-disabled', async ({ page }) => {
  const m = await page.getByTestId('breadcrumb-matrix-light').evaluate((el) => {
    const links = [...el.querySelectorAll('li > button, li > a')]
    const hover = links.find((l) => l.classList.contains('ds-hover'))!
    const disabled = links.find((l) => l.getAttribute('aria-disabled') === 'true')!
    const sepAfter = (l: Element) => getComputedStyle(l.parentElement!.nextElementSibling!).color
    return {
      hover: [getComputedStyle(hover).color, getComputedStyle(hover).textDecorationLine, sepAfter(hover)],
      disabled: [getComputedStyle(disabled).color, sepAfter(disabled)],
    }
  })
  expect(m.hover).toEqual(['rgb(32, 34, 42)', 'underline', 'rgb(32, 34, 42)'])
  expect(m.disabled).toEqual(['rgb(158, 164, 179)', 'rgb(158, 164, 179)'])
})

test('it is a named nav with the current page marked, and links work', async ({ page }) => {
  const nav = page.getByTestId('breadcrumb-preview').getByRole('navigation', { name: 'Breadcrumb' })
  await expect(nav.locator('[aria-current="page"]')).toHaveText('Giving feedback')
  await nav.getByRole('button', { name: 'Leadership essentials' }).click()
  await expect(nav.locator('[aria-current="page"]')).toHaveText('Leadership essentials')
})
