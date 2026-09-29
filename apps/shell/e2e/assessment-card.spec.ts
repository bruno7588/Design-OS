import { expect, test } from '@playwright/test'

// Assessment card checks against Figma Card/Assessments (dark 10242:2782, light 12104:3647).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/assessment-card')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`assessment-card-matrix-${mode}`).screenshot({ path: `e2e/screenshots/assessment-card-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('sizes, padding, illustration and states match Figma', async ({ page }) => {
  await expect(async () => {
    const cards = await page.getByTestId('assessment-card-matrix-light').evaluate((el) =>
      [...el.querySelectorAll('.ds-assessment-card')].map((c) => {
        const r = c.getBoundingClientRect()
        const cs = getComputedStyle(c)
        const title = c.querySelector('.ds-card-heading')!
        return {
          size: [Math.round(r.width), Math.round(r.height)],
          pad: cs.padding,
          fill: cs.backgroundColor,
          art: Math.round(c.querySelector('.ds-illustration')!.getBoundingClientRect().width),
          title: [getComputedStyle(title).fontSize, getComputedStyle(title).color],
          button: c.querySelector('.MuiButton-root') ? Math.round(c.querySelector('.MuiButton-root')!.getBoundingClientRect().height) : null,
        }
      }),
    )
    expect(cards[0]).toMatchObject({ size: [344, 84], pad: '12px', art: 56, title: ['14px', 'rgb(32, 34, 42)'] })
    expect(cards[1]).toMatchObject({ size: [344, 84], title: ['14px', 'rgb(158, 164, 179)'] })
    expect(cards[2]).toMatchObject({ size: [344, 131], button: 33 })
    expect(cards[3]).toMatchObject({ size: [900, 73], pad: '12px', art: 48, title: ['16px', 'rgb(32, 34, 42)'] })
    expect(cards[4].fill).toBe('rgb(239, 240, 242)')
    expect(cards[5]).toMatchObject({ size: [900, 112], pad: '16px', art: 80 })
    expect(cards[6].title[1]).toBe('rgb(32, 34, 42)') // hover keeps Text-primary
    expect(cards[7]).toMatchObject({ pad: '16px 24px 16px 16px', title: ['16px', 'rgb(158, 164, 179)'] })
    expect(cards[9]).toMatchObject({ size: [900, 112], button: 41 }) // the current Medium; Figma’s older instance is 37
  }).toPass()
})

test('Review, Edit and the title are separate named buttons', async ({ page }) => {
  const preview = page.getByTestId('assessment-card-preview')
  await preview.getByRole('button', { name: /50 free Tools/ }).click()
  await expect(preview.getByRole('status')).toHaveText('Opened the assessment.')
  await page.getByRole('checkbox', { name: 'Completed' }).check()
  await preview.getByRole('button', { name: 'Review' }).click()
  await expect(preview.getByRole('status')).toHaveText('Clicked Review.')
  await page.getByRole('combobox', { name: /^Device/ }).click()
  await page.getByRole('option', { name: 'Admin' }).click()
  await preview.getByRole('button', { name: /^Edit 50 free Tools/ }).click()
  await expect(preview.getByRole('status')).toHaveText('Clicked Edit.')
  await expect(preview.getByText('Assessment', { exact: true })).toBeVisible()
})
