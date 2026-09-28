import { expect, test } from '@playwright/test'
import inventory from '../../../packages/components/inventory/inventory.json' with { type: 'json' }

// Inventory overview and Button's Compare tab.

test.use({ viewport: { width: 1600, height: 1200 } })

const expected = {
  All: inventory.rows.length,
  'Figma only': inventory.summary.figmaOnly,
  'Code only': inventory.summary.codeOnly,
  Both: inventory.summary.both,
}

test('each inventory filter shows the right rows', async ({ page }) => {
  await page.goto('/components')
  for (const [filter, count] of Object.entries(expected)) {
    await page.getByTestId(`inventory-filter-${filter}`).click()
    await expect(page.getByTestId('inventory-row')).toHaveCount(count)
  }
  await page.getByTestId('inventory-filter-Both').click()
  await expect(page.getByTestId('inventory-row').first()).toContainText('Buttons')
  await page.getByTestId('inventory-filter-All').click()
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: 'e2e/screenshots/inventory.png' })
})

test('Compare tab shows the Figma frame, the live reference and the differences', async ({ page }) => {
  await page.goto('/components/button')
  await page.getByRole('tab', { name: 'Compare' }).click()

  for (const mode of ['light', 'dark'] as const) {
    await page.getByRole('button', { name: mode === 'light' ? 'Light' : 'Dark', exact: true }).first().click()
    const frame = page.getByTestId('compare-figma-frame')
    await expect(frame).toHaveAttribute('src', `/figma/button-${mode}.png`)
    await expect.poll(() => frame.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth)).toBeGreaterThan(0)
    await expect(page.getByTestId(`button-matrix-${mode}`)).toBeVisible()
  }

  await expect(page.getByTestId('compare-row')).toHaveCount(9)
  await expect(page.getByTestId('compare-differences')).toContainText('Design to update')

  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: 'e2e/screenshots/button-compare.png', fullPage: true })
})
