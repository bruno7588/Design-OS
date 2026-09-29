import { expect, test } from '@playwright/test'

// Avatar and Avatar group checks against the Figma sets (Avatar 11914:2605 / 5097:5884, group 11915:3296 / 5097:5584).

test.use({ viewport: { width: 1600, height: 1200 } })

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshots, ${mode}`, async ({ page }) => {
    for (const slug of ['avatar', 'avatar-group']) {
      await page.goto(`/components/${slug}`)
      if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
      await page.getByTestId(`${slug}-matrix-${mode}`).screenshot({ path: `e2e/screenshots/${slug}-matrix-${mode}.png`, animations: 'disabled' })
    }
  })
}

test('avatars are round, at the seven Figma sizes, with the fallback face', async ({ page }) => {
  await page.goto('/components/avatar')
  const a = await page.getByTestId('avatar-matrix-light').evaluate((el) =>
    [...el.querySelectorAll('.MuiAvatar-root')].map((x) => {
      const cs = getComputedStyle(x)
      return { w: Math.round(x.getBoundingClientRect().width), round: cs.borderTopLeftRadius === '50%', img: !!x.querySelector('img'), face: !!x.querySelector('svg'), bg: cs.backgroundColor, color: cs.color }
    }),
  )
  expect(a.map((x) => x.w)).toEqual([72, 64, 56, 48, 40, 32, 24, 72, 64, 56, 48, 40, 32, 24])
  for (const x of a) expect(x.round).toBe(true)
  for (const x of a.slice(0, 7)) expect(x.img).toBe(true)
  for (const x of a.slice(7)) expect(x).toMatchObject({ face: true, bg: 'rgb(223, 225, 230)', color: 'rgb(101, 107, 124)' }) // Border, Text-tertiary
})

test('a broken photo falls back to the face', async ({ page }) => {
  await page.route('**/samples/avatar.png', (r) => r.abort())
  await page.goto('/components/avatar')
  const first = page.getByTestId('avatar-matrix-light').locator('.MuiAvatar-root').first()
  await expect(first.locator('svg')).toHaveCount(1)
  await expect(first.locator('img')).toHaveCount(0)
})

test('groups overlap by 8, 12 and 16px with a 1px Page-background ring and the +N counter', async ({ page }) => {
  await page.goto('/components/avatar-group')
  const groups = await page.getByTestId('avatar-group-matrix-light').evaluate((el) =>
    [...el.querySelectorAll('.MuiAvatarGroup-root')].map((g) => {
      const avs = [...g.querySelectorAll('.MuiAvatar-root')]
      const rects = avs.map((a) => a.getBoundingClientRect()).sort((a, b) => a.left - b.left)
      const counter = avs.find((a) => !a.querySelector('img, svg'))!
      const cs = getComputedStyle(counter)
      return {
        count: avs.length,
        size: Math.round(rects[0].width),
        overlap: Math.round(rects[0].right - rects[1].left),
        ring: getComputedStyle(avs[0]).borderTopWidth + ' ' + getComputedStyle(avs[0]).borderTopColor,
        counter: { text: counter.textContent, bg: cs.backgroundColor, color: cs.color, font: cs.fontSize },
        counterLast: Math.round(counter.getBoundingClientRect().left) === Math.round(rects[rects.length - 1].left),
        // Figma: each avatar sits on top of the one before.
        rising: avs
          .slice()
          .sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left)
          .map((a) => Number(getComputedStyle(a).zIndex))
          .every((z, i, all) => i === 0 || z > all[i - 1]),
      }
    }),
  )
  expect(groups.map((g) => [g.size, g.overlap, g.counter.font])).toEqual([
    [24, 8, '8px'],
    [32, 12, '10px'],
    [40, 16, '12px'],
  ])
  for (const g of groups) {
    expect(g.count).toBe(4)
    expect(g.ring).toBe('1px rgb(249, 249, 250)')
    expect(g.counter).toMatchObject({ text: '+3', bg: 'rgb(239, 240, 242)', color: 'rgb(101, 107, 124)' })
    expect(g.counterLast).toBe(true)
    expect(g.rising).toBe(true)
  }
})
