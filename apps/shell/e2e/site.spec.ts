import { expect, test } from '@playwright/test'

// The shared, read-only site (pnpm build:site, deployed by Vercel). Skipped unless SITE_URL
// points at a build of it, such as a local server for site/ or a Vercel preview.
const SITE = process.env.SITE_URL
test.skip(!SITE, 'Set SITE_URL to check the shared site')
test.use({ viewport: { width: 1600, height: 1000 }, baseURL: SITE })

test('the shared site opens on the library, with only Components and Prototypes', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/components$/)
  const nav = page.getByRole('navigation', { name: 'Modules' })
  await expect(nav.getByRole('button', { name: 'Components', exact: true })).toBeVisible()
  await expect(nav.getByRole('button', { name: 'Prototypes', exact: true })).toBeVisible()
  await expect(nav.getByRole('button', { name: 'Home', exact: true })).toHaveCount(0)
  await page.goto('/components/button')
  await expect(page.getByRole('heading', { level: 1, name: 'Button' })).toBeVisible()
  await page.screenshot({ path: 'e2e/screenshots/site-components.png' })
})

test('prototypes are read-only: gallery, thumbnails, demo and handoff, no write buttons', async ({ page }) => {
  await page.goto('/prototypes')
  const card = page.getByTestId('demo-admin-starter')
  await expect(card.locator('img')).toBeVisible()
  expect(await card.locator('img').evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0)
  await page.screenshot({ path: 'e2e/screenshots/site-gallery.png' })

  await card.getByRole('button', { name: 'Admin starter' }).click()
  await expect(page.getByText('Shared copy: read-only')).toBeVisible()
  await expect(page.frameLocator('iframe').getByRole('heading', { level: 1, name: 'People' })).toBeVisible()
  await expect(page.getByTestId('handoff').getByRole('heading', { name: 'Goal' })).toBeVisible()
  for (const name of ['Save Version', 'Duplicate', 'Comment', 'Show Terminal']) await expect(page.getByRole('button', { name, exact: true })).toHaveCount(0)
  await expect(page.getByRole('tab', { name: /Comments/ })).toHaveCount(0)
  await page.screenshot({ path: 'e2e/screenshots/site-viewer.png' })
})

test('a demo opens on its own under /playground', async ({ page }) => {
  await page.goto('/playground/demos/web-starter')
  await expect(page).toHaveURL(/\/playground\/demos\/web-starter\/web\/for-you$/)
  await expect(page.getByRole('navigation', { name: 'Web app' })).toBeVisible()
})
