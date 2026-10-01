/**
 * Join class names, dropping falsy entries.
 *
 * Always pass COMPLETE literal class strings — Tailwind v4 scans source for
 * literal substrings, so `cx('bg-', color)` produces a class that was never
 * compiled. Write `cond ? 'border-gold-500' : 'border-line'` instead.
 */
export function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

export default cx
