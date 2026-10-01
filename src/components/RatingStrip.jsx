import Icon from './shared/Icon.jsx'
import Reveal from './shared/Reveal.jsx'
import StarRating from './shared/StarRating.jsx'
import Barcode from './shared/Barcode.jsx'
import { FACEBOOK_REVIEWS_URL, VIDEO_REVIEW_COUNT } from '../data/site.js'

/**
 * The aggregate rating ledger above the video carousel: a boarding-pass card of
 * three dashed-divided cells.
 *
 * Deliberately NO `aggregateRating` JSON-LD. The page's schema is TravelAgency
 * (a LocalBusiness subtype), where self-serving first-party review markup is
 * rejected — adding it risks a structured-data manual action for no gain.
 * Instead the platform cell links out to where the reviews actually live.
 *
 * TODO(owner): the Facebook cell makes no numeric claim on purpose, because we
 * do not have your real count. Supply it and it can be shown here.
 */
export default function RatingStrip() {
  const platforms = [
    {
      id: 'facebook',
      href: FACEBOOK_REVIEWS_URL,
      icon: 'facebook',
      iconClass: 'text-xl text-[#1877F2]',
      title: 'Facebook Reviews',
      action: 'Read them on Facebook',
    },
  ]

  return (
    <Reveal className="mt-9 rounded-3xl border border-line bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-3 sm:gap-0">
        {/* Rating */}
        <div className="text-center sm:px-5">
          <p className="font-display text-4xl font-bold leading-none">5.0</p>
          <StarRating
            className="mt-2 justify-center text-xs text-gold-500"
            label="Rated 5.0 out of 5"
          />
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
            Average traveler rating
          </p>
        </div>

        {/* Platforms */}
        {platforms.map((p) => (
          <a
            key={p.id}
            href={p.href}
            target="_blank"
            rel="noopener"
            className="group border-t border-dashed border-line pt-5 text-center sm:border-l sm:border-t-0 sm:px-5 sm:pt-0"
          >
            <Icon name={p.icon} variant="brands" className={p.iconClass} />
            <p className="mt-2 text-sm font-semibold">{p.title}</p>
            <p className="mt-0.5 text-[11px] text-ink-faint transition group-hover:text-gold-600">
              {p.action}{' '}
              <Icon name="arrow-up-right-from-square" className="text-[9px]" />
            </p>
          </a>
        ))}

        {/* Video volume */}
        <div className="border-t border-dashed border-line pt-5 text-center sm:border-l sm:border-t-0 sm:px-5 sm:pt-0">
          <p className="font-display text-2xl font-bold leading-none">
            {VIDEO_REVIEW_COUNT.replace('+', '')}
            <span className="text-gold-500">+</span>
          </p>
          <p className="mt-2 text-sm font-semibold">Guest video reviews</p>
          <p className="mt-0.5 text-[11px] text-ink-faint">
            Filmed by travelers after their tour
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 border-t border-dashed border-line pt-4">
        <Barcode className="h-4 w-24 flex-shrink-0 text-ink" />
        <p className="text-[11px] leading-snug text-ink-faint">
          Ratings are shown on Facebook, where guests posted them — tap through to
          read them there.
        </p>
      </div>
    </Reveal>
  )
}
