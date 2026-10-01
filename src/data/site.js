/** Business identity, contact channels and the page's section id registry. */

export const BRAND = 'Layover in Dubai'
export const TAGLINE = 'Private DXB Tours'

export const PHONE_DISPLAY = '+971 508 269 272'
export const PHONE_TEL = '+971508269272'
export const EMAIL = 'book@layoverindubai.com'

export const SITE_URL = 'https://www.layoverindubai.com/'
export const TESTIMONIALS_URL = 'https://www.layoverindubai.com/testimonials'
export const FACEBOOK_URL = 'https://www.facebook.com/layoverindubai/'
export const FACEBOOK_REVIEWS_URL =
  'https://www.facebook.com/layoverindubai/reviews'

/** Video reviews the owner already publishes. Used in copy, not as a rating. */
export const VIDEO_REVIEW_COUNT = '1,000+'

/**
 * Travellers served, as the client themselves publish it: their own caption
 * reads "Join over 10,000 travelers who turned their layover into a Dubai
 * adventure!". Kept unrounded and separate from VIDEO_REVIEW_COUNT so the two
 * cannot drift — 1,000+ filmed reviews out of 10,000+ travellers is a ~10%
 * filming rate, which is why the two figures read as consistent rather than
 * as two claims fighting.
 */
export const TRAVELERS_SERVED = '10,000'

/**
 * Build a mailto: link with a pre-filled subject and body.
 *
 * Every enquiry CTA on the page routes through here. Encoding happens here,
 * never in the caller — and encodeURIComponent (not URLSearchParams) is
 * deliberate: URLSearchParams encodes a space as `+`, which mail clients show
 * literally in the body.
 *
 * @param {string} subject shown in the mail client's subject line
 * @param {string} body    plain message body; newlines survive encoding
 */
export function mailtoLink(subject, body) {
  return (
    `mailto:${EMAIL}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  )
}

/** The header's generic "ask a question" link. */
export const ASK_MAIL_LINK = mailtoLink(
  'Question about a Dubai layover tour',
  "Hi Layover in Dubai!\n\nI'd like to ask about a layover tour.\n\n",
)

/**
 * Section ids, in page order. Referenced by the header jump pills, the CTA
 * targets and the footer link columns — keeping them here means a rename is
 * a one-line change instead of a grep across 20 files.
 */
export const SECTION = Object.freeze({
  top: 'top',
  trust: 'trust',
  forYou: 'foryou',
  reviews: 'reviews',
  why: 'why',
  included: 'included',
  packages: 'packages',
  itineraries: 'itineraries',
  distance: 'distance',
  gallery: 'gallery',
  how: 'how',
  compare: 'compare',
  faq: 'faq',
  book: 'book',
  contact: 'contact',
})
