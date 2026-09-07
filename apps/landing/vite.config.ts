import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Landing page is served at / in production.
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'print-localhost-hint',
      configureServer(server) {
        server.printUrls = () => {
          const colorUrl = (url: string) => `\x1b[36m${url}\x1b[0m`
          server.config.logger.info('')
          server.config.logger.info('  Rizqun landing dev server running:')
          server.config.logger.info('')
          server.config.logger.info(`  ➜  Local:    ${colorUrl('http://localhost:5174/')}`)
          server.config.logger.info('')
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
