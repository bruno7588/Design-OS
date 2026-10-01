import { expect, test } from '@playwright/test'

// Phase 3: the shell frame and Home. Needs the server running (pnpm dev at the repo root)
// and the sample files in the vault's "50 outputs/dashboard" folder.

test.use({ viewport: { width: 1440, height: 1200 } })

test('the root opens Home, with Home selected in the side navigation', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/home$/)
  const nav = page.getByRole('navigation', { name: 'Modules' })
  for (const name of ['Home', 'Components', 'Prototypes', 'Skills', 'Engines', 'Brain']) {
    await expect(nav.getByRole('button', { name, exact: true })).toBeVisible()
  }
  await expect(nav.getByRole('button', { name: 'Home', exact: true })).toHaveAttribute('aria-current', 'page')
})

test('Components in the side navigation opens the library', async ({ page }) => {
  await page.goto('/home')
  await page.getByRole('navigation', { name: 'Modules' }).getByRole('button', { name: 'Components', exact: true }).click()
  await expect(page).toHaveURL(/\/components$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Components' })).toBeVisible()
  await expect(page.getByRole('navigation', { name: 'Modules' }).getByRole('button', { name: 'Components', exact: true })).toHaveAttribute('aria-current', 'page')
})

test('Home cards show the sample files', async ({ page }) => {
  await page.goto('/home')
  await expect(page.getByTestId('home-tickets').getByRole('link', { name: 'DES-142' })).toBeVisible()
  await expect(page.getByTestId('home-tickets').getByText('Blocked (1)')).toBeVisible()
  await expect(page.getByTestId('home-meetings').getByText('Impersonation V1 handoff')).toBeVisible()
  await expect(page.getByTestId('home-meetings').getByRole('link', { name: /Automation UX improvements/ })).toHaveAttribute('href', /^obsidian:\/\/open\?vault=Design-OS-vault/)
  await expect(page.getByTestId('home-open-decisions').getByRole('heading', { name: 'Automations' })).toBeVisible()
  await expect(page.getByTestId('home-weekly-digest').getByRole('heading', { name: 'Decisions made' })).toBeVisible()
  await expect(page.getByTestId('home-quick-run').getByRole('button', { name: 'Granola Sync' })).toBeDisabled()
  await expect(page.getByText("The Design OS server isn't running")).toHaveCount(0)
})

test('a missing file shows the empty state', async ({ page }) => {
  await page.route('**/api/dashboard/des-tickets.json', (route) => route.fulfill({ status: 404, json: { error: 'missing' } }))
  await page.goto('/home')
  await expect(page.getByTestId('home-tickets').getByRole('heading', { name: 'No des-tickets.json yet' })).toBeVisible()
})

test('a stopped server shows one alert', async ({ page }) => {
  await page.route('**/api/**', (route) => route.fulfill({ status: 502, body: '' }))
  await page.goto('/home')
  await expect(page.getByText("The Design OS server isn't running")).toHaveCount(1)
})

for (const mode of ['dark', 'light'] as const) {
  test(`Home screenshot, ${mode}`, async ({ page }) => {
    await page.addInitScript((m) => localStorage.setItem('design-os-mode', m), mode)
    await page.goto('/home')
    await expect(page.getByTestId('home-weekly-digest').getByRole('heading', { name: 'Decisions made' })).toBeVisible()
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: `e2e/screenshots/home-${mode}.png`, fullPage: true, animations: 'disabled' })
  })
}
