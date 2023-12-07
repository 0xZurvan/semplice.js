import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/core/*'],
  splitting: false,
  sourcemap: false,
  clean: true,

  outExtension({ format }) {
    return {
      js: `.${format}.js`,
      ts: `.${format}.ts`,
    }
  },

});