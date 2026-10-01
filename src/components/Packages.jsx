import Icon from './shared/Icon.jsx'
import Reveal from './shared/Reveal.jsx'
import SectionHeading from './shared/SectionHeading.jsx'
import SectionCta from './shared/SectionCta.jsx'
import TourCard from './TourCard.jsx'
import { FEATURED_PACKAGES } from '../data/packages.js'
import {
  EXTRA_PER_GUEST,
  MAX_TRAVELERS,
  pluralTravelers,
  MIN_HOURS,
  MAX_HOURS,
  POPULAR_HOURS,
  totalFor,
  usd,
} from '../data/pricing.js'
import { SECTION_CTAS } from '../data/sectionCtas.js'
import { SECTION } from '../data/site.js'

export default function Packages() {
  return (
    <section id={SECTION.packages} className="bg-white">
      <div className="mx-auto max-w-wrap px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          {/* id + focusable because this is now one of the header's two jump
              targets — Header.handleJump moves focus to `${sectionId}-heading`
              after the scroll, and without them keyboard and screen-reader
              users land on the section visually but leave focus behind. */}
          <SectionHeading
            id={`${SECTION.packages}-heading`}
            focusable
            eyebrow="Tours & pricing"
            title={
              <>
                Pick the tour that fits
                <br />
                your layover.
              </>
            }
            lead={`We run private tours for every layover from ${MIN_HOURS} to ${MAX_HOURS} hours. Prices include the private vehicle, driver-guide, fuel, airport pickup and drop-off. First traveler included — see the group deal below.`}
          />
        </Reveal>

        {/* Group value banner — the total is computed, never hard-coded. */}
        <Reveal className="mx-auto mt-9 flex max-w-3xl flex-col items-center gap-3 rounded-2xl border border-gold-100 bg-gold-50 px-5 py-4 text-center sm:flex-row sm:text-left">
          <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-white text-gold-600 shadow-card">
            <Icon name="user-group" className="text-lg" />
          </span>
          <p className="text-sm leading-relaxed text-ink sm:text-[15px]">
            <strong className="font-display font-semibold">
              Traveling together? Add just {usd(EXTRA_PER_GUEST)} per extra guest.
            </strong>
            <br className="sm:hidden" />
            <span className="text-ink-soft">
              {' '}
              Up to {MAX_TRAVELERS} travelers share one private vehicle — a{' '}
              {POPULAR_HOURS}-hour tour for {pluralTravelers(MAX_TRAVELERS)} is only{' '}
              {usd(totalFor(POPULAR_HOURS, MAX_TRAVELERS))} total.
            </span>
          </p>
        </Reveal>

        <Reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PACKAGES.map((pkg) => (
            <TourCard key={pkg.hours} pkg={pkg} />
          ))}
        </Reveal>

        {/* SectionCta brings its own Reveal and top margin; the wrapper only
            centres it, since the 'link' variant lays out flush-left and every
            other block in this section is centred. */}
        <div className="mt-3 flex justify-center">
          <SectionCta cta={SECTION_CTAS.packages} />
        </div>
      </div>
    </section>
  )
}
