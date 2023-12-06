import { URL, fileURLToPath } from 'node:url'

// import path from 'node:path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  /* build: {
    lib: {
      name: 'vite-dapp-plugin',
      entry: [
        path.resolve(__dirname, 'src/core/contracts/contract.ts'),
        path.resolve(__dirname, 'src/core/address/address.ts'),
      ],
      fileName: (format: string, entryName: string) => {
        if (format === 'es')
          return `${entryName}.ts`

        return `${entryName}.${format}`
      },
    },
  }, */
  plugins: [],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
})
