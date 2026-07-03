import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves project repos from a sub-path:
// https://versatile-canada.github.io/versatile-agency/
// so the build needs to know that base path. Locally (npm run dev)
// this has no effect — only `npm run build` uses it.
// If your actual repo name differs, update this to match: '/your-repo-name/'
export default defineConfig({
  base: '/versatile-agency/',
  plugins: [react()],
  server: {
    port: 5174,
    // apply-update.bat already opens the browser itself once the server is
    // ready, so auto-open here is turned off to avoid two tabs opening.
    open: false
  }
})
