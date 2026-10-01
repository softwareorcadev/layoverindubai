/**
 * Hide a media element that failed to load, revealing the gradient painted
 * behind it.
 *
 * Every image and video on this page sits on top of a CSS gradient that is a
 * deliberate part of the design rather than a loading state. So a broken file
 * should disappear, not show the browser's broken-image glyph — the tile then
 * reads as an intentional gradient tile instead of a fault.
 *
 * Hoisted here because it now has four call sites (the hero background, the
 * hero showreel, the gallery tiles and the guest video wall). It used to be
 * defined twice, identically, in Hero.jsx and GalleryTile.jsx.
 *
 * NOTE: this only works when `src` is on the element itself. A `<source>`
 * child that 404s fires `error` on the `<source>`, and that event does not
 * bubble — React's onError on the parent never sees it. That is why both the
 * video pipeline and the image registry ship a single format each.
 */
export const hideOnError = (event) => {
  event.currentTarget.style.display = 'none'
}

export default hideOnError
