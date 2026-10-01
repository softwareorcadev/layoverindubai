import { useReveal } from '../../hooks/useReveal.js'
import { cx } from '../../lib/cx.js'

/**
 * Fade-and-rise wrapper, matching the original page's `.reveal` behaviour.
 *
 * Note: do NOT put a Tailwind `transition` utility on the same element. In
 * Tailwind v4 utilities beat @layer components, so `transition` would override
 * `.reveal`'s own opacity/transform transition and the element would snap in
 * instead of fading. Put `transition` on a child instead.
 */
export default function Reveal({ as: Tag = 'div', className, children, ...rest }) {
  const [ref, isIn] = useReveal()
  return (
    <Tag ref={ref} className={cx('reveal', isIn && 'in', className)} {...rest}>
      {children}
    </Tag>
  )
}
