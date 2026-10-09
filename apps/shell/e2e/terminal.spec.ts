import { expect, test } from '@playwright/test'

// Phase 4d: the Claude Code terminal beside a demo. Needs pnpm dev at the repo root and a
// signed-in Claude Code. It only opens Claude and its /help screen, so it costs nothing.

test.use({ viewport: { width: 1600, height: 1000 } })
test.describe.configure({ mode: 'serial' })

const terminalText = (page: import('@playwright/test').Page) => page.getByTestId('terminal').locator('.xterm-rows')

test('Show Terminal opens Claude Code for this demo', async ({ page }) => {
  await page.goto('/prototypes/web-starter')
  await page.getByRole('button', { name: 'Show Terminal' }).click()
  const terminal = page.getByTestId('terminal')
  await expect(terminal.getByText('demos/web-starter')).toBeVisible()
  // Claude Code's prompt box appears once it has started.
  await expect(terminalText(page)).toContainText(/Claude Code|>|╭/, { timeout: 30_000 })
  await terminal.locator('.xterm-helper-textarea').fill('/help')
  await page.keyboard.press('Enter')
  await expect(terminalText(page)).toContainText(/help|commands|shortcuts/i, { timeout: 30_000 })
  await page.screenshot({ path: 'e2e/screenshots/terminal-dark.png', animations: 'disabled' })
})

test('leaving and coming back replays the same session', async ({ page }) => {
  await page.goto('/prototypes/web-starter')
  await page.getByRole('button', { name: 'Show Terminal' }).click()
  await expect(terminalText(page)).toContainText(/help|commands|shortcuts/i, { timeout: 15_000 })
})

test('Restart starts a new session', async ({ page }) => {
  await page.goto('/prototypes/web-starter')
  await page.getByRole('button', { name: 'Show Terminal' }).click()
  await expect(terminalText(page)).toContainText(/help|commands|shortcuts/i, { timeout: 15_000 })
  await page.getByTestId('terminal').getByRole('button', { name: 'Restart' }).click()
  await expect(terminalText(page)).not.toContainText(/shortcuts/i, { timeout: 15_000 })
  await expect(terminalText(page)).toContainText(/Claude Code|>|╭/, { timeout: 30_000 })
})

test('a page on another origin cannot open the terminal', async ({ page }) => {
  // The playground is a different origin from the shell, like any other website would be.
  await page.goto('http://localhost:5175/')
  const code = await page.evaluate(
    () =>
      new Promise<number>((resolve) => {
        const ws = new WebSocket('ws://127.0.0.1:4310/api/terminal?demo=web-starter')
        ws.onclose = (e) => resolve(e.code)
      }),
  )
  expect(code).toBe(1008)
})
