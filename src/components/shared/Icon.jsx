import { cx } from '../../lib/cx.js'

/**
 * The single choke point for every icon on the page.
 *
 * Renders a Font Awesome class-name <i>, exactly as the original page did, so
 * all 60-odd icon names port across unchanged. Because everything funnels
 * through here, swapping to tree-shaken SVG later is a one-file change.
 *
 * Always aria-hidden: every icon on this page sits beside real text, so
 * announcing it would only add noise.
 */
export default function Icon({ name, variant = 'solid', className }) {
  const family = variant === 'brands' ? 'fa-brands' : 'fa-solid'
  return <i className={cx(family, `fa-${name}`, className)} aria-hidden="true" />
}
