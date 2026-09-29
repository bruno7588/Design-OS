import { expect, test } from '@playwright/test'

// Resource card checks against Figma Card/Resources (dark 12213:3040, light 12228:2749) and
// Type thumbnail (dark 12213:2984, light 12228:2778).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/resource-card')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`resource-card-matrix-${mode}`).screenshot({ path: `e2e/screenshots/resource-card-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('card sizes, type and thumbnails match Figma', async ({ page }) => {
  await expect(async () => {
    const m = await page.getByTestId('resource-card-matrix-light').evaluate((el) => {
      const cards = [...el.querySelectorAll('.ds-resource-card')].map((c) => {
        const r = c.getBoundingClientRect()
        const meta = c.querySelector('p')!
        return {
          size: [Math.round(r.width), Math.round(r.height)],
          pad: getComputedStyle(c).padding,
          fill: getComputedStyle(c).backgroundColor,
          tile: Math.round(c.querySelector('.ds-type-thumbnail')!.getBoundingClientRect().width),
          meta: [meta.textContent, getComputedStyle(meta).color],
          action: Math.round(c.querySelector('.ds-resource-action')!.getBoundingClientRect().width),
        }
      })
      const tiles = [...el.querySelectorAll('.ds-type-thumbnail')].slice(3).map((t) => Math.round(t.getBoundingClientRect().width))
      const link = el.querySelectorAll('.ds-type-thumbnail')[8]
      return { cards, tiles, link: getComputedStyle(link).backgroundColor }
    })
    expect(m.cards[0]).toMatchObject({ size: [344, 64], pad: '12px', tile: 40, action: 28, meta: ['PDF • 1.1 MB', 'rgb(101, 107, 124)'] })
    expect(m.cards[1]).toMatchObject({ size: [900, 73], pad: '12px 16px 12px 12px', tile: 48, action: 28 })
    expect(m.cards[2].fill).toBe('rgb(239, 240, 242)')
    expect(m.tiles).toEqual([48, 48, 48, 48, 48, 48])
    expect(m.link).toBe('rgb(99, 104, 219)') // Certificate quiz
  }).toPass()
})

test('the action is named with the title and shows its tooltip', async ({ page }) => {
  const preview = page.getByTestId('resource-card-preview')
  const download = preview.getByRole('button', { name: 'Download Resources that everyone should know' })
  await download.hover()
  await expect(page.getByRole('tooltip', { name: 'Download' })).toBeVisible()
  await download.click()
  await expect(preview.getByRole('status')).toHaveText('Downloaded the file.')
  await page.getByRole('combobox', { name: /^Type/ }).click()
  await page.getByRole('option', { name: 'External link' }).click()
  await expect(preview.getByText('External link')).toBeVisible()
  await preview.getByRole('button', { name: /^Open link/ }).click()
  await expect(preview.getByRole('status')).toHaveText('Opened the link.')
})
