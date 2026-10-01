import { useCallback, useMemo, useState } from 'react'
import { BookingContext } from './bookingContext.js'
import { DEFAULT_HOURS } from '../data/pricing.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { scrollToId } from '../lib/scrollToId.js'
import { SECTION } from '../data/site.js'

/**
 * Owns the one piece of state shared across the whole page.
 *
 * Replaces the original page's `window.state` global and `window.bookDuration`
 * function. Because `hours` lives here, the featured tour cards, the itinerary
 * rows, the "Is this you?" profile cards, the enquiry CTA templates and the
 * booking form all read a single value — the two-way sync the original page
 * did imperatively via paintChips()/updateSummary() is now structural.
 */
export default function BookingProvider({ children }) {
  const [hours, setHours] = useState(DEFAULT_HOURS)
  const reducedMotion = useReducedMotion()

  /**
   * Select a duration and take the visitor to the booking form.
   *
   * This is what every "Book Nh" control on the page calls. No focus timer:
   * the form is below the fold on most screens, so arriving at the top of the
   * section — rather than inside a field — is what reads as landing there.
   */
  const bookDuration = useCallback(
    (nextHours) => {
      setHours(nextHours)
      scrollToId(SECTION.book, reducedMotion)
    },
    [reducedMotion],
  )

  /**
   * Change the duration and STAY PUT.
   *
   * Only the tour-length dropdown inside the booking form uses this. Every
   * other writer goes through bookDuration(), because picking a tour anywhere
   * else on the page should carry you to the form. Scrolling to the form you
   * are already typing in would yank the page out from under the visitor.
   */
  const setDuration = useCallback((nextHours) => setHours(nextHours), [])

  const value = useMemo(
    () => ({
      hours,
      bookDuration,
      setDuration,
      reducedMotion,
    }),
    [hours, bookDuration, setDuration, reducedMotion],
  )

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  )
}
