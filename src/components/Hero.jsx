import Icon from './shared/Icon.jsx'
import StarRating from './shared/StarRating.jsx'
import BoardingStub from './BoardingStub.jsx'
import { hideOnError } from '../lib/hideOnError.js'
import { useReveal } from '../hooks/useReveal.js'
import { useBooking } from '../context/bookingContext.js'
import { IMAGES } from '../data/images.js'
import { HERO_SHOWREEL } from '../data/videos.js'
import { SECTION, TRAVELERS_SERVED, VIDEO_REVIEW_COUNT } from '../data/site.js'

export default function Hero() {
  const bg = IMAGES.heroDowntownDusk
  const { reducedMotion } = useBooking()

  /* useReveal does double duty as the showreel's fetch gate, and it is the
     right hook precisely because the card is `hidden lg:block`: a
     display:none element never intersects, so phones never pull the MP4 at
     all, and on desktop the observer fires after first paint, keeping a ~2 MB
     video clear of the hero background's LCP. Threshold 0 because we want it
     the moment any part of the card exists, not once it is 12% visible. */
  const [cardRef, cardInView] = useReveal(0)
  const playShowreel = cardInView && !reducedMotion

  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Background photo over a gradient, so the section still reads if the
          image is slow or blocked. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c2433] via-[#151b26] to-[#101319]">
        <img
          src={bg.src}
          srcSet={bg.srcset}
          sizes="100vw"
          width={bg.width}
          height={bg.height}
          alt={bg.alt}
          className="hero-img h-full w-full object-cover opacity-60"
          onError={hideOnError}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
      </div>

      {/* pt clears the fixed header, which is two rows tall (up to 157px at
          375px, where the logo wraps) until the md breakpoint collapses it to
          one. The original's pt-32 was sized for a single-row header and the
          jump pills now push it past that. */}
      <div className="relative mx-auto max-w-wrap px-4 pb-16 pt-48 sm:px-6 md:pt-40 lg:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          {/* ── Copy column ─────────────────────────────────────────── */}
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-500/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-300">
              <Icon name="star" className="text-[10px]" /> 5-star rated ·{' '}
              {VIDEO_REVIEW_COUNT} video reviews
            </p>

            <h1 className="font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-[3.6rem]">
              Don&apos;t spend your layover
              <br className="hidden sm:block" /> inside the airport.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              See the Burj Khalifa, the old souks and the Palm on a{' '}
              <strong className="font-semibold text-white">private city tour</strong> —
              with airport pickup, flight tracking, and a{' '}
              <strong className="font-semibold text-white">
                guaranteed on-time return
              </strong>{' '}
              to DXB.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`#${SECTION.book}`}
                className="btn-gold inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-4 text-base font-semibold text-white shadow-gold"
              >
                Book Your Layover Tour <Icon name="arrow-right" className="text-sm" />
              </a>
              <a
                href={`#${SECTION.packages}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 px-7 py-4 text-base font-semibold text-white/90 transition hover:border-white/60 hover:text-white"
              >
                See tours &amp; pricing
              </a>
            </div>

            <p className="mt-4 flex items-center gap-2 text-sm text-white/60">
              <Icon name="shield-halved" className="text-gold-300" /> Free cancellation
              up to 24 hours before pickup · No payment needed to reserve
            </p>

            <BoardingStub />
          </div>

          {/* ── Visual card stack (desktop only) ────────────────────── */}
          <div className="relative hidden lg:block">
            <div
              ref={cardRef}
              className="relative ml-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-lux ring-1 ring-white/15"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2a3550] via-[#1b2334] to-[#0f1420]" />

              {/* Always mounted. It is what a reduced-motion visitor sees, what
                  paints while the MP4 downloads, and the gradient's escape
                  hatch if either file 404s. */}
              <img
                src={HERO_SHOWREEL.poster}
                width={HERO_SHOWREEL.width}
                height={HERO_SHOWREEL.height}
                alt={HERO_SHOWREEL.alt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                onError={hideOnError}
              />

              {playShowreel && (
                <video
                  src={HERO_SHOWREEL.src}
                  width={HERO_SHOWREEL.width}
                  height={HERO_SHOWREEL.height}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  /* Silent and decorative — everything it shows is already in
                     the copy column, so announcing it would only add noise,
                     for the same reason every Icon is aria-hidden. */
                  aria-hidden="true"
                  tabIndex={-1}
                  /* The autoplay policy reads the muted PROPERTY, not the
                     attribute. React sets the attribute during render, which
                     on some browsers lands after the element is first able to
                     play; this callback ref sets the property first. */
                  ref={(el) => {
                    if (el) el.muted = true
                  }}
                  onError={hideOnError}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

              {/* Replaces an invented pull quote attributed to "Sarah · London,
                  UK" that was never a real guest. The rating is the published
                  aggregate the RatingStrip links out to, and the traveller
                  count is the client's own published claim — neither is put in
                  the mouth of a person we cannot name. */}
              <div className="absolute right-4 top-4 max-w-[230px] rounded-2xl bg-white/95 p-3.5 shadow-card backdrop-blur">
                <StarRating
                  className="text-[11px] text-gold-500"
                  label="Rated 5 out of 5 stars"
                />
                <p className="mt-2 font-display text-[17px] font-bold leading-none text-ink">
                  {TRAVELERS_SERVED}
                  <span className="text-gold-500">+</span> travelers
                </p>
                <p className="mt-1 text-[11px] leading-snug text-ink-faint">
                  have turned a Dubai layover into a day out
                </p>
              </div>

              {/* Floating pickup status */}
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-ink/85 p-4 text-white shadow-card backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="relative grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-live/15 text-live">
                    <Icon name="car-side" />
                    <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-live ring-2 ring-ink/85" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">Your driver is waiting</p>
                    <p className="truncate text-xs text-white/60">
                      DXB Terminal 3 · Arrivals hall · Name board ready
                    </p>
                  </div>
                  <span className="ml-auto rounded-lg bg-white/10 px-2 py-1 text-[11px] font-semibold text-gold-300">
                    Now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
