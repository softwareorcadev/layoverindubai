import Icon from './shared/Icon.jsx'
import Reveal from './shared/Reveal.jsx'
import SectionHeading from './shared/SectionHeading.jsx'
import SectionCta from './shared/SectionCta.jsx'
import { cx } from '../lib/cx.js'
import { COMPARE_COLUMNS, COMPARE_ROWS } from '../data/compare.js'
import { SECTION_CTAS } from '../data/sectionCtas.js'
import { SECTION } from '../data/site.js'

/**
 * "Three ways to spend eight hours at DXB" — names the two real alternatives
 * and wins against both.
 *
 * Rendered as three cards rather than a <table>, because the middle column is
 * deliberately hedged prose rather than data, and cards let the private column
 * take the inverted "most popular" treatment used by the pricing cards.
 */
export default function Compare() {
  return (
    <section id={SECTION.compare} className="bg-sand-50">
      <div className="mx-auto max-w-wrap px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="The alternatives"
            title="Three ways to spend eight hours at DXB."
            lead="Same layover. The difference is what you get to keep."
          />
        </Reveal>

        <Reveal className="mt-11 grid gap-4 lg:grid-cols-3">
          {COMPARE_COLUMNS.map((column, colIndex) => (
            <div
              key={column.id}
              className={cx(
                'flex flex-col rounded-3xl p-6',
                column.featured
                  ? 'bg-ink text-white shadow-lux ring-1 ring-gold-400/40'
                  : 'border border-line bg-white shadow-card',
              )}
            >
              <span
                className={cx(
                  'grid h-11 w-11 place-items-center rounded-xl',
                  column.featured
                    ? 'bg-gold-500 text-white shadow-gold'
                    : 'bg-sand-50 text-ink-faint',
                )}
              >
                <Icon name={column.icon} className="text-lg" />
              </span>

              <h3
                className={cx(
                  'mt-4 font-display text-lg font-semibold',
                  column.featured && 'text-gold-300',
                )}
              >
                {column.title}
              </h3>

              <dl className="mt-5 space-y-3.5 text-sm">
                {COMPARE_ROWS.map((row) => (
                  <div
                    key={row.label}
                    className={cx(
                      'border-t border-dashed pt-3.5',
                      column.featured ? 'border-white/15' : 'border-line',
                    )}
                  >
                    <dt
                      className={cx(
                        'text-[10px] font-bold uppercase tracking-wider',
                        column.featured ? 'text-white/45' : 'text-ink-faint',
                      )}
                    >
                      {row.label}
                    </dt>
                    <dd
                      className={cx(
                        'mt-0.5 leading-snug',
                        column.featured
                          ? 'font-medium text-white/85'
                          : 'text-ink-soft',
                      )}
                    >
                      {row.values[colIndex]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </Reveal>

        <SectionCta cta={SECTION_CTAS.compare} />
      </div>
    </section>
  )
}
