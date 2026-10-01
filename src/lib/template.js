import { priceFor } from '../data/pricing.js'

/**
 * Fill a CTA message template. `{H}` becomes the selected hours and
 * `{PRICE}` the matching first-traveller price, so every enquiry CTA
 * arrives pre-filled with whatever duration the visitor was looking at.
 */
export function fillTemplate(template, hours) {
  return template
    .replaceAll('{H}', String(hours))
    .replaceAll('{PRICE}', `$${priceFor(hours)}`)
}
