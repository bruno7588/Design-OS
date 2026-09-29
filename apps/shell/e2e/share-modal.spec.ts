import { expect, test } from '@playwright/test'

// Share modal checks against Figma Modal/Send (dark 5399:12437, light board 12358:472).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/share-modal')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`share-modal-matrix-${mode}`).screenshot({ path: `e2e/screenshots/share-modal-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('surface, rows and buttons match Figma', async ({ page }) => {
  const m = await page.getByTestId('share-modal-matrix-light').evaluate((el) => {
    const s = el.querySelector('[role="group"]')!
    const cs = getComputedStyle(s)
    const row = s.querySelector('.ds-share-row')!
    const buttons = [...s.querySelectorAll('.MuiButton-root')].map((b) => b.textContent)
    return { size: [Math.round(s.getBoundingClientRect().width), Math.round(s.getBoundingClientRect().height)], pad: cs.padding, radius: cs.borderRadius, row: Math.round(row.getBoundingClientRect().height), buttons, title: getComputedStyle(s.querySelector('h2')!).fontSize }
  })
  expect(m).toMatchObject({ size: [400, 816], pad: '32px', radius: '12px', row: 56, buttons: ['Share To', 'Copy Link'], title: '20px' })
})

test('search filters, the switcher changes the list, and ticks are named', async ({ page }) => {
  await page.getByRole('button', { name: 'Share Lesson' }).click()
  const dialog = page.getByRole('dialog', { name: 'Share lesson' })
  await dialog.getByRole('checkbox', { name: 'Jacob Patel' }).check()
  await dialog.getByRole('searchbox', { name: 'Search people' }).fill('mia')
  await expect(dialog.getByRole('list', { name: 'People' }).getByRole('listitem')).toHaveCount(1)
  await dialog.getByRole('button', { name: 'Teams' }).click()
  await expect(dialog.getByRole('list', { name: 'Teams' })).toBeVisible()
  await dialog.getByRole('searchbox').fill('')
  await dialog.getByRole('checkbox', { name: 'Sales' }).check()
  await dialog.getByRole('button', { name: 'Share To' }).click()
  await expect(page.getByTestId('share-modal-preview').getByRole('status')).toHaveText('Shared with 2.')
})
