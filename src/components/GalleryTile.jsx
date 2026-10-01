import Icon from './shared/Icon.jsx'
import { cx } from '../lib/cx.js'
import { hideOnError } from '../lib/hideOnError.js'
import { IMAGES } from '../data/images.js'

/**
 * One mosaic tile. A photo when the tile names an `imageKey`, otherwise a
 * gradient with an oversized icon — which was a deliberate part of the design
 * back when ten of the twelve tiles had no photograph, and is now only the
 * fallback shape.
 *
 * The tile's height comes from its own `minH` class, and photos are absolutely
 * positioned to fill it. In the original page the images sat in normal flow, so
 * a portrait photo dropped into a wide slot set the height of its entire grid
 * row — which stretched the "Burj Al Arab" banner to 725px and blew its two
 * icon-tile neighbours up to match. Anchoring the height here keeps the mosaic
 * to the proportions the `min-h-*` values were clearly chosen for.
 */
export default function GalleryTile({ tile }) {
  const image = tile.imageKey ? IMAGES[tile.imageKey] : null
  const minH = tile.minH ?? 'min-h-[9rem] sm:min-h-[11.5rem]'

  return (
    <figure
      className={cx(
        'group relative overflow-hidden rounded-3xl bg-gradient-to-br',
        tile.gradient,
        tile.span,
        minH,
      )}
    >
      {image ? (
        <img
          src={image.src}
          srcSet={image.srcset}
          /* `sizes` describes the slot, not the file, so it lives here rather
             than in the registry. The default is a quarter-width grid cell;
             the two tiles that span differently override it. */
          sizes={tile.sizes ?? '(min-width: 768px) 25vw, 50vw'}
          width={image.width}
          height={image.height}
          alt={tile.alt ?? image.alt}
          loading="lazy"
          decoding="async"
          onError={hideOnError}
          className={cx(
            'absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105',
            tile.objectPosition,
          )}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center transition duration-700 group-hover:scale-110">
          <Icon name={tile.icon} className="text-5xl text-white/25" />
        </div>
      )}

      <figcaption
        className={cx(
          'absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-4 text-white',
          tile.large ? 'pt-10' : 'pt-8',
        )}
      >
        <p className={cx('font-display font-semibold', !tile.large && 'text-sm')}>
          {tile.title}
        </p>
        <p className={cx(tile.large ? 'text-xs' : 'text-[11px]', 'text-white/65')}>
          {tile.subtitle}
        </p>
      </figcaption>
    </figure>
  )
}
