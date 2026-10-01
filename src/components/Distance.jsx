import Icon from './shared/Icon.jsx'
import Reveal from './shared/Reveal.jsx'
import SectionCta from './shared/SectionCta.jsx'
import { DISTANCES, DISTANCE_FOOTNOTE } from '../data/distances.js'
import { SECTION_CTAS } from '../data/sectionCtas.js'
import { SECTION } from '../data/site.js'

/**
 * "Minutes from your gate" — the most persuasive fact on the page, and the
 * reason a two-hour layover is enough for something real. The original buried
 * it in one clause of the gallery intro.
 *
 * Deliberately slim (py-12, no photography) so this ink band reads as a divider
 * between the sand and white sections around it rather than competing with the
 * gallery's dark tiles just below.
 */
export default function Distance() {
  return (
    <section id={SECTION.distance} className="bg-ink text-white">
      <div className="mx-auto max-w-wrap px-4 py-12 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300">
            Minutes from your gate
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold leading-tight sm:text-3xl">
            Everything on this page is 10–30 minutes from DXB.
          </h2>
          <p className="mt-3 text-sm text-white/70">
            That&apos;s the whole reason a two-hour layover is enough for something real.
          </p>
        </Reveal>

        {/* Desktop: nodes strung along a dashed route line, reusing the hero's
            boarding-pass motif. Mobile: a simple two-column grid of cells. */}
        <Reveal className="mt-10">
          <div className="relative hidden lg:block">
            <div
              className="absolute inset-x-0 top-[13px] border-t border-dashed border-white/25"
              aria-hidden="true"
            />
            <div className="relative flex items-start justify-between gap-3">
              <div className="flex flex-col items-center text-center">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gold-500 text-[10px] text-white">
                  <Icon name="plane-arrival" />
                </span>
                <p className="mt-2.5 font-display text-sm font-bold">DXB</p>
                <p className="text-[11px] text-white/50">You land here</p>
              </div>

              {DISTANCES.map((stop) => (
                <div
                  key={stop.place}
                  className="flex max-w-[9.5rem] flex-col items-center text-center"
                >
                  <span className="h-7 w-7 rounded-full border border-white/25 bg-ink" />
                  <p className="mt-2.5 font-display text-lg font-bold text-gold-300">
                    {stop.minutes} min
                  </p>
                  <p className="text-[11px] leading-snug text-white/70">{stop.place}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:hidden">
            {DISTANCES.map((stop) => (
              <div
                key={stop.place}
                className="rounded-2xl border border-white/10 bg-white/[.06] p-3"
              >
                <p className="font-display text-lg font-bold text-gold-300">
                  {stop.minutes} min
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-white/70">
                  {stop.place}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-6 text-center">
          <p className="text-[11px] text-white/45">{DISTANCE_FOOTNOTE}</p>
        </Reveal>

        <SectionCta cta={SECTION_CTAS.distance} />
      </div>
    </section>
  )
}
