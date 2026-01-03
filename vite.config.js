import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use VITE_BASE_URL environment variable when building for a subpath
// Example: VITE_BASE_URL=/portfolio12/ npm run build
export default defineConfig({
  base: process.env.VITE_BASE_URL || '/',
  plugins: [react()]
})
