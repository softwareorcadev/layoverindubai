import { useEffect, useRef } from 'react'
import Icon from './shared/Icon.jsx'
import { cx } from '../lib/cx.js'
import { useScrolledPast } from '../hooks/useScrolledPast.js'
import { useHeaderOffset } from '../hooks/useHeaderOffset.js'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { useBooking } from '../context/bookingContext.js'
import { BRAND, TAGLINE, SECTION, ASK_MAIL_LINK } from '../data/site.js'

/**
 * The two scroll-to controls that replaced the nav menu.
 *
 * These are the only navigation on the page. They render as bordered pills
 * rather than plain text links so they read as controls, not a menu.
 */
const JUMPS = [
  { id: SECTION.reviews, label: 'Video reviews', icon: 'circle-play' },
  { id: SECTION.packages, label: 'Tours & prices', icon: 'tag' },
]

/** Time for the smooth scroll to land before focus is moved into the section. */
const FOCUS_DELAY_MS = 600

export default function Header() {
  const scrolled = useScrolledPast(24)
  const active = useActiveSection(JUMPS.map((j) => j.id))
  const { reducedMotion } = useBooking()
  const headerRef = useRef(null)
  const focusTimer = useRef(0)

  // Keeps scroll-padding-top matched to the header's real height, which differs
  // between the one-row desktop bar and the two-row mobile bar.
  useHeaderOffset(headerRef)

  useEffect(() => () => window.clearTimeout(focusTimer.current), [])

  /**
   * Plain <a href="#id"> already does the scrolling (html has
   * scroll-behavior: smooth, and scroll-padding-top clears the header). This
   * only moves FOCUS into the destination, so keyboard and screen-reader users
   * land in the section instead of being left behind in the header.
   */
  const handleJump = (sectionId) => {
    const heading = document.getElementById(`${sectionId}-heading`)
    if (!heading) return
    window.clearTimeout(focusTimer.current)
    focusTimer.current = window.setTimeout(
      () => heading.focus({ preventScroll: true }),
      reducedMotion ? 0 : FOCUS_DELAY_MS,
    )
  }

  /**
   * `center` marks the mobile row, where the two pills share a two-column
   * grid. `.jump` sets white-space: nowrap, so without `min-w-0` on the anchor
   * and a truncating label the text spills out of its track and gives the
   * whole page a horizontal scrollbar on a narrow phone. The labels fit today;
   * this makes that not depend on the labels.
   */
  const renderJump = (jump, { center = false } = {}) => (
    <a
      key={jump.id}
      href={`#${jump.id}`}
      onClick={() => handleJump(jump.id)}
      aria-current={active === jump.id ? 'true' : undefined}
      className={cx(
        'jump',
        center && 'min-w-0 justify-center overflow-hidden',
        active === jump.id && 'is-active',
      )}
    >
      <Icon name={jump.icon} className="text-[10px] text-gold-300 shrink-0" />
      <span className={cx(center && 'truncate')}>{jump.label}</span>
    </a>
  )

  return (
    <header
      id="siteHeader"
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    >
      <div className="mx-auto max-w-wrap px-4 sm:px-6">
        <div
          id="headerBar"
          className={cx(
            'mt-3 rounded-2xl border border-white/10 backdrop-blur-md transition-colors duration-300',
            scrolled ? 'bg-ink/90 shadow-lux' : 'bg-ink/70',
          )}
        >
          {/* Row 1 — padding lives here, not on the bar, so the mobile
              divider below can span the bar's full width. */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-5">
            <a href={`#${SECTION.top}`} className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-500 text-white">
                <Icon name="plane-departure" className="text-sm" />
              </span>
              <span className="font-display text-[15px] font-semibold leading-tight text-white">
                {BRAND}
                <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-gold-300">
                  {TAGLINE}
                </span>
              </span>
            </a>

            <nav
              className="hidden items-center gap-1.5 md:flex"
              aria-label="Jump to section"
            >
              {JUMPS.map((jump) => renderJump(jump))}
            </nav>

            <div className="flex items-center gap-2.5">
              <a
                href={ASK_MAIL_LINK}
                className="hidden h-10 w-10 place-items-center rounded-xl border border-white/15 text-white/90 transition hover:border-gold-400 hover:text-gold-300 sm:grid"
                aria-label="Email us a question"
              >
                <Icon name="envelope" className="text-lg" />
              </a>
              <a
                href={`#${SECTION.book}`}
                className="btn-gold rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-gold sm:px-5"
              >
                Book Your Tour
              </a>
            </div>
          </div>

          {/* Row 2 — mobile only. At 360px there is no room for the logo, two
              labelled pills and a CTA on one line, so the bar splits into two
              rows divided by a dashed rule, which reads as a boarding stub. */}
          <nav
            className="grid grid-cols-2 gap-2 border-t border-dashed border-white/10 px-3 py-2.5 md:hidden"
            aria-label="Jump to section"
          >
            {JUMPS.map((jump) => renderJump(jump, { center: true }))}
          </nav>
        </div>
      </div>
    </header>
  )
}
