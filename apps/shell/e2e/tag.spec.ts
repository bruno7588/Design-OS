import { expect, test } from '@playwright/test'

// Tag checks against Figma Tags (dark 4603:27712, light 12319:7504).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/tag')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`tag-matrix-${mode}`).screenshot({ path: `e2e/screenshots/tag-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('sizes, corner, fill and icons match Figma', async ({ page }) => {
  await expect(async () => {
    const tags = await page.getByTestId('tag-matrix-light').evaluate((el) =>
      [...el.querySelectorAll('.ds-tag')].map((t) => {
        const cs = getComputedStyle(t)
        return {
          w: Math.round(t.getBoundingClientRect().width),
          icon: Math.round(t.querySelector('svg')!.getBoundingClientRect().width),
          fill: cs.backgroundColor,
          colour: cs.color,
          corners: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].join(' '),
        }
      }),
    )
    expect(tags).toHaveLength(18)
    const common = { fill: 'rgb(223, 225, 230)', colour: 'rgb(69, 76, 94)', corners: '0px 0px 8px 0px' } // Border, Text-secondary
    expect(tags[0]).toEqual({ w: 40, icon: 32, ...common, corners: '0px 0px 12px 0px' })
    expect(tags[6]).toEqual({ w: 28, icon: 20, ...common })
    expect(tags[12]).toEqual({ w: 24, icon: 16, ...common })
  }).toPass()
})

test('each tag is an image named by its media type', async ({ page }) => {
  const matrix = page.getByTestId('tag-matrix-light')
  for (const name of ['Video', 'PDF', 'Link', 'SCORM', 'Flashcard', 'Audio']) {
    await expect(matrix.getByRole('img', { name, exact: true })).toHaveCount(3)
  }
})
