import Reveal from './shared/Reveal.jsx'
import SectionHeading from './shared/SectionHeading.jsx'
import SectionCta from './shared/SectionCta.jsx'
import AccordionItem from './shared/Accordion.jsx'
import { FAQS } from '../data/faq.js'
import { SECTION_CTAS } from '../data/sectionCtas.js'
import { SECTION } from '../data/site.js'

/**
 * Background is white (the original had sand-50). Ten white accordions on white
 * would merge into one mass, so the panels are filled sand-50 with a white
 * hover — which also usefully distinguishes this stack from the itinerary
 * accordions, whose section stays sand-50 and whose panels stay white.
 */
export default function Faq() {
  return (
    <section id={SECTION.faq} className="bg-white">
      <div className="mx-auto max-w-wrap px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Questions travelers ask"
            title={
              <>
                Everything you&apos;re
                <br />
                wondering, answered.
              </>
            }
          />
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-3xl space-y-3">
          {FAQS.map((item) => (
            <AccordionItem
              key={item.q}
              className="bg-sand-50 transition-colors hover:bg-white"
              headerClassName="font-display font-semibold"
              header={<span className="flex-1">{item.q}</span>}
            >
              <p className="border-t border-line px-5 py-4 text-sm leading-relaxed text-ink-soft sm:px-6">
                {item.a}
              </p>
            </AccordionItem>
          ))}
        </Reveal>

        <div className="mx-auto max-w-3xl">
          <SectionCta cta={SECTION_CTAS.faq} />
        </div>
      </div>
    </section>
  )
}
