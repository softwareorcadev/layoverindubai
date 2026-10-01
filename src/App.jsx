import Header from './components/Header.jsx'
import StickyCta from './components/StickyCta.jsx'
import Hero from './components/Hero.jsx'
import TrustBar from './components/TrustBar.jsx'
import ForYou from './components/ForYou.jsx'
import Reviews from './components/Reviews.jsx'
import WhyChooseUs from './components/WhyChooseUs.jsx'
import Included from './components/Included.jsx'
import Packages from './components/Packages.jsx'
import Itineraries from './components/Itineraries.jsx'
import Distance from './components/Distance.jsx'
import Gallery from './components/Gallery.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Compare from './components/Compare.jsx'
import Faq from './components/Faq.jsx'
import Urgency from './components/Urgency.jsx'
import Booking from './components/Booking.jsx'
import Footer from './components/Footer.jsx'

/**
 * Page composition only — every section owns its own markup and data.
 *
 * The order below alternates section tone (ink · sand · white · sand · white …)
 * with an ink beat every four or five sections. Changing the order means
 * re-checking that alternation, or two same-tone sections end up adjacent and
 * visually merge.
 *
 * <Compare> moved up one slot when the written-testimonials section was
 * deleted and its guest videos merged into <Reviews>. Removing a sand section
 * from position 11 left ink at 9 and 11 with a single white band between them,
 * which strobes; swapping Compare in ahead of HowItWorks restores the
 * alternation and keeps the ink beats at 1 · 9 · 12 · 15. It also reads
 * better — see it, decide, then learn how it works.
 *
 * <Footer> sits OUTSIDE <main>, which also fixes a nesting bug in the original
 * page where the footer was inside it.
 */
export default function App() {
  return (
    <>
      <Header />
      <StickyCta />

      <main id="top">
        <Hero />           {/* ink     */}
        <TrustBar />       {/* sand-50 */}
        <ForYou />         {/* white   */}
        <Reviews />        {/* sand-50 */}
        <WhyChooseUs />    {/* white   */}
        <Included />       {/* sand-50 */}
        <Packages />       {/* white   */}
        <Itineraries />    {/* sand-50 */}
        <Distance />       {/* ink     */}
        <Gallery />        {/* white   */}
        <Compare />        {/* sand-50 */}
        <HowItWorks />     {/* ink     */}
        <Faq />            {/* white   */}
        <Urgency />        {/* gold-50 */}
        <Booking />        {/* ink     */}
      </main>

      <Footer />
    </>
  )
}
