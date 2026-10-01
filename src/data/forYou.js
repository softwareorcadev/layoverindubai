/**
 * "Is this you?" — self-qualification cards.
 *
 * Transit travellers arrive sceptical that leaving the airport is even
 * possible. Each card answers "is this for me" in a few seconds and hands the
 * visitor a pre-selected duration by calling bookDuration(hours) — no new
 * logic, it reuses the same action every "Book Nh" button uses.
 *
 * `tourName` must match the itinerary/package name for that duration.
 */

export const TRAVELER_PROFILES = Object.freeze([
  {
    id: 'tight-connection',
    icon: 'stopwatch',
    title: 'The tight connection',
    body: 'Two or three hours on the ground and you assumed leaving was out of the question.',
    hours: 2,
    tourName: 'Dubai Express',
  },
  {
    id: 'night-arrival',
    icon: 'moon',
    title: 'The night arrival',
    body: 'You land at 1 AM with nowhere to be until sunrise. Dubai is still wide awake.',
    hours: 4,
    tourName: 'Classic Dubai',
  },
  {
    id: 'family',
    icon: 'children',
    title: 'The family with kids',
    body: 'Child seats, snack stops and a route that bends around nap time.',
    hours: 6,
    tourName: 'Signature Dubai',
  },
  {
    id: 'business',
    icon: 'briefcase',
    title: 'The business traveler',
    body: 'Quiet private car, no group waiting on you, back in time to change your shirt.',
    hours: 5,
    tourName: 'Best of Dubai',
  },
  {
    id: 'first-timers',
    icon: 'heart',
    title: 'The first-timers',
    body: "You've only ever seen Dubai in photos and you're not leaving without the Burj Khalifa.",
    hours: 6,
    tourName: 'Signature Dubai',
  },
  {
    id: 'long-haul',
    icon: 'hourglass-half',
    title: 'The long haul',
    body: 'Eight hours or more, and the lounge stopped being interesting about an hour ago.',
    hours: 9,
    tourName: 'Ultimate Layover',
  },
])

/** Full-width card below the grid. */
export const ACCESSIBILITY_CARD = Object.freeze({
  icon: 'wheelchair',
  title: 'Travelling with a wheelchair or limited mobility?',
  body: "We plan a step-free route and arrange a suitable vehicle — tell us what you need and we'll confirm honestly whether it works.",
  mailSubject: 'Step-free layover tour — accessibility request',
  mailBody:
    'Hi Layover in Dubai!\n\nI am travelling with ___ (wheelchair / limited mobility) and my layover at DXB is ___ hours.\n\nCan you arrange a suitable vehicle and a step-free route?\n\n',
  linkLabel: 'Tell us what you need',
})
