/**
 * Photography, centralised so it can be swapped in one place.
 *
 * ── WHERE THESE COME FROM ─────────────────────────────────────────────────
 * All of it is the client's own material. `scripts/extract-stills.sh` pulls
 * each one out of the Instagram carousels they supplied — every page of those
 * PDFs is a single flat 1080x1350 JPEG, so `pdfimages -j` copies the bytes out
 * with no recompression — then crops away the brand wordmark and the headline
 * baked into the upper third, and emits two width rungs.
 *
 * The bulk of the set comes from two carousels that are a matched pair of
 * itinerary storyboards, New Dubai and Old Dubai, shot and graded together.
 * That is why the mosaic reads as one photo essay rather than a stock grab
 * bag — and it replaces three Unsplash photographs that were never the
 * client's tours to show.
 *
 * ── HONESTY ───────────────────────────────────────────────────────────────
 * These are landmark photographs, and the alt text below says so. None of
 * them is a documentary photograph of a specific guest's tour, and none is
 * captioned as if it were. Some pages elsewhere in the delivery are visibly
 * AI-composited; none of those are used here.
 *
 * ── SHAPE ─────────────────────────────────────────────────────────────────
 *   { src, srcset?, width, height, alt }
 *
 * `width`/`height` are the intrinsic dimensions of `src` and every <img> sets
 * them, so the browser reserves the space and the page does not shift.
 *
 * `srcset` is a candidate list only — deliberately no `sizes`. `sizes`
 * describes the SLOT, not the file: the same photograph is 100vw in the hero
 * and a quarter of the grid in the mosaic, so it belongs at the call site.
 * An entry with no `srcset` still renders correctly from `src` alone, which is
 * what the one portrait crop below relies on.
 */

/* Two rungs per photo. 540 covers every mosaic tile even at 2x DPR; 1080
   covers the hero and the two large tiles. */
import abraRide1080 from '../assets/stills/abra-ride-1080.jpg'
import abraRide540 from '../assets/stills/abra-ride-540.jpg'
import ainDubai1080 from '../assets/stills/ain-dubai-1080.jpg'
import ainDubai540 from '../assets/stills/ain-dubai-540.jpg'
import alFahidi1080 from '../assets/stills/al-fahidi-1080.jpg'
import alFahidi540 from '../assets/stills/al-fahidi-540.jpg'
import burjAlArab from '../assets/stills/burj-al-arab-1080.jpg'
import burjKhalifa1080 from '../assets/stills/burj-khalifa-1080.jpg'
import burjKhalifa540 from '../assets/stills/burj-khalifa-540.jpg'
import dubaiFountain1080 from '../assets/stills/dubai-fountain-1080.jpg'
import dubaiFountain540 from '../assets/stills/dubai-fountain-540.jpg'
import dubaiFrame1080 from '../assets/stills/dubai-frame-1080.jpg'
import dubaiFrame540 from '../assets/stills/dubai-frame-540.jpg'
import dubaiMarina1080 from '../assets/stills/dubai-marina-1080.jpg'
import dubaiMarina540 from '../assets/stills/dubai-marina-540.jpg'
import goldSouk1080 from '../assets/stills/gold-souk-1080.jpg'
import goldSouk540 from '../assets/stills/gold-souk-540.jpg'
import heroDusk1080 from '../assets/stills/hero-downtown-dusk-1080.jpg'
import heroDusk540 from '../assets/stills/hero-downtown-dusk-540.jpg'
import museumFuture1080 from '../assets/stills/museum-of-the-future-1080.jpg'
import museumFuture540 from '../assets/stills/museum-of-the-future-540.jpg'
import palmJumeirah1080 from '../assets/stills/palm-jumeirah-1080.jpg'
import palmJumeirah540 from '../assets/stills/palm-jumeirah-540.jpg'
import spiceSouk1080 from '../assets/stills/spice-souk-1080.jpg'
import spiceSouk540 from '../assets/stills/spice-souk-540.jpg'

