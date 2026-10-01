import { useEffect, useState } from 'react'

/**
 * True once the window has scrolled past `threshold` px.
 *
 * Drives the header's `bg-ink/70` → `bg-ink/90 shadow-lux` swap. The listener
 * is passive and only calls setState on the boolean flip, so scrolling does
 * not re-render the header on every tick.
 */
export function useScrolledPast(threshold = 24) {
  const [past, setPast] = useState(() => window.scrollY > threshold)

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > threshold
      setPast((prev) => (prev === next ? prev : next))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // matches the original's eager first call
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return past
}

export default useScrolledPast
