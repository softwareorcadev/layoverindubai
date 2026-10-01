import { useEffect, useRef, useState } from 'react'

/**
 * One-shot scroll reveal. Returns `[ref, isIn]`.
 *
 * Mirrors the original page's IntersectionObserver: threshold 0.12, and the
 * element stops being observed once it has revealed.
 *
 * `isIn` must NOT be in the effect's dep array — that would tear down and
 * rebuild the observer on reveal, churning forever.
 */
export function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [isIn, setIsIn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Same fallback branch as the original: no IO support → reveal immediately.
    if (!('IntersectionObserver' in window)) {
      setIsIn(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsIn(true)
            io.unobserve(entry.target)
          }
        }
      },
      { threshold },
    )
    io.observe(el)
    // disconnect (not unobserve) so a StrictMode double-mount leaves nothing behind
    return () => io.disconnect()
  }, [threshold])

  return [ref, isIn]
}

export default useReveal
