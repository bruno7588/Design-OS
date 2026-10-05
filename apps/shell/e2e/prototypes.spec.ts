import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { expect, test } from '@playwright/test'

// Phase 4b: the Prototypes gallery, the demo viewer, versions and Duplicate. Needs pnpm dev
// at the repo root (shell, server and playground). The test demo it creates is deleted after.

test.use({ viewport: { width: 1600, height: 1000 } })
// In order: the duplicate test creates and deletes a demo the screenshots shouldn't show.
test.describe.configure({ mode: 'serial' })

const demosDir = fileURLToPath(new URL('../../playground/demos', import.meta.url))
const TEST_NAME = 'E2E duplicate check'
const TEST_SLUG = 'e2e-duplicate-check'

test.afterAll(async ({ request }) => {
  await request.delete(`/api/demos/${TEST_SLUG}`)
})

test('the gallery shows the starters with thumbnails, and filters', async ({ page }) => {
  await page.goto('/prototypes')
  await expect(page.getByRole('heading', { level: 1, name: 'Prototypes' })).toBeVisible()
  const starters = page.getByRole('region', { name: 'Starters' })
  for (const slug of ['admin-starter', 'web-starter']) {
    const card = starters.getByTestId(`demo-${slug}`)
    await expect(card).toBeVisible()
    await expect(card.locator('img')).toHaveJSProperty('complete', true)
    expect(await card.locator('img').evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0)
  }
  await page.getByRole('combobox', { name: 'Platform' }).click()
  await page.getByRole('option', { name: 'Native app' }).click()
  await expect(page.getByRole('heading', { name: /No demos (match|yet)/ })).toBeVisible()
})

test('a starter opens in the viewer with the live demo and its handoff', async ({ page }) => {
  await page.goto('/prototypes')
  await page.getByTestId('demo-admin-starter').getByRole('button', { name: 'Admin starter' }).click()
  await expect(page).toHaveURL(/\/prototypes\/admin-starter$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Admin starter' })).toBeVisible()
  const demo = page.frameLocator('iframe[title="Admin starter demo"]')
  await expect(demo.getByRole('heading', { level: 1, name: 'People' })).toBeVisible()
  await expect(page.getByTestId('handoff').getByRole('heading', { name: 'Goal' })).toBeVisible()
  await page.getByRole('button', { name: 'Hide Panel' }).click()
  await expect(page.getByTestId('demo-panel')).toHaveCount(0)
})

test('duplicate, edit, save a version and switch to it', async ({ page, request }) => {
  await page.goto('/prototypes/admin-starter')
  await page.getByRole('button', { name: 'Duplicate' }).click()
  const modal = page.getByRole('dialog', { name: 'New demo' })
  await modal.getByRole('textbox', { name: 'Name' }).fill(TEST_NAME)
  await expect(modal.getByRole('button', { name: 'Duplicate' })).toBeDisabled()
  await modal.getByRole('combobox', { name: 'Feature' }).click()
  await page.getByRole('option', { name: 'Custom fields' }).click()
  await modal.getByRole('button', { name: 'Duplicate' }).click()
  await expect(page).toHaveURL(new RegExp(`/prototypes/${TEST_SLUG}$`))
  await expect(page.getByRole('heading', { level: 1, name: TEST_NAME })).toBeVisible()

  // Save v1, then change the working copy: v1 keeps the old page.
  await page.getByRole('button', { name: 'Save Version' }).click()
  await page.getByRole('dialog', { name: 'Save v1' }).getByRole('textbox', { name: 'What changed' }).fill('First pass')
  await page.getByRole('dialog', { name: 'Save v1' }).getByRole('button', { name: 'Save Version' }).click()
  await expect(page.getByText('Saved v1')).toBeVisible()

  const index = `${demosDir}/${TEST_SLUG}/src/index.tsx`
  const before = (await (await request.get(`/api/demos/${TEST_SLUG}`)).json()).thumbnailAt
  await writeFile(index, (await readFile(index, 'utf8')).replace('<Route index element={<Navigate to="admin/people" replace />} />', '<Route index element={<h1>Changed after v1</h1>} />'))
  const current = page.frameLocator(`iframe[title="${TEST_NAME} demo"]`)
  await page.reload()
  await expect(current.getByRole('heading', { name: 'Changed after v1' })).toBeVisible()

  await page.getByRole('combobox', { name: 'Version' }).click()
  await page.getByRole('option', { name: 'v1 · First pass' }).click()
  await expect(page).toHaveURL(/version=v1/)
  await expect(page.getByRole('button', { name: 'Save Version' })).toBeDisabled()
  await expect(current.getByRole('heading', { level: 1, name: 'People' })).toBeVisible()

  // Saving a file regenerates the working copy's thumbnail.
  await expect
    .poll(async () => (await (await request.get(`/api/demos/${TEST_SLUG}`)).json()).thumbnailAt, { timeout: 30_000 })
    .not.toBe(before)
  expect((await request.delete(`/api/demos/${TEST_SLUG}`)).ok()).toBe(true)
})

for (const mode of ['dark', 'light'] as const) {
  test(`Prototypes screenshots, ${mode}`, async ({ page }) => {
    await page.addInitScript((m) => localStorage.setItem('design-os-mode', m), mode)
    await page.goto('/prototypes')
    await expect(page.getByTestId('demo-admin-starter').locator('img')).toBeVisible()
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: `e2e/screenshots/prototypes-gallery-${mode}.png`, animations: 'disabled' })
    await page.goto('/prototypes/admin-starter')
    await expect(page.frameLocator('iframe').getByRole('heading', { level: 1, name: 'People' })).toBeVisible()
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: `e2e/screenshots/prototypes-viewer-${mode}.png`, animations: 'disabled' })
  })
}
