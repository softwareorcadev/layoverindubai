import { createContext, useContext } from 'react'

/**
 * Shared booking state: the selected tour duration, the `bookDuration` action
 * that every "Book Nh" control on the page calls, and `setDuration`, which the
 * booking form's own dropdown uses to change the duration without scrolling.
 *
 * Party size is not here on purpose — it is asked for once, inside the booking
 * form, and nothing else on the page reacts to it.
 *
 * Deliberately a .js file with no JSX so oxlint's react/only-export-components
 * rule does not fire on exporting a hook alongside a component.
 */
export const BookingContext = createContext(null)

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) {
    throw new Error('useBooking must be used inside <BookingProvider>')
  }
  return ctx
}
