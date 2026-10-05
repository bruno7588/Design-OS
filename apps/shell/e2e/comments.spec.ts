import { expect, test, type Page } from '@playwright/test'

// Phase 4c: comments on a running demo. Needs pnpm dev at the repo root. Works on a temporary
// duplicate of the Admin starter, deleted at the end. Watch mode itself calls Haiku, so it's
// checked by hand (see docs/phase-4c-notes.md); here it's only switched on and off.

test.use({ viewport: { width: 1600, height: 1000 } })
test.describe.configure({ mode: 'serial' })

const SLUG = 'e2e-comments-check'

test.beforeAll(async ({ request }) => {
  await request.delete(`/api/demos/${SLUG}`)
  const r = await request.post('/api/demos/admin-starter/duplicate', { data: { name: 'E2E comments check', feature: 'Custom fields' } })
  expect(r.ok()).toBe(true)
})

test.afterAll(async ({ request }) => {
  await request.put(`/api/demos/${SLUG}/watch`, { data: { on: false } })
  await request.delete(`/api/demos/${SLUG}`)
})

const frameOf = (page: Page) => page.frameLocator('iframe[title="E2E comments check demo"]')

async function comment(page: Page, text: string) {
  const demo = frameOf(page)
  await page.getByRole('button', { name: 'Comment', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Comment', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await demo.getByRole('heading', { level: 1, name: 'People' }).click()
  const form = demo.getByRole('form', { name: 'New comment' })
  const name = form.getByRole('textbox', { name: 'Your name' })
  if (await name.count()) await name.fill('Bruno')
  await form.getByRole('textbox', { name: 'Comment' }).fill(text)
  await form.getByRole('button', { name: 'Comment' }).click()
  await expect(form).toHaveCount(0)
}

test('comment on an element: a pin appears and the comment is pending', async ({ page }) => {
  await page.goto(`/prototypes/${SLUG}`)
  const demo = frameOf(page)
  await expect(demo.getByRole('heading', { level: 1, name: 'People' })).toBeVisible()
  await comment(page, 'Call this page Team members')

  const pin = demo.getByRole('button', { name: /Comment 1 from Bruno: Call this page Team members/ })
  await expect(pin).toBeVisible()
  const panel = page.getByTestId('comments-panel')
  await expect(panel.getByRole('region', { name: 'Pending comments' }).getByText('Call this page Team members')).toBeVisible()
  await expect(page.getByRole('tab', { name: /Comments/ }).locator('.ds-tab-counter')).toHaveText('1')

  // The server keeps the selector, the element and the version it was based on.
  const { comments } = await (await page.request.get(`/api/demos/${SLUG}/comments`)).json()
  expect(comments[0]).toMatchObject({ path: '/admin/people', status: 'pending', version: 'current', element: { tag: 'h1', text: 'People' } })
})

test('resolve hides the pin, reopen brings it back, delete removes it', async ({ page }) => {
  await page.goto(`/prototypes/${SLUG}`)
  const demo = frameOf(page)
  const pin = demo.getByRole('button', { name: /Comment 1 from Bruno/ })
  await pin.click()
  const thread = demo.getByTestId('comment-thread')
  await expect(thread.getByText('Pending')).toBeVisible()
  await thread.getByRole('button', { name: 'Resolve' }).click()
  await expect(pin).toHaveCount(0)
  await page.getByRole('tab', { name: /Comments/ }).click()
  await expect(page.getByRole('region', { name: 'Done comments' })).toBeVisible()

  await page.request.patch(`/api/demos/${SLUG}/comments/${(await (await page.request.get(`/api/demos/${SLUG}/comments`)).json()).comments[0].id}`, { data: { status: 'pending' } })
  await expect(pin).toBeVisible()
  await pin.click()
  await demo.getByTestId('comment-thread').getByRole('button', { name: 'Delete' }).click()
  await expect(pin).toHaveCount(0)
  await expect(page.getByTestId('comments-panel').getByRole('heading', { name: 'No comments yet' })).toBeVisible()
})

test('watch mode switches on and off from the Comments tab', async ({ page }) => {
  await page.goto(`/prototypes/${SLUG}`)
  await page.getByRole('tab', { name: /Comments/ }).click()
  const toggle = page.getByRole('switch', { name: 'Watch mode' })
  await expect(toggle).not.toBeChecked()
  await toggle.click()
  await expect(toggle).toBeChecked()
  expect((await (await page.request.get(`/api/demos/${SLUG}/watch`)).json()).on).toBe(true)
  await toggle.click()
  await expect(toggle).not.toBeChecked()
})

for (const mode of ['dark', 'light'] as const) {
  test(`comments screenshots, ${mode}`, async ({ page }) => {
    await page.addInitScript((m) => localStorage.setItem('design-os-mode', m), mode)
    await page.goto(`/prototypes/${SLUG}`)
    await comment(page, `A ${mode} mode comment on the title`)
    const demo = frameOf(page)
    // Comment mode stays on after commenting, as in Figma: open the composer on the subtitle.
    await expect(page.getByRole('button', { name: 'Comment', exact: true })).toHaveAttribute('aria-pressed', 'true')
    await demo.getByText('Everyone at Meridian Hotels who can access 5Mins.').click()
    await demo.getByRole('form', { name: 'New comment' }).getByRole('textbox', { name: 'Comment' }).fill('Shorter, please')
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: `e2e/screenshots/comments-${mode}.png`, animations: 'disabled' })
    await demo.getByRole('form', { name: 'New comment' }).getByRole('button', { name: 'Cancel' }).click()
  })
}
