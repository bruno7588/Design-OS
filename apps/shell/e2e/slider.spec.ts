import { expect, test } from '@playwright/test'

// Slider checks against Figma <Slider> (dark 10662:14039, light 11045:9459).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/slider')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`slider-matrix-${mode}`).screenshot({ path: `e2e/screenshots/slider-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('rail, track, thumb, halo and disabled match Figma', async ({ page }) => {
  await expect(async () => {
    const sliders = await page.getByTestId('slider-matrix-light').evaluate((el) =>
      [...el.querySelectorAll('.MuiSlider-root')].map((s) => {
        const part = (c: string) => s.querySelector(c)!
        const box = (c: string) => part(c).getBoundingClientRect()
        return {
          h: Math.round(s.getBoundingClientRect().height),
          rail: [Math.round(box('.MuiSlider-rail').height), getComputedStyle(part('.MuiSlider-rail')).backgroundColor],
          track: [Math.round(box('.MuiSlider-track').height), getComputedStyle(part('.MuiSlider-track')).backgroundColor],
          thumb: [Math.round(box('.MuiSlider-thumb').width), getComputedStyle(part('.MuiSlider-thumb')).backgroundColor],
          shadow: getComputedStyle(part('.MuiSlider-thumb')).boxShadow,
        }
      }),
    )
    // Rows: Enabled, Hover, Disabled at 0, 50, 80.
    const selected = 'rgb(237, 163, 13)'
    expect(sliders[1]).toMatchObject({ h: 44, rail: [4, 'rgb(223, 225, 230)'], track: [6, selected], thumb: [20, selected] })
    expect(sliders[1].shadow).toBe('rgba(51, 37, 11, 0.24) 1px 1px 4px 0px')
    expect(sliders[4].shadow).toContain('rgba(237, 163, 13, 0.16) 0px 0px 0px 11px') // Hover halo
    expect(sliders[7]).toMatchObject({ track: [6, 'rgb(223, 225, 230)'], thumb: [20, 'rgb(223, 225, 230)'] }) // Button-background-disabled
  }).toPass()
})

test('it is a named slider the keyboard can move', async ({ page }) => {
  const slider = page.getByTestId('slider-preview').getByRole('slider', { name: /Pass mark/ })
  await expect(slider).toHaveAttribute('aria-valuenow', '80')
  await expect(slider).toHaveAttribute('aria-valuetext', '80%')
  await slider.focus()
  await page.keyboard.press('ArrowRight')
  await expect(slider).toHaveAttribute('aria-valuenow', '85')
  await page.keyboard.press('Home')
  await expect(slider).toHaveAttribute('aria-valuenow', '0')
})
