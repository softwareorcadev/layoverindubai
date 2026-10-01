import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // The site is served from a /landing subfolder, not the domain root, so every
  // built asset URL (HTML tags, CSS url(), bundled image paths) needs this prefix.
  base: '/landing/',
  plugins: [react(), tailwindcss()],
})
