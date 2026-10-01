/**
 * The four featured tour cards. Prices are NOT stored here — they are looked
 * up from data/pricing.js by `hours`, so the two can never disagree.
 */

export const FEATURED_PACKAGES = Object.freeze([
  {
    hours: 4,
    kicker: 'Classic Dubai',
    bullets: [
      'Old Dubai souks & abra ride',
      'Burj Khalifa & Dubai Mall',
      'Dubai Frame photo stop',
      'Jumeirah Mosque drive-by',
    ],
  },
  {
    hours: 5,
    kicker: 'Best of Dubai',
    bullets: [
      'Everything in Classic Dubai',
      'Burj Al Arab photo stop',
      'Palm Jumeirah & Atlantis',
      'Dubai Marina walk',
    ],
  },
  {
    hours: 6,
    kicker: 'Signature Dubai',
    featured: true,
    badge: 'Most popular',
    bullets: [
      'Everything in Best of Dubai',
      '1 attraction visit of your choice*',
      'Timed for the Dubai Fountain show',
      'Unhurried photo & coffee stops',
    ],
    footnote:
      '*Burj Khalifa At the Top, Dubai Frame, Museum of the Future or The View at The Palm — tickets arranged for you.',
  },
  {
    hours: 7,
    kicker: 'Complete Dubai',
    bullets: [
      'Everything in Signature Dubai',
      'Jumeirah Beach break',
      'Bluewaters & Ain Dubai',
      'Relaxed café or lunch stop',
    ],
  },
])
