import { SECTION } from './site.js'

/**
 * Footer link columns.
 *
 * These carry real weight: removing the header nav means #packages,
 * #itineraries and #faq are otherwise reachable only by scrolling. This map is
 * the page's wayfinding, not decoration.
 */

export const FOOTER_POSITIONING =
  'Private layover and stopover city tours from Dubai International Airport, 24 hours a day.'

/** "What you'll see" column. */
export const SEE_LINKS = Object.freeze([
  { label: 'Burj Khalifa', href: `#${SECTION.gallery}` },
  { label: 'Old Dubai & the souks', href: `#${SECTION.gallery}` },
  { label: 'Palm Jumeirah', href: `#${SECTION.gallery}` },
  { label: 'Dubai Marina', href: `#${SECTION.gallery}` },
  { label: 'Dubai Frame', href: `#${SECTION.gallery}` },
  { label: 'Museum of the Future', href: `#${SECTION.gallery}` },
  { label: 'Desert safari', href: `#${SECTION.itineraries}` },
])

/** "Good to know" column. */
export const KNOW_LINKS = Object.freeze([
  { label: 'How it works', href: `#${SECTION.how}` },
  { label: "What's included", href: `#${SECTION.included}` },
  { label: 'Minutes from DXB', href: `#${SECTION.distance}` },
  { label: 'Which tour suits me', href: `#${SECTION.forYou}` },
  { label: 'Compare the options', href: `#${SECTION.compare}` },
  { label: 'FAQ', href: `#${SECTION.faq}` },
  { label: 'Guest video reviews', href: `#${SECTION.reviews}` },
  { label: 'Tours & prices', href: `#${SECTION.packages}` },
])

/**
 * Legal pages.
 *
 * TODO(owner): these pages do not exist yet, so each is rendered as plain
 * muted text rather than a link — a link to a 404 is worse than no link at
 * all. Supply the URLs and set `href` on each to turn them into links.
 */
export const LEGAL_LINKS = Object.freeze([
  { label: 'Terms & Conditions', href: null },
  { label: 'Privacy Policy', href: null },
  { label: 'Cancellation & Refund Policy', href: null },
])

export const FOOTER_FINE_PRINT =
  'Pickup from DXB Terminals 1, 2 & 3, Dubai Cruise Terminal and Dubai hotels · Prices in USD, payable by card or cash'

export const FOOTER_LEGAL_LINE =
  'All rights reserved. Private layover & stopover tours from Dubai International Airport.'
