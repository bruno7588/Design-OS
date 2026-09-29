import { expect, test } from '@playwright/test'

// Course card checks against Figma Card/Courses (dark 5132:5756, light 11916:10292).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/course-card')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`course-card-matrix-${mode}`).screenshot({ path: `e2e/screenshots/course-card-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('sizes, image, progress and badges match Figma', async ({ page }) => {
  await expect(async () => {
    const cards = await page.getByTestId('course-card-matrix-light').evaluate((el) =>
      [...el.querySelectorAll('.ds-course-card')].map((c) => {
        const r = c.getBoundingClientRect()
        const img = c.querySelector('.ds-course-picture')!.parentElement!.getBoundingClientRect()
        const title = c.querySelector('.ds-card-heading')!
        const bar = c.querySelector('.MuiLinearProgress-bar')!
        return {
          size: [Math.round(r.width), Math.round(r.height)],
          image: Math.round(img.height),
          title: [getComputedStyle(title).fontSize, Math.round(title.getBoundingClientRect().height)],
          bar: getComputedStyle(bar).backgroundColor,
          shadow: getComputedStyle(c).boxShadow !== 'none',
          badges: [...c.querySelectorAll('.MuiChip-root, span')].map((b) => b.textContent).filter((t) => t === 'New' || t === 'Due on Aug 20'),
        }
      }),
    )
    expect(cards[0]).toMatchObject({ size: [272, 248], image: 120, title: ['14px', 63], bar: 'rgb(237, 163, 13)' }) // Selected
    expect(cards[2].badges).toEqual(expect.arrayContaining(['New', 'Due on Aug 20']))
    expect(cards[4]).toMatchObject({ size: [300, 297], image: 140, title: ['16px', 72], shadow: true })
  }).toPass()
})

test('hover zooms the picture; the title opens the course', async ({ page }) => {
  const zoom = await page.getByTestId('course-card-matrix-light').locator('.ds-course-card.ds-hover .ds-course-picture').first().evaluate((p) => getComputedStyle(p).transform)
  expect(zoom).toBe('matrix(1.12, 0, 0, 1.12, 0, 0)')
  const preview = page.getByTestId('course-card-preview')
  await preview.getByRole('button', { name: /Inside the Product-led/ }).click()
  await expect(preview.getByRole('status')).toHaveText('Opened the course.')
})
