import Reveal from './shared/Reveal.jsx'
import SectionHeading from './shared/SectionHeading.jsx'
import SectionCta from './shared/SectionCta.jsx'
import ItineraryItem from './ItineraryItem.jsx'
import { ITINERARIES } from '../data/itineraries.js'
import { SECTION_CTAS } from '../data/sectionCtas.js'
import { SECTION } from '../data/site.js'

export default function Itineraries() {
  return (
    <section id={SECTION.itineraries} className="bg-sand-50">
      <div className="mx-auto max-w-wrap px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="What you'll see"
            title={
              <>
                Every hour of your layover,
                <br />
                planned to the minute.
              </>
            }
            lead="Open your duration to see a typical route. Tours run 24/7 with airport pick-up and drop-off, and every itinerary is personalized to your flight times, interests and live traffic."
          />
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-3xl space-y-3">
          {ITINERARIES.map((itinerary) => (
            <ItineraryItem key={itinerary.hours} itinerary={itinerary} />
          ))}
        </Reveal>

        <div className="mx-auto max-w-3xl">
          <SectionCta cta={SECTION_CTAS.itineraries} />
        </div>
      </div>
    </section>
  )
}
