/**
 * Only one guest video may be playing at a time.
 *
 * Enforced on the DOM rather than in React state on purpose: the rule has to
 * hold no matter how many grids end up rendering clips, and doing it here
 * costs four lines instead of a context, a provider and a subscription. The
 * element stays the single source of truth for "am I playing", which is also
 * why each card keeps its own `started` flag rather than being told from
 * above.
 *
 * Rewinding rather than merely pausing is deliberate: a clip frozen mid-
 * sentence reads as broken, and frame 0 is the poster the tile started with.
 */
export function pauseOtherGuestVideos(current) {
  for (const el of document.querySelectorAll('video[data-guest-review]')) {
    if (el === current || el.paused) continue
    el.pause()
    el.currentTime = 0
  }
}

export default pauseOtherGuestVideos
