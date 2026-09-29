import { expect, test } from '@playwright/test'

// Lesson card checks against Figma Card/Lessons (dark 5144:14181, light 11916:9353).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/lesson-card')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`lesson-card-matrix-${mode}`).screenshot({ path: `e2e/screenshots/lesson-card-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('sizes, padding and type match Figma', async ({ page }) => {
  await expect(async () => {
    const cards = await page.getByTestId('lesson-card-matrix-light').evaluate((el) =>
      [...el.querySelectorAll('.ds-lesson-card')].map((c) => {
        const r = c.getBoundingClientRect()
        const thumb = c.querySelector('.ds-card-thumb')!.getBoundingClientRect()
        const title = c.querySelector('.ds-card-heading')!
        const cs = getComputedStyle(c)
        return {
          size: [Math.round(r.width), Math.round(r.height)],
          pad: cs.padding,
          radius: cs.borderRadius,
          fill: cs.backgroundColor,
          shadow: cs.boxShadow !== 'none',
          thumb: Math.round(thumb.width),
          title: [getComputedStyle(title).fontSize, getComputedStyle(title).fontWeight, getComputedStyle(title).color],
        }
      }),
    )
    // Grid tile
    expect(cards[0]).toMatchObject({ size: [170, 230], radius: '12px', fill: 'rgb(255, 255, 255)', shadow: true, thumb: 170, title: ['14px', '700', 'rgb(32, 34, 42)'] })
    expect(cards[1].fill).toBe('rgb(239, 240, 242)') // hover: Cards-background-hover
    // Mobile: 343 × 86 (84 + the 2px bar), radius 8, thumb 56
    expect(cards[6]).toMatchObject({ size: [343, 86], radius: '8px', thumb: 56, title: ['14px', '700', 'rgb(32, 34, 42)'] })
    expect(cards[8].size).toEqual([343, 131]) // with Take Quiz
    expect(cards[11].size).toEqual([343, 84]) // disabled: no bar
    // Admin: 900 × 73 (Figma draws 74; its contents add up to 73), padding 12, thumb 48
    expect(cards[12]).toMatchObject({ size: [900, 73], pad: '12px', thumb: 48, title: ['16px', '700', 'rgb(32, 34, 42)'] })
    expect(cards[13].title[2]).toBe('rgb(0, 131, 147)') // hover: Text-button-hover
    // Web app: 900 × 112, padding 16, thumb 80; 24 on the right with a button or lock
    expect(cards[14]).toMatchObject({ size: [900, 112], pad: '16px', thumb: 80 })
    expect(cards[15].title[2]).toBe('rgb(0, 131, 147)')
    expect(cards[16]).toMatchObject({ size: [900, 112], pad: '16px 24px 16px 16px' })
    expect(cards[22].title[2]).toBe('rgb(158, 164, 179)') // disabled: Text-disabled
  }).toPass()
})

test('progress, quiz buttons and completed states', async ({ page }) => {
  const m = page.getByTestId('lesson-card-matrix-light')
  const bars = await m.evaluate((el) =>
    [...el.querySelectorAll('.ds-lesson-card')].map((c) => {
      const bar = c.querySelector('.MuiLinearProgress-root')
      return bar ? [Math.round(bar.getBoundingClientRect().width), Math.round(bar.getBoundingClientRect().height), getComputedStyle(bar.querySelector('.MuiLinearProgress-bar')!).backgroundColor] : null
    }),
  )
  expect(bars[0]).toEqual([170, 2, 'rgb(0, 175, 196)']) // Primary-600
  expect(bars[2]).toEqual([170, 2, 'rgb(24, 169, 87)']) // completed: Success-500
  expect(bars[6]).toEqual([343, 2, 'rgb(0, 175, 196)'])
  expect(bars[11]).toBeNull() // disabled mobile: no bar
  expect(bars[14]).toEqual([96, 4, 'rgb(0, 175, 196)'])
  expect(bars[16]).toBeNull() // quiz pending: no bar

  // Media Tag sizes follow Figma: 28 / icon 20 (grid, web), 22 / 14 (mobile), 20 / 16 (Admin)
  const tags = await m.evaluate((el) =>
    [...el.querySelectorAll('.ds-lesson-card')].map((c) => {
      const t = c.querySelector('.ds-tag')!
      return [Math.round(t.getBoundingClientRect().width), Math.round(t.querySelector('svg')!.getBoundingClientRect().width)]
    }),
  )
  expect([tags[0], tags[6], tags[12], tags[14]]).toEqual([[28, 20], [22, 14], [20, 16], [28, 20]])

  const cards = m.locator('.ds-lesson-card')
  await expect(cards.nth(8).getByRole('button', { name: 'Take Quiz' })).toBeVisible()
  await expect(cards.nth(9).getByRole('button', { name: 'Retake Quiz' })).toBeEnabled()
  await expect(cards.nth(10).getByRole('button', { name: 'Retake Quiz' })).toBeDisabled()
  await expect(cards.nth(18).getByLabel('Completed')).toBeVisible()
  await expect(cards.nth(22).getByLabel('Locked')).toBeVisible()
  await expect(cards.nth(12).getByText('Lesson', { exact: true })).toBeVisible() // Admin badge
})

test('the title opens the card; the quiz button stays separate', async ({ page }) => {
  const preview = page.getByTestId('lesson-card-preview')
  await expect(preview.getByRole('article')).toBeVisible()
  await preview.getByRole('button', { name: /50 free Tools/ }).click()
  await expect(preview.getByRole('status')).toHaveText('Opened the lesson.')
  // Clicking elsewhere on the card opens it too (the title’s hit area covers it)
  await preview.locator('.ds-card-thumb').click()
  await expect(preview.getByRole('status')).toHaveText('Opened the lesson.')
  await page.getByRole('combobox', { name: /^Quiz/ }).click()
  await page.getByRole('option', { name: 'Pending' }).click()
  await preview.getByRole('button', { name: 'Take Quiz' }).click()
  await expect(preview.getByRole('status')).toHaveText('Clicked the quiz button.')
})
