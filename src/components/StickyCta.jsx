import { useInView } from '../hooks/useInView.js'
import { MIN_HOURS, MAX_HOURS, priceFor, usd } from '../data/pricing.js'
import { SECTION } from '../data/site.js'

/**
 * The mobile-only bottom booking bar.
 *
 * Slides out of the way while the booking form is on screen — otherwise it
 * would cover the form it is pointing at. Kept as an inline transform rather
 * than a class so there is no dynamic-class question for Tailwind to resolve.
 */
export default function StickyCta() {
  const bookInView = useInView(SECTION.book, { threshold: 0.15 })

  return (
    <div
      id="stickyCta"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-3 backdrop-blur transition-transform duration-300 md:hidden"
      style={{ transform: bookInView ? 'translateY(110%)' : 'translateY(0)' }}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
            Private tours from
          </p>
          <p className="font-display text-lg font-bold leading-none">
            {usd(priceFor(MIN_HOURS))}{' '}
            <span className="text-xs font-medium text-ink-soft">
              · {MIN_HOURS}–{MAX_HOURS} hrs
            </span>
          </p>
        </div>
        <a
          href={`#${SECTION.book}`}
          className="btn-gold ml-auto flex-shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-gold"
        >
          Book Your Layover Tour
        </a>
      </div>
    </div>
  )
}
