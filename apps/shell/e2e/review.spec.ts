import { test } from '@playwright/test'

// Review screenshots: the Preview and Compare tabs of each component, for sign-off
// at the end of a batch. Saved to e2e/screenshots/review-<slug>-<tab>.png.

test.use({ viewport: { width: 1600, height: 1000 } })

for (const slug of ['button', 'chip', 'tabs', 'dialog', 'badge', 'tooltip', 'toast', 'input', 'input-integer', 'input-radio', 'input-inline', 'search', 'dropdown', 'checkbox', 'radio', 'toggle', 'alert', 'modal', 'side-drawer', 'avatar', 'avatar-group', 'breadcrumb', 'content-switcher', 'table', 'progress-bar', 'empty-state', 'file-uploader', 'stepper']) {
  test(`review ${slug}`, async ({ page }) => {
    await page.goto(`/components/${slug}`)
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: `e2e/screenshots/review-${slug}-preview.png`, fullPage: true })
    await page.getByRole('tab', { name: 'Compare' }).click()
    await page.getByTestId('compare-figma-frame').evaluate((img: HTMLImageElement) => img.decode())
    await page.waitForTimeout(400) // the tab indicator slides for 300ms
    await page.screenshot({ path: `e2e/screenshots/review-${slug}-compare.png`, fullPage: true })
  })
}

test('review dialog open', async ({ page }) => {
  await page.goto('/components/dialog')
  await page.evaluate(() => document.fonts.ready)
  await page.getByRole('button', { name: 'Open Dialog' }).click()
  await page.getByRole('alertdialog').waitFor()
  await page.waitForTimeout(300)
  await page.screenshot({ path: 'e2e/screenshots/review-dialog-open.png' })
})
