
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/

import { crx } from '@crxjs/vite-plugin'
import manifest from './public/manifest.json'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'




export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    crx({ manifest })
  ],
})