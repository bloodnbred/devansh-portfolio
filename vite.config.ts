import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  // GitHub Pages serves a project site from /<repo>/, so every built URL needs
  // that prefix. A relative base is repo-name agnostic: the same build works on
  // Pages, on Vercel, and under `vite preview` without knowing where it lands.
  // Anything served out of /public must be referenced via import.meta.env.BASE_URL
  // — see asset() in src/data/site.ts.
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
})