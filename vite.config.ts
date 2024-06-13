import { defineConfig } from 'vite';
import devServer from '@hono/vite-dev-server';

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: ['./app/client.ts'],
          output: {
            entryFileNames: 'static/client.js'
          }
        },
        emptyOutDir: false,
        copyPublicDir: false
      }
    };
  }
  return {
    ssr: {
      noExternal: true
    },
    build: {
      minify: true,
      ssr: './server.ts'
    },
    plugins: [
      devServer({
        entry: './app/server.tsx'
      })
    ]
  };
});
