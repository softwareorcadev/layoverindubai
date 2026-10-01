import { SECTION } from './site.js'

/**
 * Every section's call-to-action, in one place, so the requirement "a CTA in
 * every section" is auditable at a glance.
 *
 * Rules baked into this table:
 *  • No button label is reused anywhere on the page.
 *  • Full-gold buttons never land on two adjacent sections, with one
 *    deliberate exception at the close (urgency band → booking form), which
 *    reads as a single crescendo.
 *  • The path alternates between "book now" (→ #book) and the lower-friction
 *    "email us", so a hesitant visitor always has a soft option.
 *  • Enquiry subjects are section-specific, which doubles as free lead
 *    attribution — the owner can see which section prompted the message.
 *    `{H}` and `{PRICE}` are filled from the visitor's selected duration in
 *    both the subject and the body.
 *
 * `skin` maps to the .btn-* classes in index.css.
 *
 * `tone` is the background of the SECTION this CTA sits in ('white' | 'sand' |
 * 'ink'), and SectionCta fills the band with the opposite light tone so it reads
 * as a distinct panel. Keep it in step with the section order in App.jsx — set
 * it to the section's own colour and the band's fill vanishes, leaving a bare
 * outline.
 */

export const SECTION_CTAS = Object.freeze({
  trust: {
    variant: 'inline',
    tone: 'sand',
    support:
      'Not sure your connection is long enough to leave the airport? Send us the two flight numbers.',
    label: 'Check my layover time',
    skin: 'mail',
    mail: {
      subject: 'Is my DXB layover long enough for a tour?',
      body: 'Hi Layover in Dubai!\n\nMy layover at DXB is about ___ hours on ___.\nArriving on flight ___, departing on flight ___.\n\nIs that enough time for a private tour?\n\n',
    },
  },

  forYou: {
    variant: 'band',
    tone: 'white',
    icon: 'compass',
    headline: 'Recognise yourself in one of those?',
    support:
      'Tell us which one you are and the route gets built around it — same price, better day.',
    label: 'Show me the tours',
    skin: 'outline',
    href: `#${SECTION.packages}`,
  },

  reviews: {
    variant: 'band',
    tone: 'sand',
    icon: 'video',
    headline: 'You could be filming one of these next week.',
    support:
      "Send your flight times and we'll build the route. Free to reserve, free to cancel up to 24 hours before pickup.",
    label: 'Reserve my Dubai tour',
    skin: 'gold',
    href: `#${SECTION.book}`,
  },

  why: {
    variant: 'band',
    tone: 'white',
    icon: 'comments',
    headline: 'Still weighing it up?',
    support:
      'A real person answers — usually within a few hours, day or night, Dubai time.',
    label: 'Email your question',
    skin: 'mail',
    mail: {
      subject: 'Question before booking a layover tour',
      body: 'Hi Layover in Dubai!\n\nI have a question about your private layover tours before I book:\n\n',
    },
  },

  included: {
    variant: 'band',
    tone: 'sand',
    icon: 'receipt',
    headline: 'No hidden extras, no surprise line items.',
    support:
      'One price covers the vehicle, the driver-guide and both airport transfers. Everything optional stays optional.',
    label: 'See what each tour costs',
    skin: 'outline',
    href: `#${SECTION.packages}`,
  },

  packages: {
    variant: 'link',
    support: "Not sure how much time you'll actually have on the ground?",
    label: 'Check my flight times by email',
    icon: 'envelope',
    mail: {
      subject: 'Does the {H}-hour tour fit my DXB layover?',
      body: "Hi Layover in Dubai!\n\nI land at DXB on ___ and my next flight departs at ___.\nI'm looking at the {H}-hour tour ({PRICE}) — does it fit?\n\n",
    },
  },

  itineraries: {
    variant: 'band',
    tone: 'sand',
    icon: 'route',
    headline: "Can't see your exact layover?",
    support:
      "Send your arrival and departure times and we'll draft an itinerary to the minute — free, no booking needed.",
    label: 'Get a free itinerary',
    skin: 'mail',
    mail: {
      subject: 'Free itinerary request for my DXB layover',
      body: 'Hi Layover in Dubai!\n\nI land at DXB at ___ and depart at ___ on ___.\nCould you draft an itinerary for me?\n\n',
    },
  },

  distance: {
    variant: 'inline',
    tone: 'ink',
    support:
      '10 minutes to the souks. 15 to the Burj Khalifa. Your gate is closer than you think.',
    label: 'See what fits my hours',
    skin: 'outline-light',
    href: `#${SECTION.itineraries}`,
  },

  gallery: {
    variant: 'band',
    tone: 'white',
    icon: 'map-pin',
    headline: "Pick your three. We'll do the rest.",
    support:
      'Tell your guide which of these matter most and the route is built around them — the rest is drive-by and stories.',
    label: 'Pick my stops',
    skin: 'outline',
    href: `#${SECTION.book}`,
  },

  how: {
    variant: 'band',
    tone: 'ink',
    icon: 'paper-plane',
    headline: 'Step one takes about two minutes.',
    support:
      "Your flight numbers and a date are enough to get started — we'll come back with the plan.",
    label: 'Start with step 1',
    skin: 'outline-light',
    href: `#${SECTION.book}`,
  },

  compare: {
    variant: 'band',
    tone: 'sand',
    icon: 'plane-departure',
    headline: 'Eight hours in a terminal, or eight hours in Dubai.',
    support:
      'Same layover, wildly different memory. And the private option is the only one that bends around your flight.',
    label: 'Get me out of the terminal',
    skin: 'gold',
    href: `#${SECTION.book}`,
  },

  faq: {
    variant: 'band',
    tone: 'white',
    icon: 'circle-question',
    headline: "Question we haven't answered?",
    support:
      'Ask it directly — no bots, no ticket numbers, no waiting until Dubai office hours.',
    label: 'Ask your own question',
    skin: 'mail',
    mail: {
      subject: "Something that isn't in your FAQ",
      body: "Hi Layover in Dubai!\n\nI couldn't find this in your FAQ:\n\n",
    },
    secondary: {
      label: 'Jump to the booking widget',
      href: `#${SECTION.book}`,
    },
  },

  book: {
    variant: 'link',
    support: 'Prefer to talk it through first?',
    label: 'Message us instead',
    icon: 'envelope',
    tone: 'ink',
    mail: {
      subject: 'Booking a {H}-hour Dubai layover tour',
      body: "Hi Layover in Dubai!\n\nI'd rather just chat before booking online.\nI'm interested in the {H}-hour tour ({PRICE}).\n\n",
    },
  },
})
