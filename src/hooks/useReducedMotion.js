import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Live `prefers-reduced-motion` preference.
 *
 * The original page read this once at load; this stays in sync if the visitor
 * changes the OS setting. Consumed by the hero cycler (skips its interval
 * entirely), the carousel and every programmatic scroll.
 *
 * The `.reveal` / `.hero-img` / `scroll-behavior` reduced-motion handling
 * lives purely in CSS — deliberately not duplicated here.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const onChange = (event) => setReduced(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

export default useReducedMotion
