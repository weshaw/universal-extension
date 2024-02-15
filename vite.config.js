import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        scripts: 'src/scripts/index.js',
      },
      output: {
        dir: 'dist',
        entryFileNames: 'src/scripts/index.js'
      },
    },
  },
  plugins: [crx({ manifest })],
});