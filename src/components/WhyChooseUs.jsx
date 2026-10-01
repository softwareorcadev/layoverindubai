import Icon from './shared/Icon.jsx'
import Reveal from './shared/Reveal.jsx'
import SectionHeading from './shared/SectionHeading.jsx'
import SectionCta from './shared/SectionCta.jsx'
import { WHY_CHOOSE_US } from '../data/whyChooseUs.js'
import { SECTION_CTAS } from '../data/sectionCtas.js'
import { SECTION } from '../data/site.js'

/**
 * Background is white (the original had sand-50) so the alternation still works
 * once the new sections are inserted. The cards therefore gain the pricing
 * cards' hover lift, or they would read as flat white-on-white.
 */
export default function WhyChooseUs() {
  return (
    <section id={SECTION.why} className="bg-white">
      <div className="mx-auto max-w-wrap px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Why travelers choose us"
            title={
              <>
                Built for people with
                <br />a flight to catch.
              </>
            }
            lead="Every detail of the tour is designed around one non-negotiable: you board your next flight relaxed, on time, with a camera roll full of Dubai."
          />
        </Reveal>

        <Reveal className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-line bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lux"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-50 text-gold-600">
                <Icon name={item.icon} className="text-lg" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </div>
          ))}
        </Reveal>

        <SectionCta cta={SECTION_CTAS.why} />
      </div>
    </section>
  )
}
