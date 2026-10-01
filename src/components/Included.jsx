import Icon from './shared/Icon.jsx'
import Reveal from './shared/Reveal.jsx'
import SectionHeading from './shared/SectionHeading.jsx'
import SectionCta from './shared/SectionCta.jsx'
import Barcode from './shared/Barcode.jsx'
import { INCLUDED, NOT_INCLUDED, PROMISE_LINES } from '../data/included.js'
import { SECTION_CTAS } from '../data/sectionCtas.js'
import { SECTION } from '../data/site.js'

/** Entries may be a plain string or `{ text, confirm }`. */
const textOf = (item) => (typeof item === 'string' ? item : item.text)

function ItemList({ items, icon, iconClass, textClass }) {
  return (
    <ul className="space-y-2.5 text-sm">
      {items.map((item) => (
        <li key={textOf(item)} className={`flex gap-2.5 ${textClass}`}>
          <Icon name={icon} className={`mt-0.5 flex-shrink-0 ${iconClass}`} />
          {textOf(item)}
        </li>
      ))}
    </ul>
  )
}

/**
 * "What's included / not included" — answers the "what's the catch?" objection
 * that a bare price grid creates, laid out as a boarding-pass ledger.
 */
export default function Included() {
  return (
    <section id={SECTION.included} className="bg-sand-50">
      <div className="mx-auto max-w-wrap px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="What you pay for"
            title="One price. Written down."
            lead="Every tour price on this page covers the same core. Here is exactly where it starts and stops."
          />
        </Reveal>

        <Reveal className="mx-auto mt-11 max-w-4xl overflow-hidden rounded-3xl border border-line bg-white shadow-card">
          <div className="grid sm:grid-cols-2">
            <div className="p-6 sm:p-7">
              <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-600">
                <Icon name="circle-check" /> Included in every tour
              </p>
              <ItemList
                items={INCLUDED}
                icon="check"
                iconClass="text-gold-500"
                textClass="text-ink-soft"
              />
            </div>

            <div className="border-t border-dashed border-line p-6 sm:border-l sm:border-t-0 sm:p-7">
              <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-faint">
                <Icon name="circle-info" /> Not included
              </p>
              <ItemList
                items={NOT_INCLUDED}
                icon="xmark"
                iconClass="text-ink-faint"
                textClass="text-ink-soft"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-dashed border-line bg-sand-50 px-6 py-5 sm:flex-row sm:items-center sm:px-7">
            <Barcode className="hidden h-4 w-20 flex-shrink-0 text-ink sm:block" />
            <p className="text-sm font-medium leading-relaxed text-ink">
              {PROMISE_LINES.join(' ')}
            </p>
          </div>
        </Reveal>

        <div className="mx-auto max-w-4xl">
          <SectionCta cta={SECTION_CTAS.included} />
        </div>
      </div>
    </section>
  )
}
