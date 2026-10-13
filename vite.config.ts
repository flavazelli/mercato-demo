import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  // GitHub Pages serves project sites from /<repo>/; BASE_PATH is supplied by
  // actions/configure-pages and defaults to / for local development.
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  build: { outDir: 'dist', emptyOutDir: true },
});
