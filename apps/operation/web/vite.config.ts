import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Admin console is served at /operation/ in production. This base ensures
  // all generated asset URLs are prefixed correctly (e.g. /operation/assets/index-abc.js).
  base: '/operation/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'print-localhost-hint',
      configureServer(server) {
        server.printUrls = () => {
          const colorUrl = (url: string) => `\x1b[36m${url}\x1b[0m`
          server.config.logger.info('')
          server.config.logger.info('  Rizqun UI dev server running:')
          server.config.logger.info('')
          server.config.logger.info(`  ➜  Local:    ${colorUrl('http://localhost:5173/operation/')}`)
          server.config.logger.info('')
          server.config.logger.info('\x1b[33m  ⚠  API calls go to /api/* (proxied to :3000). Open localhost, not 127.0.0.1.\x1b[0m')
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
  server: {
    // Dev proxy: /api/* → Express backend on :3000, so the admin can call
    // the API without CORS issues during local development.
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
