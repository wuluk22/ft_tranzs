import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: '/app', // dossier monté par Docker contenant /src, /public, etc.
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      '@': path.resolve('/app/src')
    }
  },
  build: {
    outDir: '/app/dist',
    emptyOutDir: true
  }
})