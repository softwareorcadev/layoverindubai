import Icon from './shared/Icon.jsx'
import Reveal from './shared/Reveal.jsx'
import RouteStrip from './shared/RouteStrip.jsx'
import SectionCta from './shared/SectionCta.jsx'
import BookingForm from './BookingForm.jsx'
import { SECTION_CTAS } from '../data/sectionCtas.js'
import { SECTION } from '../data/site.js'

/**
 * What we promise beside the form.
 *
 * Every line here must stay true of the real checkout. The 24-hour
 * cancellation line is a commitment the owner honours by hand in the Stripe
 * dashboard — there is no automatic refund — so do not sharpen it into
 * something that sounds self-service.
 */
const PROMISES = [
  'Free cancellation up to 24 hours before pickup',
  'Instant confirmation — the details land in your inbox straight away',
  'Secure checkout by Stripe — your card details never touch this site',
]

export default function Booking() {
  return (
    <section
      id={SECTION.book}
      className="relative overflow-hidden bg-ink text-white"
    >
      <div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-wrap px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          {/* ── Emotional close ─────────────────────────────────────── */}
          <Reveal className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300">
              Final boarding call
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.1] sm:text-5xl">
              Don&apos;t waste your
              <br />
              Dubai layover.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">
              Turn a few hours between flights into unforgettable memories. Book your
              private Dubai tour today — you may never get this exact chance again.
            </p>

            <div className="mt-8 max-w-md space-y-3.5">
              {PROMISES.map((promise) => (
                <p
                  key={promise}
                  className="flex items-center gap-3 text-sm text-white/80"
                >
                  <Icon name="circle-check" className="text-gold-300" />
                  {promise}
                </p>
              ))}
            </div>

            <div className="mt-9 hidden max-w-md items-center gap-2 rounded-2xl border border-white/10 bg-white/[.06] p-4 lg:flex">
              <RouteStrip size="sm" dashClass="border-white/30" />
              <span className="ml-3 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-gold-300">
                On time
              </span>
            </div>

            <div className="max-w-md">
              <SectionCta cta={SECTION_CTAS.book} />
            </div>
          </Reveal>

          {/* ── Booking form ────────────────────────────────────────── */}
          <Reveal className="min-w-0">
            <BookingForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
