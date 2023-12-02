import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@abi-example', replacement: fileURLToPath(new URL('./src/abi-example', import.meta.url)) },
      { find: '@abi-example', replacement: fileURLToPath(new URL('./src/abi-example', import.meta.url)) },
      { find: '@contracts', replacement: fileURLToPath(new URL('./src/core/contracts', import.meta.url)) },
      { find: '@address', replacement: fileURLToPath(new URL('./src/core/address', import.meta.url)) },
    ],
  },
})
