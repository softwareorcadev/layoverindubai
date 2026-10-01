import Icon from './shared/Icon.jsx'
import Reveal from './shared/Reveal.jsx'
import { SECTION } from '../data/site.js'

/**
 * The one warm-accent (gold-50) band on the page — deliberately the only
 * interruption to the white / sand / ink rhythm, right before the close. Adding
 * a second gold-50 section would stop this reading as a signal.
 *
 * The scarcity claim here is structural and honest ("every tour is private, so
 * only N vehicles run per day"), not a manufactured countdown.
 */
export default function Urgency() {
  return (
    <section className="border-y border-gold-100 bg-gold-50">
      <div className="mx-auto max-w-wrap px-4 py-9 sm:px-6">
        <Reveal className="flex flex-col items-center gap-5 text-center md:flex-row md:text-left">
          <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-white text-gold-600 shadow-card">
            <Icon name="hourglass-half" className="text-xl" />
          </span>
          <div className="md:flex-1">
            <h3 className="font-display text-lg font-semibold">
              Private vehicles are limited each day.
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              Because every tour is private, we only run a set number of vehicles per
              day. Morning and evening pickup slots — which match DXB&apos;s busiest
              arrival waves — are reserved first. Booking ahead locks in your exact
              pickup time.
            </p>
          </div>
          <a
            href={`#${SECTION.book}`}
            className="btn-gold flex-shrink-0 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-gold"
          >
            Reserve my pickup slot
          </a>
        </Reveal>
      </div>
    </section>
  )
}
