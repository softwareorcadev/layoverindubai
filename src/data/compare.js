/**
 * "Three ways to spend eight hours at DXB" — names the two real alternatives
 * to a private layover tour and wins against both.
 *
 * The group-bus column is deliberately generic and hedged ("often",
 * "typically"). Never name a competitor here.
 */

export const COMPARE_COLUMNS = Object.freeze([
  { id: 'terminal', title: 'Stay in the terminal', icon: 'hourglass-half' },
  { id: 'bus', title: 'A group bus tour', icon: 'van-shuttle' },
  {
    id: 'private',
    title: 'A private layover tour',
    icon: 'car-side',
    featured: true,
  },
])

/** One row per comparison dimension; values align to COMPARE_COLUMNS order. */
export const COMPARE_ROWS = Object.freeze([
  {
    label: 'Departs',
    values: ['—', 'at a fixed time you have to fit', 'when your flight actually lands'],
  },
  {
    label: "Who's with you",
    values: ['90,000 strangers', '20+ strangers', 'only your group'],
  },
  {
    label: 'The route',
    values: [
      'Concourse B',
      'fixed, the same for everyone',
      'rebuilt around what you want to see',
    ],
  },
  {
    label: 'Your luggage',
    values: [
      'paid storage, or dragged along',
      'often not allowed on board',
      'stays in the locked car with you',
    ],
  },
  {
    label: 'Getting back',
    values: [
      '—',
      'when the slowest passenger returns',
      'buffered to your departure, flight tracked live',
    ],
  },
  {
    label: "You'll remember",
    values: [
      'the departure board',
      'the coach window',
      'the day you actually saw Dubai',
    ],
  },
])
