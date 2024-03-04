import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/core/*'],
  splitting: false,
  sourcemap: false,
  clean: true,
  format: ['cjs', 'esm'],
  outDir: './dist',
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    }
  },
});
