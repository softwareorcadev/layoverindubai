import { useEffect, useState } from 'react'
import Icon from './shared/Icon.jsx'
import { cx } from '../lib/cx.js'
import { useBooking } from '../context/bookingContext.js'
import { scrollToId } from '../lib/scrollToId.js'
import { createCheckout } from '../data/api.js'
import {
  DURATIONS,
  EXTRA_PER_GUEST,
  MAX_TRAVELERS,
  pluralTravelers,
  totalFor,
  usd,
} from '../data/pricing.js'
import { PHONE_DISPLAY, PHONE_TEL, SECTION } from '../data/site.js'

/**
 * THE BOOKING FORM — the page's one checkout path, replacing the Bókun widget.
 *
 * The visitor fills this in, the details go to our Worker (see data/api.js),
 * and the Worker hands back a Stripe payment page to send them to. Payment
 * itself always happens on Stripe's own page: no card number ever touches this
 * site, which is what keeps the security burden off the client.
 *
 * The price shown here is a QUOTE, not the charge. The Worker recalculates it
 * from its own copy of the price list before taking any money, so a visitor
 * editing this page in their browser changes the label and nothing else. Keep
 * data/pricing.js and the Worker's src/pricing.js in step — they are the two
 * halves of one number.
 */

/** What we keep between visits to the payment page. */
const DRAFT_KEY = 'lid.booking.draft'

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  date: '',
  arrivalFlight: '',
  departureFlight: '',
  notes: '',
}

/** Today in the YYYY-MM-DD shape a date input expects, in the visitor's zone. */
function todayIso() {
  const now = new Date()
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

/**
 * Why a draft is kept at all: paying means leaving the site for Stripe. A
 * visitor who changes their mind there and comes back would otherwise find an
 * empty form and have to type six fields again.
 *
 * The draft holds the typed fields PLUS the tour length and party size. Those
 * two are the price, so losing them is worse than losing a phone number — the
 * visitor would come back to a form that silently says 6 hours for one person
 * and pay for a tour they did not choose.
 *
 * They are stored alongside `fields` but never merged INTO it: `fields` is
 * spread into the checkout call, and a stale copy in there would override the
 * live selection.
 *
 * sessionStorage, not localStorage: this should last one visit, not forever.
 * Wrapped in try/catch because private browsing can refuse storage outright.
 */
function readDraft() {
  try {
    const saved = sessionStorage.getItem(DRAFT_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

/** Only the typed fields, and only if they really are text. */
function loadDraft() {
  const raw = readDraft()
  const restored = { ...EMPTY }
  for (const key of Object.keys(EMPTY)) {
    if (typeof raw[key] === 'string') restored[key] = raw[key]
  }
  return restored
}

/** The saved tour length, or null if there is nothing trustworthy to restore. */
function draftHours() {
  const saved = Number(readDraft().hours)
  return DURATIONS.includes(saved) ? saved : null
}

/** The saved party size. Anything odd falls back to one traveller. */
function draftTravelers() {
  const saved = Number(readDraft().travelers)
  return Number.isInteger(saved) && saved >= 1 && saved <= MAX_TRAVELERS ? saved : 1
}

function saveDraft(fields, hours, travelers) {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ ...fields, hours, travelers }))
  } catch {
    /* Storage refused. The form still works; only the draft is lost. */
  }
}

function clearDraft() {
  try {
    sessionStorage.removeItem(DRAFT_KEY)
  } catch {
    /* Nothing to do. */
  }
}

/** Keep native controls within their grid track; 16px text avoids phone focus zoom. */
const FIELD =
  'mt-1.5 min-w-0 w-full max-w-full rounded-2xl border border-line bg-sand-50 px-4 py-3 text-base text-ink transition focus:border-gold-400 focus:bg-white sm:text-sm'

const LABEL = 'block text-xs font-semibold uppercase tracking-wide text-ink-soft'

