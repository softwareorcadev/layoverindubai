/**
 * Build a URL for a file served out of `public/`.
 *
 * This exists because of one line in vite.config.js: `base: '/landing/'`.
 * Vite rewrites root-relative paths inside index.html and inside CSS `url()`,
 * but it does NOT rewrite string literals in JS or JSX. So a hard-coded
 * `src="/media/hero.mp4"` resolves against the domain root, works perfectly
 * against the dev server, and 404s in production — the worst possible failure
 * shape. Every reference to something in `public/` goes through here.
 *
 * `import.meta.env.BASE_URL` already ends in a slash, hence stripping any
 * leading slash off the fragment; `/landing//media/x` mostly works but
 * splits cache keys and trips some CDN path rules.
 *
 * Images do not need this — they are imported from `src/assets/`, which gets
 * them a content hash and a correct URL for free. Video is in `public/` on
 * purpose: the filenames stay stable so the origin can cache them hard and
 * serve byte ranges, and if the clips ever outgrow the repo they can move
 * behind a `/landing/media/*` rewrite without a single call site changing.
 *
 * @param {string} path e.g. 'media/hero-dubai-night.mp4'
 */
export const assetUrl = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export default assetUrl
