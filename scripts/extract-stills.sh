#!/usr/bin/env bash
#
# Turn the client's raw content delivery into the web stills the page ships.
#
# Run from the repo root:   ./scripts/extract-stills.sh
#
# ── WHY THE SOURCES ARE NAMED THE WAY THEY ARE ─────────────────────────────
# The client sends Instagram exports. Every filename is the original caption,
# complete with emoji, curly apostrophes, mathematical-bold Unicode and '#'.
# Nothing here interpolates a source filename into a word-splittable position:
# PDFs are addressed through the CAROUSEL map below by a hand-assigned slug,
# and every expansion is quoted. Add a new source by adding a line to a map,
# never by globbing.
#
# ── WHY pdfimages -j AND NOT pdftoppm ──────────────────────────────────────
# Each carousel page is a single flat JPEG at 1080x1350 sitting on an
# 800x1000pt page, i.e. 97 ppi. `pdfimages -j` copies that JPEG stream out
# byte-for-byte with no recompression. `pdftoppm` rasterises the *page*, so
# any DPI high enough to preserve detail is already upscaling. There is no
# setting at which rasterising wins.
#
# ── WHY THE CROPS ──────────────────────────────────────────────────────────
# Every carousel page carries the brand wordmark top-left and a headline in
# the upper third, baked into the pixels. At gallery-tile size that type is
# illegible mush sitting under the tile's own caption. The CROPS map below
# keeps only the photographic region of each page. The offsets are per-image
# and were chosen by eye — a uniform rule cuts the top off the Dubai Frame
# and the spice sacks off the Spice Souk.
#
# ── WHY sips IS ONLY USED FOR READING ──────────────────────────────────────
# sips has no chroma-subsampling or progressive-JPEG control and rewrites the
# ICC profile silently. ffmpeg is already a dependency of the video pipeline,
# so it does the scaling too. sips is still the fastest way to *read*
# dimensions, which is what the manifest at the end needs.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/Dubai (All Data)/Layover in dubai data"
STAGE="$ROOT/media/staging/carousel"
OUT="$ROOT/src/assets/stills"

for tool in pdfimages pdfinfo ffmpeg sips; do
  command -v "$tool" >/dev/null || { echo "missing: $tool" >&2; exit 1; }
done
[ -d "$SRC" ] || { echo "source folder not found: $SRC" >&2; exit 1; }

mkdir -p "$STAGE" "$OUT"

# ── 1. Explode every carousel page to a native-resolution JPEG ─────────────
# Slugs are assigned rather than derived: "carousel 1.pdf" and "carousel(1).pdf"
# both reduce to "carousel-1" under any sane slugify, and the second silently
# overwrites the first.
declare -a CAROUSEL=(
  "carousel.pdf|cx-plain"      "post 1_.pdf|cx-post1"
  "carousel 1.pdf|cx-sp1"      "carousel 2.pdf|cx-sp2"
  "carousel 3.pdf|cx-sp3"      "carousel 5.pdf|cx-sp5"
)
for n in $(seq 1 21); do CAROUSEL+=("carousel($n).pdf|cx-p$n"); done

echo "==> extracting carousel pages"
for entry in "${CAROUSEL[@]}"; do
  file="${entry%%|*}"; slug="${entry##*|}"
  [ -f "$SRC/$file" ] || { echo "  skip (absent): $file"; continue; }
  pdfimages -j -p "$SRC/$file" "$STAGE/$slug"
  pages=$(pdfinfo "$SRC/$file" | awk '/^Pages:/{print $2}')
  got=$(find "$STAGE" -name "$slug-*.jpg" | wc -l | tr -d ' ')
  # -j falls back to .ppm when a page is not DCT-encoded. Every page in this
  # delivery is, but a future drop might not be — so check rather than assume.
  [ "$got" -eq "$pages" ] || echo "  WARN $slug: $got jpg for $pages pages"
done

