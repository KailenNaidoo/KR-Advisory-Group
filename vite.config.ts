/// <reference types="vite-react-ssg" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Site is hosted at the domain root (custom domain on GitHub Pages:
// kradvisorygroup.co.za). The app uses root-absolute asset/link URLs
// (e.g. /hero.jpg, /services), so the base must stay "/".
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  ssgOptions: {
    // 'defer' (not 'async'): the app module must execute AFTER the inline script
    // that sets window.__VITE_REACT_SSG_HASH__. With 'async' the app chunk could
    // run first, read an undefined hash, and fetch static-loader-data-manifest-
    // undefined.json -> 404 -> JSON parse error -> router error boundary blanked
    // the page content (caught in Phase 2.5 visual QA). 'defer' preserves document
    // order so the hash is defined before the loader-data manifest fetch.
    script: 'defer',
    // nested: /services -> dist/services/index.html (crawler-friendly URLs,
    // and what FEAT verification asserts against).
    dirStyle: 'nested',
    entry: 'src/main.tsx',
  },
});
