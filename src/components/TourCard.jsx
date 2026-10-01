import Icon from './shared/Icon.jsx'
import { cx } from '../lib/cx.js'
import { priceFor, usd, EXTRA_PER_GUEST } from '../data/pricing.js'
import { useBooking } from '../context/bookingContext.js'

/** One featured pricing card. The 6h card uses the inverted `featured` variant. */
export default function TourCard({ pkg }) {
  const { bookDuration } = useBooking()
  const featured = Boolean(pkg.featured)

  return (
    <div
      className={cx(
        'flex flex-col rounded-3xl p-6 transition hover:-translate-y-1',
        featured
          ? 'relative bg-ink text-white shadow-lux ring-1 ring-gold-400/40'
          : 'border border-line bg-white shadow-card hover:shadow-lux',
      )}
    >
      {pkg.badge && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold-500 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-gold">
          {pkg.badge}
        </span>
      )}

      <p
        className={cx(
          'font-display text-sm font-semibold uppercase tracking-wide',
          featured ? 'text-gold-300' : 'text-ink-faint',
        )}
      >
        {pkg.kicker}
      </p>
      <p className="mt-1 font-display text-2xl font-bold">{pkg.hours} Hours</p>
      <p className="mt-3 font-display text-4xl font-bold">{usd(priceFor(pkg.hours))}</p>
      <p className={cx('text-xs', featured ? 'text-white/50' : 'text-ink-faint')}>
        first traveler · +{usd(EXTRA_PER_GUEST)} each extra
      </p>

      <ul
        className={cx(
          'mt-5 space-y-2.5 text-sm',
          featured ? 'text-white/80' : 'text-ink-soft',
        )}
      >
        {pkg.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2.5">
            <Icon
              name="check"
              className={cx('mt-0.5', featured ? 'text-gold-300' : 'text-gold-500')}
            />
            {bullet}
          </li>
        ))}
      </ul>

      {pkg.footnote && (
        <p className="mt-3 text-[11px] leading-snug text-white/45">{pkg.footnote}</p>
      )}

      {/* mt-auto on the wrapper pins every card's button to the bottom of the
          card, while pt-5 keeps a gap on the tallest card. The original left
          the buttons in flow, so they sat at four different heights depending
          on how many bullets each tour had. */}
      <div className="mt-auto w-full pt-5">
        <button
          type="button"
          onClick={() => bookDuration(pkg.hours)}
          className={cx(
            'w-full text-sm font-semibold',
            featured
              ? 'btn-gold rounded-xl py-3 text-white shadow-gold'
              : 'rounded-xl border border-ink/15 py-3 transition hover:border-gold-500 hover:text-gold-600',
          )}
        >
          Book {pkg.hours}-hour tour
        </button>
      </div>
    </div>
  )
}
