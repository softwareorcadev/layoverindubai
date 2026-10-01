import { useEffect } from 'react'

/**
 * Keep `scroll-padding-top` matched to the fixed header's real height, so
 * fragment navigation never parks a section heading underneath the bar.
 *
 * The header is two rows on mobile (~124px) and one on desktop (~76px), so a
 * single hard-coded value cannot serve both. index.css carries static
 * fallbacks for the pre-JS paint; this overrides them with a measurement and
 * re-measures on resize.
 *
 * @param {import('react').RefObject<HTMLElement>} headerRef
 */
export function useHeaderOffset(headerRef) {
  useEffect(() => {
    const el = headerRef.current
    if (!el) return

    const sync = () => {
      document.documentElement.style.scrollPaddingTop = `${el.offsetHeight + 12}px`
    }

    sync()

    // ResizeObserver catches the header's own height changes (breakpoint swap,
    // font load); resize catches viewport-only changes on older browsers.
    let ro
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(sync)
      ro.observe(el)
    }
    window.addEventListener('resize', sync, { passive: true })

    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', sync)
      document.documentElement.style.scrollPaddingTop = ''
    }
  }, [headerRef])
}

export default useHeaderOffset
