/// <reference types='vitest' />
/// <reference types='vite/client' />
 
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { name } from './package.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
  ],
  base: `/${name}/`,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
})