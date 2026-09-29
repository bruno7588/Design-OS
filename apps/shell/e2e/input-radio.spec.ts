import { expect, test } from '@playwright/test'

// Radio button input checks against Figma Input field/Radio button (dark 8974:30479, light 12114:20857).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/input-radio')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`input-radio-matrix-${mode}`).screenshot({ path: `e2e/screenshots/input-radio-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('the field matches Figma: 37px, a 21px radio 8px before the text, state colours', async ({ page }) => {
  await expect(async () => {
    const boxes = await page.getByTestId('input-radio-matrix-light').evaluate((el) =>
      [...el.querySelectorAll('.ds-radio-input')].map((b) => {
        const radio = b.querySelector('.MuiRadio-root')!
        const input = b.querySelector('input:not([type="radio"])')!
        return {
          h: Math.round(b.getBoundingClientRect().height),
          radio: Math.round(radio.getBoundingClientRect().width),
          gap: Math.round(input.getBoundingClientRect().left - radio.getBoundingClientRect().right),
          border: getComputedStyle(b.querySelector('.MuiOutlinedInput-notchedOutline')!).borderColor,
          halo: getComputedStyle(radio).backgroundColor,
          radioColour: getComputedStyle(radio).color,
        }
      }),
    )
    // Rows: Enabled, Hover, Active, Filled, Success, Disabled; 2 layouts each.
    for (const b of boxes) expect(b).toMatchObject({ h: 37, radio: 21, gap: 8 })
    expect(boxes[0].border).toBe('rgb(223, 225, 230)') // Border-elevated
    expect(boxes[2]).toMatchObject({ border: 'rgb(158, 164, 179)', halo: 'rgb(239, 240, 242)' }) // Hover
    expect(boxes[4].border).toBe('rgb(237, 163, 13)') // Active: Selected
    expect(boxes[6]).toMatchObject({ border: 'rgb(223, 225, 230)', radioColour: 'rgb(237, 163, 13)' }) // Filled
    expect(boxes[8].radioColour).toBe('rgb(24, 169, 87)') // Success-500
    expect(boxes[10].radioColour).toBe('rgb(158, 164, 179)') // Disabled: Text-disabled
  }).toPass()
})

test('answers are a named radio group; each radio and field has its own name', async ({ page }) => {
  const preview = page.getByTestId('input-radio-preview')
  const group = preview.getByRole('radiogroup', { name: 'Answers' })
  await expect(group.getByRole('radio', { name: 'Answer 1 is correct' })).toBeChecked()
  await group.getByRole('radio', { name: 'Answer 2 is correct' }).check()
  await expect(group.getByRole('radio', { name: 'Answer 1 is correct' })).not.toBeChecked()
  await page.keyboard.press('ArrowDown')
  await expect(group.getByRole('radio', { name: 'Answer 3 is correct' })).toBeChecked()

  const third = preview.getByRole('textbox', { name: 'Answer 3' })
  await third.fill('Marseille')
  await expect(third).toHaveValue('Marseille')
})
