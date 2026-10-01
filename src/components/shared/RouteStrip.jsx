import Icon from './Icon.jsx'
import { cx } from '../../lib/cx.js'

/**
 * The DXB — DUBAI — DXB dashed route strip, the page's signature motif.
 * Used in the hero boarding stub and again in the booking section's close.
 *
 * `size="sm"` is the booking-section variant (text-base); the hero uses lg.
 */
export default function RouteStrip({ size = 'lg', dashClass = 'border-white/35' }) {
  const type = size === 'sm' ? 'text-base' : 'text-lg'
  return (
    <>
      <span className={cx('font-display font-bold tracking-wide', type)}>DXB</span>
      <span
        className={cx('relative mx-1 h-px flex-1 border-t border-dashed', dashClass)}
      >
        <Icon
          name="plane"
          className="absolute -top-[7px] left-1/2 -translate-x-1/2 text-[11px] text-gold-300"
        />
      </span>
      <span
        className={cx('font-display font-bold tracking-wide text-gold-300', type)}
      >
        DUBAI
      </span>
      <span className={cx('mx-1 h-px flex-1 border-t border-dashed', dashClass)} />
      <span className={cx('font-display font-bold tracking-wide', type)}>DXB</span>
    </>
  )
}
