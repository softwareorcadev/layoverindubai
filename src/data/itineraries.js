/**
 * The nine itinerary accordions, 2h–10h. Titles carry no price — it is looked
 * up from data/pricing.js by `hours`.
 *
 * A bullet is `{ text, icon?, suffix? }`. `icon` defaults to 'location-dot'.
 * `suffix` renders in muted type after the text (used for the 6h "or" chain).
 * The 2h entry uses `groups` (two side-by-side options) instead of `bullets`.
 */

export const ITINERARIES = Object.freeze([
  {
    hours: 2,
    title: 'Dubai Express',
    teaser: 'Choose one side of the city: Old Dubai or New Dubai',
    bestFor: 'a fast taste of Dubai on a tight connection.',
    groups: [
      {
        icon: 'archway',
        label: 'Option A · Old Dubai',
        bullets: [
          { text: 'Al Fahidi Historical District' },
          { text: 'Abra boat ride across Dubai Creek' },
          { text: 'Gold Souk' },
          { text: 'Spice Souk' },
        ],
      },
      {
        icon: 'city',
        label: 'Option B · New Dubai',
        bullets: [
          { text: 'Zabeel Palace photo stop' },
          { text: 'Dubai Frame' },
          { text: 'Burj Khalifa & Dubai Mall' },
          { text: 'Dubai Fountain' },
        ],
      },
    ],
  },
  {
    hours: 3,
    title: 'Old Meets New',
    teaser: 'Souks & creek plus the modern icons in one sweep',
    bestFor: 'both faces of Dubai when time is short.',
    bullets: [
      { text: 'Al Fahidi Historical District' },
      { text: 'Abra ride on Dubai Creek' },
      { text: 'Gold Souk & Spice Souk' },
      { text: 'Dubai Frame photo stop' },
      { text: 'Burj Khalifa & Dubai Mall' },
      { text: 'Museum of the Future photo stop' },
    ],
  },
  {
    hours: 4,
    title: 'Classic Dubai',
    teaser: 'The essential city tour, unrushed',
    bestFor: 'first-timers who want the essentials done properly.',
    bullets: [
      { text: 'Al Fahidi & abra creek crossing' },
      { text: 'Gold Souk & Spice Souk' },
      { text: 'Jumeirah Mosque drive-by' },
      { text: 'Dubai Frame photo stop' },
      { text: 'Burj Khalifa & Dubai Mall' },
      { text: 'Dubai Fountain (show times permitting)' },
    ],
  },
  {
    hours: 5,
    title: 'Best of Dubai',
    teaser: 'Classic Dubai plus the coast: Burj Al Arab, Palm & Marina',
    bestFor: 'the full postcard — desert-city icons and the coastline.',
    bullets: [
      { text: 'Everything in Classic Dubai (4h)' },
      { text: 'Burj Al Arab photo stop' },
      { text: 'Palm Jumeirah drive & Atlantis' },
      { text: 'Dubai Marina waterfront walk' },
    ],
  },
  {
    hours: 6,
    title: 'Signature Dubai',
    badge: 'Most popular',
    featured: true,
    teaser: 'Best of Dubai plus one attraction visit of your choice',
    bestFor: 'the complete experience — most guests choose this one.',
    note: 'Attraction tickets are arranged for you and paid separately at official rates.',
    bullets: [
      { text: 'Everything in Best of Dubai (5h)' },
      { text: 'Burj Khalifa "At the Top"', icon: 'ticket', suffix: 'or' },
      { text: 'Dubai Frame sky deck', icon: 'ticket', suffix: 'or' },
      { text: 'Museum of the Future', icon: 'ticket', suffix: 'or' },
      { text: 'The View at The Palm', icon: 'ticket' },
      { text: 'Relaxed coffee & photo breaks', icon: 'mug-hot' },
    ],
  },
  {
    hours: 7,
    title: 'Complete Dubai',
    teaser: 'Signature Dubai plus beach time and Bluewaters',
    bestFor: 'feeling like a visitor, not a passenger in transit.',
    bullets: [
      { text: 'Everything in Signature Dubai (6h)' },
      { text: 'Jumeirah Beach break' },
      { text: 'Bluewaters Island & Ain Dubai' },
      { text: 'Café or lunch stop (your pace)', icon: 'mug-hot' },
    ],
  },
  {
    hours: 8,
    title: 'Dubai in Depth',
    teaser: "The full city plus Deira's markets and a proper meal stop",
    bestFor: 'long daytime layovers with room to breathe.',
    bullets: [
      { text: 'Everything in Complete Dubai (7h)' },
      { text: 'Deira souks deep-dive' },
      { text: 'Dubai Creek waterfront' },
      { text: 'Sit-down lunch or dinner stop', icon: 'utensils' },
      { text: 'Optional 2nd attraction visit', icon: 'ticket' },
    ],
  },
  {
    hours: 9,
    title: 'Ultimate Layover',
    teaser: 'Two attraction visits, beach time and zero rushing',
    bestFor: 'turning a long layover into a full Dubai day.',
    bullets: [
      { text: 'Everything in Dubai in Depth (8h)' },
      { text: 'Second attraction of your choice', icon: 'ticket' },
      { text: 'Extended Jumeirah Beach time', icon: 'umbrella-beach' },
      { text: 'Evening: fountain & skyline lights', icon: 'moon' },
    ],
  },
  {
    hours: 10,
    title: 'Complete Dubai Experience',
    teaser: 'The whole city — with an optional desert safari finale',
    bestFor: 'seeing skyline, souks, sea — and sand dunes — in one layover.',
    bullets: [
      { text: 'Everything in Ultimate Layover (9h)' },
      { text: 'Optional desert safari add-on', icon: 'hill-rockslide' },
      {
        text: 'Burj Khalifa, Frame, Museum of the Future or The View',
        icon: 'ticket',
      },
      { text: 'Unhurried meal stops', icon: 'utensils' },
    ],
  },
])
