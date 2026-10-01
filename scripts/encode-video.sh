#!/usr/bin/env bash
#
# Transcode the curated video set the page ships, plus a poster frame each.
#
# Run from the repo root:   ./scripts/encode-video.sh
#
# ── WHAT GOES IN, AND WHY SO LITTLE OF IT ──────────────────────────────────
# The delivery is 5.6 GB / ~3h of footage. This encodes about six minutes of
# it. Selection is the hand-written list below, never a glob — the point of
# the pipeline is that adding a clip is a deliberate act, not a side effect of
# the client dropping another folder in.
#
# Sources are the folder 2 / folder 3 masters: 1080x1920 H.264 + AAC at
# 13-38 Mbps. Folder 1's top-level exports top out at 720x1280 and are heavily
# recompressed, so they are only ever used for their captions, never as video.
#
# ── WHY H.264 MP4 ONLY, WITH src ON THE ELEMENT ────────────────────────────
# No WebM or AV1 alternate. Not for encode cost — for error handling. An
# alternate needs <source> children, and a <source> that fails fires `error`
# on itself, where it does not bubble to the <video>. React's onError never
# sees it, which silently defeats the onError -> reveal-the-gradient
# convention this codebase uses on every image. One src on the element is the
# only shape where a missing file degrades the way the rest of the page does.
#
# ── WHY THE REVIEW CLIPS KEEP THEIR AUDIO AND THEIR LENGTH ─────────────────
# They are guest testimonials the client has already edited, subtitles burned
# in. Trimming them to hit a byte target would cut people off mid-sentence.
# They are 540x960 with 64k mono AAC instead, and they cost nothing until
# played: the wall renders posters and preload="none".
#
# ── WHY THE HERO LOOP IS SILENT AND 4:5 ────────────────────────────────────
# Autoplay only survives the browser policy while muted, and a file with no
# audio track is smaller and unambiguous. The hero card is aspect-[4/5]; a
# 9:16 source dropped into it via object-cover throws away a third of every
# frame, so the crop happens here where it is free.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
D2="$ROOT/Dubai (All Data) 2/Layover in dubai data"
D3="$ROOT/Dubai (All Data) 3/Layover in dubai data"
OUT="$ROOT/public/media"
POSTERS="$ROOT/src/assets/posters"

command -v ffmpeg >/dev/null || { echo "missing: ffmpeg (brew install ffmpeg)" >&2; exit 1; }
mkdir -p "$OUT" "$POSTERS"

# Shared H.264 settings.
#  -movflags +faststart   moov ahead of mdat, or the browser downloads the
#                         whole file before it can show frame one.
#  -g / -sc_threshold 0   a keyframe every 2s and no scene-cut keyframes, so
#                         the hero's loop restart is an instant seek to 0.
#  format=yuv420p in the filter chain, not -pix_fmt, to convert before the
#                         encoder rather than tripping the yuvj420p path.
COMMON=(-profile:v high -level:v 4.0 -g 50 -keyint_min 50 -sc_threshold 0 -movflags +faststart)

# ── 1. Hero loop ───────────────────────────────────────────────────────────
# Dubai Night Reel, 9s-21s: Global Village fireworks, the Burj Khalifa lit,
# the fountain, the Frame. The hero band is ink-dark, so night footage sits
# under the scrim without fighting it.
echo "==> hero loop"
ffmpeg -hide_banner -loglevel error -y \
  -ss 9 -t 12 -i "$D3/Reels/Copy of Dubai Night Reel.mp4" \
  -an -sn -dn \
  -vf "crop=1080:1350:0:285,scale=720:900:flags=lanczos,fps=25,format=yuv420p" \
  -c:v libx264 -preset slow -crf 27 -maxrate 1800k -bufsize 3600k \
  "${COMMON[@]}" "$OUT/hero-dubai-night.mp4"

# The hero poster must be the loop's literal frame 0 or playback starts with a
# visible jump — so it comes from the ENCODED file, with no thumbnail= search.
ffmpeg -hide_banner -loglevel error -y -i "$OUT/hero-dubai-night.mp4" \
  -frames:v 1 -q:v 3 "$POSTERS/hero-dubai-night.jpg"

