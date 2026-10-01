import Icon from './shared/Icon.jsx'
import Reveal from './shared/Reveal.jsx'
import SectionCta from './shared/SectionCta.jsx'
import { STATS, TRUST_BADGES, TRUST_HEADLINE } from '../data/trust.js'
import { SECTION_CTAS } from '../data/sectionCtas.js'
import { SECTION } from '../data/site.js'

export default function TrustBar() {
  return (
    <section id={SECTION.trust} className="border-b border-line bg-sand-50">
      <div className="mx-auto max-w-wrap px-4 py-10 sm:px-6 sm:py-12">
        <Reveal className="mx-auto mb-9 flex max-w-2xl items-center justify-center gap-2.5 text-center">
          <Icon name="users" className="text-gold-500" />
          <p className="font-display text-base font-semibold sm:text-lg">
            {TRUST_HEADLINE}
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-2 gap-x-6 gap-y-8 text-center sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-bold sm:text-4xl">
                {stat.value}
                {stat.accent && <span className="text-gold-500">{stat.accent}</span>}
              </p>
              <p className="mt-1 text-sm font-medium text-ink-soft">{stat.label}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[13px] font-medium text-ink-soft">
          {TRUST_BADGES.map((badge) => (
            <span key={badge.label} className="inline-flex items-center gap-2">
              <Icon
                name={badge.icon}
                variant={badge.variant}
                className={badge.iconClass}
              />{' '}
              {badge.label}
            </span>
          ))}
        </Reveal>

        <SectionCta cta={SECTION_CTAS.trust} />
      </div>
    </section>
  )
}
