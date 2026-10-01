import Reveal from './shared/Reveal.jsx'
import SectionHeading from './shared/SectionHeading.jsx'
import SectionCta from './shared/SectionCta.jsx'
import GalleryTile from './GalleryTile.jsx'
import { GALLERY_TILES } from '../data/gallery.js'
import { SECTION_CTAS } from '../data/sectionCtas.js'
import { SECTION } from '../data/site.js'

export default function Gallery() {
  return (
    <section id={SECTION.gallery} className="bg-white">
      <div className="mx-auto max-w-wrap px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="The attractions"
            title={
              <>
                All of this is minutes
                <br />
                from your gate.
              </>
            }
            lead="Downtown Dubai is only ~15 minutes from DXB. Here's what's waiting on the other side of arrivals."
          />
        </Reveal>

        <Reveal className="mt-11 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {GALLERY_TILES.map((tile) => (
            <GalleryTile key={tile.id} tile={tile} />
          ))}
        </Reveal>

        <SectionCta cta={SECTION_CTAS.gallery} />
      </div>
    </section>
  )
}
