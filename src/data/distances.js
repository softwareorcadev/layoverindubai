/**
 * "Minutes from your gate" — the single most persuasive fact on the page, and
 * the reason a two-hour layover is enough for something real. The original page
 * buried it in one clause of the gallery intro.
 *
 * TODO(owner): sanity-check these six figures against your actual operating
 * experience. They are presented as typical off-peak drive times from DXB.
 */

export const DISTANCES = Object.freeze([
  { place: 'Gold Souk & Deira', minutes: 10 },
  { place: 'Al Fahidi & Dubai Creek', minutes: 12 },
  { place: 'Dubai Frame', minutes: 12 },
  { place: 'Burj Khalifa & Dubai Mall', minutes: 15 },
  { place: 'Burj Al Arab & Jumeirah Beach', minutes: 25 },
  { place: 'Palm Jumeirah & Marina', minutes: 30 },
])

export const DISTANCE_FOOTNOTE =
  "Typical off-peak drive times from DXB. Your guide plans around live traffic — that's what the return buffer is for."
