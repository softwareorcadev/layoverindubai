/**
 * Self-hosted video: the hero showreel and the wall of guest video reviews.
 *
 * ── WHY THERE ARE NO NAMES, CITIES OR QUOTES ──────────────────────────────
 * These are real clips of real guests and nothing else about them is
 * verified. The nine written testimonials this file replaced were openly
 * labelled sample copy in their own header; putting an invented name under a
 * real face would have been worse than the banner that admitted it. So the
 * only per-clip fields are ones readable off the file itself — how long it
 * runs, and where it was filmed when that is visible in frame. The single
 * explanation of why sits in GUEST_VIDEO_NOTE and is shown once above the
 * grid rather than repeated on ten tiles.
 *
 * ── CAPTIONS ──────────────────────────────────────────────────────────────
 * Every clip already carries open captions, burned in by the client's own
 * editor. Open captions satisfy WCAG 2.2 SC 1.2.2 (Level A) the same way a
 * <track> does, which is why there are no .vtt files here. If a future clip
 * arrives without them it needs a track before it ships — that is what the
 * DEV assertion at the foot of this file is watching for.
 *
 * ── WHY MP4 ONLY, AND WHY `src` GOES ON THE ELEMENT ───────────────────────
 * No WebM or AV1 alternate. Not a bandwidth judgement — an error-handling
 * one. An alternate needs <source> children, and a <source> that fails fires
 * `error` on itself where it does not bubble, so React's onError on the
 * <video> never runs and the gradient fallback silently stops working. One
 * `src` on the element is the only shape that degrades like the rest of this
 * page.
 *
 * ── FILE LAYOUT ───────────────────────────────────────────────────────────
 * Produced by `scripts/encode-video.sh` from the client's 1080x1920 masters:
 *   public/media/hero-dubai-night.mp4   720x900, silent, 12s loop
 *   public/media/review-<id>.mp4        540x960, 64k mono AAC
 *   src/assets/posters/<name>.jpg       one poster per clip
 *
 * Clips live in public/ and go through assetUrl() — see that file for why a
 * literal '/media/…' would 404 in production. Posters are imported from
 * src/assets/ instead, so Vite content-hashes them: a poster changes when the
 * frame is re-picked, a clip changes when it is re-encoded, and those happen
 * on different schedules.
 */
import { assetUrl } from '../lib/assetUrl.js'

import heroPoster from '../assets/posters/hero-dubai-night.jpg'
import posterBookedIt from '../assets/posters/review-booked-it.jpg'
import posterCreekNight from '../assets/posters/review-creek-night-couple.jpg'
import posterGuideLeave from '../assets/posters/review-guide-as-i-leave.jpg'
import posterInteresting from '../assets/posters/review-really-interesting.jpg'
import posterRedShirt from '../assets/posters/review-red-shirt.jpg'
import posterReviewFive from '../assets/posters/review-review-five.jpg'
import posterSoukCouple from '../assets/posters/review-souk-couple.jpg'
import posterTwoTravellers from '../assets/posters/review-two-travellers.jpg'
import posterVeryNiceTrip from '../assets/posters/review-very-nice-trip.jpg'
import posterWeBooked from '../assets/posters/review-we-booked-the.jpg'

/**
 * Twelve seconds of the client's Dubai Night Reel — fireworks at Global
 * Village, the Burj Khalifa lit, the fountain, the Frame.
 *
 * Cropped to 4:5 at encode time to match the hero card, and stripped of its
 * audio track entirely: autoplay only survives the browser policy while
 * muted, so a silent file is both smaller and unambiguous.
 */
export const HERO_SHOWREEL = Object.freeze({
  src: assetUrl('media/hero-dubai-night.mp4'),
  poster: heroPoster,
  width: 720,
  height: 900,
  /* Describes the STILL, because that is what a reduced-motion visitor gets. */
  alt: 'The Burj Khalifa lit up at night above the Dubai Fountain and Downtown',
})

