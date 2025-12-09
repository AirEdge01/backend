import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: process.env.vITE_BASE_PATH || '/AirEdge01/backend'
})
