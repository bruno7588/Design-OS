import { expect, test } from '@playwright/test'

// Skill card checks against Figma Card/skill (dark 11802:3704, light 11828:5184).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/skill-card')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`skill-card-matrix-${mode}`).screenshot({ path: `e2e/screenshots/skill-card-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('size, outline and states match Figma', async ({ page }) => {
  await expect(async () => {
    const cards = await page.getByTestId('skill-card-matrix-light').evaluate((el) =>
      [...el.querySelectorAll('.ds-skill-card')].map((c) => {
        const cs = getComputedStyle(c)
        return { h: Math.round(c.getBoundingClientRect().height), pad: cs.padding, radius: cs.borderRadius, border: cs.boxShadow, fill: cs.backgroundColor, colour: cs.color }
      }),
    )
    expect(cards[0]).toMatchObject({ h: 37, pad: '8px 12px', radius: '12px', border: 'rgb(223, 225, 230) 0px 0px 0px 1px inset', colour: 'rgb(69, 76, 94)' })
    expect(cards[1]).toMatchObject({ border: 'rgb(158, 164, 179) 0px 0px 0px 1px inset', fill: 'rgb(239, 240, 242)' }) // hover
    expect(cards[4].colour).toBe('rgb(158, 164, 179)') // disabled
  }).toPass()
})

test('Remove is a named button', async ({ page }) => {
  const preview = page.getByTestId('skill-card-preview')
  await preview.getByRole('button', { name: 'Remove Negotiation' }).click()
  await expect(preview.getByRole('status')).toHaveText('2 skills.')
})