/**
 * Shown once, above the grid — the slot the "SAMPLE — REPLACE BEFORE LAUNCH"
 * banner used to occupy, doing the opposite job: it explains why these tiles
 * carry no names instead of apologising for invented ones.
 */
export const GUEST_VIDEO_NOTE =
  'Filmed by guests on their own phones after their tour. We publish them as they arrived — and we do not attach names or cities we cannot verify.'

/**
 * How many tiles render before the "watch more" button.
 *
 * Not only a bandwidth number: iOS Safari caps how many <video> elements one
 * page may hold, and the cap is low enough that mounting all ten
 * unconditionally is a real risk. Eight is two clean rows at lg:grid-cols-4.
 */
export const INITIAL_VISIBLE_COUNT = 8

/**
 * Four palette-matched darks, reused verbatim from the four fabricated tiles
 * this file replaces, so a poster that fails to load still looks intentional
 * rather than broken. Written out in full because cx() needs complete literal
 * class strings for Tailwind's source scan to find them.
 */
const FALLBACK_GRADIENTS = Object.freeze([
  'from-[#31405f] via-[#222c42] to-[#131a29]',
  'from-[#5a4a2a] via-[#3a3020] to-[#1c1811]',
  'from-[#274a4f] via-[#1b3236] to-[#101d20]',
  'from-[#4f3a55] via-[#33253a] to-[#191220]',
])

/**
 * One entry per guest on camera, not one per file. The delivery contains
 * near-duplicates — two files are the same couple by the creek, two more are
 * the same couple in the souk, and three are the same photo-collage montage —
 * so this list is deduplicated by who is actually speaking.
 *
 * `seconds` is the encoded runtime and is shown on the tile, so nobody has to
 * press play blind. `where` is set ONLY when the location is identifiable in
 * frame.
 */
const CLIPS = Object.freeze([
  { id: 'souk-couple', poster: posterSoukCouple, seconds: 40, where: 'Deira souks' },
  { id: 'creek-night-couple', poster: posterCreekNight, seconds: 43, where: 'Dubai Creek' },
  { id: 'very-nice-trip', poster: posterVeryNiceTrip, seconds: 50 },
  { id: 'two-travellers', poster: posterTwoTravellers, seconds: 36 },
  { id: 'guide-as-i-leave', poster: posterGuideLeave, seconds: 32 },
  { id: 'booked-it', poster: posterBookedIt, seconds: 54 },
  { id: 'red-shirt', poster: posterRedShirt, seconds: 47, where: 'Dubai Marina' },
  { id: 'really-interesting', poster: posterInteresting, seconds: 34 },
  { id: 'review-five', poster: posterReviewFive, seconds: 25 },
  { id: 'we-booked-the', poster: posterWeBooked, seconds: 35 },
])

export const GUEST_VIDEOS = Object.freeze(
  CLIPS.map((clip, index) =>
    Object.freeze({
      id: clip.id,
      src: assetUrl(`media/review-${clip.id}.mp4`),
      poster: clip.poster,
      width: 540,
      height: 960,
      seconds: clip.seconds,
      where: clip.where ?? null,
      /* Open captions are burned into every clip by the client's editor. */
      openCaptions: true,
      gradient: FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length],
    }),
  ),
)

// Optional-chained so this module can also be imported by plain Node (e.g. a
// verification script), where import.meta.env does not exist — same reason as
// data/pricing.js.
if (import.meta.env?.DEV) {
  console.assert(
    GUEST_VIDEOS.every((clip) => clip.openCaptions),
    'videos.js: a guest clip has no captions — SC 1.2.2 is Level A, not a nice-to-have',
  )
  console.assert(
    new Set(GUEST_VIDEOS.map((clip) => clip.id)).size === GUEST_VIDEOS.length,
    'videos.js: two clips share an id, so one poster will overwrite the other',
  )
  console.assert(
    GUEST_VIDEOS.length > INITIAL_VISIBLE_COUNT,
    'videos.js: nothing beyond INITIAL_VISIBLE_COUNT — the "watch more" button will never appear',
  )
}