# ── 2. Crop to the photographic region, then emit two width rungs ──────────
# slug | source page | ffmpeg crop w:h:x:y
CROPS=(
  # Gallery mosaic. p17 and p18 are a matched pair of itinerary storyboards —
  # New Dubai and Old Dubai — which is why the set reads as one photo essay.
  "burj-khalifa|cx-p17-005-004|1080:830:0:520"
  "palm-jumeirah|cx-p17-007-006|1080:830:0:170"
  "dubai-marina|cx-p17-008-007|1080:860:0:490"
  "museum-of-the-future|cx-p17-004-003|1080:830:0:520"
  "dubai-frame|cx-p17-003-002|1080:950:0:400"
  # Portrait, for the mosaic's one row-span-2 slot. The sail tower sits at the
  # top left of its page, so this is the only crop here that is not full-width.
  "burj-al-arab|cx-p17-006-005|450:760:0:180"
  "al-fahidi|cx-p18-002-001|1080:830:0:520"
  "abra-ride|cx-p18-003-002|1080:830:0:520"
  "spice-souk|cx-p18-005-004|1080:830:0:520"
  "gold-souk|cx-p18-006-005|1080:740:0:605"
  # These two carry a row of social icons across the foot of the page as well
  # as a headline up top, so they are cropped at both ends.
  "ain-dubai|cx-p16-002-001|1080:715:0:545"
  "dubai-fountain|cx-p16-003-002|1080:680:0:565"
  # Hero background. Downtown at dusk, which is what the copy promises — and
  # wider than the gallery crop of the same page, because the hero is
  # full-bleed behind a scrim.
  "hero-downtown-dusk|cx-p16-003-002|1080:645:0:600"
)

echo "==> cropping and sizing"
: > "$ROOT/media/stills.manifest.txt"
for entry in "${CROPS[@]}"; do
  IFS='|' read -r slug page crop <<<"$entry"
  in="$STAGE/$page.jpg"
  [ -f "$in" ] || { echo "  MISSING source page: $page" >&2; continue; }
  for w in 1080 540; do
    out="$OUT/$slug-$w.jpg"
    # min(w,iw) so a narrow crop is never upscaled — the Burj Al Arab crop is
    # 640px wide and asking for 1080 would invent two thirds of its pixels.
    ffmpeg -hide_banner -loglevel error -y -i "$in" \
      -vf "crop=$crop,scale='min($w,iw)':-2:flags=lanczos" \
      -frames:v 1 -q:v 4 "$out"
  done
  read -r pw ph < <(sips -g pixelWidth -g pixelHeight "$OUT/$slug-1080.jpg" |
    awk '/pixelWidth/{w=$2}/pixelHeight/{h=$2}END{print w, h}')
  printf '%-24s %sx%-10s %8s %8s\n' "$slug" "$pw" "$ph" \
    "$(stat -f %z "$OUT/$slug-1080.jpg")" "$(stat -f %z "$OUT/$slug-540.jpg")" \
    | tee -a "$ROOT/media/stills.manifest.txt"
done

# ── 3. Social card ─────────────────────────────────────────────────────────
# public/og-image.jpg, not src/assets: social crawlers need an absolute URL at
# a stable path, and bundled assets get content-hashed filenames. 1200x800 to
# match the og:image:width/height already declared in index.html.
#
# The Burj Khalifa aerial rather than the fountain page used by the hero: the
# fountain page carries a decorative gold arc and a row of social icons that a
# 1.5:1 crop cannot avoid, and both read as artefacts once Facebook or
# WhatsApp renders the card at thumbnail size.
echo "==> social card"
ffmpeg -hide_banner -loglevel error -y -i "$STAGE/cx-p17-005-004.jpg" \
  -vf "crop=1080:720:0:620,scale=1200:800:flags=lanczos" \
  -frames:v 1 -q:v 3 "$ROOT/public/og-image.jpg"

echo "==> done. $(find "$OUT" -name '*.jpg' | wc -l | tr -d ' ') files in src/assets/stills"
