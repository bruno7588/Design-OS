import { expect, test } from '@playwright/test'

// Inline input checks against Figma Input field/Inline (dark 10330:4736, light 12114:20828).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/input-inline')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`input-inline-matrix-${mode}`).screenshot({ path: `e2e/screenshots/input-inline-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('type, heights and colours match Figma', async ({ page }) => {
  await expect(async () => {
    const m = await page.getByTestId('input-inline-matrix-light').evaluate((el) => {
      const style = (n: Element) => {
        const input = n.querySelector('input, textarea')!
        const cs = getComputedStyle(n)
        return { h: Math.round(n.getBoundingClientRect().height), size: cs.fontSize, weight: cs.fontWeight, colour: cs.color, placeholder: getComputedStyle(input, '::placeholder').color }
      }
      const titles = [...el.querySelectorAll('.ds-inline-title')].map(style)
      const descriptions = [...el.querySelectorAll('.ds-inline-description')].map(style)
      const first = el.querySelectorAll('.ds-inline-title')[0].parentElement!
      const gap = Math.round(el.querySelectorAll('.ds-inline-description')[0].getBoundingClientRect().top - first.getBoundingClientRect().bottom)
      return { titles, descriptions, gap }
    })
    // Rows: Enabled, Filled, Error; with and without a description.
    expect(m.titles[0]).toEqual({ h: 48, size: '32px', weight: '700', colour: 'rgb(32, 34, 42)', placeholder: 'rgb(158, 164, 179)' })
    expect(m.descriptions[0]).toMatchObject({ h: 24, size: '16px', weight: '400', colour: 'rgb(69, 76, 94)', placeholder: 'rgb(158, 164, 179)' })
    expect(m.titles[4].colour).toBe('rgb(223, 22, 66)') // Error: Text-error
    expect(m.gap).toBe(4)
  }).toPass()
})

test('fields are named, and an error is linked to the title', async ({ page }) => {
  const preview = page.getByTestId('input-inline-preview')
  const title = preview.getByRole('textbox', { name: 'Course title' })
  await title.fill('Leadership essentials')
  await expect(title).toHaveValue('Leadership essentials')
  await expect(preview.getByRole('textbox', { name: 'Course description' })).toBeVisible()
  await page.getByLabel('Error').check()
  await expect(title).toHaveAttribute('aria-invalid', 'true')
  await expect(title).toHaveAccessibleDescription('Add a title of 3 characters or more')
})