function Field({ label, hint, children, className }) {
  return (
    <label className={cx('block min-w-0', className)}>
      <span className={LABEL}>{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-ink-faint">{hint}</span>}
    </label>
  )
}

/** What a visitor sees when they come back from Stripe having paid. */
function Confirmed({ onBookAnother }) {
  return (
    <div className="min-w-0 w-full rounded-3xl bg-white p-4 text-ink shadow-lux sm:p-8">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-50 text-gold-600">
        <Icon name="circle-check" className="text-xl" />
      </span>
      <h3 className="mt-4 font-display text-xl font-bold sm:text-2xl">
        You&apos;re booked. See you in Dubai!
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        Your payment went through and a confirmation is on its way to your inbox —
        check your spam folder if it is not there within a few minutes. We will be
        in touch before your layover with your pickup details.
      </p>
      <a
        href={`tel:${PHONE_TEL}`}
        className="btn btn-outline mt-6 w-full whitespace-normal px-3 py-3.5 text-center"
      >
        <Icon name="phone" className="shrink-0 text-sm text-gold-600" />
        <span>
          Questions? Call <span className="whitespace-nowrap">{PHONE_DISPLAY}</span>
        </span>
      </a>

      {/* Travellers with a layover each way book twice. Without this the
          confirmation would be a dead end for the second one. */}
      <button
        type="button"
        onClick={onBookAnother}
        className="link-arrow mt-4 w-full justify-center transition"
      >
        Book another tour
        <Icon name="arrow-right" className="text-xs" />
      </button>
    </div>
  )
}

export default function BookingForm() {
  const { hours, setDuration, reducedMotion } = useBooking()
  const [fields, setFields] = useState(loadDraft)
  const [travelers, setTravelers] = useState(draftTravelers)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  /* Stripe sends the visitor back with ?booking=confirmed or ?booking=cancelled
     on the URL. Read it once on mount — after that the form owns the screen. */
  const [status, setStatus] = useState(() => {
    if (typeof window === 'undefined') return null
    return new URLSearchParams(window.location.search).get('booking')
  })

  /* The tour length lives in the page-wide context, so it is restored here
     rather than in useState. Runs once: after this the visitor's own choices
     win. */
  useEffect(() => {
    const saved = draftHours()
    if (saved !== null) setDuration(saved)
  }, [setDuration])

  /* Coming back from Stripe lands the visitor at the top of the page, far from
     the answer they are looking for — so carry them to this section. A paid
     booking also clears the draft: the next visitor on this machine, or the
     same one booking a second tour, should start from an empty form.
     ?booking= is then wiped from the address bar, because a reload or a shared
     link must not leave someone staring at a stale confirmation instead of a
     form they can use. */
  useEffect(() => {
    if (!status) return
    if (status === 'confirmed') clearDraft()
    scrollToId(SECTION.book, reducedMotion)
    try {
      const url = new URL(window.location.href)
      url.searchParams.delete('booking')
      url.searchParams.delete('session_id')
      window.history.replaceState({}, '', url)
    } catch {
      /* Nothing to lose here: the panel still shows either way. */
    }
  }, [status, reducedMotion])

  /* Pressing Back on the Stripe page can restore this page exactly as it was
     left — mid-submit, with the button greyed out and spinning forever. This
     is the one event that fires on that kind of restore. */
  useEffect(() => {
    function revive(event) {
      if (event.persisted) setBusy(false)
    }
    window.addEventListener('pageshow', revive)
    return () => window.removeEventListener('pageshow', revive)
  }, [])

  const total = totalFor(hours, travelers)

  function update(field) {
    return (event) => {
      const next = { ...fields, [field]: event.target.value }
      setFields(next)
      saveDraft(next, hours, travelers)
    }
  }

  function chooseHours(next) {
    setDuration(next)
    saveDraft(fields, next, travelers)
  }

  function chooseTravelers(next) {
    setTravelers(next)
    saveDraft(fields, hours, next)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (busy) return

    setError('')
    setBusy(true)
    setStatus(null)

    try {
      /* hours and travellers go last on purpose: they are the price, and the
         live selection must win over anything left in the draft. */
      const url = await createCheckout({ ...fields, hours, travelers })
      /* Leaving the site: the draft is what brings them back to a filled form. */
      saveDraft(fields, hours, travelers)
      window.location.href = url
    } catch (problem) {
      setError(problem.message)
      setBusy(false)
    }
  }

  if (status === 'confirmed') return <Confirmed onBookAnother={() => setStatus(null)} />

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-0 w-full rounded-3xl bg-white p-4 text-ink shadow-lux sm:p-8"
      noValidate={false}
    >
      <h3 className="font-display text-xl font-bold sm:text-2xl">
        Book your private tour
      </h3>
      <p className="mt-1.5 text-sm text-ink-soft">
        Takes a minute. Secure card payment, instant confirmation.
      </p>

      {status === 'cancelled' && (
        <p className="mt-4 flex items-start gap-2 rounded-2xl bg-sand-50 p-3 text-xs leading-relaxed text-ink-soft">
          <Icon name="circle-info" className="mt-0.5 text-gold-600" />
          No payment was taken. Your details are still here whenever you are ready.
        </p>
      )}

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Tour length">
          <select
            value={hours}
            onChange={(event) => chooseHours(Number(event.target.value))}
            className={FIELD}
          >
            {DURATIONS.map((option) => (
              <option key={option} value={option}>
                {option} hours
              </option>
            ))}
          </select>
        </Field>

        <Field label="Travellers" hint={`${usd(EXTRA_PER_GUEST)} per extra traveller`}>
          <select
            value={travelers}
            onChange={(event) => chooseTravelers(Number(event.target.value))}
            className={FIELD}
          >
            {Array.from({ length: MAX_TRAVELERS }, (_, index) => index + 1).map((n) => (
              <option key={n} value={n}>
                {pluralTravelers(n)}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Layover date" className="sm:col-span-2">
          <input
            type="date"
            required
            min={todayIso()}
            value={fields.date}
            onChange={update('date')}
            className={FIELD}
          />
        </Field>

        <Field label="Arrival flight" hint="e.g. EK203">
          <input
            type="text"
            required
            maxLength={20}
            placeholder="Flight number"
            value={fields.arrivalFlight}
            onChange={update('arrivalFlight')}
            className={FIELD}
          />
        </Field>

        <Field label="Departure flight" hint="So we get you back in time">
          <input
            type="text"
            required
            maxLength={20}
            placeholder="Flight number"
            value={fields.departureFlight}
            onChange={update('departureFlight')}
            className={FIELD}
          />
        </Field>

        <Field label="Full name" className="sm:col-span-2">
          <input
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="As on your passport"
            value={fields.name}
            onChange={update('name')}
            className={FIELD}
          />
        </Field>

        <Field label="Email">
          <input
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@example.com"
            value={fields.email}
            onChange={update('email')}
            className={FIELD}
          />
        </Field>

        <Field label="Phone / WhatsApp">
          <input
            type="tel"
            required
            maxLength={40}
            autoComplete="tel"
            placeholder="+971 50 000 0000"
            value={fields.phone}
            onChange={update('phone')}
            className={FIELD}
          />
        </Field>

        <Field label="Anything we should know?" className="sm:col-span-2">
          <textarea
            rows={2}
            maxLength={450}
            placeholder="Kids, wheelchair, food preferences, must-see spots…"
            value={fields.notes}
            onChange={update('notes')}
            className={cx(FIELD, 'resize-none')}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-2xl bg-sand-50 px-4 py-3.5">
        <span className="text-sm text-ink-soft">
          {hours}-hour tour · {pluralTravelers(travelers)}
        </span>
        <span className="shrink-0 font-display text-2xl font-bold">{usd(total)}</span>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-2xl bg-red-50 p-3 text-xs leading-relaxed text-red-600"
        >
          <Icon name="triangle-exclamation" className="mt-0.5" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="btn-gold mt-5 flex w-full items-center justify-center gap-2.5 rounded-2xl py-4 text-base font-semibold text-white shadow-gold disabled:cursor-wait disabled:opacity-70"
      >
        <Icon name={busy ? 'spinner' : 'lock'} className={cx('text-lg', busy && 'fa-spin')} />
        {busy ? 'Taking you to payment…' : `Pay ${usd(total)} and confirm`}
      </button>

      <p className="mt-3 text-center text-xs text-ink-faint">
        Secure payment by Stripe · Free cancellation up to 24h before pickup
      </p>

      <a
        href={`tel:${PHONE_TEL}`}
        className="btn btn-outline mt-3 w-full whitespace-normal px-3 py-3.5 text-center"
      >
        <Icon name="phone" className="shrink-0 text-sm text-gold-600" />
        <span>
          Rather talk first? Call <span className="whitespace-nowrap">{PHONE_DISPLAY}</span>
        </span>
      </a>
    </form>
  )
}
