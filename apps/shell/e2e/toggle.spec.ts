import { expect, test } from '@playwright/test'

// Toggle (MUI Switch) reference checks against the Figma Toggle set (dark 8160:364, light 11917:3970).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/toggle')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`toggle-matrix-${mode}`).screenshot({ path: `e2e/screenshots/toggle-matrix-${mode}.png`, animations: 'disabled' })
  })
}

const read = (el: Element) =>
  [...el.querySelectorAll('.MuiSwitch-root')].map((s) => {
    const r = s.getBoundingClientRect()
    const thumb = s.querySelector('.MuiSwitch-thumb')!
    const t = thumb.getBoundingClientRect()
    const track = s.querySelector('.MuiSwitch-track')!
    const tcs = getComputedStyle(track)
    return {
      w: Math.round(r.width),
      h: Math.round(r.height),
      thumb: Math.round(t.width),
      thumbLeft: Math.round(t.left - r.left),
      thumbTop: Math.round(t.top - r.top),
      thumbBg: getComputedStyle(thumb).backgroundColor,
      thumbShadow: getComputedStyle(thumb).boxShadow,
      track: tcs.backgroundColor,
      opacity: tcs.opacity,
      outline: tcs.outlineStyle,
    }
  })

test('size, thumb and colours match Figma in light mode', async ({ page }) => {
  // Rows: Enabled, Focus, Disabled. Columns: Off, On.
  await expect(async () => {
    const t = await page.getByTestId('toggle-matrix-light').evaluate(read)
    for (const x of t) expect(x).toMatchObject({ w: 36, h: 20, thumb: 16, thumbTop: 2, thumbBg: 'rgb(249, 249, 250)', thumbShadow: 'none' })
    expect(t[0]).toMatchObject({ thumbLeft: 2, track: 'rgb(158, 164, 179)', opacity: '1' }) // Off: Text-disabled
    expect(t[1]).toMatchObject({ thumbLeft: 18, track: 'rgb(237, 163, 13)', opacity: '1' }) // On: Selected
    expect(t[2].outline).toBe('solid')
    expect(t[4]).toMatchObject({ track: 'rgb(158, 164, 179)', opacity: '1' }) // Disabled off: Text-disabled
    expect(t[5]).toMatchObject({ track: 'rgb(158, 164, 179)', opacity: '1', thumbLeft: 18 }) // Disabled on: Text-disabled
  }).toPass()
})

test('dark mode: Neutral-400 off, Secondary-500 on', async ({ page }) => {
  await page.getByRole('button', { name: 'Dark', exact: true }).click()
  await expect(async () => {
    const t = await page.getByTestId('toggle-matrix-dark').evaluate(read)
    expect(t[0].track).toBe('rgb(101, 107, 124)')
    expect(t[1].track).toBe('rgb(255, 187, 56)')
  }).toPass()
})

test('it is a switch, named by the settings row title, and Space switches it', async ({ page }) => {
  const sw = page.getByTestId('toggle-preview').getByRole('switch', { name: 'Email notifications' })
  await expect(sw).toHaveAccessibleDescription('Get an email when a learner finishes a course.')
  await expect(sw).toBeChecked()
  await sw.focus()
  await page.keyboard.press('Space')
  await expect(sw).not.toBeChecked()
})
