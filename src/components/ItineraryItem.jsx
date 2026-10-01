import Icon from './shared/Icon.jsx'
import AccordionItem from './shared/Accordion.jsx'
import { cx } from '../lib/cx.js'
import { priceFor, usd } from '../data/pricing.js'
import { useBooking } from '../context/bookingContext.js'

function Bullet({ bullet }) {
  return (
    <li className="flex gap-2.5">
      <Icon name={bullet.icon ?? 'location-dot'} className="mt-0.5 text-gold-500" />
      <span>
        {bullet.text}
        {bullet.suffix && <span className="text-ink-faint"> {bullet.suffix}</span>}
      </span>
    </li>
  )
}

/** One itinerary row. Handles both the 2h two-column variant and a flat list. */
export default function ItineraryItem({ itinerary }) {
  const { bookDuration } = useBooking()
  const { hours, title, teaser, badge, featured, note, bullets, groups, bestFor } =
    itinerary

  const header = (
    <>
      <span
        className={cx(
          'grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl font-display text-sm font-bold',
          featured ? 'bg-gold-500 text-white' : 'bg-gold-50 text-gold-700',
        )}
      >
        {hours}h
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display font-semibold">
          {title} — {usd(priceFor(hours))}
          {badge && (
            <span className="ml-1.5 rounded-full bg-gold-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-700">
              {badge}
            </span>
          )}
        </span>
        <span className="block truncate text-sm text-ink-soft">{teaser}</span>
      </span>
    </>
  )

  return (
    <AccordionItem header={header} featured={featured} className={!featured ? 'bg-white' : undefined}>
      {groups ? (
        <div className="grid gap-5 border-t border-line px-5 py-5 sm:grid-cols-2 sm:px-6">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-gold-600">
                <Icon name={group.icon} className="mr-1.5" />
                {group.label}
              </p>
              <ul className="space-y-2 text-sm text-ink-soft">
                {group.bullets.map((bullet) => (
                  <Bullet key={bullet.text} bullet={bullet} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-t border-line px-5 py-5 sm:px-6">
          <ul className="grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
            {bullets.map((bullet) => (
              <Bullet key={bullet.text} bullet={bullet} />
            ))}
          </ul>
          {note && <p className="mt-3 text-xs text-ink-faint">{note}</p>}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 border-t border-dashed border-line px-5 py-4 sm:px-6">
        <p className="text-xs text-ink-faint">
          <Icon name="camera" className="mr-1" />
          Best for: {bestFor}
        </p>
        <button
          type="button"
          onClick={() => bookDuration(hours)}
          className={cx(
            'flex-shrink-0 rounded-lg px-4 py-2 text-xs font-semibold text-white',
            featured ? 'btn-gold' : 'bg-ink transition hover:bg-gold-600',
          )}
        >
          Book {hours}h
        </button>
      </div>
    </AccordionItem>
  )
}
