import { expect, test } from '@playwright/test'

// File uploader checks against Figma File uploader (dark 11546:1560, light 12308:6617).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/file-uploader')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`file-uploader-matrix-${mode}`).screenshot({ path: `e2e/screenshots/file-uploader-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('sizes, outlines and fills match Figma', async ({ page }) => {
  await expect(async () => {
    const zones = await page.getByTestId('file-uploader-matrix-light').evaluate((el) =>
      [...el.querySelectorAll('.ds-file-uploader')].map((z) => {
        const r = z.getBoundingClientRect()
        const rect = z.querySelector('.ds-file-uploader-outline rect')!
        return {
          w: Math.round(r.width),
          h: Math.round(r.height),
          fill: getComputedStyle(z).backgroundColor,
          stroke: getComputedStyle(rect).stroke,
          dash: rect.getAttribute('stroke-dasharray'),
          padding: getComputedStyle(z).paddingTop,
          radius: rect.getAttribute('rx'),
        }
      }),
    )
    // Rows: Enabled, Hover, Error, Uploading, Filled; L then S.
    expect(zones[0]).toMatchObject({ w: 560, h: 240, fill: 'rgba(0, 0, 0, 0)', stroke: 'rgb(223, 225, 230)', dash: '8 4', padding: '24px', radius: '12' })
    expect(zones[1]).toMatchObject({ w: 180, h: 260, padding: '16px' })
    expect(zones[2]).toMatchObject({ fill: 'rgba(191, 194, 204, 0.16)', stroke: 'rgb(158, 164, 179)' }) // Hover
    expect(zones[4]).toMatchObject({ fill: 'rgba(223, 22, 66, 0.16)', stroke: 'rgb(223, 22, 66)' }) // Error
    expect(zones[6]).toMatchObject({ fill: 'rgba(191, 194, 204, 0.16)', stroke: 'rgb(223, 225, 230)', dash: '8 4' }) // Uploading
    expect(zones[8]).toMatchObject({ fill: 'rgba(191, 194, 204, 0.16)', dash: null }) // Filled: solid
  }).toPass()
})

test('hover shows the button hover; errors cap at 3; uploading is a named progressbar', async ({ page }) => {
  const matrix = page.getByTestId('file-uploader-matrix-light')
  const zones = matrix.locator('.ds-file-uploader')
  await expect(zones.nth(2).getByRole('button', { name: 'Select File' })).toHaveClass(/ds-hover/)
  await expect(zones.nth(0).getByRole('button', { name: 'Select File' })).not.toHaveClass(/ds-hover/)
  await zones.nth(0).hover()
  await expect(zones.nth(0).getByRole('button', { name: 'Select File' })).toHaveClass(/ds-hover/)

  const errors = zones.nth(4).getByRole('alert').getByRole('listitem')
  await expect(errors).toHaveCount(4)
  await expect(errors.last()).toHaveText('+4 errors')

  const ring = zones.nth(6).getByRole('progressbar', { name: 'Uploading nameofthedocument.csv' })
  await expect(ring).toHaveAttribute('aria-valuenow', '72')
})

test('Select File opens the picker; a picked file uploads, then shows as filled', async ({ page }) => {
  const preview = page.getByTestId('file-uploader-preview')
  const chooser = page.waitForEvent('filechooser')
  await preview.getByRole('button', { name: 'Select File' }).click()
  await (await chooser).setFiles({ name: 'learners.csv', mimeType: 'text/csv', buffer: Buffer.from('name\nAda') })
  await expect(preview.getByRole('progressbar', { name: 'Uploading learners.csv' })).toBeVisible()
  await expect(preview.getByText('learners.csv')).toBeVisible()
  await expect(preview.getByRole('button', { name: 'Select File' })).toBeVisible()
})
