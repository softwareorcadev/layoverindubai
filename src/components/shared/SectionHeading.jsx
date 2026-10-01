import { cx } from '../../lib/cx.js'

/**
 * The eyebrow + h2 + lead block used by most sections.
 *
 * `tone="dark"` flips the eyebrow to gold-300 and the lead to white/70 for use
 * on ink backgrounds.
 *
 * `focusable` adds tabIndex={-1} so the header's jump pills can move focus into
 * the heading after scrolling — otherwise keyboard and screen-reader users
 * scroll the page but leave their focus behind in the header.
 */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  tone = 'light',
  align = 'center',
  focusable = false,
  className,
}) {
  const dark = tone === 'dark'
  return (
    <div
      className={cx(
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-xl',
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cx(
            'text-[11px] font-semibold uppercase tracking-[0.2em]',
            dark ? 'text-gold-300' : 'text-gold-600',
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        tabIndex={focusable ? -1 : undefined}
        className={cx(
          'mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl',
          dark && 'text-white',
        )}
      >
        {title}
      </h2>
      {lead && (
        <p className={cx('mt-3', dark ? 'text-white/70' : 'text-ink-soft')}>
          {lead}
        </p>
      )}
    </div>
  )
}
