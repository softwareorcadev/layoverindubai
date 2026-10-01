import { useEffect, useState } from 'react'

/**
 * Whether the element with id `elementId` is currently in view.
 *
 * Used by the sticky mobile CTA to hide itself while the booking form is on
 * screen. Looks the element up inside the effect, which runs after the whole
 * tree is committed — so `#book` exists even though StickyCta renders before
 * it in the DOM order.
 *
 * Fails open (returns false → bar stays visible) if the element or
 * IntersectionObserver is missing, matching the original's guard.
 */
export function useInView(elementId, { threshold = 0.15 } = {}) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const el = document.getElementById(elementId)
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setInView(entry.isIntersecting)
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [elementId, threshold])

  return inView
}

export default useInView
