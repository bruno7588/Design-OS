import { defineConfig } from 'vitest/config'

// Unit tests only; the Playwright specs in apps/*/e2e run with Playwright.
export default defineConfig({
  test: { include: ['{apps,packages}/*/src/**/*.test.ts', 'scripts/**/*.test.ts'] },
})
