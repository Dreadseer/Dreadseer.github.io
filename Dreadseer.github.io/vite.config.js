import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Sets base to '/' for root-level GitHub Pages deployment (username.github.io)
export default defineConfig({
  plugins: [react()],
  base: '/',
})
