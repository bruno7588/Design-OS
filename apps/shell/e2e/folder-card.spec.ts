import { expect, test } from '@playwright/test'

// Folder card checks against Figma Card/Folder (dark 10175:3106) and Card/folder (light 10175:3183).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/folder-card')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`folder-card-matrix-${mode}`).screenshot({ path: `e2e/screenshots/folder-card-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('surface, deck layers and New Folder match Figma', async ({ page }) => {
  await expect(async () => {
    const m = await page.getByTestId('folder-card-matrix-light').evaluate((el) => {
      const cards = [...el.querySelectorAll('.ds-folder-card')].slice(0, 4).map((c) => {
        const s = c.querySelector('.ds-folder-surface')!
        const deck = c.querySelector('.ds-folder-deck')
        return {
          surface: [Math.round(s.getBoundingClientRect().width), Math.round(s.getBoundingClientRect().height), getComputedStyle(s).boxShadow !== 'none'],
          layers: deck ? deck.children.length : 0,
          count: c.querySelector('p')!.textContent,
        }
      })
      const tile = el.querySelector('.ds-new-folder')!
      const cs = getComputedStyle(tile)
      return { cards, tile: [Math.round(tile.getBoundingClientRect().width), Math.round(tile.getBoundingClientRect().height), cs.borderStyle, cs.borderWidth] }
    })
    expect(m.cards.map((c) => c.layers)).toEqual([3, 2, 1, 0])
    expect(m.cards[0].surface).toEqual([308, 272, true])
    expect(m.cards.map((c) => c.count)).toEqual(['3+ courses', '2 courses', '1 course', '0 courses'])
    expect(m.tile.slice(0, 3)).toEqual([308, 272, 'dashed'])
    expect(['1px', '1.5px']).toContain(m.tile[3]) // Chrome rounds 1.5px to device pixels at 1×
  }).toPass()
})

test('the title opens the folder; New Folder is a button', async ({ page }) => {
  const preview = page.getByTestId('folder-card-preview')
  await preview.getByRole('button', { name: 'Onboarding' }).click()
  await expect(preview.getByRole('status')).toHaveText('Opened the folder.')
  await preview.getByRole('button', { name: 'New Folder' }).click()
  await expect(preview.getByRole('status')).toHaveText('Clicked New Folder.')
})