# ── 2. Guest review clips ──────────────────────────────────────────────────
# id | source file | poster seek (seconds)
#
# Ten distinct guests. The corpus has near-duplicates — "Video 2" repeats
# "Review Video 2", "reviews_1new" repeats "Review Video 1", and three files
# are the same photo-collage montage — so this list is deduplicated by who is
# actually on camera, not by filename.
REVIEWS=(
  "souk-couple|$D2/Reviews/Copy of Review Video 1.mp4|7"
  "creek-night-couple|$D2/Reviews/Copy of Review Video 2.mp4|6"
  "guide-as-i-leave|$D2/Reviews/Copy of dubai reviews.mp4|6"
  "we-booked-the|$D2/Reviews/Copy of final reel 2 reviews.mp4|8"
  "really-interesting|$D2/Reviews/Copy of final_1. bg sound.mp4|6"
  "red-shirt|$D2/Reviews/Copy of review 3 final(1).mp4|7"
  "review-five|$D2/Reviews/Copy of review 5.mp4|5"
  "very-nice-trip|$D3/Reviews/Copy of Video 3_1.mp4|9"
  "booked-it|$D3/Reviews/Copy of review 3.mp4|8"
  "two-travellers|$D3/Reviews/Copy of review 4.mp4|17"
)

echo "==> guest review clips"
for entry in "${REVIEWS[@]}"; do
  IFS='|' read -r id src seek <<<"$entry"
  [ -f "$src" ] || { echo "  MISSING: $src" >&2; continue; }
  ffmpeg -hide_banner -loglevel error -y -i "$src" \
    -vf "scale='min(540,iw)':-2:flags=lanczos,fps=24,format=yuv420p" \
    -c:v libx264 -preset slow -crf 29 -maxrate 900k -bufsize 1800k \
    -c:a aac -b:a 64k -ac 1 -ar 44100 \
    -profile:v main -level:v 3.1 -g 48 -keyint_min 48 -sc_threshold 0 \
    -movflags +faststart \
    "$OUT/review-$id.mp4"

  # thumbnail=48 buffers two seconds from the seek point and picks the frame
  # furthest from their average, which dodges dissolves and motion blur — a
  # bare -frames:v 1 lands on a cross-fade often enough to matter.
  ffmpeg -hide_banner -loglevel error -y -ss "$seek" -i "$OUT/review-$id.mp4" \
    -vf "thumbnail=48" -frames:v 1 -q:v 4 "$POSTERS/review-$id.jpg"
  printf '  %-20s %6s KB video  %5s KB poster\n' "$id" \
    "$(( $(stat -f %z "$OUT/review-$id.mp4") / 1024 ))" \
    "$(( $(stat -f %z "$POSTERS/review-$id.jpg") / 1024 ))"
done

echo "==> totals"
du -ch "$OUT"/*.mp4 | tail -1
du -ch "$POSTERS"/*.jpg | tail -1

# faststart check — a file whose moov sits after mdat makes the browser fetch
# the whole thing before it can show frame one.
#
# This walks the top-level atom chain rather than grepping the first few KB
# for the two names: a moov of more than a few kilobytes pushes mdat outside
# any fixed window, and a substring search then reports a correctly
# fast-started file as broken.
echo "==> faststart"
python3 - "$OUT" <<'PY'
import struct, sys, pathlib
for f in sorted(pathlib.Path(sys.argv[1]).glob('*.mp4')):
    order = []
    with f.open('rb') as fh:
        off = 0
        while len(order) < 8:
            fh.seek(off)
            hdr = fh.read(8)
            if len(hdr) < 8:
                break
            size = struct.unpack('>I', hdr[:4])[0]
            order.append(hdr[4:8].decode('latin1'))
            if size == 1:                       # 64-bit extended size
                size = struct.unpack('>Q', fh.read(8))[0]
            if size < 8:
                break
            off += size
    moov = order.index('moov') if 'moov' in order else 99
    mdat = order.index('mdat') if 'mdat' in order else 99
    print(f"  {'ok  ' if moov < mdat else 'FAIL'}  {f.name}")
PY
