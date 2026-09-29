import { expect, test } from '@playwright/test'

// Stepper checks against Figma stepper (dark 8108:5464, light 11249:244), Step/Instances and Step/line.

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/stepper')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`stepper-matrix-${mode}`).screenshot({ path: `e2e/screenshots/stepper-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('frame, steps and lines match Figma', async ({ page }) => {
  await expect(async () => {
    const m = await page.getByTestId('stepper-matrix-light').evaluate((el) => {
      const stepper = el.querySelector('.MuiStepper-root')!
      const cs = getComputedStyle(stepper)
      const steps = [...stepper.querySelectorAll('.MuiStepLabel-root')].map((s) => {
        const icon = s.querySelector('.MuiStepLabel-iconContainer')!
        const label = s.querySelector('.MuiStepLabel-label')!
        return {
          icon: getComputedStyle(icon).color,
          label: getComputedStyle(label).color,
          gap: Math.round(label.getBoundingClientRect().left - icon.getBoundingClientRect().right),
          size: Math.round(icon.querySelector('svg')!.getBoundingClientRect().width),
        }
      })
      const lines = [...stepper.querySelectorAll('.MuiStepConnector-line')].map((l) => ({
        solid: getComputedStyle(l).backgroundImage === 'none',
        colour: getComputedStyle(l).backgroundColor,
      }))
      return { h: Math.round(stepper.getBoundingClientRect().height), border: cs.boxShadow, radius: cs.borderTopLeftRadius, padding: cs.padding, steps, lines }
    })
    expect(m).toMatchObject({ h: 53, border: 'rgb(223, 225, 230) 0px 0px 0px 1px inset', radius: '12px', padding: '16px 20px' })
    const green = 'rgb(24, 169, 87)'
    const secondary = 'rgb(69, 76, 94)'
    const disabled = 'rgb(158, 164, 179)'
    expect(m.steps).toEqual([
      { icon: green, label: secondary, gap: 4, size: 20 },
      { icon: green, label: secondary, gap: 4, size: 20 },
      { icon: secondary, label: secondary, gap: 4, size: 20 },
      { icon: disabled, label: disabled, gap: 4, size: 20 },
    ])
    // Line before Lessons (completed) is solid; the others are dotted.
    expect(m.lines.map((l) => l.solid)).toEqual([true, false, false])
    expect(m.lines[0].colour).toBe('rgb(101, 107, 124)') // Text-tertiary
  }).toPass()
})

test('it is a named ordered list; the current step is aria-current and each step says its state', async ({ page }) => {
  const list = page.getByTestId('stepper-preview').getByRole('list', { name: 'Course setup' })
  const items = list.getByRole('listitem')
  await expect(items).toHaveCount(4)
  await expect(items.nth(0)).toContainText('Warm-up, completed')
  await expect(items.nth(2)).toHaveAttribute('aria-current', 'step')
  await expect(items.nth(2)).toContainText('Assessments, in progress')
  await expect(items.nth(3)).toContainText('Certification, not started')
  await page.getByTestId('stepper-preview').getByRole('button', { name: 'Next' }).click()
  await expect(items.nth(3)).toHaveAttribute('aria-current', 'step')
})
