import antfu from '@antfu/eslint-config'
import perfectionist from 'eslint-plugin-perfectionist'
import prettier from '@antfu/eslint-plugin-prettier'

export default antfu({
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },

  prettier: {
    css: true,
    html: true
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
    // ...globs
  ],

  plugins: {
    perfectionist,
    prettier
  },
  rules: {
    'perfectionist/sort-interfaces': 'error',
  },
})
