import { useEffect, useRef, useState } from 'react'

/**
 * Cycle through `values` with a fade between them. Returns `{ value, visible }`.
 *
 * Drives the hero boarding stub's layover-hours readout: fade out over
 * `fadeMs`, swap the number, fade back in, every `intervalMs`.
 *
 * StrictMode safety — this is the one genuinely fragile piece of the port.
 * The interval AND the pending fade timeout are both created inside the effect
 * and both cleared in cleanup. Clearing only the interval would leave the
 * timeout alive across a dev double-mount, producing two cyclers running at
 * 2x speed with the opacity stuck at 0.
 */
export function useCycler(
  values,
  { intervalMs = 2600, fadeMs = 350, enabled = true } = {},
) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const fadeTimer = useRef(0)

  const count = values.length

  useEffect(() => {
    if (!enabled || count < 2) return

    const intervalId = window.setInterval(() => {
      setVisible(false)
      fadeTimer.current = window.setTimeout(() => {
        setIndex((i) => (i + 1) % count)
        setVisible(true)
      }, fadeMs)
    }, intervalMs)

    return () => {
      window.clearInterval(intervalId)
      window.clearTimeout(fadeTimer.current)
    }
  }, [enabled, count, intervalMs, fadeMs])

  // Reduced motion: hold the first value, fully opaque, with no timers at all.
  if (!enabled) return { value: values[0], visible: true }

  return { value: values[index], visible }
}

export default useCycler
