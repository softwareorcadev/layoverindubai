/**
 * "What's included / not included" — answers the "what's the catch?" objection
 * that a bare price grid creates.
 *
 * TODO(owner): four of the included items need your confirmation before launch.
 * They are marked `confirm: true` below. If any is NOT actually included,
 * delete the line — do not soften it into something vague.
 *   • bottled water on board
 *   • fuel, Salik tolls and parking
 *   • child seat on request (free, or at a cost?)
 *   • gratuity policy wording
 */

export const INCLUDED = Object.freeze([
  'Private air-conditioned vehicle for your group only',
  'Licensed English-speaking driver-guide',
  'Meet & greet in DXB Terminal 1, 2 or 3 arrivals with a name board, any hour of the day or night',
  'Drop-off at your departure terminal',
  'Live flight tracking and itinerary adjustment',
  { text: 'Fuel, Salik tolls and parking', confirm: true },
  { text: 'Bottled water on board', confirm: true },
  'All route planning, timings and return buffers',
  'Luggage kept securely in the vehicle throughout',
  { text: 'Child seat on request', confirm: true },
])

export const NOT_INCLUDED = Object.freeze([
  'Attraction entry tickets — arranged for you, paid at official rates',
  'Meals and drinks outside the vehicle',
  'UAE entry or transit visa fees',
  'Personal shopping in the souks',
  { text: 'Guide gratuity — always optional, never expected', confirm: true },
])

/** The closing promise strip, under a dashed rule with the barcode motif. */
export const PROMISE_LINES = Object.freeze([
  'No commission shopping stops.',
  "No detours to a 'friend's' carpet shop.",
  'No group waiting on you.',
  'No surprise charges at the drop-off.',
])
