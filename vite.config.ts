import honox from 'honox/vite'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: ['/app/styles.scss'],
          output: {
            assetFileNames: 'static/assets/[name].[ext]'
          }
        }
      }
    }
  }
  return {
    optimizeDeps: { exclude: ['drizzle-orm', 'short-unique-id'] },
    ssr: { external: ['drizzle-orm', 'short-unique-id'] },
    plugins: [honox()]
  }
})
