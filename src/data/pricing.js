/**
 * SINGLE SOURCE OF TRUTH FOR ALL PRICING.
 *
 * No price literal may appear anywhere else in the app. Every price string
 * in the UI — the featured cards, the itinerary rows, the "Is this you?"
 * profile cards, the booking panel's email fallback, the sticky bar and the
 * pre-filled email enquiries — derives from the helpers below.
 *
 * If these numbers change, the only other place that needs a manual edit is
 * the `priceRange` field of the JSON-LD block in index.html.
 */

/** First-traveller price in USD, keyed by tour duration in hours. */
export const PRICES = Object.freeze({
  2: 140,
  3: 180,
  4: 220,
  5: 260,
  6: 300,
  7: 340,
  8: 380,
  9: 420,
  10: 460,
})

/**
 * Every bookable duration, ascending.
 *
 * Now only read inside this file — by MIN_HOURS/MAX_HOURS and the DEV price
 * guard below — since the chip strips and footer duration links that iterated
 * it were removed. Still exported: it is the canonical list, not an accident.
 */
export const DURATIONS = Object.freeze([2, 3, 4, 5, 6, 7, 8, 9, 10])

/** Flat surcharge per traveller beyond the first. */
export const EXTRA_PER_GUEST = 10

/** One private vehicle seats this many travellers; 7+ is quoted by email. */
export const MAX_TRAVELERS = 6

/** Pre-selected duration on first load. */
export const DEFAULT_HOURS = 6

/** The duration marked "Most popular" across the page. */
export const POPULAR_HOURS = 6

export const MIN_HOURS = DURATIONS[0]
export const MAX_HOURS = DURATIONS[DURATIONS.length - 1]

/** First-traveller price for a duration. */
export function priceFor(hours) {
  return PRICES[hours]
}

/** Total for a duration and party size. */
export function totalFor(hours, travelers) {
  return PRICES[hours] + (travelers - 1) * EXTRA_PER_GUEST
}

/** `140` → `"$140"`. Whole dollars only — no cents anywhere on the page. */
export function usd(amount) {
  return `$${amount}`
}

/** `1` → `"1 traveler"`, `3` → `"3 travelers"`. */
export function pluralTravelers(n) {
  return `${n} traveler${n > 1 ? 's' : ''}`
}

// Optional-chained so this module can also be imported by plain Node (e.g. a
// verification script), where import.meta.env does not exist.
if (import.meta.env?.DEV) {
  console.assert(
    DURATIONS.map((h) => PRICES[h]).join(',') ===
      '140,180,220,260,300,340,380,420,460',
    'pricing.js has drifted from the agreed price list',
  )
  console.assert(
    totalFor(6, 6) === 350,
    'group pricing drifted: a 6-hour tour for six must total $350',
  )
}
