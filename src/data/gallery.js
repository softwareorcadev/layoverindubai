/**
 * The attractions mosaic: 12 tiles, every one of them now carrying the
 * client's own photography.
 *
 * It used to be two stock photos and ten gradient-and-icon tiles, two of which
 * carried TODOs saying the original page had illustrated "Dubai Marina" with
 * the Burj Al Arab and "Dubai desert" with a green Scottish hillside. Those
 * are both fixed here, from source material that is actually Dubai.
 *
 * `imageKey` points at data/images.js; the `gradient` stays on every tile even
 * once it has a photo, because it is what hideOnError reveals if a file fails.
 * `span` / `minH` reproduce the original mosaic's asymmetric layout exactly.
 *
 * Two tiles changed subject, both because the photography and the itineraries
 * pointed the same way:
 *   • "Atlantis, The Palm" → the abra crossing. Atlantis is already the
 *     subject of the Palm Jumeirah photo next to it, and the abra ride is a
 *     stop in five of the nine itineraries rather than a drive-by.
 *   • "Dubai Desert" → the Dubai Fountain. The desert is an optional add-on
 *     on the 10-hour tour only; the fountain is timed into the 4h and 6h
 *     routes and is the strongest evening image in the delivery. The desert
 *     still appears in the itineraries and the footer.
 *
 * `subtitle` copy is largely the client's own, lifted from the carousel each
 * photo came from — "Photo Stop, Skyline Views, Walk, Guided Tour" and so on.
 *
 * `sizes` is set only where a tile is not a quarter-width grid cell; the
 * default in GalleryTile covers the rest.
 */

export const GALLERY_TILES = Object.freeze([
  {
    id: 'burj-khalifa',
    title: 'Burj Khalifa',
    subtitle: "The world's tallest building",
    imageKey: 'burjKhalifa',
    span: 'col-span-2 row-span-2',
    sizes: '(min-width: 768px) 50vw, 100vw',
    gradient: 'from-[#2b3a58] to-[#141b2a]',
    minH: 'min-h-[19rem] sm:min-h-[24rem]',
    large: true,
  },
  {
    id: 'palm-jumeirah',
    title: 'Palm Jumeirah & Atlantis',
    subtitle: 'Photo stop, scenic views, walk',
    imageKey: 'palmJumeirah',
    gradient: 'from-[#0f4c5c] to-[#0a2a33]',
  },
  {
    id: 'abra-ride',
    title: 'Abra ride on Dubai Creek',
    subtitle: 'Boat ride, creek breeze, photo stop',
    imageKey: 'abraRide',
    gradient: 'from-[#155e75] to-[#0b3240]',
  },
  {
    id: 'dubai-marina',
    title: 'Dubai Marina',
    subtitle: 'Waterfront skyline & canal cruise',
    imageKey: 'dubaiMarina',
    gradient: 'from-[#3a3050] to-[#181226]',
  },
  {
    id: 'museum-of-the-future',
    title: 'Museum of the Future',
    subtitle: 'Photo stop, guided tour, walk',
    imageKey: 'museumOfTheFuture',
    gradient: 'from-[#4a4458] to-[#1e1a28]',
  },
  {
    id: 'al-fahidi',
    title: 'Old Dubai · Al Fahidi',
    subtitle: 'Wind towers & heritage lanes',
    imageKey: 'alFahidi',
    gradient: 'from-[#6b5327] to-[#2c2210]',
  },
  {
    id: 'gold-souk',
    title: 'Gold Souk',
    subtitle: 'Browse gold, haggle, wander',
    imageKey: 'goldSouk',
    gradient: 'from-[#8a6a1f] to-[#3a2c0c]',
  },
  {
    id: 'spice-souk',
    title: 'Spice Souk',
    subtitle: 'Saffron, oud & frankincense',
    imageKey: 'spiceSouk',
    gradient: 'from-[#7a4520] to-[#331c0c]',
  },
  {
    /* A tall single-column slot rather than the original's wide col-span-2:
       this is the one portrait crop in the set, and a 544x184 banner would
       reduce the sail tower to an unrecognisable horizontal band. Spanning two
       rows in one column gives it a ~0.72 slot that matches the photo, and it
       also fills the cell the original mosaic left empty on this row. */
    id: 'burj-al-arab',
    title: 'Burj Al Arab',
    subtitle: 'The seven-star sail on the shore',
    imageKey: 'burjAlArab',
    span: 'row-span-2',
    sizes: '(min-width: 768px) 25vw, 50vw',
    gradient: 'from-[#1c4d63] to-[#0c2531]',
    minH: 'min-h-[19rem] sm:min-h-[24rem]',
  },
  {
    id: 'dubai-frame',
    title: 'Dubai Frame',
    subtitle: 'Old & new city in one view',
    imageKey: 'dubaiFrame',
    gradient: 'from-[#4f5a2c] to-[#212612]',
  },
  {
    id: 'ain-dubai',
    title: 'Bluewaters & Ain Dubai',
    subtitle: "250m up, 360° over the city",
    imageKey: 'ainDubai',
    gradient: 'from-[#28546b] to-[#102734]',
  },
  {
    id: 'dubai-fountain',
    title: 'The Dubai Fountain',
    subtitle: 'Music, light & water at dusk',
    imageKey: 'dubaiFountain',
    /* The fountain plays every 30 minutes into the evening, so the crowd and
       the low light are the point — keep the lower half of the frame. */
    objectPosition: 'object-bottom',
    gradient: 'from-[#8a6a3a] to-[#3d2d14]',
  },
])
