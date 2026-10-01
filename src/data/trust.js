/** The trust bar: a headline claim, four stats and five reassurance badges. */

/**
 * The client's own published claim, shown verbatim above the stat grid.
 *
 * Kept as its own export rather than folded into STATS for two reasons: the
 * grid is sm:grid-cols-4, so a fifth stat would orphan itself on a second row;
 * and this is a sentence in the client's voice, not a countable figure with a
 * label under it. The exclamation mark is theirs — rewording someone's own
 * published claim is its own kind of editorialising.
 */
export const TRUST_HEADLINE =
  'Join over 10,000 travelers who turned their layover into a Dubai adventure!'

/**
 * `accent` is the character rendered in gold after the number.
 *
 * TODO(owner): the fourth stat ("0 missed flights") is an unverifiable
 * absolute. Keep it only if you will stand behind it publicly; the softer
 * alternative is value '100', accent '%', label 'On-time returns — every
 * single tour'.
 */
export const STATS = Object.freeze([
  {
    value: '1,000',
    accent: '+',
    label: 'Video reviews from real travelers',
  },
  {
    value: '5',
    accent: '★',
    label: 'Rated by travelers on Facebook',
  },
  {
    value: '100',
    accent: '%',
    label: 'Private — only your group',
  },
  {
    value: '0',
    accent: null,
    label: 'Missed flights — on-time return, always',
  },
])

export const TRUST_BADGES = Object.freeze([
  // The platform mark keeps its own colour (Facebook blue); the rest are gold,
  // as on the original page.
  {
    icon: 'facebook',
    variant: 'brands',
    label: 'Facebook Reviews',
    iconClass: 'text-base text-[#1877F2]',
  },
  { icon: 'star', label: '5.0 average traveler rating', iconClass: 'text-gold-500' },
  { icon: 'id-badge', label: 'Licensed local guides', iconClass: 'text-gold-500' },
  {
    icon: 'plane-arrival',
    label: 'Pickup at Terminals 1 · 2 · 3',
    iconClass: 'text-gold-500',
  },
  { icon: 'children', label: 'Safe for families', iconClass: 'text-gold-500' },
])
