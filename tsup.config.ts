import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts'],
  platform: 'browser',
  format: ['iife'],
  globalName: 'UniqueStaking',
  splitting: false,
  bundle: true,
  metafile: true,
  sourcemap: true,
  minify: true,
  clean: true,
})
