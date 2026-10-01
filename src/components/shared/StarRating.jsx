import Icon from './Icon.jsx'
import { cx } from '../../lib/cx.js'

/**
 * A row of filled stars. The stars themselves are decorative (aria-hidden via
 * Icon); the rating is announced once from the wrapper's aria-label.
 */
export default function StarRating({ count = 5, className, label }) {
  return (
    <div
      className={cx('flex gap-1', className)}
      role="img"
      aria-label={label ?? `Rated ${count} out of 5`}
    >
      {Array.from({ length: count }, (_, i) => (
        <Icon key={i} name="star" />
      ))}
    </div>
  )
}
