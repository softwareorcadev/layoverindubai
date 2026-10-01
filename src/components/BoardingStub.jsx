import Barcode from './shared/Barcode.jsx'
import RouteStrip from './shared/RouteStrip.jsx'
import { useCycler } from '../hooks/useCycler.js'
import { useBooking } from '../context/bookingContext.js'

/** The layover lengths the readout cycles through, as on the original page. */
const HOUR_CYCLE = ['06', '04', '08', '03', '10', '05']

/**
 * The hero's boarding-pass trust strip: a cycling layover length, the
 * DXB → DUBAI → DXB route, and the three reassurance cells.
 */
export default function BoardingStub() {
  const { reducedMotion } = useBooking()
  const { value, visible } = useCycler(HOUR_CYCLE, {
    intervalMs: 2600,
    fadeMs: 350,
    enabled: !reducedMotion,
  })

  return (
    <div className="mt-9 max-w-xl rounded-2xl border border-white/10 bg-white/[.06] p-4 backdrop-blur-xs sm:p-5">
      <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
        <span>Boarding your layover</span>
        <Barcode className="ml-auto hidden h-4 w-24 text-white sm:block" />
      </div>

      <div className="mt-3 flex items-center gap-2 text-white">
        <RouteStrip size="lg" />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-dashed border-white/15 pt-3 text-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
            Your layover
          </p>
          <p className="font-display text-base font-bold text-white">
            <span className="fade-swap" style={{ opacity: visible ? 1 : 0 }}>
              {value}
            </span>{' '}
            hrs
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
            Pickup
          </p>
          <p className="font-display text-base font-bold text-white">All terminals</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
            Return
          </p>
          <p className="font-display text-base font-bold text-gold-300">On time</p>
        </div>
      </div>
    </div>
  )
}
