import Icon from './shared/Icon.jsx'
import Reveal from './shared/Reveal.jsx'
import SectionHeading from './shared/SectionHeading.jsx'
import SectionCta from './shared/SectionCta.jsx'
import { cx } from '../lib/cx.js'
import { HOW_IT_WORKS } from '../data/howItWorks.js'
import { SECTION_CTAS } from '../data/sectionCtas.js'
import { SECTION } from '../data/site.js'

export default function HowItWorks() {
  return (
    <section id={SECTION.how} className="bg-ink text-white">
      <div className="mx-auto max-w-wrap px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow="How it works"
            title={
              <>
                Gate to city and back.
                <br />
                Four simple steps.
              </>
            }
          />
        </Reveal>

        <Reveal className="relative mx-auto mt-12 max-w-5xl">
          {/* Dashed route line behind the step markers (desktop only). */}
          <div
            className="absolute left-0 right-0 top-7 hidden border-t border-dashed border-white/20 lg:block"
            aria-hidden="true"
          />
          <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="relative">
                <span
                  className={cx(
                    'relative z-10 grid h-14 w-14 place-items-center rounded-2xl',
                    step.featured
                      ? 'bg-gold-500 text-white shadow-gold'
                      : 'bg-white/10 text-gold-300 ring-1 ring-white/15',
                  )}
                >
                  <Icon name={step.icon} className="text-xl" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {step.step} · {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mx-auto max-w-5xl">
          <SectionCta cta={SECTION_CTAS.how} />
        </div>
      </div>
    </section>
  )
}
