/**
 * Scroll a section into view by id.
 *
 * `scroll-padding-top` (set from the header's measured height by
 * useHeaderOffset) supplies the offset, so no manual maths is needed here.
 */
export function scrollToId(id, reducedMotion = false) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
}

export default scrollToId
