import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import { cx } from '../../lib/cx.js'
import { useBooking } from '../../context/bookingContext.js'
import { mailtoLink } from '../../data/site.js'
import { fillTemplate } from '../../lib/template.js'

/** Maps a `skin` name from data/sectionCtas.js onto the index.css button classes. */
const SKINS = {
  gold: 'btn-gold text-white shadow-gold',
  outline: 'btn-outline',
  'outline-light': 'btn-outline-light',
  ink: 'btn-ink',
  mail: 'btn-mail',
  'mail-dark': 'btn-mail-dark',
}

/** Skins that carry an envelope glyph instead of a trailing arrow. */
const MAIL_SKINS = new Set(['mail', 'mail-dark'])

/**
 * Band surfaces, keyed by the background of the SECTION the CTA sits in.
 *
 * The card is deliberately filled with the opposite light tone so it reads as a
 * distinct panel — fill it the same colour as its section and only the border
 * shows, which is the failure this keying exists to prevent.
 */
const BAND_TONES = {
  white: {
    card: 'border-line bg-sand-50',
    disc: 'bg-white text-gold-600 shadow-card',
    headline: '',
    support: 'text-ink-soft',
  },
  sand: {
    card: 'border-line bg-white',
    disc: 'bg-sand-50 text-gold-600 shadow-card',
    headline: '',
    support: 'text-ink-soft',
  },
  ink: {
    card: 'border-white/10 bg-white/[.06]',
    disc: 'bg-white/10 text-gold-300',
    headline: 'text-white',
    support: 'text-white/65',
  },
}

/**
 * The one call-to-action pattern used by every section.
 *
 * Three variants:
 *   band   — a bordered card with an icon disc, headline, support line, button
 *   inline — a centred row: support text plus a button, no card chrome
 *   link   — a bare text link with an arrow, for tertiary moves
 *
 * A `mail` block is turned into a mailto: link here, with `{H}` and `{PRICE}`
 * filled from the visitor's currently selected duration — so the enquiry that
 * lands in the inbox already names the tour they were looking at.
 */
export default function SectionCta({ cta, className }) {
  const { hours } = useBooking()

  if (!cta) return null

  const {
    variant = 'band',
    tone = 'white',
    icon,
    iconVariant,
    headline,
    support,
    label,
    skin = 'outline',
    href,
    mail,
    secondary,
  } = cta

  /* A mailto: hands off to the mail client and never navigates the page, so it
     must NOT carry target="_blank" — that would leave a blank tab behind. */
  const isMail = Boolean(mail)
  const target = isMail
    ? mailtoLink(fillTemplate(mail.subject, hours), fillTemplate(mail.body, hours))
    : href
  const linkProps = { href: target }

  const dark = tone === 'ink'
  const mailSkin = MAIL_SKINS.has(skin)

  if (variant === 'link') {
    return (
      <Reveal className={cx('mt-7', className)}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {support && (
            <p className={cx('text-xs', dark ? 'text-white/60' : 'text-ink-faint')}>
              {support}
            </p>
          )}
          <a
            {...linkProps}
            className={cx('link-arrow transition', dark && 'link-arrow-light')}
          >
            {icon && <Icon name={icon} variant={iconVariant} className="text-sm" />}
            {label}
            <Icon name="arrow-right" className="text-xs" />
          </a>
        </div>
      </Reveal>
    )
  }

  if (variant === 'inline') {
    return (
      <Reveal
        className={cx(
          'mt-8 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:text-left',
          className,
        )}
      >
        {support && (
          <p
            className={cx(
              'max-w-lg text-sm leading-relaxed',
              dark ? 'text-white/70' : 'text-ink-soft',
            )}
          >
            {support}
          </p>
        )}
        <a
          {...linkProps}
          className={cx('btn flex-shrink-0', SKINS[skin] ?? SKINS.outline)}
        >
          {mailSkin && <Icon name="envelope" className="text-base" />}
          {label}
          {!mailSkin && <Icon name="arrow-right" className="text-xs" />}
        </a>
      </Reveal>
    )
  }

  const t = BAND_TONES[tone] ?? BAND_TONES.white

  return (
    <Reveal
      className={cx(
        'mt-12 flex flex-col items-center gap-4 rounded-3xl border p-5 text-center sm:flex-row sm:p-6 sm:text-left',
        t.card,
        className,
      )}
    >
      {icon && (
        <span
          className={cx(
            'grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl',
            t.disc,
          )}
        >
          <Icon name={icon} variant={iconVariant} className="text-lg" />
        </span>
      )}

      <div className="sm:flex-1">
        {headline && (
          <p className={cx('font-display text-base font-semibold', t.headline)}>
            {headline}
          </p>
        )}
        {support && (
          <p className={cx('mt-1 text-sm leading-relaxed', t.support)}>{support}</p>
        )}
      </div>

      <div className="flex flex-col items-center gap-2.5 sm:flex-shrink-0 sm:items-end">
        <a
          {...linkProps}
          className={cx('btn', SKINS[skin] ?? SKINS.outline)}
        >
          {mailSkin && <Icon name="envelope" className="text-base" />}
          {label}
          {!mailSkin && <Icon name="arrow-right" className="text-xs" />}
        </a>
        {secondary && (
          <a
            href={secondary.href}
            className={cx('link-arrow transition', dark && 'link-arrow-light')}
          >
            {secondary.label}
            <Icon name="arrow-right" className="text-xs" />
          </a>
        )}
      </div>
    </Reveal>
  )
}
