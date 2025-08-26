
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/

import { crx } from '@crxjs/vite-plugin'
import manifest from './public/manifest.json'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'




export default defineConfig({
  plugins: [react(), tailwindcss(), crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        popup: './index.html',
        background: './src/background/background.ts',
        content: './src/content/content.ts',
      },
      output: {
        entryFileNames: (chunk) => {
          const name = chunk.name;
          if (name === 'background') return 'background.js';
          if (name === 'content') return 'content.js';
          return 'assets/[name]-[hash].js';
        }
      }
    },
    outDir: 'dist'
  }
})