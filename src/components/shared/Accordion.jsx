import { useId, useState } from 'react'
import Icon from './Icon.jsx'
import { cx } from '../../lib/cx.js'

/**
 * One collapsible panel.
 *
 * The open/close animation is entirely CSS — `.acc-panel` transitions
 * `grid-template-rows` from 0fr to 1fr (see index.css). No height measurement,
 * no scrollHeight, no max-height hacks. The chevron rotation rides on the same
 * `.acc-open` class.
 *
 * Items are independent: opening one does not close its siblings, matching the
 * original page. `aria-controls` / `role="region"` are an addition — the
 * original had `aria-expanded` but nothing tying it to the panel.
 *
 * The inner <div> inside `.acc-panel` is required: the CSS relies on
 * `.acc-panel > div { overflow: hidden }`, so it is rendered here rather than
 * left to each caller.
 */
export default function AccordionItem({
  header,
  children,
  featured = false,
  headerClassName,
  className,
}) {
  const [open, setOpen] = useState(false)
  const uid = useId()
  const panelId = `${uid}-panel`
  const buttonId = `${uid}-button`

  return (
    <div
      className={cx(
        'acc overflow-hidden rounded-2xl shadow-card',
        featured ? 'border-2 border-gold-400 bg-white' : 'border border-line',
        open && 'acc-open',
        className,
      )}
    >
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className={cx(
          'acc-btn flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6',
          headerClassName,
        )}
      >
        {header}
        <Icon name="chevron-down" className="acc-chev text-sm text-ink-faint" />
      </button>
      <div className="acc-panel" id={panelId} role="region" aria-labelledby={buttonId}>
        <div>{children}</div>
      </div>
    </div>
  )
}
