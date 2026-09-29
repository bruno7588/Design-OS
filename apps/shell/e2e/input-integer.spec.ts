import { expect, test } from '@playwright/test'

// Integer input checks against Figma Input field/Integer (dark 10145:10895, light 12114:20914).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/input-integer')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`input-integer-matrix-${mode}`).screenshot({ path: `e2e/screenshots/input-integer-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('the field matches Figma: 37px, hugs its content, 12px gaps, state colours', async ({ page }) => {
  await expect(async () => {
    const boxes = await page.getByTestId('input-integer-matrix-light').evaluate((el) =>
      [...el.querySelectorAll('.ds-integer')].map((b) => {
        const input = b.querySelector('input')!
        const [minus, plus] = [...b.querySelectorAll('.ds-integer-step')]
        const r = b.getBoundingClientRect()
        return {
          h: Math.round(r.height),
          w: Math.round(r.width),
          input: Math.round(input.getBoundingClientRect().width),
          gap: Math.round(input.getBoundingClientRect().left - minus.getBoundingClientRect().right),
          border: getComputedStyle(b.querySelector('.MuiOutlinedInput-notchedOutline')!).borderColor,
          fill: getComputedStyle(b).backgroundColor,
          plusHalo: getComputedStyle(plus).backgroundColor,
          helper: b.parentElement!.querySelector('.MuiFormHelperText-root')
            ? getComputedStyle(b.parentElement!.querySelector('.MuiFormHelperText-root')!).color
            : null,
        }
      }),
    )
    // Rows: Enabled, Hover, Active, Filled, Success, Error, Disabled; 3 layouts each.
    for (const b of boxes) expect(b).toMatchObject({ h: 37, w: 114, input: 26, gap: 10 })
    expect(boxes[0].border).toBe('rgb(223, 225, 230)') // Border-elevated
    expect(boxes[0].helper).toBeNull()
    expect(boxes[2].helper).toBe('rgb(69, 76, 94)') // Text-secondary
    expect(boxes[3]).toMatchObject({ border: 'rgb(158, 164, 179)', fill: 'rgba(0, 0, 0, 0)', plusHalo: 'rgb(239, 240, 242)' }) // Hover
    expect(boxes[6].border).toBe('rgb(237, 163, 13)') // Active: Selected
    expect(boxes[15].border).toBe('rgb(223, 22, 66)') // Error: Text-error
    expect(boxes[17].helper).toBe('rgb(223, 22, 66)')
  }).toPass()
})

test('it is a named spinbutton: − and + step, the keys step and clamp, typing clamps', async ({ page }) => {
  const preview = page.getByTestId('input-integer-preview')
  const field = preview.getByRole('spinbutton', { name: 'Maximum course attempts' })
  await expect(field).toHaveValue('3')
  await expect(field).toHaveAttribute('aria-valuemin', '1')
  await expect(field).toHaveAttribute('aria-valuemax', '10')
  await preview.getByRole('button', { name: 'Increase' }).click()
  await expect(field).toHaveValue('4')
  await preview.getByRole('button', { name: 'Decrease' }).click()
  await expect(field).toHaveValue('3')

  await field.focus()
  await page.keyboard.press('ArrowUp')
  await expect(field).toHaveAttribute('aria-valuenow', '4')
  await page.keyboard.press('End')
  await expect(field).toHaveValue('10')
  await expect(preview.getByRole('button', { name: 'Increase' })).toBeDisabled()
  await page.keyboard.press('Home')
  await expect(field).toHaveValue('1')
  await expect(preview.getByRole('button', { name: 'Decrease' })).toBeDisabled()

  await field.fill('25')
  await expect(field).toHaveValue('10')
  await field.fill('')
  await field.blur()
  await expect(field).toHaveValue('10')
})

test('− and + are skipped by Tab', async ({ page }) => {
  const preview = page.getByTestId('input-integer-preview')
  await expect(preview.getByRole('button', { name: 'Increase' })).toHaveAttribute('tabindex', '-1')
  await expect(preview.getByRole('button', { name: 'Decrease' })).toHaveAttribute('tabindex', '-1')
})
