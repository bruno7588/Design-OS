import { expect, test } from '@playwright/test'

// Phase 4a: the Admin replica with 500 generated employees, and its empty states.

test.use({ viewport: { width: 1440, height: 1000 } })

test('People lists 500 people across the tabs, 25 per page', async ({ page }) => {
  await page.goto('/admin/people')
  await expect(page.getByRole('heading', { level: 1, name: 'People' })).toBeVisible()
  await expect(page.getByRole('navigation', { name: 'Admin' }).getByRole('button', { name: 'People', exact: true })).toHaveAttribute('aria-current', 'page')
  const table = page.getByRole('table', { name: 'Active people' })
  await expect(table.locator('tbody tr')).toHaveCount(25)
  const active = Number(await page.getByRole('tab', { name: /Active/ }).locator('.ds-tab-counter').textContent())
  const deactivated = Number(await page.getByRole('tab', { name: /Deactivated/ }).locator('.ds-tab-counter').textContent())
  expect(active + deactivated).toBe(500)
  await expect(page.getByText(`1-25 of ${active}`)).toBeVisible()
  await page.getByRole('button', { name: 'Go to next page' }).click()
  await expect(page.getByText(`26-50 of ${active}`)).toBeVisible()
})

test('search narrows the list and shows the no-results state', async ({ page }) => {
  await page.goto('/admin/people')
  await page.getByRole('searchbox', { name: 'Search people' }).fill('Sommelier')
  const rows = page.getByRole('table', { name: 'Active people' }).locator('tbody tr')
  await expect(rows.first()).toContainText('Sommelier')
  await page.getByRole('searchbox', { name: 'Search people' }).fill('zzzz')
  await expect(page.getByRole('heading', { name: 'No people match' })).toBeVisible()
  await page.getByRole('button', { name: 'Clear Filters' }).click()
  await expect(rows).toHaveCount(25)
})

test('a name opens the drawer with their courses', async ({ page }) => {
  await page.goto('/admin/people')
  const first = page.getByRole('table', { name: 'Active people' }).locator('tbody tr').first().getByRole('link')
  const name = (await first.textContent())!
  await first.click()
  const drawer = page.getByRole('dialog', { name })
  await expect(drawer).toBeVisible()
  await expect(drawer.getByRole('list', { name: 'Courses' }).getByRole('listitem').first()).toBeVisible()
  await drawer.getByRole('button', { name: 'Close' }).click()
  await expect(drawer).toBeHidden()
})

test('deactivating moves a person to the Deactivated tab', async ({ page }) => {
  await page.goto('/admin/people')
  const counter = page.getByRole('tab', { name: /Deactivated/ }).locator('.ds-tab-counter')
  const before = Number(await counter.textContent())
  const row = page.getByRole('table', { name: 'Active people' }).locator('tbody tr').first()
  const name = (await row.getByRole('link').textContent())!
  await row.getByRole('button', { name: `Actions for ${name}` }).click()
  await page.getByRole('menuitem', { name: 'Deactivate' }).click()
  await page.getByRole('alertdialog').getByRole('button', { name: 'Deactivate' }).click()
  await expect(counter).toHaveText(String(before + 1))
  await page.getByRole('tab', { name: /Deactivated/ }).click()
  await page.getByRole('searchbox').fill(name)
  await expect(page.getByRole('table', { name: 'Deactivated people' }).getByRole('link', { name })).toBeVisible()
})

test('the empty org shows the empty state', async ({ page }) => {
  await page.goto('/admin/people?data=empty')
  await expect(page.getByRole('heading', { name: 'No people yet' })).toBeVisible()
  await expect(page.getByRole('table')).toHaveCount(0)
  await page.getByRole('button', { name: 'Invite People' }).last().click()
  await expect(page.getByRole('dialog', { name: 'Invite people' })).toBeVisible()
})

test('Exit Admin opens the web app replica', async ({ page }) => {
  await page.goto('/admin/people')
  await page.getByRole('button', { name: 'Exit Admin' }).click()
  await expect(page).toHaveURL(/\/web\/for-you$/)
  await expect(page.getByRole('navigation', { name: 'Web app' }).getByRole('button', { name: 'For You' })).toHaveAttribute('aria-current', 'page')
})

for (const mode of ['dark', 'light'] as const) {
  for (const [name, url] of [
    ['people', '/admin/people'],
    ['people-empty', '/admin/people?data=empty'],
    ['web', '/web/for-you'],
  ] as const) {
    test(`screenshot ${name}, ${mode}`, async ({ page }) => {
      await page.addInitScript((m) => localStorage.setItem('design-os-mode', m), mode)
      await page.goto(url)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await page.evaluate(() => document.fonts.ready)
      await page.screenshot({ path: `e2e/screenshots/${name}-${mode}.png`, animations: 'disabled' })
    })
  }
}

test('screenshot drawer, dark', async ({ page }) => {
  await page.goto('/admin/people')
  await page.getByRole('table', { name: 'Active people' }).locator('tbody tr').nth(2).getByRole('link').click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(400)
  await page.screenshot({ path: 'e2e/screenshots/people-drawer-dark.png', animations: 'disabled' })
})
