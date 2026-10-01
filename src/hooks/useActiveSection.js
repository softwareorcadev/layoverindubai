import { useEffect, useState } from 'react'

/**
 * Which of `ids` is currently the reader's focus, or null.
 *
 * The `-45% 0px -45% 0px` root margin collapses the viewport to a thin band
 * across its middle, so at most one section can ever be active and the
 * highlight clears when the reader is anywhere else on the page. Used to mark
 * the header's Testimonials / Reviews pills.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  // Stable primitive dep so a fresh array literal per render does not re-run.
  const key = ids.join('|')

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const targets = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (targets.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          } else {
            // Only clear if the section leaving the band is the active one, so
            // two sections crossing the band cannot clobber each other.
            setActive((prev) => (prev === entry.target.id ? null : prev))
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    for (const el of targets) io.observe(el)
    return () => io.disconnect()
  }, [key])

  return active
}

export default useActiveSection
