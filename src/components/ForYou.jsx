import Icon from './shared/Icon.jsx'
import Reveal from './shared/Reveal.jsx'
import SectionHeading from './shared/SectionHeading.jsx'
import SectionCta from './shared/SectionCta.jsx'
import { TRAVELER_PROFILES, ACCESSIBILITY_CARD } from '../data/forYou.js'
import { SECTION_CTAS } from '../data/sectionCtas.js'
import { priceFor, usd } from '../data/pricing.js'
import { SECTION, mailtoLink } from '../data/site.js'
import { useBooking } from '../context/bookingContext.js'

/**
 * "Is this you?" — self-qualification.
 *
 * Transit travellers arrive sceptical that leaving DXB is even possible. This
 * answers "is this for me" in a few seconds, and each card hands the visitor a
 * pre-selected duration by calling the same bookDuration() every other booking
 * control uses — so it scrolls to #book with the right tour already chosen.
 */
export default function ForYou() {
  const { bookDuration } = useBooking()

  return (
    <section id={SECTION.forYou} className="bg-white">
      <div className="mx-auto max-w-wrap px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Is this you?"
            title={
              <>
                Six kinds of traveler.
                <br />
                One very good use of a layover.
              </>
            }
            lead="Pick the one that sounds like you and we'll take you straight to the tour that usually fits."
          />
        </Reveal>

        <Reveal className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRAVELER_PROFILES.map((profile) => (
            <button
              key={profile.id}
              type="button"
              onClick={() => bookDuration(profile.hours)}
              className="flex items-start gap-4 rounded-3xl border border-line bg-sand-50 p-5 text-left transition hover:-translate-y-1 hover:border-gold-400 hover:bg-white hover:shadow-card"
            >
              <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-white text-gold-600 shadow-card">
                <Icon name={profile.icon} className="text-lg" />
              </span>
              <span className="min-w-0">
                <span className="block font-display font-semibold">
                  {profile.title}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-soft">
                  {profile.body}
                </span>
                <span className="mt-2.5 block text-xs font-semibold text-gold-700">
                  Recommended: {profile.hours}-hour {profile.tourName} ·{' '}
                  {/* nowrap keeps the arrow with the price instead of orphaning
                      it onto a line of its own */}
                  <span className="whitespace-nowrap">
                    {usd(priceFor(profile.hours))}{' '}
                    <Icon name="arrow-right" className="text-[10px]" />
                  </span>
                </span>
              </span>
            </button>
          ))}

          {/* Accessibility card spans the full row — it is a different kind of
              question from "which tour", so it gets its own treatment. */}
          <div className="rounded-3xl border border-gold-100 bg-gold-50 p-5 sm:col-span-2 lg:col-span-3">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-white text-gold-600 shadow-card">
                <Icon name={ACCESSIBILITY_CARD.icon} className="text-lg" />
              </span>
              <p className="text-sm leading-relaxed text-ink sm:flex-1">
                <strong className="font-display font-semibold">
                  {ACCESSIBILITY_CARD.title}
                </strong>{' '}
                <span className="text-ink-soft">{ACCESSIBILITY_CARD.body}</span>
              </p>
              <a
                href={mailtoLink(
                  ACCESSIBILITY_CARD.mailSubject,
                  ACCESSIBILITY_CARD.mailBody,
                )}
                className="link-arrow flex-shrink-0 transition"
              >
                <Icon name="envelope" className="text-base" />
                {ACCESSIBILITY_CARD.linkLabel}
                <Icon name="arrow-right" className="text-xs" />
              </a>
            </div>
          </div>
        </Reveal>

        <SectionCta cta={SECTION_CTAS.forYou} />
      </div>
    </section>
  )
}
