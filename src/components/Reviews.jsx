import { useState } from 'react'
import Icon from './shared/Icon.jsx'
import Reveal from './shared/Reveal.jsx'
import SectionHeading from './shared/SectionHeading.jsx'
import SectionCta from './shared/SectionCta.jsx'
import GuestVideoCard from './GuestVideoCard.jsx'
import RatingStrip from './RatingStrip.jsx'
import {
  GUEST_VIDEOS,
  GUEST_VIDEO_NOTE,
  INITIAL_VISIBLE_COUNT,
} from '../data/videos.js'
import { SECTION_CTAS } from '../data/sectionCtas.js'
import { SECTION, VIDEO_REVIEW_COUNT } from '../data/site.js'

/**
 * The page's proof section, and the target of the header's first jump pill —
 * so its <h2> carries an id and is focusable.
 *
 * This used to be two sections. One was a carousel of four "video" tiles that
 * were really CSS gradients behind a decorative play button, all four linking
 * to the same index page. The other was a grid of nine written quotes whose
 * own data module labelled them ILLUSTRATIVE PLACEHOLDER TEXT. The pair
 * justified itself on being distinct in medium — video against written — and
 * that distinction died with the sample copy. Keeping two sections would have
 * meant inventing a difference between them.
 *
 * A grid rather than the old scroll-snap carousel: a carousel shows three
 * tiles and hides the rest, and volume is the whole argument here.
 *
 * Only the first INITIAL_VISIBLE_COUNT clips mount. That is not only bytes —
 * iOS Safari caps how many <video> elements a page may hold.
 */
export default function Reviews() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll
    ? GUEST_VIDEOS
    : GUEST_VIDEOS.slice(0, INITIAL_VISIBLE_COUNT)
  const hiddenCount = GUEST_VIDEOS.length - INITIAL_VISIBLE_COUNT

  return (
    <section id={SECTION.reviews} className="bg-sand-50">
      <div className="mx-auto max-w-wrap px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHeading
            id={`${SECTION.reviews}-heading`}
            focusable
            eyebrow="Guest video reviews"
            title={
              <>
                Watch travelers who almost
                <br />
                stayed at the gate.
              </>
            }
            lead={`${VIDEO_REVIEW_COUNT} guests have filmed a review after their tour — unscripted, straight off their phones. Here are ${GUEST_VIDEOS.length} of them.`}
          />
        </Reveal>

        <RatingStrip />

        {/* Sits exactly where the "SAMPLE — REPLACE BEFORE LAUNCH" banner did,
            doing the opposite job: explaining why these tiles carry no names
            rather than apologising for invented ones. */}
        <Reveal className="mx-auto mt-6 max-w-2xl rounded-2xl bg-sand-100 px-4 py-2.5 text-center text-xs leading-relaxed text-ink-soft">
          <p>
            <Icon name="circle-info" className="mr-1.5 text-gold-500" />
            {GUEST_VIDEO_NOTE}
          </p>
        </Reveal>

        <Reveal className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {visible.map((clip, index) => (
            <GuestVideoCard
              key={clip.id}
              clip={clip}
              index={index}
              total={GUEST_VIDEOS.length}
            />
          ))}
        </Reveal>

        {!showAll && hiddenCount > 0 && (
          <Reveal className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="btn btn-outline w-full sm:w-auto"
            >
              Watch {hiddenCount} more guest {hiddenCount === 1 ? 'video' : 'videos'}
              <Icon name="chevron-down" className="text-xs" />
            </button>
          </Reveal>
        )}

        <SectionCta cta={SECTION_CTAS.reviews} />
      </div>
    </section>
  )
}