/** `{540: url, 1080: url}` → `"url 540w, url 1080w"`. */
const rungs = (small, large) => `${small} 540w, ${large} 1080w`

export const IMAGES = Object.freeze({
  /* Hero background: Downtown at dusk, the fountain running below the Burj
     Khalifa. Chosen because the hero band is ink-dark and the copy promises
     exactly this view. */
  heroDowntownDusk: {
    src: heroDusk1080,
    srcset: rungs(heroDusk540, heroDusk1080),
    width: 1080,
    height: 644,
    alt: 'The Dubai Fountain lit at dusk below the Burj Khalifa and the Downtown Dubai skyline',
  },
  burjKhalifa: {
    src: burjKhalifa1080,
    srcset: rungs(burjKhalifa540, burjKhalifa1080),
    width: 1080,
    height: 830,
    alt: 'The Burj Khalifa rising above Downtown Dubai, seen from the air',
  },
  dubaiFountain: {
    src: dubaiFountain1080,
    srcset: rungs(dubaiFountain540, dubaiFountain1080),
    width: 1080,
    height: 680,
    alt: 'Crowds watching the Dubai Fountain jets lit against the Downtown skyline',
  },
  palmJumeirah: {
    src: palmJumeirah1080,
    srcset: rungs(palmJumeirah540, palmJumeirah1080),
    width: 1080,
    height: 830,
    alt: 'Atlantis, The Palm seen from the air with the fronds of Palm Jumeirah behind it',
  },
  dubaiMarina: {
    src: dubaiMarina1080,
    srcset: rungs(dubaiMarina540, dubaiMarina1080),
    width: 1080,
    height: 860,
    alt: 'A wooden dhow on the water at Dubai Marina, ringed by high-rise towers',
  },
  museumOfTheFuture: {
    src: museumFuture1080,
    srcset: rungs(museumFuture540, museumFuture1080),
    width: 1080,
    height: 830,
    alt: 'The Museum of the Future, its steel torus covered in Arabic calligraphy',
  },
  dubaiFrame: {
    src: dubaiFrame1080,
    srcset: rungs(dubaiFrame540, dubaiFrame1080),
    width: 1080,
    height: 950,
    alt: 'The golden Dubai Frame at sunset with the city skyline showing through it',
  },
  ainDubai: {
    src: ainDubai1080,
    srcset: rungs(ainDubai540, ainDubai1080),
    width: 1080,
    height: 714,
    alt: 'Ain Dubai, the observation wheel on Bluewaters Island, at sunset',
  },
  alFahidi: {
    src: alFahidi1080,
    srcset: rungs(alFahidi540, alFahidi1080),
    width: 1080,
    height: 830,
    alt: 'A visitor walking a sand-coloured lane in the Al Fahidi historical district',
  },
  abraRide: {
    src: abraRide1080,
    srcset: rungs(abraRide540, abraRide1080),
    width: 1080,
    height: 830,
    alt: 'The bow of a wooden abra crossing Dubai Creek at golden hour, UAE flag flying',
  },
  spiceSouk: {
    src: spiceSouk1080,
    srcset: rungs(spiceSouk540, spiceSouk1080),
    width: 1080,
    height: 830,
    alt: 'Open sacks of spices and dried flowers at a Deira spice souk stall',
  },
  goldSouk: {
    src: goldSouk1080,
    srcset: rungs(goldSouk540, goldSouk1080),
    width: 1080,
    height: 740,
    alt: 'A shopper looking into a Gold Souk window filled with gold necklaces',
  },
  /* The only portrait crop, for the mosaic's one row-span-2 slot. Its source
     region is 450px wide, so there is no second rung to offer — scaling it up
     to 1080 would invent two thirds of the pixels. No `srcset` on purpose. */
  burjAlArab: {
    src: burjAlArab,
    width: 450,
    height: 760,
    alt: 'The sail-shaped Burj Al Arab hotel seen along the shoreline from Jumeirah Beach',
  },
})
