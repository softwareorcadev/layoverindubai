import { cx } from '../../lib/cx.js'

/**
 * The boarding-pass barcode accent. Purely decorative; takes its colour from
 * `currentColor` via the `.barcode` gradient in index.css.
 */
export default function Barcode({ className }) {
  return <span className={cx('barcode', className)} aria-hidden="true" />
}
