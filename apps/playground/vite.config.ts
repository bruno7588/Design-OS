import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The playground: replicas of the 5Mins surfaces and, from Phase 4b, the demos built on them.
export default defineConfig({
  plugins: [react()],
  server: { port: 5175, strictPort: true },
})
