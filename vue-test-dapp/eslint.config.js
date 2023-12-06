import antfu from '@antfu/eslint-config'
import perfectionist from 'eslint-plugin-perfectionist'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu({
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },

  formatters: {
    css: true, // by default use Prettier
    html: true, // by default use Prettier
  },

  // TypeScript and Vue are auto-detected, you can also explicitly enable them:
  typescript: true,
  vue: true,

  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    './fixtures',
  ],

  plugins: {
    perfectionist
  },
  rules: {
    'perfectionist/sort-interfaces': 'error',
  },

  ...compat.config({
    extends: [
      'eslint:recommended',
      // Other extends...
    ],
  })
})
