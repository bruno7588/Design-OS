import { expect, test } from '@playwright/test'

// Calendar checks against Figma Calendar (dark 11529:406, light 12204:5743) and Day item (dark 5279:26511, light 11916:6094).

test.use({ viewport: { width: 1600, height: 1200 } })

test.beforeEach(async ({ page }) => {
  await page.goto('/components/calendar')
  await page.evaluate(() => document.fonts.ready)
})

for (const mode of ['light', 'dark'] as const) {
  test(`matrix screenshot, ${mode}`, async ({ page }) => {
    if (mode === 'dark') await page.getByRole('button', { name: 'Dark', exact: true }).click()
    await page.getByTestId(`calendar-matrix-${mode}`).screenshot({ path: `e2e/screenshots/calendar-matrix-${mode}.png`, animations: 'disabled' })
  })
}

test('the field matches Figma: 37px, hugs its content, placeholder and state colours', async ({ page }) => {
  await expect(async () => {
    const fields = await page.getByTestId('calendar-matrix-light').evaluate((el) =>
      [...el.querySelectorAll('.ds-date-field .MuiOutlinedInput-root')].map((f) => {
        const input = f.querySelector('input')!
        return {
          h: Math.round(f.getBoundingClientRect().height),
          w: Math.round(f.getBoundingClientRect().width),
          border: getComputedStyle(f.querySelector('.MuiOutlinedInput-notchedOutline')!).borderColor,
          placeholder: getComputedStyle(input, '::placeholder').color,
          value: input.placeholder,
          errorIcon: !!f.querySelector('.ds-date-error-icon'),
        }
      }),
    )
    // Enabled, Hover, Error (label, field), then Active.
    expect(fields[0]).toMatchObject({ h: 37, w: 145, border: 'rgb(223, 225, 230)', placeholder: 'rgb(69, 76, 94)', value: 'dd/mm/yyyy', errorIcon: false })
    expect(fields[2].border).toBe('rgb(158, 164, 179)') // Hover
    expect(fields[4]).toMatchObject({ w: 173, border: 'rgb(223, 22, 66)', errorIcon: true }) // Error
    expect(fields[6].border).toBe('rgb(237, 163, 13)') // Active: Selected
  }).toPass()
})

test('the open calendar matches Figma: 352 × 344 popover, Monday weeks, day items', async ({ page }) => {
  await expect(async () => {
    const m = await page.getByTestId('calendar-open-light').evaluate((el) => {
      const paper = el.querySelector('.MuiPickersPopper-paper')!
      const field = el.querySelector('.MuiOutlinedInput-root')!
      const days = [...el.querySelectorAll('.MuiPickersDay-root')]
      const selected = el.querySelector('.MuiPickersDay-root.Mui-selected')!
      const outside = el.querySelector('.MuiPickersDay-dayOutsideMonth')!
      return {
        w: Math.round(paper.getBoundingClientRect().width),
        h: Math.round(paper.getBoundingClientRect().height),
        gap: Math.round(paper.getBoundingClientRect().top - field.getBoundingClientRect().bottom),
        radius: getComputedStyle(paper).borderTopLeftRadius,
        month: el.querySelector('.MuiPickersCalendarHeader-label')!.textContent,
        weekdays: [...el.querySelectorAll('.MuiDayCalendar-weekDayLabel')].map((w) => w.textContent),
        days: days.length,
        day: Math.round(days[0].getBoundingClientRect().width),
        colGap: Math.round(days[1].getBoundingClientRect().left - days[0].getBoundingClientRect().right),
        selected: [selected.textContent, getComputedStyle(selected).backgroundColor, getComputedStyle(selected).fontWeight],
        outside: getComputedStyle(outside).color,
      }
    })
    expect(m).toMatchObject({ w: 352, h: 344, gap: 8, radius: '12px', month: 'July 2024', days: 42, day: 40, colGap: 8 })
    expect(m.weekdays).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
    expect(m.selected).toEqual(['17', 'rgb(255, 187, 56)', '700']) // Secondary-500, Bold
    expect(m.outside).toBe('rgb(158, 164, 179)') // Text-disabled
  }).toPass()
})

test('day item states match Figma', async ({ page }) => {
  const days = await page.getByTestId('calendar-days-light').evaluate((el) =>
    [...el.querySelectorAll('.MuiPickersDay-root')].map((d) => {
      const cs = getComputedStyle(d)
      return { colour: cs.color, fill: cs.backgroundColor, ring: cs.boxShadow, radius: cs.borderTopLeftRadius }
    }),
  )
  // Disabled, Enabled, Current day, Focus, Hover, Selected
  expect(days[0].colour).toBe('rgb(158, 164, 179)')
  expect(days[1]).toMatchObject({ colour: 'rgb(32, 34, 42)', fill: 'rgba(0, 0, 0, 0)', radius: '4px' })
  expect(days[2]).toMatchObject({ ring: 'rgb(223, 225, 230) 0px 0px 0px 1px inset', radius: '8px' })
  expect(days[3]).toMatchObject({ ring: 'rgb(237, 163, 13) 0px 0px 0px 1px inset', radius: '8px' })
  expect(days[4]).toMatchObject({ fill: 'rgb(239, 240, 242)', radius: '8px' }) // Cards-background-hover
  expect(days[5]).toMatchObject({ fill: 'rgb(255, 187, 56)', colour: 'rgb(32, 34, 42)' })
})

test('pick a date with the keyboard; the field shows dd/mm/yyyy', async ({ page }) => {
  const preview = page.getByTestId('calendar-preview')
  await preview.getByRole('button', { name: /Choose date/ }).click()
  const grid = page.locator('body > .MuiPickersPopper-root').getByRole('grid')
  await expect(grid).toBeVisible()
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('Enter')
  await expect(grid).toBeHidden()
  await expect(preview.getByRole('textbox', { name: 'Due date' })).toHaveValue(/^\d{2}\/\d{2}\/\d{4}$/)
})
