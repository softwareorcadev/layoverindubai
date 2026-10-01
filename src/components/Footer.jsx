import Icon from './shared/Icon.jsx'
import { cx } from '../lib/cx.js'
import { hideOnError } from '../lib/hideOnError.js'
import logoLockup from '../assets/brand/logo-lockup.png'
import {
  FOOTER_POSITIONING,
  SEE_LINKS,
  KNOW_LINKS,
  LEGAL_LINKS,
  FOOTER_FINE_PRINT,
  FOOTER_LEGAL_LINE,
} from '../data/footerLinks.js'
import {
  BRAND,
  TAGLINE,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  FACEBOOK_URL,
  SECTION,
  mailtoLink,
} from '../data/site.js'

const COLUMN_TITLE =
  'font-display text-xs font-bold uppercase tracking-[0.16em] text-gold-300'
const COLUMN_LINK = 'text-sm text-white/70 transition hover:text-white'

function LinkColumn({ title, links }) {
  return (
    <div>
      <p className={COLUMN_TITLE}>{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className={COLUMN_LINK}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * The footer carries real weight: with the nav menu removed, this link map and
 * the per-section CTA chain are the page's only wayfinding to #packages,
 * #itineraries and #faq.
 *
 * `pb-28 md:pb-12` keeps the sticky mobile CTA bar from covering the last row.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink pb-28 pt-16 text-white md:pb-12">
      <div className="mx-auto max-w-wrap px-4 sm:px-6">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* ── Contact ─────────────────────────────────────────────── */}
          <div id={SECTION.contact}>
            {/* The real brand lockup, keyed out of the intro card the client
                puts on the front of their own reels. The header keeps the
                compact icon-plus-text version instead: this mark is a tall
                monogram beside a small wordmark (~1.4:1 overall), which needs
                far more vertical room than a 36px header row has.
                TODO(owner): send the original logo file — an SVG or a
                transparent PNG — and ideally a horizontal lockup for the
                header. This one is recovered from video and is as sharp as
                that allows. */}
            <a href={`#${SECTION.top}`} className="inline-block">
              <img
                src={logoLockup}
                width={560}
                height={424}
                alt={BRAND}
                className="h-auto w-[180px]"
                onError={hideOnError}
              />
              <span className="mt-2 block text-[10px] font-medium uppercase tracking-[0.18em] text-gold-300">
                {TAGLINE}
              </span>
            </a>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {FOOTER_POSITIONING}
            </p>

            <p className="mt-5 font-display text-base font-semibold">
              One layover. One shot at seeing Dubai.
            </p>

            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href={mailtoLink(
                  'Enquiry about a private Dubai layover tour',
                  "Hi Layover in Dubai!\n\nI'd like to ask about a private layover tour.\n\n",
                )}
                className="btn btn-mail-dark justify-start"
              >
                <Icon name="envelope" className="text-base" />
                {EMAIL}
              </a>
              <div className="flex flex-wrap gap-2.5">
                <a href={`tel:${PHONE_TEL}`} className="btn btn-outline-light">
                  <Icon name="phone" className="text-sm text-gold-300" />{' '}
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener"
              className="mt-4 grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white/80 transition hover:border-white/50 hover:text-white"
              aria-label={`${BRAND} on Facebook`}
            >
              <Icon name="facebook-f" variant="brands" />
            </a>
          </div>

          <LinkColumn title="What you'll see" links={SEE_LINKS} />
          <LinkColumn title="Good to know" links={KNOW_LINKS} />
        </div>

        {/* ── Legal / info row ──────────────────────────────────────── */}
        <div className="flex flex-col gap-4 border-b border-white/10 py-6 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <a
                    href={link.href}
                    className="text-white/50 transition hover:text-white"
                  >
                    {link.label}
                  </a>
                ) : (
                  /* No page exists yet, so this is plain text — a link to a 404
                     is worse than no link. See TODO in data/footerLinks.js. */
                  <span className="text-white/30">{link.label}</span>
                )}
              </li>
            ))}
            <li>
              <a href={`#${SECTION.contact}`} className="text-white/50 transition hover:text-white">
                Contact
              </a>
            </li>
          </ul>

          <a href={`#${SECTION.top}`} className={cx('link-arrow link-arrow-light transition')}>
            Back to top <Icon name="arrow-up" className="text-xs" />
          </a>
        </div>

        <p className="pt-6 text-center text-xs leading-relaxed text-white/40">
          {FOOTER_FINE_PRINT}
          <br />© {year} {BRAND}. {FOOTER_LEGAL_LINE}
        </p>
      </div>
    </footer>
  )
}
