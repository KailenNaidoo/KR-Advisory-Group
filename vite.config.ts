/// <reference types="vite-react-ssg" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Review-only GitHub Pages build: when GITHUB_PAGES=true the site is served
// from the project-pages subpath (https://<user>.github.io/<repo>/), so Vite
// needs a matching base and the SSG router picks it up via BASE_URL in
// src/main.tsx. Production (Netlify/Cloudflare) builds leave GITHUB_PAGES unset
// and keep base '/', so this review config never affects the production domain.
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const pagesBase = process.env.PAGES_BASE ?? '/KR-Advisory-Group/';

// https://vitejs.dev/config/
export default defineConfig({
  base: isGitHubPages ? pagesBase : '/',
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
