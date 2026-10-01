import { useRef, useState } from 'react'
import Icon from './shared/Icon.jsx'
import { cx } from '../lib/cx.js'
import { hideOnError } from '../lib/hideOnError.js'
import { pauseOtherGuestVideos } from '../lib/video.js'
import { TESTIMONIALS_URL } from '../data/site.js'

/** `40` → `"0:40"`. Shown so nobody has to press play blind. */
function timecode(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

/**
 * One guest video review. See data/videos.js for why these tiles carry no
 * name, city or written quote.
 *
 * Four decisions here are load-bearing:
 *
 *  1. The poster is a sibling <img loading="lazy">, NOT the video's `poster`
 *     attribute. A <video poster> is fetched eagerly wherever it sits on the
 *     page — there is no lazy equivalent — so ten of them would spend half a
 *     megabyte before anyone pressed anything.
 *  2. `src` sits on the <video> rather than on a <source> child, because a
 *     <source> error does not bubble and would leave onError below dead.
 *  3. `preload="none"` — zero bytes until play() is called.
 *  4. `controls` appears after the first play, for scrubbing and fullscreen —
 *     but the tile owns SOUND itself rather than delegating it. Chrome does
 *     render a volume button in its bar at these tile widths, but that bar
 *     auto-hides, and browsers thin their controls out as a player narrows, so
 *     it is not something to rely on at 165px. Our own toggle is always
 *     visible, and — the actual point — it shows the muted STATE. A clip
 *     playing silently because the browser blocked audio is otherwise
 *     indistinguishable from a clip that simply has none.
 *
 * prefers-reduced-motion is deliberately NOT consulted: nothing moves until
 * the visitor presses play, which is what the preference asks for. The only
 * motion is the hover scale on the play disc, and the global reduced-motion
 * block in index.css already collapses that.
 */
export default function GuestVideoCard({ clip, index, total }) {
  const videoRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [failed, setFailed] = useState(false)
  const [muted, setMuted] = useState(false)

  /**
   * Play with sound, and treat a refusal to play sound as exactly that.
   *
   * NotAllowedError means the browser declined to play media WITH AUDIO — a
   * site-level sound block, or an autoplay policy. It does not mean the file
   * is missing, so reporting it as "this clip didn't load" would be a lie and
   * would hide a clip that plays perfectly well silently. Retry muted instead
   * and let the toggle below offer the sound back.
   */
  const play = async () => {
    const el = videoRef.current
    if (!el) return
    pauseOtherGuestVideos(el)
    el.muted = false
    setMuted(false)

    try {
      await el.play()
    } catch (error) {
      // An AbortError just means another clip took over mid-request — that is
      // the one-at-a-time rule working, not a broken file.
      if (error?.name === 'AbortError') return
      if (error?.name !== 'NotAllowedError') {
        setFailed(true)
        return
      }
      el.muted = true
      setMuted(true)
      try {
        await el.play()
      } catch {
        setFailed(true)
      }
    }
  }

  const toggleSound = () => {
    const el = videoRef.current
    if (!el) return
    el.muted = !el.muted
    setMuted(el.muted)
  }

  const label =
    `guest video review ${index + 1} of ${total}` +
    (clip.where ? `, filmed at ${clip.where}` : '')

  return (
    <figure
      className={cx(
        'group relative aspect-[9/16] overflow-hidden rounded-3xl bg-gradient-to-br shadow-card',
        clip.gradient,
      )}
    >
      <video
        ref={videoRef}
        src={clip.src}
        width={clip.width}
        height={clip.height}
        preload="none"
        playsInline
        controls={started}
        controlsList="nodownload"
        aria-label={`Guest video review ${index + 1} of ${total}`}
        data-guest-review=""
        onPlaying={() => setStarted(true)}
        /* Keeps our icon honest when the visitor mutes from the native control
           bar rather than from our toggle. */
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full bg-ink object-cover"
      />

      {/* Faded rather than unmounted, so there is no black gap between the
          poster leaving and the first decoded frame arriving. */}
      <img
        src={clip.poster}
        width={clip.width}
        height={clip.height}
        alt=""
        loading="lazy"
        decoding="async"
        onError={hideOnError}
        className={cx(
          'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
          started && 'pointer-events-none opacity-0',
        )}
      />

      {!started && !failed && (
        <button
          type="button"
          onClick={play}
          aria-label={`Play ${label}`}
          className="absolute inset-0 grid place-items-center"
        >
          <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-white/95 text-gold-600 shadow-lux transition group-hover:scale-110">
            <Icon name="play" className="pl-1 text-lg" />
          </span>
        </button>
      )}

      {/* Top-right, clear of the native control bar along the bottom. It is
          the only sound affordance guaranteed to exist at this tile width. */}
      {started && !failed && (
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? `Unmute ${label}` : `Mute ${label}`}
          className="absolute right-2 top-2 z-10 grid h-9 w-9 place-items-center rounded-full bg-ink/70 text-white backdrop-blur transition hover:bg-ink/90"
        >
          <Icon name={muted ? 'volume-xmark' : 'volume-high'} className="text-sm" />
        </button>
      )}

      {/* An icon alone is too easy to miss at 165px, and a silently playing
          clip is the exact state the visitor needs told about. Top-LEFT, not
          centred: centred would run into the toggle above on the narrowest
          tile. aria-hidden because it does the same job as that toggle, which
          already announces itself properly — two buttons for one action would
          only pad the tab order. */}
      {started && muted && !failed && (
        <button
          type="button"
          onClick={toggleSound}
          tabIndex={-1}
          aria-hidden="true"
          className="absolute left-2 top-2 z-10 rounded-full bg-ink/80 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur transition hover:bg-ink"
        >
          Tap for sound
        </button>
      )}

      {failed && (
        <a
          href={TESTIMONIALS_URL}
          target="_blank"
          rel="noopener"
          className="absolute inset-0 grid place-items-center p-4 text-center"
        >
          <span>
            <Icon name="video-slash" className="text-3xl text-white/40" />
            <span className="mt-2 block text-xs leading-snug text-white/80">
              This clip didn&apos;t load — watch it on our site
            </span>
          </span>
        </a>
      )}

      {/* Only what can be read off the file itself: how long it runs, and
          where it was filmed when that is visible in frame. */}
      {!started && (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-1.5 p-3 text-[11px] font-medium text-white/80">
          <Icon name="circle-play" className="text-gold-300" />
          <span className="truncate">
            Guest video · {timecode(clip.seconds)}
            {clip.where && ` · ${clip.where}`}
          </span>
          {clip.openCaptions && (
            <Icon name="closed-captioning" className="ml-auto text-white/60" />
          )}
        </figcaption>
      )}
    </figure>
  )
}
