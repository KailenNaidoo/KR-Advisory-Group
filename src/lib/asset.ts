/**
 * Resolve a path to a file in `public/` against Vite's configured base URL.
 *
 * In production the base is '/', so `asset('/hero.jpg')` → '/hero.jpg'. In the
 * GitHub Pages review build the base is '/KR-Advisory-Group/', so the same call
 * → '/KR-Advisory-Group/hero.jpg'. Hardcoded root-absolute strings like
 * '/hero.jpg' do NOT get the base prefix from Vite (only index.html refs and
 * imported assets do), which 404s under a subpath — this helper fixes that for
 * runtime `src` values referenced from component/content code.
 *
 * `import.meta.env.BASE_URL` always ends with a trailing slash, so we strip any
 * leading slash from the input before joining to avoid a double slash.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL; // e.g. '/' or '/KR-Advisory-Group/'
  return `${base}${path.replace(/^\//, '')}`;
}
