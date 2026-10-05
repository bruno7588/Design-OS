import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The playground: replicas of the 5Mins surfaces and the demos built on them (demos/).
// Demos import through the aliases, so a version snapshot (demos/<slug>/versions/vN/src)
// resolves the same as the working copy.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@replicas': fileURLToPath(new URL('./src/replicas', import.meta.url)),
      '@playground': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // /api goes to the Design OS server, for comments on demos.
  server: { port: 5175, strictPort: true, proxy: { '/api': 'http://127.0.0.1:4310' } },
})
